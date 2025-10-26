import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface BaseQueryOptions<TData, TError, TQueryFnData> {
  /** Enable/disable the query */
  enabled?: boolean;
  /** Transform/select data from query result */
  select?: (data: TQueryFnData) => TData;
  /** Success callback */
  onSuccess?: (data: TData) => void;
  /** Error callback */
  onError?: (error: TError) => void;
  /** Error message (string or function to extract from error) */
  errorMessage?: string | ((error: TError) => string);
  /** Disable automatic error toast */
  disableErrorToast?: boolean;
  /** Additional react-query options */
  queryOptions?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn" | "enabled" | "select"
  >;
}

export function useBaseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  queryKey: QueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: BaseQueryOptions<TData, TError, TQueryFnData>
) {
  const {
    enabled = true,
    select,
    onSuccess,
    onError,
    errorMessage,
    disableErrorToast = false,
    queryOptions,
  } = options || {};

  const query = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn,
    enabled,
    select,
    ...queryOptions,
    retry: queryOptions?.retry ?? 1, // Default retry once
    staleTime: queryOptions?.staleTime ?? 1000 * 60 * 5, // 5 minutes default
  });

  // Handle success
  if (query.isSuccess && query.data && onSuccess) {
    onSuccess(query.data);
  }

  // Handle error with toast
  if (query.isError && query.error && !disableErrorToast) {
    const message =
      typeof errorMessage === "function"
        ? errorMessage(query.error)
        : errorMessage ||
          (query.error as any)?.response?.data?.message ||
          (query.error as any)?.message ||
          (query.error as any)?.data?.error ||
          "Failed to fetch data";

    toast.error(message);
    onError?.(query.error);
  }

  return query;
}

/**
 * Usage Examples:
 *
 * // Basic usage
 * const { data, isLoading } = useBaseQuery(
 *   ['users'],
 *   fetchUsers
 * );
 *
 * // With select and custom error
 * const { data } = useBaseQuery(
 *   ['user', userId],
 *   () => fetchUser(userId),
 *   {
 *     select: (data) => data.user,
 *     errorMessage: "Could not load user profile"
 *   }
 * );
 *
 * // With conditional enabling
 * const { data } = useBaseQuery(
 *   ['tasks', filter],
 *   () => fetchTasks(filter),
 *   {
 *     enabled: !!filter,
 *     disableErrorToast: true,
 *     onError: (error) => console.error(error)
 *   }
 * );
 */

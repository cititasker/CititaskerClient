import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface BaseMutationOptions<TData, TError, TVariables, TContext> {
  /** Query keys to invalidate on success */
  invalidateQueryKeys?: QueryKey[];
  /** Success message (string or function to extract from response) */
  successMessage?: string | ((data: TData) => string);
  /** Error message (string or function to extract from error) */
  errorMessage?: string | ((error: TError) => string);
  /** Disable automatic success toast */
  disableSuccessToast?: boolean;
  /** Disable automatic error toast */
  disableErrorToast?: boolean;
  /** Custom success handler */
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
  /** Custom error handler */
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
  /** Custom settled handler */
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
  /** Additional react-query mutation options */
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn" | "onSuccess" | "onError" | "onSettled"
  >;
}

export function useBaseMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: BaseMutationOptions<TData, TError, TVariables, TContext>
) {
  const queryClient = useQueryClient();

  const {
    invalidateQueryKeys,
    successMessage,
    errorMessage,
    disableSuccessToast = false,
    disableErrorToast = false,
    onSuccess,
    onError,
    onSettled,
    mutationOptions,
  } = options || {};

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...mutationOptions,

    onSuccess: (data, variables, context) => {
      // Invalidate multiple query keys
      if (invalidateQueryKeys?.length) {
        invalidateQueryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      // Show success toast
      if (!disableSuccessToast) {
        const message =
          typeof successMessage === "function"
            ? successMessage(data)
            : successMessage ||
              (data as any)?.message ||
              (data as any)?.data?.message ||
              "Success";

        toast.success(message);
      }

      // Call custom success handler
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      // Show error toast
      if (!disableErrorToast) {
        const message =
          typeof errorMessage === "function"
            ? errorMessage(error)
            : errorMessage ||
              (error as any)?.response?.data?.message ||
              (error as any)?.message ||
              (error as any)?.data?.error ||
              "An error occurred";

        toast.error(message);
      }

      // Call custom error handler
      onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);
    },
  });
}

/**
 * Usage Examples:
 *
 * // Basic usage
 * const mutation = useBaseMutation(updateUser, {
 *   invalidateQueryKeys: [['users'], ['profile']],
 *   successMessage: "User updated successfully"
 * });
 *
 * // With dynamic messages
 * const mutation = useBaseMutation(createTask, {
 *   successMessage: (data) => `Task "${data.title}" created`,
 *   errorMessage: (error) => error.details || "Failed to create task",
 * });
 *
 * // With custom handlers and disabled toasts
 * const mutation = useBaseMutation(deleteItem, {
 *   disableSuccessToast: true,
 *   onSuccess: (data) => {
 *     console.log("Deleted:", data);
 *     customSuccessHandler();
 *   }
 * });
 */

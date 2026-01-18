import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type UseCustomSuspenseQueryOptions<
  TData,
  TError = unknown,
  TQueryKey extends readonly unknown[] = unknown[]
> = Omit<
  UseSuspenseQueryOptions<TData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export function createSuspenseQueryHook<
  TData,
  TError = unknown,
  TQueryKey extends readonly unknown[] = readonly unknown[],
  TArgs extends Record<string, any> = Record<string, any>
>({
  getKey,
  queryFn,
}: {
  getKey: (args: TArgs) => TQueryKey;
  queryFn: (args: TArgs) => Promise<TData>;
}) {
  return (
    args: TArgs & UseCustomSuspenseQueryOptions<TData, TError, TQueryKey>
  ) => {
    const { ...options } = args;

    return useSuspenseQuery<TData, TError, TData, TQueryKey>({
      queryKey: getKey(args),
      queryFn: () => queryFn(args),
      ...options,
    });
  };
}

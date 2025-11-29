import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        refetchOnWindowFocus: false, // ✅ Critical
        refetchOnMount: false, // ✅ Only fetch if stale
        refetchOnReconnect: false,
        retry: 1,
      },
    },
  });
});

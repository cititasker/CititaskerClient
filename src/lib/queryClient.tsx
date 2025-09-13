import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 5000, // 5 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
});

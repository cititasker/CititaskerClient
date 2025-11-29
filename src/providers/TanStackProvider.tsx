// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { useState } from "react";

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Create QueryClient with optimized settings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false, // ✅ CRITICAL: Disable refetch on focus
            refetchOnMount: false, // ✅ CRITICAL: Only fetch if stale
            refetchOnReconnect: false, // Don't refetch on reconnect
            retry: 1,
          },
        },
      })
  );

  return (
    <SessionProvider
      // ✅ CRITICAL: Reduce session polling
      refetchInterval={5 * 60} // 5 minutes (300 seconds)
      refetchOnWindowFocus={false} // Don't refetch on every focus
      refetchWhenOffline={false} // Don't refetch when offline
    >
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

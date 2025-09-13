// providers/TanStackProvider.tsx
"use client";

import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/constant/queryClient";

const QueryClientResetContext = createContext<() => void>(() => {});

export const useResetQueryClient = () => {
  return useContext(QueryClientResetContext);
};

const TanStackProvider = ({ children }: PropsWithChildren) => {
  const [queryClient, setQueryClient] = useState(() => getQueryClient());

  const resetClient = () => {
    queryClient.clear();
    queryClient.cancelQueries();
    setQueryClient(getQueryClient());
  };

  return (
    <QueryClientResetContext.Provider value={resetClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryClientResetContext.Provider>
  );
};

export default TanStackProvider;

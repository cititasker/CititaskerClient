"use client";

import React, { createContext, useContext, ReactNode, FC } from "react";
// import { Toaster } from "@/components/ui/sonner";
import { toast, Toaster } from "sonner";

type SnackbarSeverity = "success" | "info" | "warning" | "error";

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  // Map severity to sonner toast types
  const variantMap: Record<
    SnackbarSeverity,
    "success" | "error" | "warning" | "info"
  > = {
    success: "success",
    info: "info",
    warning: "warning",
    error: "error",
  };

  const showSnackbar = (
    message: string,
    severity: SnackbarSeverity = "info"
  ) => {
    toast[variantMap[severity]](message, {
      duration: 5000,
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Toaster position="top-right" richColors expand />
    </SnackbarContext.Provider>
  );
};

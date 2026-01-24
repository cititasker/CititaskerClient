"use client";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { persistor, store } from "@/store";
import { SnackbarProvider } from "./SnackbarProvider";
import { TaskAlertProvider } from "./TaskAlertContext";
import { NotificationsProvider } from "./NotificationsProvider";
import { PostHogProvider } from "./PostHogProvider";
import { SessionSync } from "./SessionSync";
import Loader from "@/components/reusables/Loading";
import { makeQueryClient } from "@/constant/queryClient";
import { CookieConsentProvider } from "./CookieConsentProvider";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-red-800 font-bold text-lg mb-2">
              Something went wrong
            </h2>
            <p className="text-red-600 text-sm">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
              <SessionSync />
              <PostHogProvider>
                <CookieConsentProvider />
                <NotificationsProvider>
                  <TaskAlertProvider>
                    <SnackbarProvider>
                      <TooltipProvider>{children}</TooltipProvider>
                    </SnackbarProvider>
                  </TaskAlertProvider>
                </NotificationsProvider>
              </PostHogProvider>
            </PersistGate>
          </ReduxProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

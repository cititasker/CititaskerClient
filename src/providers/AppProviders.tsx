"use client";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
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
import type { Session } from "next-auth";
import type { DehydratedState } from "@tanstack/react-query";

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
  session: Session | null;
  dehydratedState: DehydratedState;
}

export default function AppProviders({
  children,
  session,
  dehydratedState,
}: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <SessionProvider
            session={session}
            refetchInterval={5 * 60} // 5 minutes
            refetchOnWindowFocus={false}
          >
            <ReduxProvider store={store}>
              <PersistGate loading={<Loader />} persistor={persistor}>
                <SessionSync />
                <PostHogProvider>
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
        </HydrationBoundary>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import TanStackProvider from "./TanStackProvider";
import Loader from "@/components/reusables/Loading";

const PostHogProvider = dynamic(
  () =>
    import("./PostHogProvider").then((mod) => ({
      default: mod.PostHogProvider,
    })),
  { ssr: false }
);

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

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <TanStackProvider>
          <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
              <PostHogProvider>{children}</PostHogProvider>
            </PersistGate>
          </Provider>
        </TanStackProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppProvider;

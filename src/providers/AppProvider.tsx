"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import TanStackProvider from "./TanStackProvider";
import dynamic from "next/dynamic";
import { PostHogProvider } from "./PostHogProvider";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const Loader = dynamic(() => import("@/components/reusables/Loading"), {
  ssr: false,
});

function ErrorFallback({ error }: { error: any }) {
  return (
    <div className="bg-red-100 p-4 rounded-md max-w-sm w-full">
      <h2 className="text-red-700 font-bold">Something went wrong</h2>
      <p>{error?.response?.data?.message || error.message}</p>
    </div>
  );
}

const AppProvider = ({ children }: any) => {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <TanStackProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PostHogProvider>{children}</PostHogProvider>
            </PersistGate>
          </Provider>
        </TanStackProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppProvider;

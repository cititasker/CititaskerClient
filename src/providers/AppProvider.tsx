"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import ServerProvider from "./ServerProvider";
import dynamic from "next/dynamic";
import { PostHogProvider } from "./PostHogProvider";

const Loader = dynamic(() => import("@/components/reusables/Loading"), {
  ssr: false,
});

const AppProvider = ({ children }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <ServerProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PostHogProvider>{children}</PostHogProvider>
          </PersistGate>
        </Provider>
      </ServerProvider>
    </Suspense>
  );
};

export default AppProvider;

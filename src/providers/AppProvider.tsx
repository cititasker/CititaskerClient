"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import ServerProvider from "./ServerProvider";
import Loader from "@/app/components/reusables/Loading";

const AppProvider = ({ children }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <ServerProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ServerProvider>
    </Suspense>
  );
};

export default AppProvider;

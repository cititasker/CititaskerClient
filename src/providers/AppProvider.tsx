"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/reusables/Loading";

const AppProvider = ({ children }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default AppProvider;

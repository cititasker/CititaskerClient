"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import Loader from "@/app/components/reusables/Loading";

const AppProvider = ({ children }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>{children}</Provider>
    </Suspense>
  );
};

export default AppProvider;

"use client";
import React, { Suspense } from "react";
// import { SnackbarProvider } from "./SnackbarProvider";
// import { StyledEngineProvider, ThemeProvider } from "@mui/material";
// import theme from "./theme";
// import { persistor, store } from "@/store";
import dynamic from "next/dynamic";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

const Loader = dynamic(() => import("@/components/reusables/Loading"), {
  ssr: false,
});

export default function Providers({ children }: any) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

"use client";
import React, { Suspense } from "react";
// import { SnackbarProvider } from "./SnackbarProvider";
// import { StyledEngineProvider, ThemeProvider } from "@mui/material";
// import theme from "./theme";
// import { persistor, store } from "@/store";
import Loader from "@/components/reusables/Loading";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

export default function AppProvider({ children }: any) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

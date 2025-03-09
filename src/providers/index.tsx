"use client";
import React, { Suspense } from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { persistor, store } from "@/store";
import Loader from "@/components/reusables/Loading";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <StyledEngineProvider injectFirst>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                {children}
              </PersistGate>
            </Provider>
          </StyledEngineProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default Providers;

"use client";
import React from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./theme";

const Providers = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Providers;

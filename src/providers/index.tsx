"use client";
import React from "react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./theme";

const Providers = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default Providers;

"use client";
import React, { useEffect } from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserQuery } from "@/queries/user";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/slices/user";
import theme from "./theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  // Fetch user only when session exists
  const { data } = useQuery(getUserQuery({ enabled: !!session }));

  // Dispatch user data when fetched
  useEffect(() => {
    if (data) dispatch(setUser(data.data));
  }, [data, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        {/* <StyledEngineProvider injectFirst> */}
        {children}
        {/* </StyledEngineProvider> */}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Providers;

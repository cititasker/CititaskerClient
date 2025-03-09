"use client";
import React from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
// import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";
// import { getUserQuery } from "@/queries/user";
// import { useAppDispatch } from "@/store/hook";
// import { setUser } from "@/store/slices/user";
import theme from "./theme";

const Providers = ({ children }: any) => {
  // const { data: session } = useSession();
  // const dispatch = useAppDispatch();

  // const { data } = useQuery(getUserQuery({ enabled: !!session }));

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUser(data.data));
  //   }
  // }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Providers;

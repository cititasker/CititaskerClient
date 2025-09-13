"use client";
import React, { useEffect } from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/slices/user";
import { useGetUser } from "@/services/user/user.hook";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const { data } = useGetUser({
    enabled: status == "authenticated",
  });

  useEffect(() => {
    if (data) dispatch(setUser(data.data));
  }, [data, dispatch]);

  return <SnackbarProvider>{children}</SnackbarProvider>;
};

export default Providers;

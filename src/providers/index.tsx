"use client";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "./SnackbarProvider";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/slices/user";
import { useGetUser } from "@/services/user/user.hook";
import type { Session } from "next-auth";

function SessionSync() {
  const { status, data: session } = useSession();
  const dispatch = useAppDispatch();

  // Fetch full user data when authenticated
  const { data: userData, isSuccess } = useGetUser({
    enabled: status === "authenticated" && !!session?.user?.authToken,
  });

  useEffect(() => {
    if (isSuccess && userData?.data) {
      dispatch(setUser(userData.data));
    }
  }, [isSuccess, userData, dispatch]);

  return null;
}

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60} // 5 minutes
      refetchOnWindowFocus={false}
    >
      <SessionSync />
      <SnackbarProvider>{children}</SnackbarProvider>
    </SessionProvider>
  );
}

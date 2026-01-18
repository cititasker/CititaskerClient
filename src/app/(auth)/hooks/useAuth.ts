"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { ROLE, ROUTES } from "@/constant";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleGoogleAuth = () => signIn("google");

  const redirectAfterLogin = async () => {
    const updatedSession = await getSession();
    const userRole = updatedSession?.user?.role;
    const redirect = searchParams.get("redirect");
    const redirectTo = redirect
      ? decodeURIComponent(redirect)
      : userRole === ROLE.poster
      ? ROUTES.POSTER
      : ROUTES.TASKER;

    router.push(redirectTo);
  };

  const handleAuthSuccess = (message: string) => {
    showSnackbar(message, "success");
    redirectAfterLogin();
  };

  const handleAuthError = (message: string) => {
    showSnackbar(message, "error");
    setLoading(false);
  };

  return {
    loading,
    setLoading,
    handleGoogleAuth,
    handleAuthSuccess,
    handleAuthError,
  };
};

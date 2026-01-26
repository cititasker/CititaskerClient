"use client";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { ROLE, ROUTES } from "@/constant";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://staging-api.cititasker.com/api/v1";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleGoogleAuth = useCallback(() => {
    try {
      // Get redirect parameter if exists
      const redirect = searchParams.get("redirect");

      // Store redirect in sessionStorage for later use
      if (redirect) {
        sessionStorage.setItem("auth_redirect", redirect);
      }

      // Redirect browser directly to your backend Google OAuth endpoint
      window.location.href = `${BACKEND_URL}/auth/google`;
    } catch (error) {
      console.error("Google auth error:", error);
      showSnackbar("Failed to initiate Google authentication", "error");
    }
  }, [searchParams, showSnackbar]);

  const redirectAfterLogin = useCallback(async () => {
    const updatedSession = await getSession();
    const userRole = updatedSession?.user?.role;
    const redirect = searchParams.get("redirect");

    const redirectTo = redirect
      ? decodeURIComponent(redirect)
      : userRole === ROLE.poster
        ? ROUTES.POSTER
        : ROUTES.TASKER;

    router.push(redirectTo);
  }, [searchParams, router]);

  const handleAuthSuccess = useCallback(
    (message: string) => {
      showSnackbar(message, "success");
      redirectAfterLogin();
    },
    [showSnackbar, redirectAfterLogin],
  );

  const handleAuthError = useCallback(
    (message: string) => {
      showSnackbar(message, "error");
      setLoading(false);
    },
    [showSnackbar],
  );

  return {
    loading,
    setLoading,
    handleGoogleAuth,
    handleAuthSuccess,
    handleAuthError,
  };
};

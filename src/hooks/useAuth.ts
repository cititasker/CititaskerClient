"use client";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hook";

export function useAuth() {
  const { data: session, status } = useSession();

  // Get full user data from Redux store (fetched via useGetUser)
  const user = useAppSelector((state) => state.user.user);

  return {
    user,
    session,
    status,
    authToken: session?.user?.authToken,
    role: session?.user?.role as TRole | undefined,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isUnauthenticated: status === "unauthenticated",
  };
}

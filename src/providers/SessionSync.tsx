"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/slices/user";
import { useGetUser } from "@/services/user/user.hook";

export function SessionSync() {
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

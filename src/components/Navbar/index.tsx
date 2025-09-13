import React from "react";
import MainNavbar from "./MainNavbar";
import { auth } from "@/auth";
import { API_ROUTES } from "@/constant";
import { getQueryClient } from "@/constant/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserApi } from "@/services/user/users.api";
import { AuthProvider } from "@/providers/AuthProvider";

export default async function Navbar() {
  const session = await auth();
  const queryClient = getQueryClient();

  if (!!session) {
    await queryClient.prefetchQuery({
      queryKey: [API_ROUTES.GET_USER_DETAILS],
      queryFn: getUserApi,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthProvider session={session}>
        <MainNavbar />
      </AuthProvider>
    </HydrationBoundary>
  );
}

"use server";

import { signIn, signOut } from "@/auth";
import { ROUTES } from "@/constant";
import { revalidatePath } from "next/cache";

export const loginWithCredentials = async (data: {
  role: TRole;
  token: string;
}) => {
  await signIn("credentials", { ...data, redirect: false });
  revalidatePath("/");
  revalidatePath("/dashboard");
};

export const logoutUser = async () => {
  revalidatePath("/");
  revalidatePath("/dashboard");
  await signOut({ redirectTo: ROUTES.LOGIN });
};

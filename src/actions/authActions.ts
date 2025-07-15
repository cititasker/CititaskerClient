"use server";

import { signIn, signOut } from "@/auth";
import { ROUTES } from "@/constant";
import { loginSchemaType } from "@/schema/auth";
import { AuthError } from "next-auth";

export const loginWithCredentials = async (data: loginSchemaType) => {
  try {
    await signIn("credentials", { ...data, redirect: false });
    return { success: true, message: "Login Sucessful" };
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return { success: false, message: "Invalid credentials" };
    }
    return { success: false, message: "Unexpected error during login." };
  }
};

export const logoutUser = async () => {
  await signOut({ redirectTo: ROUTES.LOGIN });
};

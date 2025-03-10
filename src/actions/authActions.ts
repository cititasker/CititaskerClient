"use server";
import { signIn, signOut } from "@/auth";
import { loginSchemaType } from "@/schema/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

export const loginWithCredentials = async (data: loginSchemaType) => {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
    return { success: true, message: "Login Successful" };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "Something went wrong." };
      }
    } else if (isRedirectError(error)) {
      throw error;
    }
  }
};

export const logoutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("citi-user");
  await signOut({ redirectTo: "/login" });
};

import React from "react";
import MainNavbar from "./MainNavbar";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return <MainNavbar isAuth={!!session} />;
}

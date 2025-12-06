import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireRole(allowedRoles: ("poster" | "tasker")[]) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userRole = session.user.role?.toLowerCase();

  if (!allowedRoles.includes(userRole as any)) {
    const redirectPath =
      userRole === "poster" ? "/discovery-poster" : "/discovery-tasker";
    redirect(redirectPath);
  }

  return session;
}

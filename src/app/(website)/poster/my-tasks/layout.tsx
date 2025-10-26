import { auth } from "@/auth";
import { ROLE, ROUTES } from "@/constant";
import { redirect } from "next/navigation";

export default async function MyTaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = session?.user.role?.toLowerCase();

  // If user is not a poster, redirect to their correct path
  if (role && role !== ROLE.poster) {
    redirect(`/${role}${ROUTES.MY_TASKS}`);
  }
  return children;
}

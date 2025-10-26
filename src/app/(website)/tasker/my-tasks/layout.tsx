import { auth } from "@/auth";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import { ROLE, ROUTES } from "@/constant";
import { redirect } from "next/navigation";

export default async function MyTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user.role;

  if (role && role !== ROLE.tasker) {
    redirect(`/${role}${ROUTES.MY_TASKS}`);
  }

  const filter = [
    { href: "all", name: "All Tasks" },
    { href: "assigned", name: "Assigned Tasks" },
    { href: "cancelled", name: "Cancelled Offers" },
    { href: "completed", name: "Completed Tasks" },
    { href: "expired", name: "Expired Tasks" },
  ];
  return <MyTasksLayout filter={filter}>{children}</MyTasksLayout>;
}

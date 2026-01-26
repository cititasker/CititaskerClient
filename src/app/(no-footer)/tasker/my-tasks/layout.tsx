import { RoleGuard } from "@/components/guards/RoleGuard";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import { ROLE } from "@/constant";
import { generateLayoutMetadata } from "@/lib/metadata-helper";

export const metadata = generateLayoutMetadata({
  title: "My Tasks",
  noIndex: true,
});

export default async function MyTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const filter = [
    { href: "all", name: "All Tasks" },
    { href: "assigned", name: "Assigned Tasks" },
    { href: "cancelled", name: "Cancelled Offers" },
    { href: "completed", name: "Completed Tasks" },
    { href: "expired", name: "Expired Tasks" },
  ];
  return (
    <RoleGuard allowedRoles={[ROLE.tasker]}>
      <MyTasksLayout filter={filter}>{children}</MyTasksLayout>
    </RoleGuard>
  );
}

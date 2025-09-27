import MyTasksLayout from "@/components/layouts/MyTaskLayout";

export default function MyTaskLayout({
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
  return <MyTasksLayout filter={filter}>{children}</MyTasksLayout>;
}

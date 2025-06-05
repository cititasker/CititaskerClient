import MyTasksLayout from "@/components/layouts/MyTaskLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MyTasksLayout>{children}</MyTasksLayout>;
}

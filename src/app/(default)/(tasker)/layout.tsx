import { RoleGuard } from "@/components/guards/RoleGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuard allowedRoles={["tasker", "unauthenticated"]}>
      {children}
    </RoleGuard>
  );
}

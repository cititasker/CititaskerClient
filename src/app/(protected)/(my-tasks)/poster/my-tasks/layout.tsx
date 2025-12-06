import { RoleGuard } from "@/components/guards/RoleGuard";
import { ROLE } from "@/constant";

export default async function MyTaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RoleGuard allowedRoles={[ROLE.poster]}>{children}</RoleGuard>;
}

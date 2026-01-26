import { RoleGuard } from "@/components/guards/RoleGuard";
import { ROLE } from "@/constant";
import { generateLayoutMetadata } from "@/lib/metadata-helper";

export const metadata = generateLayoutMetadata({
  title: "My Tasks",
  noIndex: true,
});

export default async function MyTaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RoleGuard allowedRoles={[ROLE.poster]}>{children}</RoleGuard>;
}

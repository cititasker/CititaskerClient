"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface ConditionalRenderProps {
  children: ReactNode;
  roles?: ("poster" | "tasker")[];
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export function ConditionalRender({
  children,
  roles,
  requireAuth,
  requireGuest,
}: ConditionalRenderProps) {
  const { data: session } = useSession();

  const isAuthenticated = !!session;
  const userRole = session?.user?.role;

  // If requireGuest, only show for unauthenticated users
  if (requireGuest && isAuthenticated) return null;

  // If requireAuth, only show for authenticated users
  if (requireAuth && !isAuthenticated) return null;

  // If roles specified, only show for those roles
  if (roles && roles.length > 0) {
    if (!isAuthenticated || !userRole || !roles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import Loader from "../reusables/Loading";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: ("poster" | "tasker" | "unauthenticated")[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export function RoleGuard({
  children,
  allowedRoles = [],
  fallback,
  redirectTo,
}: RoleGuardProps) {
  const { session, status, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const userRole = session?.user?.role;

    // If unauthenticated is allowed and user is not logged in, allow access
    if (!isAuthenticated && allowedRoles.includes("unauthenticated")) {
      return;
    }

    // If user is logged in but role is not allowed
    if (isAuthenticated && userRole && !allowedRoles.includes(userRole)) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        const defaultRedirect =
          userRole === "poster" ? "/discovery-poster" : "/discovery-tasker";
        router.push(defaultRedirect);
      }
    }
  }, [session, status, isAuthenticated, allowedRoles, redirectTo, router]);

  // Loading state
  if (status === "loading") {
    return <Loader />;
  }

  const userRole = session?.user?.role;

  // Check if user has access
  const hasAccess =
    (!isAuthenticated && allowedRoles.includes("unauthenticated")) ||
    (isAuthenticated && userRole && allowedRoles.includes(userRole));

  if (!hasAccess) {
    return fallback || null;
  }

  return <>{children}</>;
}

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger";
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  onClick,
  children,
  className,
  variant = "default",
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-sm font-medium",
      variant === "default" &&
        "text-neutral-700 hover:text-primary-700 hover:bg-primary-50 active:bg-primary-100",
      variant === "danger" && "text-error hover:bg-error-light",
      className
    )}
  >
    {children}
  </Link>
);

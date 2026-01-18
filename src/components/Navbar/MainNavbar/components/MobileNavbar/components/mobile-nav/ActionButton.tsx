import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger";
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  className,
  variant = "default",
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all duration-200",
      variant === "default" &&
        "text-neutral-700 hover:text-primary-700 hover:bg-primary-50 active:bg-primary-100",
      variant === "danger" && "text-error hover:bg-error-light",
      className
    )}
  >
    {children}
  </button>
);

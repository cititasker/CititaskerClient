"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusType =
  | "open"
  | "assigned"
  | "completed"
  | "cancelled"
  | "successful"
  | "on_hold"
  | "failed"
  | "unverified"
  | "verified"
  | "pending"
  | "processing"
  | "active"
  | "inactive";

type StatusVariant = "success" | "warning" | "error" | "info";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

const STATUS_MAP: Record<
  StatusType,
  { variant: StatusVariant; label?: string }
> = {
  completed: { variant: "success" },
  successful: { variant: "success" },
  verified: { variant: "success" },
  active: { variant: "success" },
  assigned: { variant: "warning" },
  on_hold: { variant: "warning", label: "on hold" },
  unverified: { variant: "warning" },
  pending: { variant: "warning" },
  processing: { variant: "warning" },
  cancelled: { variant: "error" },
  failed: { variant: "error" },
  inactive: { variant: "error" },
  open: { variant: "info" },
};

const COLORS: Record<StatusVariant, string> = {
  success: "bg-success-light text-success border-success/20",
  warning: "bg-warning-light text-warning border-warning/20",
  error: "bg-error-light text-error border-error/20",
  info: "bg-primary-50 text-primary border-primary/20",
};

const DOT_COLORS: Record<StatusVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-primary",
};

const SIZES = {
  sm: "text-xs px-2 py-0.5 h-5",
  md: "text-xs px-2.5 py-1 h-6",
  lg: "text-sm px-3 py-1.5 h-7",
};

const DOT_SIZES = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showDot = false,
  size = "md",
  variant = "default",
}) => {
  const config = STATUS_MAP[status];
  if (!config) return null;

  const label = config.label || status.replace(/_/g, " ");
  const colors = COLORS[config.variant];
  const dotColor = DOT_COLORS[config.variant];

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-md cursor-default",
        SIZES[size],
        variant === "outline" && "bg-transparent border",
        variant === "filled" && "border-0",
        variant === "default" && "border",
        colors,
        className
      )}
    >
      {showDot && (
        <span className={cn("rounded-full", DOT_SIZES[size], dotColor)} />
      )}
      <span className="capitalize">{label}</span>
    </Badge>
  );
};

export default StatusBadge;

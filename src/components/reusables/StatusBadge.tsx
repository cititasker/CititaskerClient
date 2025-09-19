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

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

const STATUS_CONFIG: Record<
  StatusType,
  {
    colors: {
      bg: string;
      text: string;
      border: string;
      dot: string;
    };
    label?: string;
  }
> = {
  // Success states
  completed: {
    colors: {
      bg: "bg-success-light",
      text: "text-success-dark",
      border: "border-success/30",
      dot: "bg-success",
    },
  },
  successful: {
    colors: {
      bg: "bg-success-light",
      text: "text-success-dark",
      border: "border-success/30",
      dot: "bg-success",
    },
  },
  verified: {
    colors: {
      bg: "bg-success-light",
      text: "text-success-dark",
      border: "border-success/30",
      dot: "bg-success",
    },
  },
  active: {
    colors: {
      bg: "bg-success-light",
      text: "text-success-dark",
      border: "border-success/30",
      dot: "bg-success",
    },
  },

  // Warning states
  assigned: {
    colors: {
      bg: "bg-warning-light",
      text: "text-warning-dark",
      border: "border-warning/30",
      dot: "bg-warning",
    },
  },
  on_hold: {
    colors: {
      bg: "bg-warning-light",
      text: "text-warning-dark",
      border: "border-warning/30",
      dot: "bg-warning",
    },
    label: "on hold",
  },
  unverified: {
    colors: {
      bg: "bg-warning-light",
      text: "text-warning-dark",
      border: "border-warning/30",
      dot: "bg-warning",
    },
  },
  pending: {
    colors: {
      bg: "bg-warning-light",
      text: "text-warning-dark",
      border: "border-warning/30",
      dot: "bg-warning",
    },
  },
  processing: {
    colors: {
      bg: "bg-warning-light",
      text: "text-warning-dark",
      border: "border-warning/30",
      dot: "bg-warning",
    },
  },

  // Error states
  cancelled: {
    colors: {
      bg: "bg-error-light",
      text: "text-error-dark",
      border: "border-error/30",
      dot: "bg-error",
    },
  },
  failed: {
    colors: {
      bg: "bg-error-light",
      text: "text-error-dark",
      border: "border-error/30",
      dot: "bg-error",
    },
  },
  inactive: {
    colors: {
      bg: "bg-error-light",
      text: "text-error-dark",
      border: "border-error/30",
      dot: "bg-error",
    },
  },

  // Info states
  open: {
    colors: {
      bg: "bg-primary-50",
      text: "text-primary-700",
      border: "border-primary/30",
      dot: "bg-primary",
    },
  },
};

const SIZE_CONFIG = {
  sm: {
    badge: "text-xs px-2 py-0.5 h-5",
    dot: "w-1.5 h-1.5",
    gap: "gap-1",
  },
  md: {
    badge: "text-xs px-2.5 py-1 h-6",
    dot: "w-2 h-2",
    gap: "gap-1.5",
  },
  lg: {
    badge: "text-sm px-3 py-1.5 h-7",
    dot: "w-2.5 h-2.5",
    gap: "gap-2",
  },
} as const;

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showDot = false,
  size = "md",
  variant = "default",
}) => {
  const config = STATUS_CONFIG[status];
  const sizeConfig = SIZE_CONFIG[size];

  if (!config) {
    console.warn(`Unknown status: ${status}`);
    return null;
  }

  const displayLabel = config.label || status.replace(/_/g, " ");
  const { colors } = config;

  const badgeStyles = cn(
    // Base styles
    "inline-flex items-center font-medium rounded-full transition-colors cursor-default",
    sizeConfig.badge,
    sizeConfig.gap,

    // Variant styles
    variant === "outline" && "bg-transparent border",
    variant === "filled" && "border-0",
    variant === "default" && "border",

    // Color styles
    colors.bg,
    colors.text,
    colors.border,

    className
  );

  return (
    <Badge variant="outline" className={badgeStyles}>
      {showDot && (
        <span
          className={cn(
            "rounded-full flex-shrink-0",
            sizeConfig.dot,
            colors.dot
          )}
        />
      )}
      <span className="capitalize truncate">{displayLabel}</span>
    </Badge>
  );
};

export default StatusBadge;

// LoadingSpinner.tsx - Bonus component for better loading states
export const LoadingSpinner: React.FC<{
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
};

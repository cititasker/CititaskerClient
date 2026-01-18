import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CustomStatusProps {
  status: "successful" | "pending" | "failed";
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export const CustomStatusBadge: React.FC<CustomStatusProps> = ({
  status,
  label,
  className,
  showIcon = true,
}) => {
  const config = {
    successful: {
      icon: CheckCircle,
      text: "text-success",
      bg: "bg-success-light",
      border: "border-success/30",
      badgeLabel: "Successful",
    },
    pending: {
      icon: Clock,
      text: "text-warning",
      bg: "bg-warning-light",
      border: "border-warning/30",
      badgeLabel: "Pending",
    },
    failed: {
      icon: XCircle,
      text: "text-error",
      bg: "bg-error-light",
      border: "border-error/30",
      badgeLabel: "Failed",
    },
  };

  const { icon: Icon, text, bg, border, badgeLabel } = config[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        bg,
        text,
        border,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{label ?? badgeLabel}</span>
    </Badge>
  );
};

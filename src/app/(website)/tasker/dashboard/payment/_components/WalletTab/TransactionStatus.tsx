import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionStatusProps {
  status: "successful" | "on_hold" | "failed";
  className?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  className,
}) => {
  const config = {
    successful: {
      icon: CheckCircle,
      text: "Successful",
      className: "text-success bg-success-light",
    },
    on_hold: {
      icon: Clock,
      text: "On Hold",
      className: "text-warning bg-warning-light",
    },
    failed: {
      icon: XCircle,
      text: "Failed",
      className: "text-error bg-error-light",
    },
  };

  const { icon: Icon, text, className: statusClassName } = config[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        statusClassName,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );
};

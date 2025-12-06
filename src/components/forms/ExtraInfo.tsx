"use client";

import React from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { IInfoPrimary } from "@/constant/icons";

type InfoType = "info" | "success" | "warning" | "error";

interface ExtraInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: InfoType;
  icon?: React.ReactNode;
  showIcon?: boolean;
  compact?: boolean;
}

const INFO_CONFIG = {
  info: {
    icon: IInfoPrimary,
    bgColor: "bg-primary-100",
    borderColor: "border-primary-200",
    iconColor: "text-info",
    textColor: "text-info-dark",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-success-light",
    borderColor: "border-success/20",
    iconColor: "text-success",
    textColor: "text-success-dark",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning-light",
    borderColor: "border-warning/20",
    iconColor: "text-warning",
    textColor: "text-warning-dark",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-error-light",
    borderColor: "border-error/20",
    iconColor: "text-error",
    textColor: "text-error-dark",
  },
} as const;

const ExtraInfo: React.FC<ExtraInfoProps> = ({
  className,
  children,
  type = "info",
  icon: customIcon,
  showIcon = true,
  compact = true,
  ...props
}) => {
  const config = INFO_CONFIG[type];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        config.bgColor,
        config.borderColor,
        compact ? "p-4" : "p-4 sm:p-6",
        className
      )}
      {...props}
    >
      <div className={cn("flex gap-3", !showIcon && "justify-center")}>
        {showIcon && (
          <div className={cn("flex-shrink-0", compact ? "mt-0.5" : "mt-1")}>
            {customIcon || (
              <IconComponent
                className={cn(
                  config.iconColor,
                  compact ? "w-5 h-5" : "w-6 h-6"
                )}
              />
            )}
          </div>
        )}

        <div
          className={cn(
            "text-text-primary leading-relaxed text-left w-full",
            compact ? "text-sm" : "text-sm sm:text-base",
            !showIcon && "text-center"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExtraInfo;

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Info from "@/assets/icons/info-primary.svg";

interface BannerAlertProps {
  message: string | React.ReactNode;
  okText?: string;
  cancelText?: string;
  variant?: "default" | "warning" | "error" | "info" | "success";
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function BannerAlert({
  message,
  okText,
  cancelText,
  variant = "default",
  onAction,
  onClose,
  className,
  children,
}: BannerAlertProps) {
  const variantStyles = {
    default: "bg-light-primary-2 text-black-2",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
    error: "bg-red-50 border-red-300 text-red-800",
    info: "bg-blue-50 border-blue-300 text-blue-800",
    success: "bg-green-50 border-green-300 text-green-800",
  };

  return (
    <div
      className={cn(
        "w-full border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 rounded-md shadow-sm",
        variantStyles[variant],
        className
      )}
    >
      {/* Message */}
      <div className="flex items-start">
        <Info className="inline-block mr-2 size-5 shrink-0 mt-1" />
        <div className="text-sm leading-relaxed font-medium">{message}</div>
      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
        {children ?? (
          <>
            {onClose && (
              <Button
                size="lg"
                onClick={onClose}
                aria-label="Close alert"
                className="text-sm"
              >
                {cancelText || "Close"}
              </Button>
            )}

            {onAction && okText && (
              <Button
                size="lg"
                onClick={onAction}
                className="px-3 py-1.5 text-sm"
              >
                {okText}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

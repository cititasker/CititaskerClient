"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import FormButton from "@/components/forms/FormButton";
import { TaskAlert } from "../hooks/useTaskAlerts";
import ExtraInfo from "@/components/forms/ExtraInfo";

interface TaskAlertToastProps {
  alert: TaskAlert;
  onClose: () => void;
  index: number;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

export function TaskAlertToast({
  alert,
  onClose,
  index,
  autoClose = false,
  autoCloseDuration = 5000,
}: TaskAlertToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [autoClose, autoCloseDuration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <ExtraInfo
      className={cn(
        "w-full border shadow-lg rounded-lg overflow-hidden pointer-events-auto",
        "transition-all duration-300 ease-out",
        // alertStyles[alert.type],
        isVisible && !isExiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0",
        isExiting && "translate-x-full opacity-0"
      )}
      style={{
        transitionDelay: isVisible && !isExiting ? `${index * 50}ms` : "0ms",
      }}
    >
      <div className="relative w-full">
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="text-sm font-medium leading-relaxed pr-6">
            {alert.message}
          </div>

          {/* Action Button */}
          <FormButton
            size="lg"
            variant="default"
            onClick={alert.onAction}
            className="w-auto"
          >
            {alert.actionText}
          </FormButton>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={cn(
            "rounded-md p-1 transition-colors",
            "hover:bg-black/10 focus:outline-none",
            "absolute top-0 right-0"
          )}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </ExtraInfo>
  );
}

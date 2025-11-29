"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Info from "@/assets/icons/info-primary.svg";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { TaskAlert } from "../hooks/useTaskAlerts";

interface TaskAlertBannerProps {
  alert: TaskAlert;
  className?: string;
}

export default function TaskAlertBanner({
  alert,
  className,
}: TaskAlertBannerProps) {
  return (
    <div
      className={cn(
        "w-full border bg-light-primary-2 text-black-2",
        "flex items-start xs:items-center justify-between gap-3 px-4 py-3 rounded-md shadow-sm flex-col xs:flex-row",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <Info className="size-5 shrink-0 mt-0.5" />

        <div className="flex-1 min-w-0">
          <div className="text-sm leading-relaxed font-medium flex-1 min-w-0">
            {alert.message}
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <ActionsButtons
          size="lg"
          okText={alert.actionText}
          handleSubmit={alert.onAction}
        />
      </div>
    </div>
  );
}

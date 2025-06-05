"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface StatusChipProps {
  status: string;
  isActive: boolean;
}

const StatusChip: React.FC<StatusChipProps> = ({ status, isActive }) => {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-full border px-3 text-[10px] font-medium capitalize transition-colors",
        isActive
          ? "bg-primary text-white border-primary"
          : "bg-[hsl(var(--light-primary-1))] text-primary border-primary"
      )}
    >
      {status}
    </span>
  );
};

export default StatusChip;

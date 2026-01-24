"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDropdownProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  contentClassName?: string;
  align?: "start" | "center" | "end";
  side?: "left" | "top" | "right" | "bottom";
  sideOffset?: number;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  children,
  trigger,
  contentClassName,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  disabled = false,
  onOpenChange,
}) => {
  const defaultTrigger = (
    <div
      className={cn(
        "flex items-center gap-1 cursor-pointer hover:bg-neutral-100 rounded-md p-1 transition-colors",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <ChevronDown className="w-4 h-4" />
    </div>
  );

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        {trigger || defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "min-w-fit bg-white border border-neutral-200 rounded-md shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 z-50",
          contentClassName,
        )}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;

// Enhanced IconDropdown with focus management
export const IconDropdown = ({
  icon,
  children,
  className = "",
  disabled = false,
  onOpenChange,
  ...props
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
} & Omit<CustomDropdownProps, "trigger" | "children" | "onOpenChange">) => {
  const iconTrigger = (
    <div
      className={cn(
        "h-8 w-8 p-0 rounded-md hover:bg-neutral-100 transition-colors flex items-center justify-center cursor-pointer",
        "focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-1",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {icon}
    </div>
  );

  return (
    <CustomDropdown
      trigger={iconTrigger}
      disabled={disabled}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </CustomDropdown>
  );
};

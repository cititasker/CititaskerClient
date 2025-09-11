"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Calendar,
  X,
  Copy,
  RefreshCw,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface OptionItem {
  text: string;
  name: string;
  disabled?: boolean;
  type?: "default" | "destructive" | "primary";
  customIcon?: React.ReactNode;
}

interface MoreOptionsMenuProps {
  moreOptions: { text: string; name: string }[];
  onSelect?: (item: { text: string; name: string }) => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

// Icon mapping for different option types
const getOptionIcon = (name: string) => {
  const iconMap = {
    reschedule: <Calendar className="w-4 h-4" />,
    "cancel-task": <X className="w-4 h-4" />,
    "similar-task": <Copy className="w-4 h-4" />,
    refund: <CreditCard className="w-4 h-4" />,
    help: <HelpCircle className="w-4 h-4" />,
    refresh: <RefreshCw className="w-4 h-4" />,
  };

  return iconMap[name as keyof typeof iconMap] || null;
};

// Style variants for different option types
const getOptionStyle = (name: string) => {
  const destructiveOptions = ["cancel-task", "delete", "remove"];

  if (destructiveOptions.includes(name)) {
    return "text-destructive hover:text-destructive hover:bg-destructive/10";
  }

  return "text-text-primary hover:bg-background-secondary";
};

export default function MoreOptionsMenu({
  moreOptions,
  onSelect,
  className,
  variant = "outline",
  size = "default",
}: MoreOptionsMenuProps) {
  // Group options for better organization
  const primaryOptions = moreOptions.filter((opt) =>
    ["reschedule", "similar-task"].includes(opt.name)
  );

  const secondaryOptions = moreOptions.filter((opt) =>
    ["refund", "help"].includes(opt.name)
  );

  const destructiveOptions = moreOptions.filter((opt) =>
    ["cancel-task"].includes(opt.name)
  );

  const renderMenuItem = (option: { text: string; name: string }) => (
    <DropdownMenuItem
      key={option.name}
      onSelect={() => onSelect?.(option)}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-150",
        "focus:outline-none focus:ring-0",
        getOptionStyle(option.name)
      )}
    >
      {getOptionIcon(option.name)}
      <span className="font-medium text-sm">{option.text}</span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            // Remove justify-between to prevent text from stretching
            "justify-center font-medium transition-all duration-200 min-w-0",
            variant === "outline" && [
              "border-border-light hover:border-border-medium",
              "hover:bg-background-secondary text-text-primary",
              "hover:shadow-sm",
            ],
            variant === "ghost" && [
              "hover:bg-background-secondary text-text-primary",
            ],
            // Ensure the button fills container properly
            "w-full flex items-center gap-2",
            className
          )}
        >
          <span className="truncate">More Options</span>
          {/* <MoreHorizontal className="w-4 h-4 flex-shrink-0" /> */}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "min-w-[200px] bg-background border-border-light shadow-lg",
          "rounded-lg p-1 animate-in fade-in-0 zoom-in-95"
        )}
        align="end"
        sideOffset={4}
      >
        {/* Primary Actions */}
        {primaryOptions.map(renderMenuItem)}

        {primaryOptions.length > 0 &&
          (secondaryOptions.length > 0 || destructiveOptions.length > 0) && (
            <DropdownMenuSeparator className="bg-border-light my-1" />
          )}

        {/* Secondary Actions */}
        {secondaryOptions.map(renderMenuItem)}

        {secondaryOptions.length > 0 && destructiveOptions.length > 0 && (
          <DropdownMenuSeparator className="bg-border-light my-1" />
        )}

        {/* Destructive Actions */}
        {destructiveOptions.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

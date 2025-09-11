"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Calendar,
  X,
  Copy,
  RefreshCw,
  HelpCircle,
  CreditCard,
  Edit,
  Trash,
  Archive,
  Download,
  Share,
  Eye,
  Settings,
  Star,
  Heart,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface OptionItem {
  text: string;
  name: string;
  disabled?: boolean;
  type?: "default" | "destructive" | "primary";
  customIcon?: React.ReactNode;
}

export interface OptionGroup {
  label?: string;
  items: OptionItem[];
}

interface MoreOptionsMenuProps {
  /** Array of option items or option groups */
  options: OptionItem[] | OptionGroup[];
  /** Callback when an option is selected */
  onSelect?: (item: OptionItem) => void;
  /** Additional className for the trigger button */
  className?: string;
  /** Button variant */
  variant?: "default" | "outline" | "ghost" | "secondary";
  /** Button size */
  size?: "default" | "sm" | "lg";
  /** Custom trigger text */
  triggerText?: string;
  /** Custom trigger icon */
  triggerIcon?: React.ReactNode;
  /** Disable the menu */
  disabled?: boolean;
  /** Align dropdown */
  align?: "start" | "center" | "end";
  /** Side offset for dropdown */
  sideOffset?: number;
}

// Enhanced icon mapping for different option types
const getOptionIcon = (name: string, customIcon?: React.ReactNode) => {
  if (customIcon) return customIcon;

  const iconMap = {
    // Actions
    reschedule: <Calendar className="w-4 h-4" />,
    edit: <Edit className="w-4 h-4" />,
    copy: <Copy className="w-4 h-4" />,
    share: <Share className="w-4 h-4" />,
    download: <Download className="w-4 h-4" />,
    view: <Eye className="w-4 h-4" />,
    settings: <Settings className="w-4 h-4" />,

    // Favorites/Bookmarks
    favorite: <Star className="w-4 h-4" />,
    like: <Heart className="w-4 h-4" />,
    bookmark: <Bookmark className="w-4 h-4" />,

    // Status changes
    archive: <Archive className="w-4 h-4" />,
    refresh: <RefreshCw className="w-4 h-4" />,

    // Task-specific
    "similar-task": <Copy className="w-4 h-4" />,
    "post-similar": <Copy className="w-4 h-4" />,

    // Support
    refund: <CreditCard className="w-4 h-4" />,
    help: <HelpCircle className="w-4 h-4" />,
    support: <HelpCircle className="w-4 h-4" />,

    // Destructive actions
    "cancel-task": <X className="w-4 h-4" />,
    cancel: <X className="w-4 h-4" />,
    delete: <Trash className="w-4 h-4" />,
    remove: <Trash className="w-4 h-4" />,
  };

  return iconMap[name as keyof typeof iconMap] || null;
};

// Style variants for different option types
const getOptionStyle = (item: OptionItem) => {
  const { type = "default", disabled = false } = item;

  if (disabled) {
    return "text-text-muted cursor-not-allowed opacity-50";
  }

  switch (type) {
    case "destructive":
      return "text-destructive hover:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive";
    case "primary":
      return "text-primary hover:text-primary hover:bg-primary/10 focus:bg-primary/10 focus:text-primary";
    default:
      return "text-text-primary hover:bg-background-secondary focus:bg-background-secondary";
  }
};

// Determine if options array contains groups
const isOptionGroups = (
  options: OptionItem[] | OptionGroup[]
): options is OptionGroup[] => {
  return options.length > 0 && "items" in options[0];
};

// Normalize options to always work with groups
const normalizeOptions = (
  options: OptionItem[] | OptionGroup[]
): OptionGroup[] => {
  if (isOptionGroups(options)) {
    return options;
  }
  return [{ items: options }];
};

export default function MoreOptionsMenu({
  options,
  onSelect,
  className,
  variant = "outline",
  size = "default",
  triggerText = "More Options",
  triggerIcon,
  disabled = false,
  align = "end",
  sideOffset = 4,
}: MoreOptionsMenuProps) {
  const normalizedOptions = normalizeOptions(options);

  const renderMenuItem = (item: OptionItem) => (
    <DropdownMenuItem
      key={item.name}
      onSelect={() => !item.disabled && onSelect?.(item)}
      disabled={item.disabled}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-150",
        "focus:outline-none focus:ring-0",
        getOptionStyle(item)
      )}
    >
      {getOptionIcon(item.name, item.customIcon)}
      <span className="font-medium text-sm flex-1">{item.text}</span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          className={cn(
            "justify-between font-medium transition-all duration-200",
            variant === "outline" && [
              "border-border-light hover:border-border-medium",
              "hover:bg-background-secondary text-text-primary",
              "hover:shadow-sm",
            ],
            variant === "ghost" && [
              "hover:bg-background-secondary text-text-primary",
            ],
            variant === "secondary" && [
              "bg-background-secondary hover:bg-background-secondary/80 text-text-primary",
            ],
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <span>{triggerText}</span>
          {triggerIcon || <MoreHorizontal className="w-4 h-4 ml-2" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "min-w-[200px] bg-background border-border-light shadow-lg",
          "rounded-lg p-1 animate-in fade-in-0 zoom-in-95"
        )}
        align={align}
        sideOffset={sideOffset}
      >
        {normalizedOptions.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {/* Group label */}
            {group.label && (
              <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                {group.label}
              </DropdownMenuLabel>
            )}

            {/* Group items */}
            {group.items.map(renderMenuItem)}

            {/* Separator between groups (not after last group) */}
            {groupIndex < normalizedOptions.length - 1 && (
              <DropdownMenuSeparator className="bg-border-light my-1" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Convenience function to create common task option groups
export const createTaskOptions = (taskStatus: string): OptionGroup[] => {
  const isOpen = taskStatus === "open";
  const isCompleted = taskStatus === "completed";
  const isCancelled = taskStatus === "cancelled";

  return [
    {
      label: "Actions",
      items: [
        {
          text: "Reschedule Task",
          name: "reschedule",
          disabled: isCancelled || isCompleted,
        },
        {
          text: "Post Similar Task",
          name: "similar-task",
        },
      ],
    },
    {
      label: "Support",
      items: [
        {
          text: "Refund Details",
          name: "refund",
          disabled: !isCompleted,
        },
        {
          text: "Help",
          name: "help",
        },
      ],
    },
    {
      label: "Manage",
      items: [
        {
          text: "Cancel Task",
          name: "cancel-task",
          type: "destructive",
          disabled: isCancelled || isCompleted,
        },
      ],
    },
  ];
};

// Export types for consumers
// export type { OptionItem, OptionGroup };

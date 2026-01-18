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
import { cn } from "@/lib/utils";

interface MoreOptionsMenuProps {
  moreOptions: MoreOptionItem[];
  onSelect?: (item: { text: string; name: string }) => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  align?: "end" | "center" | "start" | undefined;
}

const getOptionStyle = (type?: string) => {
  switch (type) {
    case "destructive":
      return "text-destructive hover:text-destructive hover:bg-destructive/10";
    case "primary":
      return "text-primary hover:bg-primary/10";
    default:
      return "text-text-primary hover:bg-background-secondary";
  }
};

export default function MoreOptionsMenu({
  moreOptions,
  onSelect,
  className,
  variant = "outline",
  size = "default",
  align = "end",
}: MoreOptionsMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const groupedOptions = {
    primary: moreOptions.filter((opt) => opt.type === "primary"),
    default: moreOptions.filter((opt) => !opt.type || opt.type === "default"),
    destructive: moreOptions.filter((opt) => opt.type === "destructive"),
  };

  const handleOptionSelect = (option: MoreOptionItem) => {
    // Close dropdown immediately before triggering action
    setIsOpen(false);

    // Use setTimeout to ensure dropdown closes before dialog opens
    setTimeout(() => {
      onSelect?.(option);
    }, 100);
  };

  const renderMenuItem = (option: MoreOptionItem) => (
    <DropdownMenuItem
      key={option.name}
      onSelect={() => handleOptionSelect(option)}
      className={cn(
        "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-150",
        "focus:outline-none focus:ring-0",
        getOptionStyle(option.type),
        option.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
    >
      {option.customIcon && <option.customIcon className="w-4 h-4" />}
      <span className="font-medium text-sm">{option.text}</span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "justify-center font-medium transition-all duration-200 min-w-0",
            variant === "outline" && [
              "border-border-light hover:border-border-medium",
              "hover:bg-background-secondary text-text-primary",
              "hover:shadow-sm",
            ],
            variant === "ghost" && [
              "hover:bg-background-secondary text-text-primary",
            ],
            "w-full flex items-center gap-2",
            className
          )}
        >
          <span className="truncate">More Options</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "w-[var(--radix-dropdown-menu-trigger-width)] bg-background border-border-light shadow-lg",
          "rounded-lg p-1 animate-in fade-in-0 zoom-in-95"
        )}
        align={align}
        sideOffset={2}
      >
        {groupedOptions.primary.map(renderMenuItem)}

        {groupedOptions.primary.length > 0 &&
          (groupedOptions.default.length > 0 ||
            groupedOptions.destructive.length > 0) && (
            <DropdownMenuSeparator className="bg-border-light my-1" />
          )}

        {groupedOptions.default.map(renderMenuItem)}

        {groupedOptions.default.length > 0 &&
          groupedOptions.destructive.length > 0 && (
            <DropdownMenuSeparator className="bg-border-light my-1" />
          )}

        {groupedOptions.destructive.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

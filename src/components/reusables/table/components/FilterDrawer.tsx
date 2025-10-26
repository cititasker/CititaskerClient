"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColumnFiltersState } from "@tanstack/react-table";

interface FilterDrawerProps {
  // Filter state
  filters?: ColumnFiltersState;
  onFiltersChange?: (filters: ColumnFiltersState) => void;

  // UI customization
  title?: string;
  description?: string;
  triggerText?: string;
  triggerIcon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;

  // Trigger customization
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  triggerSize?: "default" | "sm" | "lg";
  disabled?: boolean;

  // Children - flexible content
  children: React.ReactNode;

  // Open state control (optional - for external control)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const FilterDrawer = ({
  filters = [],
  // onFiltersChange,
  title = "Filter Options",
  description = "Customize your search filters",
  triggerText = "Filters",
  triggerIcon,
  className,
  triggerClassName,
  triggerVariant = "outline",
  triggerSize = "lg",
  disabled = false,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: FilterDrawerProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled or internal state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? controlledOnOpenChange || (() => {})
    : setInternalOpen;

  // Calculate active filters count for badge
  const activeFiltersCount = filters.length;

  // Default icon
  const defaultIcon = triggerIcon || <Filter className="w-4 h-4 mr-2" />;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          disabled={disabled}
          className={cn("relative", triggerClassName)}
        >
          {defaultIcon}
          {triggerText}
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 bg-primary text-primary-foreground"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn("w-full sm:max-w-md overflow-y-auto", className)}
      >
        <SheetHeader className="pb-6">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div className="flex-1">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;

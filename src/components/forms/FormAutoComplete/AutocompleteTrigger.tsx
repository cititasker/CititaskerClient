import React from "react";
import { Button } from "@/components/ui/button";
import { PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, X, Loader } from "lucide-react";

interface AutocompleteTriggerProps {
  selectedLabel?: string;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  hasError?: boolean;
  open?: boolean;
  clearable?: boolean;
  hasValue?: boolean;
  size?: "sm" | "md" | "lg";
  onClear?: (event: React.MouseEvent) => void;
  label?: string;
}

const SIZE_CONFIG = {
  sm: { trigger: "h-10 text-sm px-3" },
  md: { trigger: "h-12 text-sm px-4" },
  lg: { trigger: "h-14 text-lg px-5" },
} as const;

export function AutocompleteTrigger({
  selectedLabel,
  placeholder,
  disabled = false,
  loading = false,
  hasError = false,
  open = false,
  clearable = false,
  hasValue = false,
  size = "md",
  onClear,
  label,
}: AutocompleteTriggerProps) {
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label || "Select option"}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          "w-full justify-between font-normal transition-all duration-200",
          "border border-input bg-background hover:bg-neutral-50 focus:border-ring hover:border-border-medium",
          "text-left rounded-xl shadow-none",

          // Size variants
          sizeConfig.trigger,

          // State variants
          !hasValue && "text-text-muted",
          hasError && "border-error focus:border-error focus:ring-error",
          disabled && "opacity-50 cursor-not-allowed bg-neutral-50",
          loading && "cursor-wait",
          open &&
            !hasError &&
            "border-primary shadow-sm ring-0 ring-primary/20",

          // Selected state
          hasValue && "text-text-primary"
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {loading && (
            <Loader className="h-4 w-4 animate-spin text-text-muted flex-shrink-0" />
          )}

          <span className="truncate">
            {loading ? "Loading..." : selectedLabel || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {clearable && hasValue && !disabled && !loading && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="p-1 hover:bg-neutral-200 rounded transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-3 w-3 text-text-muted" />
            </button>
          )}

          <ChevronDown
            className={cn(
              "h-4 w-4 text-text-muted transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </div>
      </Button>
    </PopoverTrigger>
  );
}

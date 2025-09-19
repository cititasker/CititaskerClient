"use client";

import React, { useState, useEffect } from "react";
import {
  useFormContext,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, Search, X, Loader } from "lucide-react";
import FormError from "../reusables/FormError";

interface FormAutoCompleteProps<TOption, TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  options: TOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue?: (option: TOption) => string | number;
  isOptionEqualToValue?: (a: TOption, b: TOption) => boolean;
  onChange?: (value: TOption | null) => void;
  renderOption?: (
    props: any,
    option: TOption,
    selected: boolean
  ) => React.ReactNode;
  loading?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  emptyMessage?: string;
  maxHeight?: number;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_CONFIG = {
  sm: {
    trigger: "h-10 text-sm px-3",
    input: "text-sm py-2",
    option: "px-3 py-2 text-sm",
  },
  md: {
    trigger: "h-12 text-sm px-4",
    input: "text-sm py-3",
    option: "px-4 py-3 text-sm",
  },
  lg: {
    trigger: "h-14 text-lg px-5",
    input: "text-base py-4",
    option: "px-5 py-4 text-base",
  },
} as const;

export function FormAutoComplete<TOption, TFieldValues extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option...",
  disabled = false,
  className,
  getOptionLabel,
  getOptionValue,
  isOptionEqualToValue = (a, b) => a === b,
  onChange,
  renderOption,
  loading = false,
  searchable = true,
  clearable = false,
  emptyMessage = "No results found.",
  maxHeight = 200,
  required = false,
  size = "md",
}: FormAutoCompleteProps<TOption, TFieldValues>) {
  const { control, formState } = useFormContext<TFieldValues>();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sizeConfig = SIZE_CONFIG[size];
  const hasError = !!formState.errors[name];

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery || !searchable) return options;

    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, getOptionLabel, searchable]);

  // Reset search when closing
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  const handleClear = (field: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    field.onChange(null);
    if (onChange) onChange(null);
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {/* Label */}
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            "text-sm font-medium text-text-secondary",
            required && "after:content-['*'] after:text-error after:ml-1"
          )}
        >
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = options.find((opt) =>
            isOptionEqualToValue(opt, field.value)
          );
          const selectedLabel = selected ? getOptionLabel(selected) : "";

          return (
            <Popover open={open} onOpenChange={setOpen}>
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
                    "focus-visible:ring-ring ring-offset-1",

                    // Size variants
                    sizeConfig.trigger,

                    // State variants
                    !field.value && "text-text-muted",
                    hasError &&
                      "border-error focus:border-error focus:ring-error",
                    disabled && "opacity-50 cursor-not-allowed bg-neutral-50",
                    loading && "cursor-wait",
                    open &&
                      !hasError &&
                      "border-primary shadow-sm ring-1 ring-primary/20",

                    // Selected state
                    field.value && "text-text-primary"
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
                    {clearable && field.value && !disabled && !loading && (
                      <button
                        type="button"
                        onClick={(e) => handleClear(field, e)}
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

              <PopoverContent
                side="bottom"
                align="start"
                className={cn(
                  "w-[var(--radix-popover-trigger-width)] p-0 z-50",
                  "bg-background border border-neutral-200 shadow-xl rounded-xl"
                )}
              >
                <Command className="rounded-xl">
                  {/* Search Input */}
                  {searchable && (
                    <div className="flex items-center border-b border-neutral-100 px-3">
                      <Search className="h-4 w-4 text-text-muted mr-2 flex-shrink-0" />
                      <CommandInput
                        placeholder={`Search ${
                          label?.toLowerCase() || "options"
                        }...`}
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        className={cn(
                          "border-none focus:ring-0 bg-transparent placeholder:text-text-muted",
                          "text-text-primary py-3 px-0 text-sm"
                        )}
                      />
                    </div>
                  )}

                  {/* Options List */}
                  <CommandList
                    className="overflow-y-auto"
                    style={{ maxHeight: `${maxHeight}px` }}
                  >
                    {/* Empty State */}
                    <CommandEmpty className="py-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-text-muted opacity-50" />
                        <p className="text-sm text-text-muted">
                          {emptyMessage}
                        </p>
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="text-xs text-primary hover:underline"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </CommandEmpty>

                    {/* Options */}
                    {filteredOptions.map((option, index) => {
                      const isSelected =
                        selected && isOptionEqualToValue(option, selected);
                      const optionLabel = getOptionLabel(option);
                      const optionValue = getOptionValue
                        ? getOptionValue(option)
                        : optionLabel;

                      return (
                        <CommandItem
                          key={`${optionValue}-${index}`}
                          value={optionLabel}
                          onSelect={() => {
                            const newValue = isSelected ? null : option;
                            field.onChange(newValue);
                            if (onChange) onChange(newValue);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between cursor-pointer transition-colors duration-150",
                            "hover:bg-neutral-50 text-text-primary",
                            sizeConfig.option,
                            isSelected &&
                              "bg-primary-50 text-primary-700 hover:bg-primary-50"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            {renderOption ? (
                              renderOption(
                                { className: "w-full" },
                                option,
                                !!isSelected
                              )
                            ) : (
                              <span className="truncate font-medium">
                                {optionLabel}
                              </span>
                            )}
                          </div>

                          {isSelected && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0 ml-3" />
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {/* Error Message */}
      <FormError name={name} />
    </div>
  );
}

// Export default for easier imports
export default FormAutoComplete;

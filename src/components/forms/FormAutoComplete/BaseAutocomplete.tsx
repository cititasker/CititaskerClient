import React, { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X, Loader2 } from "@/components/icons/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BaseAutocompleteProps<TOption> {
  options: TOption[];
  value?: TOption | null;
  onValueChange: (value: TOption | null) => void;
  getOptionLabel: (option: TOption) => string;
  getOptionValue?: (option: TOption) => string | number;
  isOptionEqualToValue?: (a: TOption, b: TOption) => boolean;
  renderOption?: (
    props: any,
    option: TOption,
    selected: boolean
  ) => React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  hasError?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  emptyMessage?: string;
  maxHeight?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function BaseAutocomplete<TOption>({
  options,
  value,
  onValueChange,
  getOptionLabel,
  getOptionValue,
  isOptionEqualToValue = (a, b) => a === b,
  renderOption,
  placeholder = "Select an option...",
  disabled = false,
  loading = false,
  hasError = false,
  searchable = true,
  clearable = false,
  emptyMessage = "No results found.",
  maxHeight = 200,
  size = "md",
  label,
  className,
}: BaseAutocompleteProps<TOption>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-12",
    lg: "h-14 text-lg",
  };

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
    } else if (searchable && inputRef.current) {
      // Focus input when opening
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, searchable]);

  const selected = options.find((opt) =>
    value ? isOptionEqualToValue(opt, value) : false
  );
  const selectedLabel = selected ? getOptionLabel(selected) : "";
  const hasValue = Boolean(value);

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange(null);
  };

  const handleOptionSelect = (option: TOption) => {
    const isSelected = selected && isOptionEqualToValue(option, selected);
    onValueChange(isSelected ? null : option);
    setOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal",
              sizeClasses[size],
              hasError && "border-error",
              !hasValue && "text-muted-foreground"
            )}
          >
            <span className="truncate">{selectedLabel || placeholder}</span>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {clearable && hasValue && !loading && (
                <X
                  className="h-4 w-4 opacity-50 hover:opacity-100"
                  onClick={handleClear}
                />
              )}
              {!loading && <ChevronsUpDown className="h-4 w-4 opacity-50" />}
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <div className="flex flex-col">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b">
                <Input
                  ref={inputRef}
                  placeholder={`Search ${label || "options"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9"
                />
              </div>
            )}

            {/* Options List */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected =
                    selected && isOptionEqualToValue(option, selected);
                  const optionLabel = getOptionLabel(option);

                  if (renderOption) {
                    return renderOption(
                      {
                        key: getOptionValue
                          ? getOptionValue(option)
                          : `${optionLabel}-${index}`,
                        onClick: () => handleOptionSelect(option),
                      },
                      option,
                      !!isSelected
                    );
                  }

                  return (
                    <button
                      key={
                        getOptionValue
                          ? getOptionValue(option)
                          : `${optionLabel}-${index}`
                      }
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm",
                        "hover:bg-accent cursor-pointer transition-colors",
                        isSelected && "bg-accent"
                      )}
                    >
                      <span className="truncate">{optionLabel}</span>
                      <Check
                        className={cn(
                          "h-4 w-4 flex-shrink-0",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

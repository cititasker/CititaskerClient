import React, { useState, useEffect } from "react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Command, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { AutocompleteTrigger } from "./AutocompleteTrigger";
import { AutocompleteSearch } from "./AutocompleteSearch";
import { AutocompleteEmptyState } from "./AutocompleteEmptyState";
import { AutocompleteOption } from "./AutocompleteOption";

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

  // UI Props
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

  const selected = options.find((opt) =>
    value ? isOptionEqualToValue(opt, value) : false
  );
  const selectedLabel = selected ? getOptionLabel(selected) : "";
  const hasValue = Boolean(value);

  const handleClear = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onValueChange(null);
  };

  const handleOptionSelect = (option: TOption) => {
    const isSelected = selected && isOptionEqualToValue(option, selected);
    const newValue = isSelected ? null : option;
    onValueChange(newValue);
    setOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <AutocompleteTrigger
          selectedLabel={selectedLabel}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          hasError={hasError}
          open={open}
          clearable={clearable}
          hasValue={hasValue}
          size={size}
          onClear={handleClear}
          label={label}
        />

        <PopoverContent
          side="bottom"
          align="start"
          className={cn(
            "w-[var(--radix-popover-trigger-width)] p-0 z-50",
            "bg-background border border-neutral-200 shadow-xl rounded-xl"
          )}
        >
          <Command className="rounded-xl">
            <AutocompleteSearch
              searchable={searchable}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              label={label}
              size={size}
            />

            <CommandList
              className="overflow-y-auto"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              <AutocompleteEmptyState
                emptyMessage={emptyMessage}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
              />

              {filteredOptions.map((option, index) => {
                const isSelected =
                  selected && isOptionEqualToValue(option, selected);

                return (
                  <AutocompleteOption
                    key={`${
                      getOptionValue
                        ? getOptionValue(option)
                        : getOptionLabel(option)
                    }-${index}`}
                    option={option}
                    isSelected={!!isSelected}
                    onSelect={handleOptionSelect}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    renderOption={renderOption}
                    size={size}
                    index={index}
                  />
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

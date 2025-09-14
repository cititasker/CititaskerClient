"use client";

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
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import FormError from "../reusables/FormError";

interface FormAutoCompleteProps<TOption, TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  options: TOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  getOptionLabel: (option: TOption) => string;
  isOptionEqualToValue?: (a: TOption, b: TOption) => boolean;
  onChange?: (value: TOption | null) => void;
  renderOption?: (option: TOption, selected: boolean) => React.ReactNode;
  loading?: boolean;
}

export function FormAutoComplete<TOption, TFieldValues extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option...",
  disabled,
  className,
  getOptionLabel,
  isOptionEqualToValue = (a, b) => a === b,
  onChange,
  renderOption,
  loading = false,
}: FormAutoCompleteProps<TOption, TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-2 flex-1 w-full", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}

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
                  disabled={disabled || loading}
                  className={cn(
                    "w-full justify-between font-normal h-12 focus:ring-2 focus:ring-ring",
                    "border-input focus:border-ring",
                    "!bg-background text-text-primary placeholder:text-text-muted",
                    "text-left px-4 rounded-xl shadow-none",
                    !field.value && "text-text-muted",
                    disabled && "opacity-50 cursor-not-allowed",
                    open && "border-primary-200"
                  )}
                >
                  <span className="truncate">
                    {loading ? "Loading..." : selectedLabel || placeholder}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-text-muted transition-transform duration-200 flex-shrink-0 ml-2",
                      open && "rotate-180"
                    )}
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                align="start"
                className={cn(
                  "w-[var(--radix-popover-trigger-width)] p-0",
                  "bg-background border-border-light shadow-lg rounded-xl"
                )}
              >
                <Command className="rounded-xl">
                  <CommandInput
                    placeholder={`Search ${
                      label?.toLowerCase() || "options"
                    }...`}
                    className="border-none focus:ring-0 text-sm pl-0 pr-4 py-3"
                  />

                  <CommandEmpty className="py-4 text-center text-sm text-text-muted">
                    No results found.
                  </CommandEmpty>

                  <CommandList className="max-h-48 overflow-y-auto">
                    {options.map((option, index) => {
                      const isSelected =
                        selected && isOptionEqualToValue(option, selected);
                      const label = getOptionLabel(option);

                      return (
                        <CommandItem
                          key={index}
                          value={label}
                          onSelect={() => {
                            field.onChange(option);
                            if (onChange) onChange(option);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 cursor-pointer",
                            "hover:bg-background-secondary text-text-primary",
                            "transition-colors duration-150",
                            isSelected && "bg-primary-50 text-primary"
                          )}
                        >
                          <div className="flex-1 truncate">
                            {renderOption
                              ? renderOption(option, !!isSelected)
                              : label}
                          </div>

                          {isSelected && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0 ml-2" />
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

      <FormError name={name} />
    </div>
  );
}

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
}

export function FormAutoComplete<TOption, TFieldValues extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select...",
  disabled,
  className,
  getOptionLabel,
  isOptionEqualToValue = (a, b) => a === b,
  onChange,
  renderOption,
}: FormAutoCompleteProps<TOption, TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-1 flex-1 w-full", className)}>
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
                  size="default"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    "w-full justify-between font-normal hover:bg-transparent shadow-none rounded-[40px]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {selectedLabel || placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className="w-[var(--radix-popover-trigger-width)] p-0"
              >
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandList>
                    {options.map((option, index) => {
                      const isSelected =
                        selected && isOptionEqualToValue(option, selected);
                      return (
                        <CommandItem
                          key={index}
                          value={getOptionLabel(option)}
                          onSelect={() => {
                            field.onChange(option);
                            if (onChange) onChange(option);
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          {renderOption
                            ? renderOption(option, !!isSelected)
                            : getOptionLabel(option)}
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

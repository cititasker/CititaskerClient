import React from "react";
import { useFormContext, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { BaseAutocomplete } from "./BaseAutocomplete";

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
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && (
            <FormLabel
              className={cn(
                "text-sm font-medium text-text-secondary",
                required && "after:content-['*'] after:text-error after:ml-1"
              )}
            >
              {label}
            </FormLabel>
          )}

          <FormControl>
            <BaseAutocomplete
              options={options}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isOptionEqualToValue={isOptionEqualToValue}
              renderOption={renderOption}
              placeholder={placeholder}
              disabled={disabled}
              loading={loading}
              hasError={!!fieldState.error}
              searchable={searchable}
              clearable={clearable}
              emptyMessage={emptyMessage}
              maxHeight={maxHeight}
              size={size}
              label={label}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormAutoComplete;

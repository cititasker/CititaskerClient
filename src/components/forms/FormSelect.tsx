"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface FormSelectProps {
  options: SelectOption[];
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  triggerClassName?: string;
  renderOption?: (option: SelectOption) => React.ReactNode;
}

export default function FormSelect({
  options,
  name,
  label,
  required = false,
  placeholder = "Select an option",
  className,
  disabled = false,
  renderOption,
  triggerClassName,
}: FormSelectProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          {label && (
            <FormLabel
              htmlFor={name}
              className="text-sm font-medium text-text-primary"
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </FormLabel>
          )}

          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(
                "w-full h-12 px-4 rounded-xl border transition-all duration-200",
                "bg-background text-text-primary",
                "border-border-light hover:border-border-medium",
                "focus:outline-none focus:border-ring",
                "data-[state=open]:border-ring data-[state=open]:ring-0 data-[state=open]:ring-ring/30",
                error && "border-error focus:border-error",
                disabled && "cursor-not-allowed",
                !field.value && "text-text-muted",
                triggerClassName
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="bg-background border-border-light rounded-xl shadow-lg max-h-60">
              {options.map((option) =>
                renderOption ? (
                  renderOption(option)
                ) : (
                  <SelectItem
                    key={option.id}
                    value={String(option.id)}
                    disabled={option.disabled}
                    className={cn(
                      "px-4 py-2.5 text-sm text-text-primary cursor-pointer",
                      "hover:bg-background-secondary focus:bg-primary-50 focus:text-primary",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {option.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

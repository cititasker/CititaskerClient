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
import { ChevronDown } from "lucide-react";

interface SelectOption {
  id: string | number;
  name: string;
  disabled?: boolean;
}

interface FormSelectProps {
  options: SelectOption[];
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function FormSelect({
  options,
  name,
  label,
  required = false,
  placeholder = "Select an option",
  className,
  disabled = false,
}: FormSelectProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
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
                // Base styles
                "w-full h-12 px-4 text-base rounded-xl border transition-all duration-200",
                "bg-background text-text-primary",
                "focus:outline-none",

                // Border states
                error
                  ? "border-error focus:border-error"
                  : "border-border-light focus:border-primary hover:border-border-medium",

                // State styles
                disabled &&
                  "opacity-50 cursor-not-allowed bg-background-secondary",
                !field.value && "text-text-muted"
              )}
            >
              <SelectValue placeholder={placeholder} />
              {/* <ChevronDown className="h-4 w-4 opacity-50" /> */}
            </SelectTrigger>

            <SelectContent className="bg-background border-border-light rounded-xl shadow-lg max-h-60">
              {options.map((option) => (
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
              ))}
            </SelectContent>
          </Select>

          <FormMessage className="text-error text-sm" />
        </FormItem>
      )}
    />
  );
}

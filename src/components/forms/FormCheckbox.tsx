"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { ReactNode } from "react";

interface FormCheckboxProps {
  name: string;
  label: ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function FormCheckbox({
  name,
  label,
  className,
  disabled = false,
  required = false,
}: FormCheckboxProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          <div className="flex items-start gap-3 group">
            <Checkbox
              id={name}
              checked={field.value || false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={cn(
                "mt-0.5 transition-all duration-200",
                "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
                "focus:ring-0 focus:ring-primary/20",
                error && "border-error",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            <Label
              htmlFor={name}
              className={cn(
                "text-sm leading-relaxed cursor-pointer text-text-primary",
                "group-hover:text-text-secondary transition-colors duration-200",
                disabled && "opacity-50 cursor-not-allowed",
                required && "after:content-['*'] after:text-error after:ml-1"
              )}
            >
              {label}
            </Label>
          </div>
          <FormMessage className="text-error text-sm" />
        </FormItem>
      )}
    />
  );
}

"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  currency?: string;
  allowNegative?: boolean;
}

export default function CurrencyInput({
  name,
  label,
  placeholder = "Enter amount",
  className,
  disabled = false,
  required = false,
  currency = "₦",
  allowNegative = false,
}: CurrencyInputProps) {
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

          <div className="relative">
            <NumericFormat
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              thousandSeparator=","
              allowNegative={allowNegative}
              valueIsNumericString
              prefix={`${currency} `}
              placeholder={`${currency} ${placeholder}`}
              disabled={disabled}
              customInput={Input}
              className={cn(
                // Base styles
                "px-4 rounded-xl transition-all duration-200",
                "bg-background text-text-primary placeholder:text-text-muted font-medium",
                "focus:outline-none",

                // Border states
                error && "border-error focus:border-error",

                // State styles
                disabled &&
                  "opacity-50 cursor-not-allowed bg-background-secondary"
              )}
            />
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

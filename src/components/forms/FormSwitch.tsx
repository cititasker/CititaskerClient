"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormSwitchProps {
  name: string;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function FormSwitch({
  name,
  label,
  description,
  className,
  disabled = false,
  required = false,
}: FormSwitchProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <div className="flex items-center justify-between group">
            <div className="space-y-1">
              {label && (
                <Label
                  htmlFor={name}
                  className={cn(
                    "text-sm font-medium text-text-primary cursor-pointer",
                    "group-hover:text-text-secondary transition-colors duration-200",
                    disabled && "opacity-50 cursor-not-allowed",
                    required &&
                      "after:content-['*'] after:text-error after:ml-1"
                  )}
                >
                  {label}
                </Label>
              )}
              {description && (
                <p className="text-xs text-text-muted leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            <Switch
              id={name}
              checked={field.value || false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={cn(
                "transition-all duration-200",
                "data-[state=checked]:bg-primary",
                "focus:ring-2 focus:ring-primary/20",
                error && "data-[state=checked]:bg-error",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
          </div>

          <FormMessage className="text-error text-sm" />
        </FormItem>
      )}
    />
  );
}

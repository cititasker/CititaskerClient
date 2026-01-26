"use client";

import { memo, ReactNode, useId } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

interface FormCheckboxProps {
  name: string;
  label: ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
}

const FormCheckbox = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  description,
}: FormCheckboxProps) => {
  const { control, formState } = useFormContext();
  const uniqueId = useId();
  const checkboxId = `${name}-${uniqueId}`;
  const error = formState.errors[name];
  const hasError = Boolean(error);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          <div className="flex items-start gap-3 group">
            {/* Checkbox */}
            <Checkbox
              id={checkboxId}
              checked={field.value || false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              aria-required={required}
              aria-invalid={hasError}
              aria-describedby={
                hasError
                  ? `${checkboxId}-error`
                  : description
                    ? `${checkboxId}-description`
                    : undefined
              }
              className={cn(
                "mt-0.5 transition-all duration-200 flex-shrink-0",
                hasError &&
                  "border-error focus-visible:ring-error/20 data-[state=checked]:bg-error data-[state=checked]:border-error",
              )}
            />

            {/* Label Container */}
            <div className="flex-1 min-w-0 space-y-1">
              <Label
                htmlFor={checkboxId}
                className={cn(
                  "text-sm leading-relaxed cursor-pointer font-normal block",
                  "text-text-primary group-hover:text-text-secondary transition-colors",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <span className="inline">
                  {label}
                  {required && (
                    <span
                      className="text-error font-medium inline-block ml-0.5"
                      aria-label="required"
                      role="presentation"
                    >
                      *
                    </span>
                  )}
                </span>
              </Label>

              {/* Optional Description */}
              {description && !hasError && (
                <p
                  id={`${checkboxId}-description`}
                  className="text-xs text-text-muted leading-relaxed"
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {hasError && (
            <div className="pl-7">
              <FormMessage id={`${checkboxId}-error`} className="text-xs" />
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

FormCheckbox.displayName = "FormCheckbox";

export default memo(FormCheckbox);

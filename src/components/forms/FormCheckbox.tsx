"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import FormError from "../reusables/FormError";
import { ReactNode } from "react";

interface FormCheckboxProps {
  name: string;
  label: ReactNode;
  className?: string;
  labelClassName?: string;
}

export default function FormCheckbox({
  name,
  label,
  className,
  labelClassName,
}: FormCheckboxProps) {
  const { control } = useFormContext();

  return (
    <div className={cn("space-y-1", className)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id={name}
              checked={!!field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
            <Label
              htmlFor={name}
              className={cn(
                "text-sm font-normal leading-snug cursor-pointer",
                labelClassName
              )}
            >
              {label}
            </Label>
          </div>
        )}
      />
      <FormError name={name} />
    </div>
  );
}

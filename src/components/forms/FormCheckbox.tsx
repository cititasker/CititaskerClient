"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FormError from "../reusables/FormError";
import { cn } from "@/lib/utils";

interface FormCheckboxProps {
  name: string;
  label: React.ReactNode;
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
          <div className="flex items-start space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-1"
            />
            <Label
              htmlFor={name}
              className={cn("text-sm font-normal leading-snug", labelClassName)}
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

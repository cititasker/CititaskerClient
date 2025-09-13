"use client";

import { useFormContext, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export interface OptionCard {
  label: string | ReactNode;
  value: string;
  icon?: ReactNode;
  description?: string;
}

interface OptionCardSelectorProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  options: OptionCard[];
  itemClassName?: string;
  columns?: "auto" | 2 | 3 | 4;
}

export const OptionCardSelector = ({
  name,
  options,
  className,
  itemClassName,
  columns = "auto",
}: OptionCardSelectorProps) => {
  const { control } = useFormContext();

  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          value={field.value || ""}
          onValueChange={field.onChange}
          className={cn("grid gap-3 sm:gap-4", getGridClass(), className)}
        >
          {options.map((option) => {
            const isSelected = field.value === option.value;

            return (
              <Label
                key={option.value}
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  // Base styles
                  "group relative flex flex-col items-center justify-center text-center cursor-pointer",
                  "min-h-[100px] sm:min-h-[120px] p-4 rounded-2xl border-2 transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",

                  // Selection states
                  isSelected
                    ? "border-primary bg-primary-50 shadow-md shadow-primary/20"
                    : "border-border-light bg-background hover:border-border-medium hover:bg-background-secondary",

                  itemClassName
                )}
              >
                <RadioGroupItem
                  id={`${name}-${option.value}`}
                  value={option.value}
                  className={cn(
                    "absolute top-3 right-3 transition-colors",
                    isSelected && "text-primary border-primary"
                  )}
                />

                {/* Icon */}
                {option.icon && (
                  <div
                    className={cn(
                      "mb-3 text-2xl transition-colors",
                      isSelected
                        ? "text-primary"
                        : "text-text-muted group-hover:text-text-secondary"
                    )}
                  >
                    {option.icon}
                  </div>
                )}

                {/* Label */}
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isSelected ? "text-primary" : "text-text-primary"
                  )}
                >
                  {option.label}
                </div>

                {/* Description */}
                {option.description && (
                  <div className="text-xs text-text-muted mt-1">
                    {option.description}
                  </div>
                )}
              </Label>
            );
          })}
        </RadioGroup>
      )}
    />
  );
};

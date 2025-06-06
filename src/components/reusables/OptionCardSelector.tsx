"use client";

import { useFormContext, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export interface OptionCard {
  label: string | React.ReactNode;
  value: string;
  icon?: ReactNode;
}

interface OptionCardSelectorProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  options: OptionCard[];
  itemClassName?: string;
}

export const OptionCardSelector = ({
  name,
  options,
  className,
  itemClassName,
}: OptionCardSelectorProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          className={cn(
            "grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 md:gap-6",
            className
          )}
        >
          {options.map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className={cn(
                "h-[100px] sm:h-[120px] relative border rounded-[20px] p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
                field.value === option.value && "border-primary bg-white",
                itemClassName
              )}
            >
              <RadioGroupItem
                id={option.value}
                value={option.value}
                className="absolute top-2 right-2"
              />
              {option.icon && (
                <div className="mb-2 text-lg text-muted-foreground mx-auto">
                  {option.icon}
                </div>
              )}
              <div className="text-sm font-medium">{option.label}</div>
            </Label>
          ))}
        </RadioGroup>
      )}
    />
  );
};

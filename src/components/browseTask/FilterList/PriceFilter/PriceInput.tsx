import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { NumericFormat } from "react-number-format";
import { useFormContext } from "react-hook-form";

interface PriceInputProps {
  name: "min" | "max";
  label: string;
  value: number;
}

export function PriceInput({ name, label }: PriceInputProps) {
  const { control } = useFormContext();
  return (
    <div className="flex-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 mb-2 block"
      >
        {label}
      </label>

      <FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            <div className="relative">
              <NumericFormat
                value={field.value}
                onValueChange={({ value }) => field.onChange(Number(value))}
                thousandSeparator
                prefix="₦ "
                allowNegative={false}
                className={`
                  text-base outline-none rounded-lg w-full border px-3 py-3
                  transition-all duration-200 ease-in-out
                  focus:border-primary
                  ${
                    fieldState.error
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
                placeholder={`₦ 0`}
              />
              {fieldState.error && (
                <div className="absolute -top-1 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
              )}
            </div>
            <FormMessage className="text-xs mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
}

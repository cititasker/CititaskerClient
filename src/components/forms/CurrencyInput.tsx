"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  label,
  placeholder,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <NumericFormat
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              thousandSeparator
              valueIsNumericString
              prefix="₦ "
              placeholder={placeholder}
              customInput={Input}
              className={cn("placeholder:font-normal font-medium px-5")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CurrencyInput;

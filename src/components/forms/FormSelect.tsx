"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface IProps {
  options: { id: string | number; name: string }[];
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  labelStyle?: string;
  inputLabel?: boolean;
  [key: string]: any;
}

const FormSelect = ({
  options,
  name,
  label,
  required,
  placeholder = "Select an option",
  labelStyle,
  inputLabel,
  ...props
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="w-full space-y-1">
            {label && !inputLabel && (
              <FormLabel
                className={cn("block text-sm font-medium", labelStyle)}
              >
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              aria-invalid={!!fieldState.error}
              {...props}
            >
              <SelectTrigger
                className={cn(
                  "rounded-[40px] h-[3.125rem] px-6",
                  error && "border-red-500"
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.id} value={String(option.id)}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormSelect;

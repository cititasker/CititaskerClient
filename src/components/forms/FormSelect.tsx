"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils";
import { Controller, useFormContext } from "react-hook-form";

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
    <div className="w-full space-y-1">
      {label && !inputLabel && (
        <Label className={cn("block text-sm font-medium", labelStyle)}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
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
        )}
      />

      {error && <p className="text-xs text-red-500 mt-1">{String(error)}</p>}
    </div>
  );
};

export default FormSelect;

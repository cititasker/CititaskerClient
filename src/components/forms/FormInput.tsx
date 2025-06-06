import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import FormError from "./FormError";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  className,
  readOnly,
  clearable,
  onClear,
}: FormInputProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const errorId = `${name}-error`;

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm text-black">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <Input
              id={name}
              {...field}
              type={inputType}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              className={cn("pl-5 pr-10", error && "border-red-500")}
              autoComplete="on"
            />

            {clearable && field.value && !disabled && !readOnly && (
              <button
                type="button"
                onClick={() => {
                  field.onChange("");
                  if (onClear) onClear();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOutline size={18} />
                ) : (
                  <IoEyeOffOutline size={18} />
                )}
              </button>
            )}
          </div>
        )}
      />
      <FormError name={name} id={errorId} />
    </div>
  );
}

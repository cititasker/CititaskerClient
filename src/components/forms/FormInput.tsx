import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { X } from "lucide-react";

interface FormInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
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
  inputClassName,
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
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
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
              className={cn(
                "pr-7 w-full",
                error && "border-destructive",
                inputClassName
              )}
              autoComplete="on"
            />

            {clearable && field.value && !disabled && !readOnly && (
              <button
                type="button"
                onClick={() => {
                  field.onChange("");
                  if (onClear) onClear();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                aria-label="Clear input"
              >
                <X size={14} />
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

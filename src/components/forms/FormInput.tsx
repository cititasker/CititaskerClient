import { Eye, EyeOff, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState, useMemo } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormInputProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  className?: string;
  inputClassName?: string;
  onClear?: () => void;
  // New icon props
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  onIconClick?: () => void;
  autoFocus?: boolean;
}

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  readOnly = false,
  clearable = false,
  className,
  inputClassName,
  onClear,
  icon: Icon,
  iconPosition = "left",
  onIconClick,
  autoFocus,
}: FormInputProps) {
  const { control, formState } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const error = formState.errors[name];
  const isPassword = type === "password";

  const inputType = useMemo(() => {
    if (!isPassword) return type;
    return showPassword ? "text" : "password";
  }, [isPassword, showPassword, type]);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const hasValue = Boolean(field.value);
        const showClearButton = clearable && hasValue && !disabled && !readOnly;
        const showPasswordToggle = isPassword;
        const showCustomIcon = Icon && !isPassword; // Don't show custom icon on password fields

        // Calculate padding based on icons
        const hasLeftIcon = showCustomIcon && iconPosition === "left";
        const hasRightActions =
          showClearButton ||
          showPasswordToggle ||
          (showCustomIcon && iconPosition === "right");

        return (
          <FormItem className={cn("space-y-2", className)}>
            {label && (
              <FormLabel
                htmlFor={name}
                className="text-sm font-medium text-text-primary"
              >
                {label}
              </FormLabel>
            )}

            <div className="relative group px-1">
              {/* Left icon */}
              {hasLeftIcon && (
                <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                  {onIconClick ? (
                    <button
                      type="button"
                      onClick={onIconClick}
                      className={cn(
                        "p-1 rounded text-text-muted hover:text-text-secondary",
                        "hover:bg-background-secondary transition-colors duration-150",
                        "focus:outline-none",
                        disabled && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={disabled}
                      aria-label="Icon action"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ) : (
                    <Icon
                      className={cn(
                        "w-4 h-4 text-text-muted",
                        disabled && "opacity-50"
                      )}
                    />
                  )}
                </div>
              )}

              <Input
                id={name}
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={!!error}
                autoComplete={isPassword ? "current-password" : "on"}
                autoFocus={autoFocus}
                className={cn(
                  // Base styles
                  "transition-all duration-200",
                  "bg-background text-text-primary placeholder:text-text-muted",

                  // Border states
                  error && "border-error focus:border-error",

                  // Disabled state
                  disabled &&
                    "opacity-50 cursor-not-allowed bg-background-secondary",

                  // ReadOnly state
                  readOnly && "bg-background-secondary cursor-default",

                  // Padding adjustments for icons
                  hasLeftIcon && "pl-10",
                  hasRightActions && "pr-12",

                  inputClassName
                )}
              />

              {/* Right side actions */}
              {hasRightActions && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {/* Custom right icon */}
                  {showCustomIcon && iconPosition === "right" && (
                    <>
                      {onIconClick ? (
                        <button
                          type="button"
                          onClick={onIconClick}
                          className={cn(
                            "p-1.5 rounded-lg text-text-muted hover:text-text-secondary",
                            "hover:bg-background-secondary transition-colors duration-150",
                            "focus:outline-none",
                            disabled && "opacity-50 cursor-not-allowed"
                          )}
                          disabled={disabled}
                          aria-label="Icon action"
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="p-1.5">
                          <Icon
                            className={cn(
                              "w-4 h-4 text-text-muted",
                              disabled && "opacity-50"
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Clear button */}
                  {showClearButton && (
                    <button
                      type="button"
                      onClick={() => {
                        field.onChange("");
                        onClear?.();
                      }}
                      className={cn(
                        "p-1.5 rounded-lg text-text-muted hover:text-text-secondary",
                        "hover:bg-background-secondary transition-colors duration-150",
                        "focus:outline-none"
                      )}
                      aria-label="Clear input"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Password toggle button */}
                  {showPasswordToggle && (
                    <button
                      type="button"
                      onClick={togglePassword}
                      className={cn(
                        "p-1.5 rounded-lg text-text-muted hover:text-text-secondary",
                        "hover:bg-background-secondary transition-colors duration-150",
                        "focus:outline-none"
                      )}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

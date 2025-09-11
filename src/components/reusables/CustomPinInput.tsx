import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { cn } from "@/utils";

interface CustomPinInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

const CustomPinInput: React.FC<CustomPinInputProps> = ({
  value,
  onChange,
  onComplete,
  length = 4,
  className,
  disabled = false,
  error = false,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        disabled={disabled}
        className={cn("gap-2 sm:gap-3", className)}
      >
        <InputOTPGroup className="flex gap-2 sm:gap-3">
          {Array.from({ length }, (_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={cn(
                "w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl font-semibold rounded-lg border-2 transition-all duration-200",
                "focus:ring-2 focus:ring-primary-400 focus:border-primary-500",
                error
                  ? "border-error bg-error-light"
                  : "border-border-medium hover:border-border-strong",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Visual feedback */}
      <div className="flex gap-1">
        {Array.from({ length }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-1 rounded-full transition-all duration-200",
              i < value.length
                ? error
                  ? "bg-error"
                  : "bg-primary-500"
                : "bg-border-light"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomPinInput;

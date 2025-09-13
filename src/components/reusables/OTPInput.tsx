"use client";
import React from "react";
import CustomPinInput from "@/components/reusables/CustomPinInput";
import FormButton from "@/components/forms/FormButton";
import { useCountdown } from "@/hooks/useCountdown";
import { RotateCcw, Clock } from "lucide-react";
import { cn } from "@/utils";

interface OTPInputProps {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  onResend: () => void;
  loading?: boolean;
  resending?: boolean;
  countdownSeconds?: number;
  error?: boolean;
  length?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({
  title,
  subtitle,
  value,
  onChange,
  onComplete,
  onResend,
  loading = false,
  resending = false,
  countdownSeconds = 60,
  error = false,
  length = 4,
}) => {
  const { secondsLeft, isRunning, start } = useCountdown(countdownSeconds);

  const handleResend = () => {
    onResend();
    start();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed px-4">
          {subtitle}
        </p>
      </div>

      {/* OTP Input */}
      <div className="py-4">
        <CustomPinInput
          value={value}
          onChange={onChange}
          onComplete={onComplete}
          length={length}
          disabled={loading || resending}
          error={error}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-error font-medium">
          Invalid code. Please try again.
        </p>
      )}

      {/* Resend section */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-text-secondary">Didn't receive the code?</span>

          {isRunning ? (
            <div className="flex items-center gap-1 text-text-muted">
              <Clock className="w-4 h-4" />
              <span className="font-medium tabular-nums">
                {formatTime(secondsLeft)}
              </span>
            </div>
          ) : (
            <FormButton
              type="button"
              handleClick={handleResend}
              loading={resending}
              disabled={loading}
              variant="ghost"
              className={cn(
                "h-auto p-1 text-primary-600 hover:text-primary-700 font-medium transition-colors",
                "disabled:opacity-50"
              )}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {resending ? "Sending..." : "Resend code"}
            </FormButton>
          )}
        </div>

        {/* Helper text */}
        <p className="text-xs text-text-muted">
          Check your spam folder if you don't see the code
        </p>
      </div>
    </div>
  );
};

export default OTPInput;

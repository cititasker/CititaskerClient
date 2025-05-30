import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

interface CustomPinInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
  onComplete?: (...args: any[]) => unknown;
}

const CustomPinInput: React.FC<CustomPinInputProps> = ({
  value,
  onChange,
  onComplete,
  className,
  length = 4,
}) => {
  return (
    <>
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        className={className}
      >
        <InputOTPGroup className="flex gap-3 w-full">
          {Array.from({ length }, (_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </>
  );
};

export default CustomPinInput;

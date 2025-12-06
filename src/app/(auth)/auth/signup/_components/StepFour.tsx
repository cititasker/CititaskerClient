// StepFour.tsx - Phone OTP Verification
"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendPhoneVerificationToken, verifyPhoneNumber } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import AuthCard from "@/components/auth/AuthCard";
import StepIndicator from "@/components/auth/StepIndicator";
import OTPInput from "@/components/reusables/OTPInput";

interface Props {
  onNext?: () => void;
}

const StepFour = ({ onNext }: Props) => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone_number");
    if (storedPhone) setPhone(storedPhone);
  }, []);

  const verifyMutation = useMutation({
    mutationFn: verifyPhoneNumber,
    onSuccess: () => {
      showSnackbar("Phone verified successfully!", "success");
      onNext?.();
    },
    onError: (error: any) =>
      showSnackbar(error?.message || "OTP verification failed", "error"),
  });

  const resendMutation = useMutation({
    mutationFn: sendPhoneVerificationToken,
    onSuccess: (data) => showSnackbar(data?.message, "success"),
    onError: (error: any) => showSnackbar(error?.message, "error"),
  });

  return (
    <AuthCard>
      <StepIndicator currentStep={4} totalSteps={5} />

      <OTPInput
        title="Phone Verification"
        subtitle={`We've sent a 4-digit code to ${phone}. Please enter it to continue.`}
        value={otp}
        onChange={setOtp}
        onComplete={(token) => verifyMutation.mutate({ token })}
        onResend={() => resendMutation.mutate({ phone_number: phone })}
        loading={verifyMutation.isPending}
        resending={resendMutation.isPending}
        countdownSeconds={30}
      />
    </AuthCard>
  );
};

export default StepFour;

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { otpApi, resendEmailVerificationApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { ROUTES } from "@/constant";
import AuthCard from "../../components/AuthCard";
import StepIndicator from "../../components/StepIndicator";
import OTPInput from "@/components/reusables/OTPInput";

interface Props {
  onNext?: () => void;
}

const StepTwo = ({ onNext }: Props) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const verifyMutation = useMutation({
    mutationFn: otpApi,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      onNext?.();
    },
    onError: (error: any) => showSnackbar(error?.message, "error"),
  });

  const resendMutation = useMutation({
    mutationFn: resendEmailVerificationApi,
    onSuccess: (data) => showSnackbar(data?.message, "success"),
    onError: (error: any) => showSnackbar(error?.message, "error"),
  });

  return (
    <AuthCard>
      <StepIndicator currentStep={2} totalSteps={5} />

      <OTPInput
        title="Email Verification"
        subtitle={`We've sent a 4-digit code to ${email}. The code expires shortly, so please enter it soon.`}
        value={otp}
        onChange={setOtp}
        onComplete={() => verifyMutation.mutate({ token: otp })}
        onResend={() => resendMutation.mutate()}
        loading={verifyMutation.isPending}
        resending={resendMutation.isPending}
      />

      <div className="text-center mt-6">
        <Link
          href={ROUTES.LOGIN}
          className="text-sm text-text-muted hover:text-primary-600 transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default StepTwo;

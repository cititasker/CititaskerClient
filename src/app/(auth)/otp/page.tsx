"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { ROUTES } from "@/constant";
import AuthCard from "../components/AuthCard";
import OTPInput from "@/components/reusables/OTPInput";
import { otpApi, resendEmailVerificationApi } from "@/services/auth";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const type = searchParams.get("type") || "email"; // email or phone

  // Auto-clear error when user types
  useEffect(() => {
    if (error && otp.length > 0) {
      setError(false);
    }
  }, [otp, error]);

  const verifyMutation = useMutation({
    mutationFn: otpApi,
    onSuccess: (data) => {
      showSnackbar(data?.message || "Verification successful!", "success");
      router.push(ROUTES.LOGIN);
    },
    onError: (error: any) => {
      setError(true);
      setOtp(""); // Clear the input
      showSnackbar(error?.message || "Invalid code", "error");
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendEmailVerificationApi,
    onSuccess: (data) => {
      showSnackbar(data?.message || "Code sent successfully!", "success");
    },
    onError: (error: any) => {
      showSnackbar(error?.message || "Failed to resend code", "error");
    },
  });

  const handleComplete = (value: string) => {
    if (value.length === 4) {
      verifyMutation.mutate({
        token: value,
        // type,
        // email: type === "email" ? email : undefined,
        // phone: type === "phone" ? phone : undefined
      });
    }
  };

  const handleResend = () => {
    resendMutation.mutate();
  };

  // Redirect if missing required params
  useEffect(() => {
    if (!email && !phone) {
      router.push(ROUTES.LOGIN);
    }
  }, [email, phone, router]);

  const getTitle = () => {
    return type === "email" ? "Check your email" : "Check your phone";
  };

  const getSubtitle = () => {
    const contact = type === "email" ? email : phone;
    return `We've sent a 4-digit verification code to ${contact}`;
  };

  return (
    <AuthCard>
      <OTPInput
        title={getTitle()}
        subtitle={getSubtitle()}
        value={otp}
        onChange={setOtp}
        onComplete={handleComplete}
        onResend={handleResend}
        loading={verifyMutation.isPending}
        resending={resendMutation.isPending}
        error={error}
        countdownSeconds={60}
      />
    </AuthCard>
  );
};

export default OTPPage;

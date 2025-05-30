"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { otpApi, resendEmailVerificationApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import StepWrapper from "./StepWrapper";
import { useCountdown } from "@/hooks/useCountdown";
import CustomPinInput from "@/components/reusables/CustomPinInput";
import { ROUTES } from "@/constant";
import FormButton from "@/components/forms/FormButton";

interface IProps {
  onNext: () => void;
}

const StepTwo = ({ onNext }: IProps) => {
  const [otpValues, setOtpValues] = useState("");
  const [email, setEmail] = useState("");
  const { showSnackbar } = useSnackbar();
  const { secondsLeft, isRunning, start } = useCountdown(60);

  const mutation = useMutation({
    mutationFn: otpApi,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      onNext();
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendEmailVerificationApi,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      start();
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  // Load stored email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleResendClick = () => {
    resendMutation.mutate();
  };

  const onComplete = (v: any) => {
    mutation.mutate({ token: otpValues });
  };

  return (
    <StepWrapper>
      <form>
        <div className="mb-[2.5rem] text-center">
          <h2 className="text-xl font-semibold mb-3">Email Verification</h2>
          <p className="text-sm font-normal">
            We&apos;ve sent a 4-digit code to <strong>{email}</strong>. The code
            expires shortly, so please enter it soon.
          </p>
        </div>

        <CustomPinInput
          value={otpValues}
          onChange={setOtpValues}
          onComplete={onComplete}
        />

        <div className="text-sm text-center mt-6 flex items-center justify-center">
          Didn’t receive an email?
          <FormButton
            type="button"
            disabled={isRunning}
            loading={resendMutation.isPending || mutation.isPending}
            handleClick={handleResendClick}
            className="text-primary ml-1.5 disabled:opacity-50 !bg-transparent p-0 mt-0 h-fit gap-1"
          >
            {resendMutation.isPending ? "Resending" : "Resend"}{" "}
            {isRunning ? `in (${secondsLeft}s)` : ""}
          </FormButton>
        </div>

        <Link
          href={ROUTES.LOGIN}
          className="mt-3 underline text-dark-secondary text-sm font-normal text-left w-fit block mx-auto"
        >
          Return to Login
        </Link>
      </form>
    </StepWrapper>
  );
};

export default StepTwo;

"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomPinInput from "@/components/reusables/CustomPinInput";
import { sendPhoneVerificationToken, verifyPhoneNumber } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import StepWrapper from "./StepWrapper";
import { useCountdown } from "@/hooks/useCountdown";
import FormButton from "@/components/forms/FormButton";

const StepFour = ({ onNext }: { onNext: () => void }) => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const { showSnackbar } = useSnackbar();
  const { secondsLeft, isRunning, start } = useCountdown(30);

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone_number");
    if (storedPhone) setPhone(storedPhone);
  }, []);

  const showError = (error: any, fallback = "Something went wrong") =>
    showSnackbar(error?.message || fallback, "error");

  const { mutate: verifyOtp, isPending: verifying } = useMutation({
    mutationFn: verifyPhoneNumber,
    onSuccess: () => {
      showSnackbar("Phone verified", "success");
      onNext();
    },
    onError: (err) => showError(err, "OTP verification failed"),
  });

  const { mutate: resendOtp, isPending: resending } = useMutation({
    mutationFn: sendPhoneVerificationToken,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      start();
    },
    onError: (err) => showError(err),
  });

  return (
    <StepWrapper>
      <form
        className="max-w-[342px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-center text-xl font-semibold mb-3">
          Phone Number Verification
        </h2>
        <p className="text-center text-sm mb-8">
          We've sent a 4-digit code to {phone}. The code expires soon.
        </p>

        <CustomPinInput
          value={otp}
          onChange={setOtp}
          onComplete={(token) => verifyOtp({ token })}
        />

        <div className="text-sm text-center mt-6 flex items-center justify-center">
          Didn’t receive a code?{" "}
          <FormButton
            type="button"
            disabled={isRunning}
            loading={resending || verifying}
            handleClick={() => resendOtp({ phone_number: phone })}
            className="text-primary ml-1.5 disabled:opacity-50 !bg-transparent p-0 mt-0 h-fit gap-1"
          >
            {resending ? "Resending" : "Resend"}{" "}
            {isRunning ? `in (${secondsLeft}s)` : ""}
          </FormButton>
        </div>
      </form>
    </StepWrapper>
  );
};

export default StepFour;

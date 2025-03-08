"use client";
import React, { useEffect, useState } from "react";
import CustomPinInput from "@/components/reusables/CustomPinInput";
import { resendEmailVerificationApi, verifyPhoneNumber } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";

interface IProps {
  onNext: () => void;
}

const StepFour = ({ onNext }: IProps) => {
  const [values, setValues] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [phone, setPhone] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleChange = (value: string[], index: number, values: string[]) => {
    setValues(values);
    const hasEmptyString = values.some((item) => item === "");
    if (!hasEmptyString) {
      console.log(value, values, index);
      handleOtpSubmit(values.join(""));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPhoneNumber = localStorage.getItem("phone_number");
      if (storedPhoneNumber) setPhone(storedPhoneNumber);
    }
  }, []);

  const mutation = useMutation({
    mutationFn: verifyPhoneNumber,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      onNext();
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  const handleOtpSubmit = (otpCode: string) => {
    mutation.mutate({ token: otpCode });
  };
  useEffect(() => {
    let intervalId: any;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(intervalId);
            setIsTimerRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const resendMutation = useMutation({
    mutationFn: resendEmailVerificationApi,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  const handleResendClick = () => {
    setIsTimerRunning(true);
    resendMutation.mutate();
  };

  return (
    <div className="lg:shadow-md mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
      <form>
        <div>
          <h2 className="text-center text-xl font-semibold mb-3">
            Phone Number Verification
          </h2>
          <p className="text-center text-sm font-normal">
            We&apos;ve sent a 4-digit code to {phone}. The code expires shortly,
            so please enter it soon.
          </p>
        </div>
        <div className="my-[2.5rem]">
          <CustomPinInput handleChange={handleChange} values={values} />
        </div>

        <div className="mb-10 text-base font-semibold w-fit mx-auto mt-4">
          Didn’t receive an email?{" "}
          <button
            type="button"
            className="text-primary disabled:cursor-not-allowed"
            onClick={handleResendClick}
            disabled={isTimerRunning}
          >
            <span>Resend {isTimerRunning ? `(${seconds}s)` : ""}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFour;

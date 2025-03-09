"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomPinInput from "@/components/reusables/CustomPinInput";

const ForgotPassword = () => {
  const [values, setValues] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleChange = (value: string[], index: number, values: string[]) => {
    setValues(values);
    const hasEmptyString = values.some((item) => item === "");
    if (!hasEmptyString) {
      console.log(value, values, index);
    }
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

  const handleResendClick = () => {
    setIsTimerRunning(true);
  };

  return (
    <div className="sm:shadow-md mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
      <form>
        <div className="mb-[2.5rem]">
          <h2 className="text-center text-xl font-semibold mb-3">
            Email Verification
          </h2>
          <p className="text-center text-sm font-normal">
            We&apos;ve sent a 4-digit code to judithcynthia1@gmail.com. The code
            expires shortly, so please enter it soon.
          </p>
        </div>
        <CustomPinInput handleChange={handleChange} values={values} />

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
        <Link
          href="/login"
          className="mt-3 underline text-dark-secondary text-sm font-normal text-left w-fit block mx-auto"
        >
          Return to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;

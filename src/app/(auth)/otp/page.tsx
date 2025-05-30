"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomPinInput from "@/components/reusables/CustomPinInput";
import { useCountdown } from "@/hooks/useCountdown";
import { ROUTES } from "@/constant";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const { secondsLeft, isRunning, start } = useCountdown(60);

  const handleResendClick = () => {
    start();
  };

  const onComplete = () => {
    //
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
        <CustomPinInput
          onChange={setValue}
          value={value}
          onComplete={onComplete}
        />

        <div className="mb-10 text-base font-medium w-fit mx-auto mt-4">
          Didn’t receive an email?{" "}
          <button
            type="button"
            className="text-primary disabled:cursor-not-allowed"
            onClick={handleResendClick}
            disabled={isRunning}
          >
            <span>Resend {isRunning ? `in (${secondsLeft}s)` : ""}</span>
          </button>
        </div>
        <Link
          href={ROUTES.LOGIN}
          className="mt-3 underline text-dark-secondary text-sm font-normal text-left w-fit block mx-auto"
        >
          Return to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;

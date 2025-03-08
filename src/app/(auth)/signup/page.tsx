"use client";
import React, { useEffect, useMemo } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import StepFive from "./_components/StepFive";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");
  const currentStep = searchParams.get("step");
  const step = useMemo(
    () => (currentStep ? Number(currentStep) : 1),
    [currentStep]
  );

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("step", `${step}`);
    router.replace(`${currentUrl}`);
  }, []);

  // Function to go to the next step
  const handleNextStep = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("step", `${step + 1}`);
    if (step !== 1) {
      router.push(`${currentUrl}`);
    } else {
      location.href = `${currentUrl}`;
    }
    router.push(`${currentUrl}`);
  };
  if (!role) redirect("/create-account");
  return (
    <>
      {step === 1 && <StepOne onNext={handleNextStep} />}
      {step === 2 && <StepTwo onNext={handleNextStep} />}
      {step === 3 && <StepThree onNext={handleNextStep} />}
      {step === 4 && <StepFour onNext={handleNextStep} />}
      {step === 5 && <StepFive />}
    </>
  );
};

export default SignUpPage;

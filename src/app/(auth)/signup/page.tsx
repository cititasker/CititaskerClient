"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import StepFive from "./_components/StepFive";
import { ROUTES } from "@/constant";

const stepsMap: { [key: number]: React.FC<any> } = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
  4: StepFour,
  5: StepFive,
};

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");
  const currentStep = useMemo(
    () => Number(searchParams.get("step") || 1),
    [searchParams]
  );

  useEffect(() => {
    if (!role) redirect(ROUTES.CREATE_ACCOUNT);

    // Ensure URL always includes the step
    const url = new URL(window.location.href);
    if (!url.searchParams.get("step")) {
      url.searchParams.set("step", String(currentStep));
      router.replace(url.toString());
    }
  }, [role, currentStep, router]);

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(nextStep));
    router.push(url.toString());
  };

  const StepComponent = stepsMap[currentStep];

  return (
    <AnimatePresence mode="wait">
      {StepComponent && (
        <StepComponent onNext={currentStep < 5 ? handleNextStep : undefined} />
      )}
    </AnimatePresence>
  );
};

export default SignUpPage;

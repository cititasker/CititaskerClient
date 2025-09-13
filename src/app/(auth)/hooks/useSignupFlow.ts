"use client";
import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constant";

const TOTAL_STEPS = 5;
const STEP_PARAM = "step";
const ROLE_PARAM = "role";

export const useSignupFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = searchParams.get(ROLE_PARAM);
  const currentStep = useMemo(() => {
    const step = parseInt(searchParams.get(STEP_PARAM) || "1", 10);
    return Math.max(1, Math.min(TOTAL_STEPS, step));
  }, [searchParams]);

  const updateStep = useCallback(
    (step: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(STEP_PARAM, step.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      updateStep(currentStep + 1);
    }
  }, [currentStep, updateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  }, [currentStep, updateStep]);

  const canGoBack = currentStep > 1;
  const canGoNext = currentStep < TOTAL_STEPS;
  const isComplete = currentStep === TOTAL_STEPS;

  return {
    role,
    currentStep,
    totalSteps: TOTAL_STEPS,
    nextStep,
    prevStep,
    updateStep,
    canGoBack,
    canGoNext,
    isComplete,
  };
};

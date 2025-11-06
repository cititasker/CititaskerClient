"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import Summary from "./_components/Summary";
import AnimatedStep from "@/components/reusables/AnimatedStep";

const steps = [
  { component: StepOne, title: "Task Details" },
  { component: StepTwo, title: "Location" },
  { component: StepThree, title: "Timing" },
  { component: StepFour, title: "Budget" },
  { component: Summary, title: "Review" },
];

export default function PostTaskPage() {
  const searchParams = useSearchParams();
  const current = searchParams.get("step");
  const stepIndex = Math.max(1, Math.min(5, current ? +current : 1));

  const currentStep = steps[stepIndex - 1];
  const StepComponent = currentStep.component;

  return (
    <div className="min-h-[600px] relative">
      <AnimatedStep currentStep={stepIndex}>
        <StepComponent />
      </AnimatedStep>
    </div>
  );
}

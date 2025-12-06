"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimatedStep from "@/components/reusables/AnimatedStep";

// ✅ Lazy load all form steps
const StepOne = dynamic(() => import("@/components/poster/post-task/StepOne"), {
  ssr: false,
});
const StepTwo = dynamic(() => import("@/components/poster/post-task/StepTwo"), {
  ssr: false,
});
const StepThree = dynamic(
  () => import("@/components/poster/post-task/StepThree"),
  {
    ssr: false,
  }
);
const StepFour = dynamic(
  () => import("@/components/poster/post-task/StepFour"),
  {
    ssr: false,
  }
);
const Summary = dynamic(() => import("@/components/poster/post-task/Summary"), {
  ssr: false,
});

function StepLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-32 bg-gray-200 rounded w-full"></div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>
  );
}

export default function PostTaskPage() {
  const searchParams = useSearchParams();
  const current = searchParams.get("step");
  const stepIndex = Math.max(1, Math.min(5, current ? +current : 1));

  return (
    <div className="min-h-[600px] relative">
      <AnimatedStep currentStep={stepIndex}>
        <Suspense fallback={<StepLoadingSkeleton />}>
          {stepIndex === 1 && <StepOne />}
          {stepIndex === 2 && <StepTwo />}
          {stepIndex === 3 && <StepThree />}
          {stepIndex === 4 && <StepFour />}
          {stepIndex === 5 && <Summary />}
        </Suspense>
      </AnimatedStep>
    </div>
  );
}

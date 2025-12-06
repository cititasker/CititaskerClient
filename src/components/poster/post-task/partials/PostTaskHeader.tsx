"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProgressBar from "@/components/auth/ProgressBar";

const STEP_CONFIG = {
  1: {
    title: "What task do you want to get done?",
  },
  2: {
    title: "What's the location of this task?",
    rescheduleTitle: "Reschedule your task",
  },
  3: {
    title: "When do you want to get this task done?",
  },
  4: {
    title: "What is your budget for this task?",
  },
} as const;

const PostTaskHeader = () => {
  const searchParams = useSearchParams();
  const step = Math.max(1, Math.min(4, Number(searchParams.get("step")) || 1));
  const action = searchParams.get("action");

  const config = STEP_CONFIG[step as keyof typeof STEP_CONFIG];
  const title =
    action === "reschedule" && "rescheduleTitle" in config
      ? config.rescheduleTitle
      : config.title;

  return (
    <div className="space-y-6 mb-8">
      {/* Step indicator */}
      <ProgressBar currentStep={step} totalSteps={4} />

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
        {title}
      </h1>
    </div>
  );
};

export default PostTaskHeader;

"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import Summary from "./_components/Summary";

const animationVariants = {
  enterFromLeft: { x: 100, opacity: 0 },
  enterFromRight: { x: -100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -100, opacity: 0 },
  exitToRight: { x: 100, opacity: 0 },
} as const;

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`step-${stepIndex}`}
          initial="enterFromLeft"
          animate="center"
          exit="exitToLeft"
          variants={animationVariants}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
          className="w-full"
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

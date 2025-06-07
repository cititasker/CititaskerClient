"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import StepOne from "../_components/StepOne";
import StepTwo from "../_components/StepTwo";
import StepThree from "../_components/StepThree";
import StepFour from "../_components/StepFour";
import Summary from "../_components/Summary";
import { AnimatePresence, motion } from "framer-motion";

const animationVariants = {
  enterFromLeft: { x: 100, opacity: 0 },
  enterFromRight: { x: -100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -100, opacity: 0 },
  exitToRight: { x: 100, opacity: 0 },
} as const;

export default function Page() {
  const searchParams = useSearchParams() as any;
  const current = searchParams.get("step");
  const step = current ? +current : 1;

  const steps = [StepOne, StepTwo, StepThree, StepFour, Summary];
  const StepComponent = steps[step];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`step-${step}`}
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
      >
        <StepComponent />
      </motion.div>
    </AnimatePresence>
  );
}

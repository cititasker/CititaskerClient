"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
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

type Direction = "forward" | "backward";

const steps = [StepOne, StepTwo, StepThree, StepFour, Summary];

export default function PostTaskPage() {
  const searchParams = useSearchParams();
  const stepIndex = Math.max(
    0,
    Math.min(steps.length - 1, +(searchParams.get("step") || 1) - 1)
  );
  const [direction, setDirection] = useState<Direction>("forward");
  const prevStepRef = useRef(stepIndex);

  useEffect(() => {
    if (stepIndex > prevStepRef.current) {
      setDirection("forward");
    } else if (stepIndex < prevStepRef.current) {
      setDirection("backward");
    }
    prevStepRef.current = stepIndex;
  }, [stepIndex]);

  const StepComponent = steps[stepIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={direction === "forward" ? "enterFromLeft" : "enterFromRight"}
        animate="center"
        exit={direction === "forward" ? "exitToLeft" : "exitToRight"} // flipped exit directions here
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

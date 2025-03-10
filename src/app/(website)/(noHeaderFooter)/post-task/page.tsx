"use client";
import StepFour from "@/components/postTask/StepFour";
import StepOne from "@/components/postTask/StepOne";
import StepThree from "@/components/postTask/StepThree";
import StepTwo from "@/components/postTask/StepTwo";
import Summary from "@/components/postTask/Summary";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const animationVariants = {
  enterFromLeft: { x: 300, opacity: 0 },
  enterFromRight: { x: -300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -300, opacity: 0 },
  exitToRight: { x: 300, opacity: 0 },
};

const AnimationWrapper = ({ children }: any) => {
  const searchParams = useSearchParams();
  const current = searchParams.get("step");
  const dir = searchParams.get("d") || "f";
  const direction = dir == "f" ? "forward" : "backward";
  const step = current ? +current : 1;

  return (
    <motion.div
      key={step}
      custom={direction}
      initial={direction === "forward" ? "enterFromLeft" : "enterFromRight"}
      animate="center"
      exit={direction === "forward" ? "exitToRight" : "exitToLeft"}
      variants={animationVariants}
      transition={{
        type: "spring",
        bounce: 0,
        stiffness: 50,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Page() {
  const searchParams = useSearchParams();
  const current = searchParams.get("step");
  const step = current ? +current : 1;

  return (
    <AnimatePresence mode="wait">
      {step == 1 && (
        <AnimationWrapper>
          <StepOne />
        </AnimationWrapper>
      )}
      {step == 2 && (
        <AnimationWrapper>
          <StepTwo />
        </AnimationWrapper>
      )}
      {step == 3 && (
        <AnimationWrapper>
          <StepThree />
        </AnimationWrapper>
      )}
      {step == 4 && (
        <AnimationWrapper>
          <StepFour />
        </AnimationWrapper>
      )}
      {step == 5 && (
        <AnimationWrapper>
          <Summary />
        </AnimationWrapper>
      )}
    </AnimatePresence>
  );
}

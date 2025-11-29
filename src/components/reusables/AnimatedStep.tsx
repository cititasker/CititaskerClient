import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { animationVariants as variants } from "@/constant";

// Type for the props that the component will receive
interface AnimatedStepProps {
  currentStep: number | string | null | undefined; // Current step number
  animationVariants?: Variants; // Optional custom animation variants
  renderStepContent?: () => React.ReactNode; // Function that returns the content of the current step
  children?: React.ReactNode;
}

const AnimatedStep: React.FC<AnimatedStepProps> = ({
  currentStep,
  animationVariants = variants,
  renderStepContent,
  children,
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={currentStep}
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
        className="flex flex-1 min-h-0 flex-col"
      >
        {children ?? renderStepContent?.()}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStep;

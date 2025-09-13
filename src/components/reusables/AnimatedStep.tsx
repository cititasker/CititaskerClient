import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { animationVariant } from "@/constant";

// Type for the props that the component will receive
interface AnimatedStepProps {
  currentStep: number; // Current step number
  animationVariants?: Variants; // Optional custom animation variants
  renderStepContent?: () => React.ReactNode; // Function that returns the content of the current step
  children?: React.ReactNode;
}

const AnimatedStep: React.FC<AnimatedStepProps> = ({
  currentStep,
  animationVariants = animationVariant,
  renderStepContent,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial="enter"
        animate="center"
        exit="exit"
        variants={animationVariants}
        transition={{
          duration: 0.25,
          ease: [0.4, 0.0, 0.2, 1], // Custom easing curve for smooth feel
        }}
        className="h-full min-h-[350px] flex flex-col"
      >
        {children ?? renderStepContent?.()}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStep;

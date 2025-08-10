import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

// Type for the props that the component will receive
interface AnimatedStepProps {
  currentStep: number; // Current step number
  direction?: "forward" | "backward"; // Direction of animation (default is "forward")
  animationVariants?: Variants; // Optional custom animation variants
  renderStepContent?: () => React.ReactNode; // Function that returns the content of the current step
  children?: React.ReactNode;
}

const AnimatedStep: React.FC<AnimatedStepProps> = ({
  currentStep,
  direction = "forward",
  animationVariants = {},
  renderStepContent,
  children,
}) => {
  // Default animation variants
  const defaultAnimationVariants: Variants = {
    enterFromLeft: { x: "-100%", opacity: 0 },
    enterFromRight: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exitToLeft: { x: "-100%", opacity: 0 },
    exitToRight: { x: "100%", opacity: 0 },
  };

  // Merge the default variants with any custom ones passed in
  const finalAnimationVariants = {
    ...defaultAnimationVariants,
    ...animationVariants,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={direction === "forward" ? "enterFromRight" : "enterFromLeft"}
        animate="center"
        exit={direction === "forward" ? "exitToLeft" : "exitToRight"}
        variants={finalAnimationVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full min-h-[350px]"
      >
        {children ?? renderStepContent?.()}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStep;

import { useEffect, useState } from "react";

export function useStepFormAction(open: boolean) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    if (open) {
      setCurrentStep(1);
    }
  }, [open]);

  const nextStep = () => {
    const next = currentStep + 1;
    setDirection("forward");
    setCurrentStep(next);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection("backward");
      setCurrentStep((prev) => prev - 1);
    }
  };

  return { direction, currentStep, nextStep, prevStep };
}

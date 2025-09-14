import React from "react";
import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => (
  <div className="flex items-center justify-center mb-8">
    {Array.from({ length: totalSteps }, (_, index) => {
      const stepNumber = index + 1;
      const isActive = stepNumber === currentStep;
      const isCompleted = stepNumber < currentStep;

      return (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm transition-all duration-200 ${
              isCompleted
                ? "bg-success text-white"
                : isActive
                ? "bg-primary text-white shadow-glow-primary"
                : "bg-background-secondary text-text-muted border-2 border-border-light"
            }`}
          >
            {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNumber}
          </div>

          {stepNumber < totalSteps && (
            <div
              className={`w-5 sm:w-10 h-1 mx-2 rounded transition-colors duration-200 ${
                stepNumber < currentStep ? "bg-success" : "bg-border-light"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;

import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-primary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-text-muted">
          {Math.round(progress)}% complete
        </span>
      </div>

      <div className="w-full bg-background-secondary rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            animationDelay: "0.5s",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

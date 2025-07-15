import CustomModal from "@/components/reusables/CustomModal";
import React from "react";
import StepOne from "./StepOne";
import { useStepFormAction } from "@/hooks/useStepFormAction";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import StepTwo from "./StepTwo";
import Success from "@/components/reusables/Success";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  acceptedOffer: IOffer | undefined;
}
export default function PaySurChargeModal({
  isOpen,
  onClose,
  acceptedOffer,
}: IProps) {
  const { currentStep, direction, nextStep, prevStep } =
    useStepFormAction(isOpen);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne nextStep={nextStep} acceptedOffer={acceptedOffer} />;
      case 2:
        return <StepTwo nextStep={nextStep} acceptedOffer={acceptedOffer} />;
      case 3:
        return (
          <div className="min-h-[450px] flex items-center justify-center">
            <Success title="Success!" desc="Your payment was successful" />
          </div>
        );
      default:
        return <div>Default Step Content</div>;
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <AnimatedStep
        direction={direction}
        currentStep={currentStep}
        renderStepContent={renderStepContent}
      />
    </CustomModal>
  );
}

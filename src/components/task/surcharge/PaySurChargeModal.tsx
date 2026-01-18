import CustomModal from "@/components/reusables/CustomModal";
import React from "react";
import StepOne from "./StepOne";
import { useStepFormAction } from "@/hooks/useStepFormAction";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import StepTwo from "./StepTwo";
import { ISurcharge } from "@/services/offers/offers.types";
import { useFeedbackModal } from "@/components/reusables/Modals/UniversalFeedbackModal/hooks/useFeedbackModal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  acceptedOffer: IOffer | undefined;
  pendingSurcharge?: ISurcharge;
}
export default function PaySurChargeModal({
  isOpen,
  onClose,
  acceptedOffer,
  pendingSurcharge,
}: IProps) {
  const { currentStep, nextStep } = useStepFormAction(isOpen);
  const { showSuccess, FeedbackModal } = useFeedbackModal();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne nextStep={nextStep} pendingSurcharge={pendingSurcharge} />
        );
      case 2:
        return (
          <StepTwo
            onClose={onClose}
            acceptedOffer={acceptedOffer}
            showSuccess={showSuccess}
          />
        );
      default:
        return <div>Default Step Content</div>;
    }
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={currentStep == 1 ? "Pay surcharge" : undefined}
      >
        <AnimatedStep
          currentStep={currentStep}
          renderStepContent={renderStepContent}
        />
      </CustomModal>
      <FeedbackModal />
    </>
  );
}

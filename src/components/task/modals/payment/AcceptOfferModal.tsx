import AnimatedStep from "@/components/reusables/AnimatedStep";
import CustomModal from "@/components/reusables/CustomModal";
import { UseModalReturn } from "@/constant/interface";
import React from "react";
import ReviewPayment from "./ReviewPayment";
import PaymentSuccess from "../surcharge/PaymentSuccess";

interface IProps {
  offerModal: UseModalReturn;
  taskerName?: string;
  loading: boolean;
  selectedOffer: IOffer | undefined;
  step: "review" | "success";
  onSubmit: () => void;
  onClose: () => void;
}

export default function AcceptOfferModal({
  offerModal,
  taskerName,
  loading,
  selectedOffer,
  step,
  onSubmit,
  onClose,
}: IProps) {
  const isReviewStep = step === "review";
  const isSuccessStep = step === "success";

  return (
    <CustomModal
      title={isReviewStep ? "Review payment" : undefined}
      isOpen={offerModal.isOpen}
      onClose={onClose}
      contentClassName="max-w-lg"
      confetti={isSuccessStep}
    >
      <AnimatedStep currentStep={step}>
        {isReviewStep && (
          <ReviewPayment
            loading={loading}
            selectedOffer={selectedOffer}
            onSubmit={onSubmit}
          />
        )}

        {isSuccessStep && (
          <PaymentSuccess taskerName={taskerName} onClose={onClose} />
        )}
      </AnimatedStep>
    </CustomModal>
  );
}

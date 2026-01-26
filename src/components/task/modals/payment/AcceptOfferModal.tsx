// components/AcceptOfferModal.tsx
import { memo } from "react";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import CustomModal from "@/components/reusables/CustomModal";
import { UseModalReturn } from "@/constant/interface";
import ReviewPayment from "./ReviewPayment";
import PaymentSuccess from "../surcharge/PaymentSuccess";

interface AcceptOfferModalProps {
  offerModal: UseModalReturn;
  taskerName?: string;
  loading: boolean;
  selectedOffer: IOffer | undefined;
  step: "review" | "success";
  balance: number;
  paymentMethod: "wallet" | "hybrid" | "direct";
  onSubmit: () => void;
  onClose: () => void;
}

const AcceptOfferModal = ({
  offerModal,
  taskerName,
  loading,
  selectedOffer,
  step,
  balance,
  paymentMethod,
  onSubmit,
  onClose,
}: AcceptOfferModalProps) => {
  const isReviewStep = step === "review";
  const isSuccessStep = step === "success";

  return (
    <CustomModal
      title={isReviewStep ? "Review payment" : undefined}
      isOpen={offerModal.isOpen}
      onClose={onClose}
      contentClassName="max-w-lg"
      confetti={isSuccessStep}
      hideClose={loading}
      onInteractOutside={(e: any) => {
        if (loading) e.preventDefault();
      }}
    >
      <AnimatedStep currentStep={step}>
        {isReviewStep && (
          <ReviewPayment
            loading={loading}
            selectedOffer={selectedOffer}
            balance={balance}
            paymentMethod={paymentMethod}
            onSubmit={onSubmit}
          />
        )}

        {isSuccessStep && (
          <PaymentSuccess taskerName={taskerName} onClose={onClose} />
        )}
      </AnimatedStep>
    </CustomModal>
  );
};

export default memo(AcceptOfferModal);

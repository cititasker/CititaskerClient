import { useState } from "react";
import dynamic from "next/dynamic";

const ReleasePaymentModal = dynamic(() => import("./ReleasePaymentModal"), {
  ssr: false,
});

const AcceptOfferModal = dynamic(() => import("./AcceptOfferModal"), {
  ssr: false,
});

interface PaymentModalsProps {
  task: ITask;
  paymentActions: ReturnType<
    typeof import("../../hooks/usePaymentActions").usePaymentActions
  >;
  taskerName: string;
}

export default function PaymentModals({
  task,
  paymentActions,
  taskerName,
}: PaymentModalsProps) {
  const [releaseStep, setReleaseStep] = useState<"release" | "success">(
    "release"
  );

  const handleOfferSubmit = () => {
    paymentActions.handleOfferPayment();
  };

  const handleReleaseSubmit = () => {
    paymentActions.handleReleasePayment(() => setReleaseStep("success"));
  };

  const closeOfferModal = () => {
    paymentActions.setOfferStep("review");
    paymentActions.closeOfferModal();
  };

  const closeReleaseModal = () => {
    setReleaseStep("release");
    paymentActions.closeReleasePaymentModal();
  };

  return (
    <>
      <AcceptOfferModal
        offerModal={paymentActions.offerModal}
        loading={paymentActions.paymentMutation.isPending}
        selectedOffer={paymentActions.selectedOffer}
        taskerName={taskerName}
        step={paymentActions.offerStep}
        onSubmit={handleOfferSubmit}
        onClose={closeOfferModal}
      />

      <ReleasePaymentModal
        isOpen={paymentActions.releasePaymentModal.isOpen}
        onClose={closeReleaseModal}
        step={releaseStep}
        taskerName={taskerName}
        loading={paymentActions.releasePayment.isPending}
        methods={paymentActions.releasePaymentMethods}
        onSubmit={handleReleaseSubmit}
        taskerProfile={task.tasker?.profile as any}
        task={{
          name: task.name,
          address: task.address,
        }}
        acceptedOffer={task.offers?.find((o) => o.status === "accepted")}
      />
    </>
  );
}

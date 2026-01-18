import { useEffect } from "react";
import CustomModal from "@/components/reusables/CustomModal";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import dynamic from "next/dynamic";
import Success from "@/components/reusables/Success";
import { formatCurrency } from "@/utils";
import Request from "./Request";
import { Loader2 } from "lucide-react";
import { useTaskAlert } from "@/providers/TaskAlertContext";

// Custom inline loader
const StepLoader = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

// Lazy load steps
const AcceptRequest = dynamic(() => import("./AcceptRequest"), {
  ssr: false,
  loading: StepLoader,
});

const RejectRequest = dynamic(() => import("./RejectRequest"), {
  ssr: false,
  loading: StepLoader,
});

const PaymentSuccess = dynamic(() => import("./PaymentSuccess"), {
  ssr: false,
  loading: StepLoader,
});

// Prefetch map for surcharge steps
const prefetchMap = {
  request: () => import("./AcceptRequest"),
  accept: () => import("./PaymentSuccess"),
  reject: () => import("./Request"),
} as const;

interface SurchargeModalsProps {
  task: ITask;
  surchargeActions: ReturnType<
    typeof import("../../hooks/useSurchargeActions").useSurchargeActions
  >;
  taskerName: string;
}

export default function SurchargeModals({
  task,
  surchargeActions,
  taskerName,
}: SurchargeModalsProps) {
  const { hideAlert } = useTaskAlert();
  const {
    surchargeStep,
    setSurchargeStep,
    closeSurchargeModal,
    handleSurchargePayment,
    surchargeModal,
    paySurchargeMutation,
    pendingSurcharge,
    rejectedSurcharge,
    rejectSurcharge,
  } = surchargeActions;

  const modalTitles = {
    request: "Price increase",
    accept: "Accept price increase",
    reject: "Reason for rejection",
    success: undefined,
    reject_success: undefined,
  } as const;

  const acceptedOffer = task.offers?.find((o) => o.status === "accepted");

  // Prefetch next likely step
  useEffect(() => {
    if (!surchargeModal.isOpen) return;

    const prefetchFn = prefetchMap[surchargeStep as keyof typeof prefetchMap];
    if (prefetchFn) {
      const timeoutId = setTimeout(() => {
        prefetchFn().catch(console.error);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [surchargeStep, surchargeModal.isOpen]);

  // Preload components when modal opens
  useEffect(() => {
    if (surchargeModal.isOpen && surchargeStep === "request") {
      import("./AcceptRequest").catch(console.error);
      import("./RejectRequest").catch(console.error);
    }
  }, [surchargeModal.isOpen, surchargeStep]);

  const closeModal = () => {
    setSurchargeStep("request");
    closeSurchargeModal();
  };

  const handleStepChange = (nextStep: typeof surchargeStep) => {
    setSurchargeStep(nextStep);
  };

  const handleAccept = () => {
    handleSurchargePayment();
  };

  return (
    <>
      <CustomModal
        title={modalTitles[surchargeStep]}
        isOpen={surchargeModal.isOpen}
        onClose={closeModal}
        contentClassName="max-w-lg"
      >
        <AnimatedStep currentStep={surchargeStep}>
          {surchargeStep === "request" && (
            <Request
              taskerName={taskerName}
              acceptedOffer={acceptedOffer}
              pendingSurcharge={pendingSurcharge}
              handleReject={() => handleStepChange("reject")}
              handleSubmit={() => handleStepChange("accept")}
            />
          )}

          {surchargeStep === "accept" && (
            <AcceptRequest
              loading={paySurchargeMutation.isPending}
              acceptedOffer={acceptedOffer}
              pendingSurcharge={pendingSurcharge}
              taskerName={taskerName}
              onSubmit={handleAccept}
            />
          )}

          {surchargeStep === "reject" && (
            <RejectRequest
              onClose={closeModal}
              pendingSurcharge={pendingSurcharge}
              handleSubmit={() => {
                hideAlert(`surcharge_${task?.id}`);
                handleStepChange("reject_success");
              }}
              rejectSurcharge={rejectSurcharge}
            />
          )}

          {surchargeStep === "success" && (
            <PaymentSuccess taskerName={taskerName} onClose={closeModal} />
          )}

          {surchargeStep === "reject_success" && (
            <Success
              title="Success"
              desc={`${taskerName} request for additional ${formatCurrency({
                value: rejectedSurcharge?.amount,
              })} has been rejected`}
            />
          )}
        </AnimatedStep>
      </CustomModal>
    </>
  );
}

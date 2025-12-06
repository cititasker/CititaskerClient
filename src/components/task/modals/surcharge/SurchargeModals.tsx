import { useEffect } from "react";
import CustomModal from "@/components/reusables/CustomModal";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import { DeleteConfirmModal } from "@/components/reusables/Modals/ConfirmModal";
import dynamic from "next/dynamic";
import Loader from "@/components/reusables/Loading";

const Request = dynamic(() => import("./Request"), {
  ssr: false,
  loading: () => <Loader />,
});

const AcceptRequest = dynamic(() => import("./AcceptRequest"), {
  ssr: false,
  loading: () => <Loader />,
});

const RejectRequest = dynamic(() => import("./RejectRequest"), {
  ssr: false,
  loading: () => <Loader />,
});

const PaymentSuccess = dynamic(() => import("./PaymentSuccess"), {
  ssr: false,
  loading: () => <Loader />,
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
  const {
    surchargeStep,
    setSurchargeStep,
    closeSurchargeModal,
    handleSurchargePayment,
    rejectSurchargeModal,
    surchargeModal,
    paySurchargeMutation,
    pendingSurcharge,
    rejectSurcharge,
  } = surchargeActions;

  const modalTitles = {
    request: "Increase price",
    accept: "Accept price increase",
    reject: "Reason for rejection",
    success: undefined,
  };

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

  const closeModal = () => {
    setSurchargeStep("request");
    closeSurchargeModal();
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
              acceptedOffer={task.offers?.find((o) => o.status === "accepted")}
              pendingSurcharge={surchargeActions.pendingSurcharge}
              handleReject={() => setSurchargeStep("reject")}
              handleSubmit={() => setSurchargeStep("accept")}
            />
          )}

          {surchargeStep === "accept" && (
            <AcceptRequest
              loading={paySurchargeMutation.isPending}
              acceptedOffer={task.offers?.find((o) => o.status === "accepted")}
              pendingSurcharge={pendingSurcharge}
              taskerName={taskerName}
              onSubmit={handleAccept}
            />
          )}

          {surchargeStep === "reject" && <RejectRequest onClose={closeModal} />}

          {surchargeStep === "success" && (
            <PaymentSuccess taskerName={taskerName} onClose={closeModal} />
          )}
        </AnimatedStep>
      </CustomModal>

      <DeleteConfirmModal
        open={rejectSurchargeModal.isOpen}
        onClose={rejectSurchargeModal.closeModal}
        title="Reject Surcharge Request"
        type="warning"
        description="Rejecting this request means the task cannot proceed until resolved. Continue?"
        confirmText="Reject"
        loading={rejectSurcharge.isPending}
        onConfirm={() =>
          pendingSurcharge &&
          rejectSurcharge.mutate({
            surcharge_id: String(pendingSurcharge.id),
          })
        }
      />
    </>
  );
}

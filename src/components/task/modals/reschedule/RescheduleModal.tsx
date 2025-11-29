import CustomModal from "@/components/reusables/CustomModal";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import { rescheduleTaskSchema, rescheduleTaskSchemaType } from "./schema";
import {
  fieldNames,
  rescheduleFormDefaults,
  RescheduleStep,
} from "@/components/task/modals/reschedule/constants";
import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import RescheduleReject from "./RescheduleReject";

const Success = dynamic(() => import("@/components/reusables/Success"), {
  ssr: false,
});

const RescheduleRequest = dynamic(() => import("./RescheduleRequest"), {
  ssr: false,
});

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: RescheduleStep;
  setStep: Dispatch<SetStateAction<RescheduleStep>>;
  role: "poster" | "tasker";
  targetName: string;
  pendingReschedule?: any;
  rejectedReschedule?: any;
  loading: boolean;
  onCreateSubmit: (data: rescheduleTaskSchemaType) => void;
  onCounterSubmit: (data: rescheduleTaskSchemaType) => void;
  onAcceptSubmit: () => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  step,
  setStep,
  targetName,
  loading,
  onCreateSubmit,
  onCounterSubmit,
  onAcceptSubmit,
}: RescheduleModalProps) {
  const isSuccessStep = step === "success";
  const showTitle = !isSuccessStep;

  return (
    <CustomModal
      title={showTitle ? "Reschedule task" : undefined}
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-lg"
    >
      <AnimatedStep currentStep={step}>
        {step === "create" && (
          <RescheduleReject<rescheduleTaskSchemaType>
            modal={{ closeModal: onClose } as any}
            schema={rescheduleTaskSchema}
            defaultValues={rescheduleFormDefaults}
            fieldNames={fieldNames}
            loading={loading}
            onSubmit={onCreateSubmit}
            canReschedule={true}
            back={() => setStep("request")}
          />
        )}

        {step === "request" && (
          <RescheduleRequest
            name={targetName}
            onReschedule={() => setStep("counter")}
            onAccept={onAcceptSubmit}
            loading={loading}
          />
        )}

        {step === "counter" && (
          <RescheduleReject<rescheduleTaskSchemaType>
            modal={{ closeModal: onClose } as any}
            schema={rescheduleTaskSchema}
            defaultValues={rescheduleFormDefaults}
            fieldNames={fieldNames}
            loading={loading}
            onSubmit={onCounterSubmit}
            canReschedule={true}
            back={() => setStep("request")}
          />
        )}

        {isSuccessStep && (
          <Success
            title="Success"
            desc={`Your request to reschedule the task has been sent to ${targetName}`}
          />
        )}
      </AnimatedStep>
    </CustomModal>
  );
}

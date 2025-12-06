import React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import { FormProvider } from "react-hook-form";
import { useCancelTask } from "./hooks/useCancelTask";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import Success from "@/components/reusables/Success";
import ActionsButtons from "@/components/reusables/ActionButtons";

interface CancelTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORM_ID = "cancel-task-form";

const stepConfig = {
  1: {
    title: "Reason for cancellation",
    description: "Help us understand why you want to cancel this task",
  },
  2: {
    title: "Confirm cancellation",
    description: "Review and confirm cancellation",
  },
  3: {
    title: "",
    description: "",
  },
} as const;

const CancelTaskModal: React.FC<CancelTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    methods,
    currentStep,
    isSubmitting,
    selectedReason,
    amountPaid,
    cancelReasons,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm,
  } = useCancelTask();

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, currentStep === 3 ? 0 : 300);
  };

  const { title, description } =
    stepConfig[currentStep as keyof typeof stepConfig];

  const isSuccess = currentStep === 3;
  const showFooter = !isSuccess;

  const getButtonText = () => {
    if (isSubmitting) return "Processing";
    return currentStep === 2 ? "Cancel Task" : "Continue";
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
      contentClassName="max-w-lg"
      customFooter={
        showFooter && (
          <ActionsButtons
            formId={FORM_ID}
            type={currentStep === 2 ? "submit" : "button"}
            cancelVariant="outline"
            handleCancel={currentStep > 1 && handleBack}
            handleSubmit={currentStep === 1 ? handleNext : undefined}
            okText={getButtonText()}
          />
        )
      }
    >
      <FormProvider {...methods}>
        <form
          id={FORM_ID}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {currentStep === 1 && (
            <StepOne reasons={cancelReasons} selectedReason={selectedReason} />
          )}

          {currentStep === 2 && <StepTwo amountPaid={amountPaid} />}

          {isSuccess && (
            <Success
              title="Task Cancelled Successfully"
              desc="Your task has been cancelled and the refund will be processed into your wallet. You'll receive an email confirmation with the refund details shortly."
            />
          )}
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default CancelTaskModal;

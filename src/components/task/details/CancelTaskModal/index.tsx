// components/CancelTaskModal.tsx
import { memo, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import CustomModal from "@/components/reusables/CustomModal";
import ActionsButtons from "@/components/reusables/ActionButtons";
import Success from "@/components/reusables/Success";
import { useCancelTask } from "./hooks/useCancelTask";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { TaskerStepTwo } from "./TaskerStepTwo";

interface CancelTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORM_ID = "cancel-task-form";

const getStepConfig = (isTasker: boolean) => {
  return {
    1: {
      title: "Reason for cancellation",
      description: "Help us understand why you want to cancel this task",
    },
    2: {
      title: "Confirm cancellation",
      description: isTasker
        ? "Cancelling this task might affect you in the following ways:"
        : "Review and confirm your cancellation",
    },
    3: {
      title: "",
      description: "",
    },
  } as const;
};

const SuccessMessage = memo(({ isTasker }: { isTasker: boolean }) => (
  <Success
    title="Task Cancelled Successfully"
    desc={
      isTasker
        ? "Your task cancellation has been submitted successfully. The poster will be notified and the task will be closed."
        : "Your task has been cancelled and the refund will be processed into your wallet. You'll receive an email confirmation with the refund details shortly."
    }
  />
));

SuccessMessage.displayName = "SuccessMessage";

const CancelTaskModal = ({ isOpen, onClose }: CancelTaskModalProps) => {
  const {
    methods,
    currentStep,
    isTasker,
    selectedReason,
    amountPaid,
    feeBreakdown,
    cancelReasons,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm,
    isCancelTaskPending,
  } = useCancelTask();

  const stepConfig = useMemo(() => getStepConfig(isTasker), [isTasker]);
  const isSuccess = currentStep === 3;

  const { title, description } = useMemo(() => {
    return (
      stepConfig[currentStep as keyof typeof stepConfig] || {
        title: "",
        description: "",
      }
    );
  }, [stepConfig, currentStep]);

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, isSuccess ? 0 : 300);
  };

  const getButtonText = () => {
    if (isCancelTaskPending) return "Processing...";
    if (currentStep === 2) return "Cancel task";
    return "Continue";
  };

  const shouldShowBackButton = currentStep === 2;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
      contentClassName="max-w-lg"
      customFooter={
        !isSuccess && (
          <ActionsButtons
            formId={FORM_ID}
            type={currentStep === 2 ? "submit" : "button"}
            cancelText={shouldShowBackButton ? "Back" : "Cancel"}
            cancelVariant={shouldShowBackButton ? "outline" : "ghost"}
            loading={isCancelTaskPending}
            disabled={isCancelTaskPending}
            handleCancel={shouldShowBackButton ? handleBack : handleClose}
            handleSubmit={currentStep === 1 ? handleNext : undefined}
            okText={getButtonText()}
          />
        )
      }
      onInteractOutside={(e: any) => {
        if (isCancelTaskPending) {
          e.preventDefault();
        }
      }}
    >
      <FormProvider {...methods}>
        <form
          id={FORM_ID}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {currentStep === 1 && (
            <StepOne
              reasons={cancelReasons}
              selectedReason={selectedReason}
              isTasker={isTasker}
            />
          )}

          {currentStep === 2 && !isTasker && (
            <StepTwo amountPaid={amountPaid} feeBreakdown={feeBreakdown} />
          )}

          {currentStep === 2 && isTasker && <TaskerStepTwo />}

          {isSuccess && <SuccessMessage isTasker={isTasker} />}
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default memo(CancelTaskModal);

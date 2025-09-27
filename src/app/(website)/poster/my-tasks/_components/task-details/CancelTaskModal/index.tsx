import React from "react";
import CustomModal from "@/components/reusables/CustomModal";
import { FormProvider } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { useCancelTask } from "./hooks/useCancelTask";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import FormButton from "@/components/forms/FormButton";
import Success from "@/components/reusables/Success";
import ActionsButtons from "@/components/reusables/ActionButtons";

interface CancelTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stepConfig = [
  {
    title: "Reason for Cancellation",
    description: "Help us understand why you want to cancel this task",
  },
  {
    title: "Cancellation Fee",
    description: "Review the refund breakdown and confirm cancellation",
  },
  {
    title: "Confirmation",
    description: "",
  },
];

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
    if (currentStep === 3) {
      onClose();
      resetForm();
    } else {
      onClose();
      setTimeout(resetForm, 300); // Delay reset for smooth modal close
    }
  };

  const { title, description } = stepConfig[currentStep - 1];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne reasons={cancelReasons} selectedReason={selectedReason} />
        );
      case 2:
        return <StepTwo amountPaid={amountPaid} />;
      case 3:
        return (
          <Success
            title="Task Cancelled Successfully"
            desc="Your task has been cancelled and the refund will be processed within 3-5
        business days. You'll receive an email confirmation with the refund
        details shortly."
            action={
              <FormButton
                text="Continue"
                icon={<ArrowRight className="w-4 h-4 ml-2" />}
                onClick={handleClose}
              />
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
      contentClassName="max-w-lg"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6 flex flex-col h-full"
        >
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {renderStepContent()}
          </div>

          {/* ✅ Move the footer *inside* the form */}
          {currentStep < 3 && (
            <ActionsButtons
              type={currentStep === 2 ? "submit" : "button"}
              cancelVariant="outline"
              handleCancel={currentStep > 1 && handleBack}
              handleSubmit={currentStep === 1 ? handleNext : undefined}
              okText={
                isSubmitting
                  ? "Processing"
                  : currentStep === 2
                  ? "Cancel Task"
                  : "Continue"
              }
            />
          )}
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default CancelTaskModal;

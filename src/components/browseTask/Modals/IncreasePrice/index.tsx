"use client";

import React from "react";
import { useAppSelector } from "@/store/hook";
import CustomModal from "@/components/reusables/CustomModal";
import StepOne from "../shared/StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Success from "@/components/reusables/Success";
import { initializeName } from "@/utils";
import { useStepFormAction } from "@/hooks/useStepFormAction";
import { usePurgeData } from "@/utils/dataPurge";
import AnimatedStep from "@/components/reusables/AnimatedStep";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const steps = [
  {
    title: "Increase price",
    content: (nextStep: () => void) => (
      <StepOne
        nextStep={nextStep}
        budgetLabel="Enter additional amount"
        firstRowLabel="Price increase for the task"
        increasePrice
      />
    ),
  },
  {
    title: "Reason for increasing price",
    description: "Let the Poster know why you are increasing price",
    content: (nextStep: () => void, prevStep: () => void) => (
      <StepTwo nextStep={nextStep} prevStep={prevStep} />
    ),
  },
  {
    title: "Preview",
    content: (nextStep: () => void, prevStep: () => void) => (
      <StepThree nextStep={nextStep} prevStep={prevStep} />
    ),
  },
];

const IncreasePriceModal: React.FC<Props> = ({ open, handleClose }) => {
  const { currentStep, nextStep, prevStep } = useStepFormAction(open);
  const { purgeOffer } = usePurgeData();

  const { isAuth } = useAppSelector((state) => state.user);
  const { taskDetails } = useAppSelector((state) => state.task);
  const posterName = initializeName({
    first_name: taskDetails?.poster_profile?.first_name,
    last_name: taskDetails?.poster_profile?.last_name,
  });

  const isFinalStep = currentStep === steps.length + 1;

  const closeModal = async () => {
    if (isAuth) await purgeOffer();
    handleClose();
  };

  return (
    <CustomModal
      isOpen={open}
      onClose={closeModal}
      title={!isFinalStep ? steps[currentStep - 1]?.title : undefined}
      description={
        !isFinalStep ? steps[currentStep - 1]?.description : undefined
      }
    >
      <div className="relative">
        <AnimatedStep currentStep={currentStep}>
          {isFinalStep ? (
            <Success
              title="Success"
              desc={`Your request was successfully sent to ${posterName}`}
              className="justify-center py-8"
            />
          ) : (
            steps[currentStep - 1]?.content(nextStep, prevStep)
          )}
        </AnimatedStep>
      </div>
    </CustomModal>
  );
};

export default IncreasePriceModal;

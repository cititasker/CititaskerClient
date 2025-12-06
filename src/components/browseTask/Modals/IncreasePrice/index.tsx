"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/store/hook";
import CustomModal from "@/components/reusables/CustomModal";
import Success from "@/components/reusables/Success";
import { initializeName } from "@/utils";
import { useStepFormAction } from "@/hooks/useStepFormAction";
import { usePurgeData } from "@/utils/dataPurge";
import AnimatedStep from "@/components/reusables/AnimatedStep";

const StepOne = dynamic(() => import("../shared/StepOne"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded" />,
});

const StepTwo = dynamic(() => import("./StepTwo"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded" />,
});

const StepThree = dynamic(() => import("./StepThree"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded" />,
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

const IncreasePriceModal: React.FC<Props> = ({ open, handleClose }) => {
  const { currentStep, nextStep, prevStep } = useStepFormAction(open);
  const { purgeOffer } = usePurgeData();

  const { isAuth } = useAppSelector((state) => state.user);
  const { taskDetails } = useAppSelector((state) => state.task);
  const posterName = initializeName({
    first_name: taskDetails?.poster_profile?.first_name,
    last_name: taskDetails?.poster_profile?.last_name,
  });

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
        <Suspense
          fallback={<div className="h-48 animate-pulse bg-gray-100 rounded" />}
        >
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
        </Suspense>
      </div>
    </CustomModal>
  );
};

export default IncreasePriceModal;

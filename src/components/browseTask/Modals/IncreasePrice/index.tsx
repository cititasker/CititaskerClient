"use client";

import React from "react";
import { useAppSelector } from "@/store/hook";
import CustomModal from "@/components/reusables/CustomModal";
import { AnimatePresence, motion } from "framer-motion";
import StepOne from "../shared/StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Success from "@/components/reusables/Success";
import { initializeName } from "@/utils";
import { useStepFormAction } from "@/hooks/useStepFormAction";
import { animationVariant } from "@/constant";
import { usePurgeData } from "@/utils/dataPurge";

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
    title: "Preview price",
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
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial="enter"
            animate="center"
            exit="exit"
            variants={animationVariant}
            transition={{
              duration: 0.25,
              ease: [0.4, 0.0, 0.2, 1], // Custom easing curve for smooth feel
            }}
            className="w-full"
          >
            {isFinalStep ? (
              <Success
                title="Success"
                desc={`Your request was successfully sent to ${posterName}`}
                className="justify-center"
              />
            ) : (
              steps[currentStep - 1]?.content(nextStep, prevStep)
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </CustomModal>
  );
};

export default IncreasePriceModal;

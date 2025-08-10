"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { purgeStateData } from "@/store/slices/task";
import CustomModal from "@/components/reusables/CustomModal";
import { AnimatePresence, motion } from "framer-motion";
import { animationVariants } from "@/constant";
import StepOne from "../shared/StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Success from "@/components/reusables/Success";
import { initializeName } from "@/utils";
import { useStepFormAction } from "@/hooks/useStepFormAction";

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
  const { currentStep, direction, nextStep, prevStep } =
    useStepFormAction(open);
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.user);
  const { taskDetails } = useAppSelector((state) => state.task);
  const posterName = initializeName({
    first_name: taskDetails?.poster_profile?.first_name,
    last_name: taskDetails?.poster_profile?.last_name,
  });

  const isFinalStep = currentStep === steps.length + 1;

  const closeModal = () => {
    if (isAuth) dispatch(purgeStateData({ path: "offer" }));
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={direction === "forward" ? "enterFromRight" : "enterFromLeft"}
          animate="center"
          exit={direction === "forward" ? "exitToLeft" : "exitToRight"}
          variants={animationVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {isFinalStep ? (
            <Success
              title="Success"
              desc={`Your request was successfully sent to ${posterName}`}
              className="justify-center"
              contentClassName="mt-0"
            />
          ) : (
            steps[currentStep - 1]?.content(nextStep, prevStep)
          )}
        </motion.div>
      </AnimatePresence>
    </CustomModal>
  );
};

export default IncreasePriceModal;

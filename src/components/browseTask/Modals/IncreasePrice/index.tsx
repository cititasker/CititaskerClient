"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { purgeStateData } from "@/store/slices/task";
import CustomModal from "@/components/reusables/CustomModal";
import { AnimatePresence, motion } from "framer-motion";
import { animationVariants } from "@/constant";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepOne from "../shared/StepOne";
import Success from "@/components/reusables/Success";
import { initializeName } from "@/utils";

interface MakeOfferModalProps {
  open: boolean;
  handleClose: () => void;
}

const IncreasePriceModal: React.FC<MakeOfferModalProps> = ({
  open,
  handleClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);
  const {
    taskDetails: { poster_profile },
  } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (open) {
      setCurrentStep(1);
    }
  }, [open]);

  const nextStep = () => {
    const next = currentStep + 1;
    setDirection("forward");
    setCurrentStep(next);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection("backward");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            title="Increase price"
            budgetLabel="Enter additional amount"
            firstRowLabel="Price increase for the task"
            increasePrice
          />
        );
      case 2:
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return (
          <div className="flex flex-col space-y-6 min-h-[450px]">
            <Success
              title="Success"
              desc={`Your request was successfully sent to ${initializeName({
                first_name: poster_profile?.first_name,
                last_name: poster_profile?.last_name,
              })}`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const closeModal = () => {
    if (isAuth) {
      dispatch(purgeStateData({ path: "offer" }));
    }
    handleClose();
  };

  return (
    <CustomModal
      isOpen={open}
      onClose={closeModal}
      contentClassName="min-h-[400px] sm:min-h-[537px]"
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
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </CustomModal>
  );
};

export default IncreasePriceModal;

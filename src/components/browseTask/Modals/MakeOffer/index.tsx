"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { purgeStateData } from "@/store/slices/task";
import CustomModal from "@/components/reusables/CustomModal";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { AnimatePresence, motion } from "framer-motion";
import { animationVariants } from "@/constant";
import StepOne from "../shared/StepOne";

interface MakeOfferModalProps {
  open: boolean;
  handleClose: () => void;
  isEdit?: boolean;
}

const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  open,
  handleClose,
  isEdit,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [edit, setEdit] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [showConfetti, setShowConfetti] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);
  const { taskersOffer } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (open) {
      setEdit(isEdit ?? !!taskersOffer);
      setCurrentStep(1);
    }
  }, [open]);

  const nextStep = () => {
    const next = currentStep + 1;
    setDirection("forward");
    setCurrentStep(next);
    if (next === 4 && !edit) setShowConfetti(true);
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
            title="Make Offer"
            budgetLabel="Enter your offer amount"
            firstRowLabel="Total offer"
          />
        );
      case 2:
        return (
          <StepTwo nextStep={nextStep} prevStep={prevStep} isEdit={edit} />
        );
      case 3:
        return (
          <StepThree nextStep={nextStep} prevStep={prevStep} isEdit={edit} />
        );
      case 4:
        return <StepFour isEdit={edit} />;
      default:
        return null;
    }
  };

  const closeModal = () => {
    if (isAuth) {
      dispatch(purgeStateData({ path: "offer" }));
    }
    setShowConfetti(false);
    handleClose();
  };

  return (
    <CustomModal
      isOpen={open}
      onClose={closeModal}
      aria-labelledby="make-offer-modal-title"
      aria-describedby="make-offer-modal-description"
      confetti={showConfetti}
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

export default MakeOfferModal;

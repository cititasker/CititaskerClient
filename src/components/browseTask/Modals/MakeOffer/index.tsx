"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { purgeStateData } from "@/store/slices/task";
import CustomModal from "@/components/reusables/CustomModal";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepOne from "../shared/StepOne";
import AnimatedStep from "@/components/reusables/AnimatedStep";

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
            title={edit ? "Update Offer" : "Make Offer"}
            budgetLabel={`${edit ? "Update" : "Enter"} your offer amount`}
            firstRowLabel="Total offer"
            increasePrice={edit}
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
      <AnimatedStep
        direction={direction}
        currentStep={currentStep}
        renderStepContent={renderStepContent}
      />
    </CustomModal>
  );
};

export default MakeOfferModal;

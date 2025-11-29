"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import CustomModal from "@/components/reusables/CustomModal";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepOne from "../shared/StepOne";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import { usePurgeData } from "@/utils/dataPurge";

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
  const [showConfetti, setShowConfetti] = useState(false);

  const { isAuth } = useAppSelector((state) => state.user);
  const { taskersOffer } = useAppSelector((state) => state.task);
  const { purgeOffer } = usePurgeData();

  useEffect(() => {
    if (open) {
      setEdit(isEdit ?? !!taskersOffer);
      setCurrentStep(1);
    }
  }, [open]);

  const nextStep = () => {
    const next = currentStep + 1;
    setCurrentStep(next);
    if (next === 4 && !edit) setShowConfetti(true);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            budgetLabel={`${edit ? "Update" : "Enter"} your offer amount`}
            firstRowLabel="Total offer"
            isEdit={edit}
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
        return <StepFour />;
      default:
        return null;
    }
  };

  const closeModal = async () => {
    if (isAuth) {
      await purgeOffer();
    }
    setShowConfetti(false);
    handleClose();
  };

  const modalTitle = [1, 2].includes(currentStep)
    ? edit
      ? "Update offer"
      : "Make offer"
    : currentStep == 3
    ? "Preview offer"
    : undefined;

  return (
    <CustomModal
      isOpen={open}
      onClose={closeModal}
      aria-labelledby="make-offer-modal-title"
      aria-describedby="make-offer-modal-description"
      confetti={showConfetti}
      title={modalTitle}
    >
      <AnimatedStep
        currentStep={currentStep}
        renderStepContent={renderStepContent}
      />
    </CustomModal>
  );
};

export default MakeOfferModal;

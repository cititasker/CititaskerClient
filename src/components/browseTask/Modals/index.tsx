"use client";
import * as React from "react";
import { useState } from "react";
import { purgeStateData } from "@/store/slices/task";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CustomModal from "@/components/reusables/CustomModal";
import theme from "@/providers/theme";
import StepOne from "./MakeOffer/StepOne";
import StepTwo from "./MakeOffer/StepTwo";
import StepThree from "./MakeOffer/StepThree";
import StepFour from "./MakeOffer/StepFour";

interface ModalType {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function MakeOfferModal({ open, handleClose }: ModalType) {
  const [currentStep, setCurrentStep] = useState(1);
  const [edit, setEdit] = useState(false);
  const { isAuth } = useAppSelector((state) => state.user);
  const { taskersOffer } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setEdit(!!taskersOffer);
  }, []);

  console.log(2233, edit);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne nextStep={nextStep} />;
      case 2:
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepFour />;
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      confetti={currentStep === 4 && !edit}
      paperStyle={{
        maxWidth: "576px",
        p: "20px",

        [theme.breakpoints.up("sm")]: {
          px: "34px",
          py: "24px",
          borderRadius: "40px",
        },
      }}
    >
      {renderStepContent()}
    </CustomModal>
  );
}

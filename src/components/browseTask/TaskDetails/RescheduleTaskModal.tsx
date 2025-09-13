"use client";

import { useState, JSX } from "react";
import CustomModal from "@/components/reusables/CustomModal";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import Reschedule from "./Reschedule";
import RescheduleSuccess from "./Reschedule/RescheduleSuccess";
import { useAppSelector } from "@/store/hook";
import { UseModalReturn } from "@/constant/interface";

interface IProps {
  rescheduleModal: UseModalReturn;
}

const RescheduleTaskModal = ({ rescheduleModal }: IProps) => {
  const { taskDetails } = useAppSelector((state) => state.task);
  const { user } = useAppSelector((state) => state.user);
  const canReschedule = taskDetails.tasker?.id === user.id;

  const [step, setStep] = useState(1);

  const handleOptionClick = (action: string) => {
    if (action === "reschedule") {
      rescheduleModal.openModal();
    }
  };

  const resetModal = () => {
    rescheduleModal.closeModal();
    setStep(1);
  };

  const stepContent: Record<number, JSX.Element> = {
    1: <Reschedule onClose={resetModal} next={() => setStep(2)} />,
    2: <RescheduleSuccess />,
  };

  const modalTitle = step === 1 ? "Reschedule Time and Date" : undefined;
  const modalDescription =
    step === 1
      ? "Let the Poster know when you will be doing the task."
      : undefined;

  if (!canReschedule) return null;

  return (
    <CustomModal
      isOpen={rescheduleModal.isOpen}
      onClose={resetModal}
      title={modalTitle}
      description={modalDescription}
    >
      <AnimatedStep currentStep={step}>{stepContent[step]}</AnimatedStep>
    </CustomModal>
  );
};

export default RescheduleTaskModal;

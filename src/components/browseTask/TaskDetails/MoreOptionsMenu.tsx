"use client";

import { useState, JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/reusables/CustomModal";
import AnimatedStep from "@/components/reusables/AnimatedStep";
import Reschedule from "./Reschedule";
import RescheduleSuccess from "./Reschedule/RescheduleSuccess";
import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/store/hook";

interface IProps {
  options: { value: string; label: string }[];
}

const MoreOptionsMenu = ({ options }: IProps) => {
  const { taskDetails } = useAppSelector((state) => state.task);
  const { user } = useAppSelector((state) => state.user);
  const canReschedule = taskDetails.tasker?.id === user.id;

  const rescheduleModal = useModal();
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-black-2 rounded-[10px] border-none bg-light-grey font-normal"
          >
            More Options
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-0 w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-light-grey">
          {options.map(({ value, label }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => handleOptionClick(value)}
              className="focus-visible:bg-transparent px-5 py-3 border-b border-table-stroke last:border-none"
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomModal
        isOpen={rescheduleModal.isOpen}
        onClose={resetModal}
        title={modalTitle}
        description={modalDescription}
      >
        <AnimatedStep currentStep={step}>{stepContent[step]}</AnimatedStep>
      </CustomModal>
    </>
  );
};

export default MoreOptionsMenu;

"use client";
import React, { useMemo, useState } from "react";
import VerificationModal from "../Modals/VerifyModal/Verify";
import MakeOfferModal from "../Modals/MakeOffer";
import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/store/hook";
import BudgetDisplay from "./BudgetDisplay";
import IncreasePriceModal from "../Modals/IncreasePrice";
import CompleteTaskModal from "../Modals/CompleteTaskModal";
import MoreOptionsMenu from "@/components/reusables/MoreOptionMenu";
import { useTaskState } from "./hooks/useTaskState";
import { useVerifications } from "./hooks/useVerifications";
import { useMoreOptions } from "./hooks/useMoreOptions";
import { useTaskActions } from "@/components/task/hooks";
import FormButton from "@/components/forms/FormButton";

interface TaskBudgetProps {
  task: ITask;
  handleOptionSelect: (action: MoreOptionItem) => void;
}

const TaskBudget: React.FC<TaskBudgetProps> = ({
  task,
  handleOptionSelect,
}) => {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const increaseBudget = useModal();
  const completeTask = useModal();
  const offerModal = useModal();

  const { isAuth, user } = useAppSelector((state) => state.user);

  const state = useTaskState(task);
  const verifications = useVerifications(user);
  const moreOptions = useMoreOptions(state);
  const hasDispute = task.has_disputes;

  const { updatedBudget } = useTaskActions({ task });

  const buttonConfig = useMemo(() => {
    if (state.canMakeOffer) return { text: "Make offer", action: "offer" };
    if (state.canUpdateOffer) return { text: "Update offer", action: "offer" };
    if (state.canCompleteTask)
      return { text: "Complete task", action: "complete" };
    if (state.hasCompletedTask)
      return { text: "Payment requested", action: "none" };
    return { text: "Assigned", action: "none" };
  }, [state]);

  // const isButtonDisabled = !["offer", "complete"].includes(buttonConfig.action);
  const isButtonDisabled =
    state.hasCompletedTask ||
    !(state.canMakeOffer || state.canUpdateOffer || state.canCompleteTask);

  const handleMainAction = () => {
    if (!state.hasCompletedKyc) {
      setVerifyModalOpen(true);
      return;
    }

    switch (buttonConfig.action) {
      case "offer":
        offerModal.openModal();
        break;
      case "complete":
        completeTask.openModal();
        break;
    }
  };

  return (
    <>
      <div className="space-y-2">
        <BudgetDisplay
          budget={updatedBudget}
          buttonText={buttonConfig.text}
          onIncrease={increaseBudget.openModal}
          handleButtonClick={handleMainAction}
          isButtonDisabled={isButtonDisabled}
          canIncreaseOffer={
            state.canCompleteTask && !task.has_surcharge_requests
          }
        />
        {isAuth && moreOptions.length > 0 && (
          <div>
            <MoreOptionsMenu
              moreOptions={moreOptions}
              onSelect={handleOptionSelect}
              className="w-full h-10"
            />
          </div>
        )}
        {hasDispute && state.isTaskAssignedToYou && (
          <FormButton
            variant="link"
            className="p-0 h-auto underline block ml-auto"
            href={`/${user.role}/dispute/${task.id}`}
          >
            View dispute
          </FormButton>
        )}
      </div>

      <VerificationModal
        open={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        verifications={verifications}
      />

      <MakeOfferModal
        open={offerModal.isOpen}
        handleClose={offerModal.closeModal}
        isEdit={state.hasMadeOffer}
      />

      <IncreasePriceModal
        open={increaseBudget.isOpen}
        handleClose={increaseBudget.closeModal}
      />

      <CompleteTaskModal
        isOpen={completeTask.isOpen}
        onClose={completeTask.closeModal}
      />
    </>
  );
};

export default TaskBudget;

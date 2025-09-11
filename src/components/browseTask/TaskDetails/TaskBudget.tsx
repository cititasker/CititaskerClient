"use client";
import React, { useMemo, useState } from "react";
import VerificationModal from "../Modals/VerifyModal/Verify";
import MakeOfferModal from "../Modals/MakeOffer";
import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/store/hook";
import BudgetDisplay from "./BudgetDisplay";
import MoreOptionsMenu from "./MoreOptionsMenu";
import IncreasePriceModal from "../Modals/IncreasePrice";
import CompleteTaskModal from "../Modals/CompleteTaskModal";

interface TaskBudgetProps {
  task: ITask;
}

const TaskBudget: React.FC<TaskBudgetProps> = ({ task }) => {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const increaseBudget = useModal();
  const completeTask = useModal();

  const { isOpen: offerModalOpen, openModal, closeModal } = useModal();

  const { isAuth, user } = useAppSelector((state) => state.user);

  console.log(899, task);

  const status = task.status;
  const isOpen = status === "open";
  const isAssigned = status === "assigned";
  const isTaskAssignedToYou =
    isAssigned && task.tasker && task.tasker.id == user.id;
  const hasCompletedTask = task.payment_requested && isTaskAssignedToYou;

  const hasMadeOffer = useMemo(
    () => task.offers.some((el) => el.tasker.id === user?.id),
    [task.offers, user?.id]
  );

  const hasCompletedKyc = useMemo(
    () => !!user.kyc_stage && Object.values(user.kyc_stage).every(Boolean),
    [user.kyc_stage]
  );

  const canMakeOffer = isOpen && !hasMadeOffer;
  const canUpdateOffer = isOpen && hasMadeOffer;
  const canCompleteTask = isAssigned && hasMadeOffer && !hasCompletedTask;

  const buttonText = useMemo(() => {
    if (canMakeOffer) return "Make offer";
    if (canUpdateOffer) return "Update offer";
    if (canCompleteTask) return "Complete task";
    if (hasCompletedTask) return "Payment requested";
    return "Assigned";
  }, [canMakeOffer, canUpdateOffer, canCompleteTask, hasCompletedTask]);

  const isButtonDisabled =
    hasCompletedTask || !(canMakeOffer || canUpdateOffer || canCompleteTask);

  const handleButtonClick = () => {
    if (hasCompletedKyc) {
      setVerifyModalOpen(true);
    } else if (canMakeOffer || canUpdateOffer) {
      openModal();
    } else if (canCompleteTask) {
      completeTask.openModal();
    }
  };

  const verifications = useMemo(() => {
    const kyc = (user.kyc_stage || {}) as any;
    return {
      face: kyc.face_verification || false,
      id: kyc.id_verification || false,
      bank: kyc.bank || false,
      home: kyc.home_address || false,
      profile: kyc.profile || false,
    };
  }, [user.kyc_stage]);

  const moreOptions = useMemo(() => {
    return [
      isTaskAssignedToYou &&
        !hasCompletedTask && { value: "reschedule", label: "Reschedule task" },
      hasCompletedTask && { value: "add-to-alert", label: "Add task to alert" },
    ].filter((el) => !!el);
  }, []);

  return (
    <>
      <div>
        <BudgetDisplay
          budget={task.budget}
          buttonText={buttonText}
          onIncrease={increaseBudget.openModal}
          handleButtonClick={handleButtonClick}
          isButtonDisabled={isButtonDisabled}
          canIncreaseOffer={canCompleteTask}
        />
        {isAuth && (
          <div className="mt-1">
            <MoreOptionsMenu options={moreOptions} />
          </div>
        )}
      </div>

      <VerificationModal
        open={verifyModalOpen}
        handleClose={() => setVerifyModalOpen(false)}
        verifications={verifications}
      />

      <MakeOfferModal
        open={offerModalOpen}
        handleClose={closeModal}
        isEdit={hasMadeOffer}
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

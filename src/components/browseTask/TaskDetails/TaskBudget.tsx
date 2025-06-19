"use client";
import React, { useMemo, useState } from "react";
import { useRequestPayment } from "@/queries/task";
import VerificationModal from "../Modals/VerifyModal/Verify";
import MakeOfferModal from "../Modals";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppSelector } from "@/store/hook";
import BudgetDisplay from "./BudgetDisplay";
import MoreOptionsMenu from "./MoreOptionsMenu";
import { API_ROUTES } from "@/constant";

interface TaskBudgetProps {
  task: ITask;
}

const TaskBudget: React.FC<TaskBudgetProps> = ({ task }) => {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const { isOpen: offerModalOpen, openModal, closeModal } = useModal();
  const [isIncreaseBudget, setIsIncreaseBudget] = useState(false);

  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { isAuth, user } = useAppSelector((state) => state.user);

  const requestPaymentMutation = useRequestPayment();

  const isOpen = task.status === "open";
  const isAssigned = task.status === "assigned";
  const isRequested = task.payment_requested === "true";

  const hasMadeOffer = useMemo(
    () => task.offers.some((el) => el.tasker.id === user?.id),
    [task, user]
  );

  const canMakeOffer = isOpen && !hasMadeOffer;
  const canUpdateOffer = isOpen && hasMadeOffer;
  const canRequestPayment = isAssigned && hasMadeOffer && !isRequested;

  const buttonText = useMemo(() => {
    if (canMakeOffer) return "Make an Offer";
    if (canUpdateOffer) return "Update Offer";
    if (canRequestPayment) return "Request Payment";
    if (isRequested) return "Payment Requested";
    return "Assigned";
  }, [canMakeOffer, canUpdateOffer, canRequestPayment, isRequested]);

  const isButtonDisabled =
    isRequested || (!canMakeOffer && !canUpdateOffer && !canRequestPayment);

  const handleButtonClick = () => {
    if (canMakeOffer || canUpdateOffer) {
      openModal();
      setIsIncreaseBudget(false);
    } else if (canRequestPayment) {
      requestPaymentMutation.mutate(
        { task_id: task.id },
        {
          onSuccess: (data) => {
            showSnackbar(data.message, "success");
            queryClient.invalidateQueries({
              queryKey: [API_ROUTES.GET_TASK_BY_ID, task.id],
            });
          },
          onError: (error) => {
            showSnackbar(error.message, "error");
          },
        }
      );
    }
  };

  const handleIncreaseBudget = () => {
    setIsIncreaseBudget(true);
    openModal();
  };

  return (
    <>
      <div>
        <BudgetDisplay
          budget={task.budget}
          buttonText={buttonText}
          onIncrease={handleIncreaseBudget}
          handleButtonClick={handleButtonClick}
          isButtonDisabled={isButtonDisabled}
          loading={requestPaymentMutation.isPending}
          canIncreaseOffer={canRequestPayment}
        />

        {isAuth && (
          <div className="mt-1">
            <MoreOptionsMenu />
          </div>
        )}
      </div>

      {/* Modals */}
      <VerificationModal
        open={verifyModalOpen}
        handleClose={() => setVerifyModalOpen(false)}
        verifications={{ face: false, id: false, bank: false, home: false }}
      />

      <MakeOfferModal
        open={offerModalOpen}
        handleClose={closeModal}
        isIncreaseBudget={isIncreaseBudget}
        isEdit={hasMadeOffer}
      />
    </>
  );
};

export default TaskBudget;

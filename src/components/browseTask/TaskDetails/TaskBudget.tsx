"use client";
import React, { useMemo, useState } from "react";
import { useRequestPayment } from "@/queries/task";
import VerificationModal from "../Modals/VerifyModal/Verify";
import MakeOfferModal from "../Modals/MakeOffer";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppSelector } from "@/store/hook";
import BudgetDisplay from "./BudgetDisplay";
import MoreOptionsMenu from "./MoreOptionsMenu";
import { API_ROUTES } from "@/constant";
import IncreasePriceModal from "../Modals/IncreasePrice";

interface TaskBudgetProps {
  task: ITask;
}

const TaskBudget: React.FC<TaskBudgetProps> = ({ task }) => {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const increaseBudget = useModal();

  const { isOpen: offerModalOpen, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { isAuth, user } = useAppSelector((state) => state.user);

  const requestPaymentMutation = useRequestPayment();

  const status = task.status;
  const isOpen = status === "open";
  const isAssigned = status === "assigned";
  const isRequested = task.payment_requested === "true";

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
  const canRequestPayment = isAssigned && hasMadeOffer && !isRequested;

  const buttonText = useMemo(() => {
    if (canMakeOffer) return "Make Offer";
    if (canUpdateOffer) return "Update Offer";
    if (canRequestPayment) return "Request Payment";
    if (isRequested) return "Payment Requested";
    return "Assigned";
  }, [canMakeOffer, canUpdateOffer, canRequestPayment, isRequested]);

  const isButtonDisabled =
    isRequested || !(canMakeOffer || canUpdateOffer || canRequestPayment);

  const handleButtonClick = () => {
    if (hasCompletedKyc) {
      setVerifyModalOpen(true);
    } else if (canMakeOffer || canUpdateOffer) {
      openModal();
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

  return (
    <>
      <div>
        <BudgetDisplay
          budget={task.budget}
          buttonText={buttonText}
          onIncrease={increaseBudget.openModal}
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
    </>
  );
};

export default TaskBudget;

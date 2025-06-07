"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import Link from "next/link";

import { useRequestPayment } from "@/queries/task";
import FormButton from "@/components/forms/FormButton";
import VerificationModal from "../Modals/VerifyModal/Verify";
import MakeOfferModal from "../Modals";
import { formatCurrency } from "@/utils";
import useModal from "@/hooks/useModal";
import { GET_TASK_BY_ID } from "@/queries/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppSelector } from "@/store/hook";
import BudgetDisplay from "./BudgetDisplay";
import MoreOptionsMenu from "./MoreOptionsMenu";

interface TaskBudgetProps {
  task: ITask;
  hasMadeOffer: boolean;
}

const TaskBudget: React.FC<TaskBudgetProps> = ({ task, hasMadeOffer }) => {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const {
    isOpen: offerModalOpen,
    openModal: openOfferModal,
    closeModal: closeOfferModal,
  } = useModal();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { isAuth } = useAppSelector((state) => state.user);

  const moreOptionsRef = useRef<HTMLButtonElement>(null);
  const [openMoreOptions, setOpenMoreOptions] = useState(false);
  const prevOpen = useRef(openMoreOptions);
  const [isIncreaseBudget, setIsIncreaseBudget] = useState(false);

  const requestPaymentMutation = useRequestPayment();

  const verifications = useMemo(
    () => ({ face: false, id: false, bank: false, home: false }),
    []
  );

  const isRequested = task.payment_requested === "true";
  const isOpen = task.status === "open";
  const isAssigned = task.status === "assigned";

  const buttonText = useMemo(() => {
    if (isOpen) return hasMadeOffer ? "Update Offer" : "Make an Offer";
    if (hasMadeOffer)
      return isRequested ? "Requested Payment" : "Request Payment";
    if (isAssigned) return "Assigned";
    return "Unavailable";
  }, [isOpen, isAssigned, isRequested, hasMadeOffer]);

  const isButtonDisabled = (!isOpen && !hasMadeOffer) || isRequested;

  const handleButtonClick = () => {
    const isAllVerified = Object.values(verifications).every(Boolean);
    if (isAllVerified) {
      setVerifyModalOpen(true);
    } else if (hasMadeOffer) {
      requestPaymentMutation.mutate(
        { task_id: task.id },
        {
          onSuccess(data) {
            showSnackbar(data.message, "success");
            queryClient.invalidateQueries({
              queryKey: [GET_TASK_BY_ID(task.id)],
            });
          },
          onError(error) {
            showSnackbar(error.message, "error");
          },
        }
      );
    } else {
      openOfferModal();
    }
  };

  const increaseBudget = () => {
    setIsIncreaseBudget(true);
    openOfferModal();
  };

  const handleToggleMoreOptions = () => setOpenMoreOptions((prev) => !prev);
  const handleCloseMoreOptions = (event: Event | React.SyntheticEvent) => {
    if (moreOptionsRef.current?.contains(event.target as HTMLElement)) return;
    setOpenMoreOptions(false);
  };

  useEffect(() => {
    if (prevOpen.current && !openMoreOptions) moreOptionsRef.current?.focus();
    prevOpen.current = openMoreOptions;
  }, [openMoreOptions]);

  return (
    <>
      <div>
        <BudgetDisplay budget={task.budget} onIncrease={increaseBudget} />

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
        verifications={verifications}
      />
      <MakeOfferModal
        open={offerModalOpen}
        handleClose={closeOfferModal}
        handleOpen={() => {
          openOfferModal();
          setIsIncreaseBudget(false);
        }}
        isIncreaseBudget={isIncreaseBudget}
      />
    </>
  );
};

export default TaskBudget;

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
import { TASK_ID } from "@/queries/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppSelector } from "@/store/hook";

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
            queryClient.invalidateQueries({ queryKey: [TASK_ID(task.id)] });
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
        <div className="rounded-[10px] p-[17px] bg-light-primary-1 text-center">
          <p className="text-dark-grey-2 text-sm mb-5">Estimated Task Budget</p>
          <div className="space-y-3">
            <h2 className="text-[2rem] font-semibold text-black-2">
              {formatCurrency({ value: task.budget, noFraction: true })}
            </h2>
            <button
              onClick={increaseBudget}
              className="bg-white py-2 max-w-[175px] w-full mx-auto text-secondary text-xs font-medium rounded-20"
            >
              + Increase Price
            </button>
            <FormButton
              handleClick={handleButtonClick}
              className="text-base font-normal w-full"
              disabled={isButtonDisabled}
              loading={requestPaymentMutation.isPending}
            >
              {buttonText}
            </FormButton>
          </div>
        </div>

        {isAuth && (
          <div className="mt-2">
            <Button
              ref={moreOptionsRef}
              onClick={handleToggleMoreOptions}
              className="!bg-light-grey w-full text-black-2"
            >
              More Options
            </Button>
            <Popper
              open={openMoreOptions}
              anchorEl={moreOptionsRef.current}
              placement="bottom-start"
              transition
              disablePortal
              className="max-w-[194px] w-full bg-white border border-light-grey"
            >
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: "left top" }}
                >
                  <Paper elevation={0} className="w-full">
                    <ClickAwayListener onClickAway={handleCloseMoreOptions}>
                      <MenuList autoFocusItem={openMoreOptions} disablePadding>
                        <MenuItem component={Link} href="/profile">
                          Profile
                        </MenuItem>
                        <MenuItem component={Link} href="/dashboard">
                          My account
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
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

"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TaskerOffer from "./TaskerOffer";
import ConfirmationModal from "@/components/reusables/Modals/ConfirmationModal";
import { withdrawOffer } from "@/services/offer";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { queryClient } from "@/providers/ServerProvider";
import { useAppDispatch } from "@/store/hook";
import { setUserTaskOffer } from "@/store/slices/task";
import { errorHandler } from "@/utils";
import { API_ROUTES } from "@/constant";
import Empty from "@/components/myTasks/Empty";

interface OfferProps {
  offers: IOffer[];
}

const Offer: React.FC<OfferProps> = ({ offers }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleToggleModal = (offerId?: string) => {
    setSelectedOfferId(offerId ?? null);
    setModalOpen((prev) => !prev);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: withdrawOffer,
    onSuccess: (data) => {
      dispatch(setUserTaskOffer(null));
      showSnackbar(data.message, "success");
      handleToggleModal();
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
      });
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const handleWithdraw = () => {
    if (selectedOfferId) {
      mutate({ offer_id: selectedOfferId });
    }
  };

  return (
    <>
      <div className="w-full">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <TaskerOffer
              key={offer.id}
              offer={offer}
              toggleModal={() => handleToggleModal(`${offer.id}`)}
            />
          ))
        ) : (
          <Empty text=" No offer has been made yet" />
        )}
      </div>

      <ConfirmationModal
        open={modalOpen}
        onClose={handleToggleModal}
        title="Cancel Offer"
        content="Are you sure you want to cancel your offer?"
        cancelText="Back"
        okVariant="destructive"
        loading={isPending}
        handleSubmit={handleWithdraw}
      />
    </>
  );
};

export default Offer;

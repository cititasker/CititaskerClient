import React, { useState } from "react";
import { errorHandler } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { withdrawOffer } from "@/services/offer";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { queryClient } from "@/providers/ServerProvider";
import { TASK_ID } from "@/queries/queryKeys";
import { useParams } from "next/navigation";
import TaskerOffer from "./TaskerOffer";
import ConfirmationModal from "@/components/reusables/Modals/ConfirmationModal";
import { useAppDispatch } from "@/store/hook";
import { setUserTaskOffer } from "@/store/slices/task";

const Offer = ({ offers }: { offers: IOffer[] }) => {
  const [open, setOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { id } = useParams();
  const [offerId, setOfferId] = useState<any>(null);
  const dispatch = useAppDispatch();

  const withdrawOfferMutation = useMutation({
    mutationFn: withdrawOffer,
    onSuccess: (data) => {
      dispatch(setUserTaskOffer(null));
      showSnackbar(data.message, "success");
      toggleModal();
      queryClient.invalidateQueries({ queryKey: TASK_ID(id) });
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const toggleModal = (value?: any) => {
    setOpen((prev) => {
      if (prev) {
        setOfferId(null);
      } else {
        setOfferId(value);
      }
      return !prev;
    });
  };

  const handleSubmit = () => {
    withdrawOfferMutation.mutate({ offer_id: offerId });
  };

  return (
    <>
      <div className="w-full">
        {offers.length ? (
          offers.map((offer) => (
            <TaskerOffer
              key={offer.id}
              offer={offer}
              toggleModal={toggleModal}
            />
          ))
        ) : (
          <div>No Offer yet</div>
        )}
      </div>
      <ConfirmationModal
        open={open}
        onClose={toggleModal}
        title="Cancel Offer"
        cancelText="Back"
        content="Are you sure you want to cancel your offer?"
        okStyle="!bg-red-state-color text-white"
        loading={withdrawOfferMutation.isPending}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Offer;

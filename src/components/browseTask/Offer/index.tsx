"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import TaskerOffer from "./TaskerOffer";
import { withdrawOffer } from "@/services/offer";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useAppDispatch } from "@/store/hook";
import { setUserTaskOffer } from "@/store/slices/task";
import { errorHandler } from "@/utils";
import { API_ROUTES } from "@/constant";
import { ConfirmModal } from "@/components/reusables/Modals/ConfirmModal";
import useModal from "@/hooks/useModal";
import EmptyState from "@/components/reusables/EmptyState";
import { Briefcase } from "lucide-react";

interface OfferProps {
  offers: IOffer[];
}

const Offer: React.FC<OfferProps> = ({ offers }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const withdrawModal = useModal();

  const handleWithdrawRequest = (offerId: string) => {
    setSelectedOfferId(offerId);
    withdrawModal.openModal();
  };

  const { mutate: withdrawMutation, isPending } = useMutation({
    mutationFn: withdrawOffer,
    onSuccess: (data) => {
      dispatch(setUserTaskOffer(null));
      showSnackbar(data.message, "success");
      withdrawModal.closeModal();
      setSelectedOfferId(null);

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.TASKS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.TASKS],
      });
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const handleConfirmWithdraw = () => {
    if (selectedOfferId) {
      withdrawMutation({ offer_id: selectedOfferId });
    }
  };

  const handleCloseModal = () => {
    withdrawModal.closeModal();
    setSelectedOfferId(null);
  };

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <EmptyState
          title="No offers have been made yet"
          icon={<Briefcase className="w-8 h-8 text-neutral-400" />}
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {offers.map((offer) => (
          <TaskerOffer
            key={offer.id}
            offer={offer}
            onWithdrawRequest={() => handleWithdrawRequest(offer.id.toString())}
          />
        ))}
      </div>

      <ConfirmModal
        open={withdrawModal.isOpen}
        onClose={handleCloseModal}
        title="Withdraw Offer"
        description="Are you sure you want to withdraw your offer? This action cannot be undone."
        loading={isPending}
        onConfirm={handleConfirmWithdraw}
        confirmText="Withdraw Offer"
        cancelText="Keep Offer"
      />
    </>
  );
};

export default Offer;

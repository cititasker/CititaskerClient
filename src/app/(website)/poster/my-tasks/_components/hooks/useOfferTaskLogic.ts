import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useCreateIntent } from "@/services/tasks/tasks.hook";
import Paystack from "@/utils/paystackSetup";
import { errorHandler } from "@/utils";
import { API_ROUTES } from "@/constant";
import useModal from "@/hooks/useModal";
import { usePurgeData } from "@/utils/dataPurge";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRejectSurchargeRequest,
  useSurchargeList,
} from "@/services/offers/offers.hook";

export const useOfferTaskLogic = (task: ITask) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { purgeOffer } = usePurgeData();
  const queryClient = useQueryClient();

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const surchargeModal = useModal();
  const rejectSurchargeModal = useModal();

  const acceptedOffer = useMemo(
    () => task.offers.find((offer) => offer.status == "accepted"),
    [task.offers]
  );

  const { data: surcharges } = useSurchargeList(
    `${task.id}`,
    task.has_surcharge_requests
  );

  const rejectSurchargeRequest = useRejectSurchargeRequest();

  const paymentMutation = useCreateIntent({
    onSuccess: (data) => {
      setShowAcceptModal(false);
      const { amount, hash_id } = data.data;
      Paystack.startPayment({
        email: task.poster.email,
        amount: amount * 100,
        reference: hash_id,
        handleSuccess,
      });
    },
    onError: (error) => showSnackbar(errorHandler(error), "error"),
  });

  const toggleAcceptModal = (offer?: IOffer) => {
    setSelectedOffer((prev) => (prev ? null : offer || null));
    setShowAcceptModal((prev) => !prev);
  };

  const toggleSuccessModal = () => setShowSuccessModal((prev) => !prev);

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_TASK_BY_ID, task.id],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_USER_TASK, task.id],
    });
    toggleSuccessModal();
  };

  const onSubmit = async () => {
    if (selectedOffer) {
      await paymentMutation.mutateAsync({
        payable_id: selectedOffer.id,
        task_id: task.id,
        intent: "accept_offer",
      });
    }
  };

  const handlePrimaryAction = () => {
    const { status } = task;
    if (status === "open") {
      router.push(`/post-task/${task.id}`);
    } else if (status === "assigned") {
      surchargeModal.openModal();
    }
  };

  const closeSurcharge = async () => {
    await purgeOffer();
    surchargeModal.closeModal();
  };

  return {
    showAcceptModal,
    toggleAcceptModal,
    showSuccessModal,
    toggleSuccessModal,
    onSubmit,
    handlePrimaryAction,
    closeSurcharge,
    acceptedOffer,
    surchargeModal,
    paymentMutation,
    selectedOffer,
    rejectSurchargeModal,
    rejectSurcharge: rejectSurchargeRequest,
    surcharges,
  };
};

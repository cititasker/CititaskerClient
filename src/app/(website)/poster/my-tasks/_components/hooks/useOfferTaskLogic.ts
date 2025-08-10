import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { queryClient } from "@/providers/ServerProvider";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useCreateIntent } from "@/services/tasks/tasks.hook";
import Paystack from "@/utils/paystackSetup";
import { errorHandler } from "@/utils";
import { API_ROUTES } from "@/constant";
import { useAppDispatch } from "@/store/hook";
import { purgeStateData } from "@/store/slices/task";
import useModal from "@/hooks/useModal";

export const useOfferTaskLogic = (task: ITask) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const surchargeModal = useModal();

  const acceptedOffer = useMemo(
    () => task.offers.find((offer) => offer.status == "accepted"),
    [task.offers]
  );

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
      queryKey: [API_ROUTES.GET_USER_TASK, task.id],
    });
    toggleSuccessModal();
  };

  const onSubmit = async () => {
    if (selectedOffer) {
      await paymentMutation.mutateAsync({
        offer_id: selectedOffer.id,
        task_id: task.id,
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

  const closeSurcharge = () => {
    dispatch(purgeStateData({ path: "offer" }));
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
  };
};

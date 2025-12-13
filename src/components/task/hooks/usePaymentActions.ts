import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import {
  useCreateIntent,
  useReleasePayment,
} from "@/services/tasks/tasks.hook";
import { API_ROUTES } from "@/constant";
import { errorHandler } from "@/utils";
import useModal from "@/hooks/useModal";
import Paystack from "@/utils/paystackSetup";
import { useTaskAlert } from "@/providers/TaskAlertContext";

const paymentSchema = z.object({
  agreed: z.boolean().refine((v) => v, {
    message: "Please confirm you agree to the terms and conditions",
  }),
});

const releasePaymentSchema = z.object({
  acknowledged: z.boolean().refine((v) => v, {
    message: "Please acknowledge that the task has been completed as requested",
  }),
  agreed: z.boolean().refine((v) => v, {
    message: "Please confirm you agree to the terms and conditions",
  }),
});

type PaymentFormData = z.infer<typeof paymentSchema>;
type ReleasePaymentFormData = z.infer<typeof releasePaymentSchema>;

export const usePaymentActions = (task: ITask) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const [selectedOffer, setSelectedOffer] = useState<IOffer>();
  const [offerStep, setOfferStep] = useState<"review" | "success">("review");
  const { hideAlert } = useTaskAlert();

  const offerModal = useModal();
  const releasePaymentModal = useModal();

  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { agreed: false },
  });

  const releasePaymentMethods = useForm<ReleasePaymentFormData>({
    resolver: zodResolver(releasePaymentSchema),
    defaultValues: { acknowledged: false, agreed: false },
  });

  const releasePayment = useReleasePayment();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.USER_TASKS],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.TASKS],
    });
  };

  const handlePaymentSuccess = (onSuccess: () => void) => {
    invalidateQueries();
    onSuccess();
  };

  const paymentMutation = useCreateIntent({
    onSuccess: (res, variables) => {
      const { amount, hash_id } = res.data;
      const modal =
        variables.intent === "surcharge_payment" ? null : offerModal;
      modal?.closeModal();

      Paystack.startPayment({
        email: task.poster.email,
        amount: amount * 100,
        reference: hash_id,
        handleSuccess: () =>
          handlePaymentSuccess(() => {
            if (variables.intent === "accept_offer") {
              setOfferStep("success");
              offerModal.openModal();
            }
          }),
      });
    },
    onError: (err) => showSnackbar(errorHandler(err), "error"),
  });

  const handleOfferPayment = async () => {
    if (!selectedOffer?.id) return;

    paymentMutation.mutate({
      payable_id: selectedOffer.id,
      task_id: task.id,
      intent: "accept_offer",
    });
  };

  const handleReleasePayment = (onSuccess: () => void) => {
    releasePayment.mutate(
      { task_id: task.id as number },
      {
        onSuccess: () => {
          invalidateQueries();
          hideAlert(`release_payment_${task.id}`);
          onSuccess();
        },
        onError: (err) => showSnackbar(errorHandler(err), "error"),
      }
    );
  };

  const openOfferModal = (offer?: IOffer) => {
    if (offer) setSelectedOffer(offer);
    offerModal.openModal();
  };

  const openReleasePaymentModal = () => {
    releasePaymentModal.openModal();
  };

  const closeOfferModal = () => {
    methods.reset();
    offerModal.closeModal();
  };

  const closeReleasePaymentModal = () => {
    releasePaymentMethods.reset();
    releasePaymentModal.closeModal();
  };

  return {
    // State
    methods,
    releasePaymentMethods,
    selectedOffer,
    offerStep,
    setOfferStep,

    // Modals
    offerModal,
    releasePaymentModal,

    // Mutations
    paymentMutation,
    releasePayment,

    // Actions
    handleOfferPayment,
    handleReleasePayment,
    openOfferModal,
    openReleasePaymentModal,
    closeOfferModal,
    closeReleasePaymentModal,
  };
};

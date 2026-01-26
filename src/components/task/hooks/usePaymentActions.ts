// hooks/usePaymentActions.ts
import { useMemo, useState, useCallback } from "react";
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
import { useGetBalance } from "@/services/dashboard/dashboard.hook";

// Schemas
const paymentSchema = z.object({
  agreed: z.boolean().refine((v) => v === true, {
    message: "You must agree to the terms and conditions to proceed",
  }),
});

const releasePaymentSchema = z.object({
  acknowledged: z.boolean().refine((v) => v === true, {
    message:
      "You must acknowledge that the task has been completed as requested",
  }),
  agreed: z.boolean().refine((v) => v === true, {
    message: "You must agree to the terms and conditions to proceed",
  }),
});

type PaymentFormData = z.infer<typeof paymentSchema>;
type ReleasePaymentFormData = z.infer<typeof releasePaymentSchema>;

type OfferStep = "review" | "success";
type PaymentIntent = "accept_offer" | "surcharge_payment";

interface PaymentSuccessCallbacks {
  onOfferAccept?: () => void;
  onSurchargePayment?: () => void;
}

export const usePaymentActions = (task: ITask) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { hideAlert } = useTaskAlert();

  // State
  const [selectedOffer, setSelectedOffer] = useState<IOffer>();
  const [offerStep, setOfferStep] = useState<OfferStep>("review");

  // Modals
  const offerModal = useModal();
  const releasePaymentModal = useModal();

  // Balance query
  const { data: balanceData } = useGetBalance();
  const balance = useMemo(
    () => balanceData?.balance ?? 0,
    [balanceData?.balance],
  );

  // Form methods
  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { agreed: false },
    mode: "onChange",
  });

  const releasePaymentMethods = useForm<ReleasePaymentFormData>({
    resolver: zodResolver(releasePaymentSchema),
    defaultValues: { acknowledged: false, agreed: false },
    mode: "onChange",
  });

  // Computed values
  const offerAmount = useMemo(
    () => selectedOffer?.offer_amount ?? 0,
    [selectedOffer?.offer_amount],
  );

  const paymentMethod = useMemo<PaymentMethodType>(() => {
    if (balance >= offerAmount) return "wallet";
    if (balance > 0 && balance < offerAmount) return "hybrid";
    return "direct";
  }, [balance, offerAmount]);

  // Query invalidation
  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.USER_TASKS],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.TASKS],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.WALLET_BALANCE],
    });
  }, [queryClient]);

  // Handle payment success
  const handlePaymentSuccess = useCallback(
    (intent: PaymentIntent) => {
      invalidateQueries();

      if (intent === "accept_offer") {
        setOfferStep("success");
        offerModal.openModal();
      }
    },
    [invalidateQueries, offerModal],
  );

  // Payment mutation
  const paymentMutation = useCreateIntent({
    onSuccess: (res, variables) => {
      const { hash_id, status, gateway_amount } = res.data;
      const intent = variables.intent as PaymentIntent;

      // Close offer modal for offer acceptance
      if (intent === "accept_offer") {
        offerModal.closeModal();
      }

      // If payment is already approved with zero amount (wallet payment)
      if (status === "approved" && gateway_amount === 0) {
        handlePaymentSuccess(intent);
        return;
      }

      // Initialize Paystack payment
      Paystack.startPayment({
        email: task.poster.email,
        amount: gateway_amount * 100, // Convert to kobo
        reference: hash_id,
        handleSuccess: () => handlePaymentSuccess(intent),
        handleError: (error: any) => {
          showSnackbar(
            error?.message || "Payment failed. Please try again.",
            "error",
          );
        },
      });
    },
    onError: (err) => {
      const errorMessage = errorHandler(err);
      showSnackbar(errorMessage, "error");
    },
  });

  // Release payment mutation
  const releasePaymentMutation = useReleasePayment();

  // Actions
  const handleOfferPayment = useCallback(async () => {
    if (!selectedOffer?.id) {
      showSnackbar("No offer selected", "error");
      return;
    }

    if (!task.id) {
      showSnackbar("Task ID is missing", "error");
      return;
    }

    paymentMutation.mutate({
      payable_id: selectedOffer.id,
      task_id: task.id,
      intent: "accept_offer",
      payment_method: paymentMethod,
    });
  }, [
    selectedOffer?.id,
    task.id,
    paymentMethod,
    paymentMutation,
    showSnackbar,
  ]);

  const handleReleasePayment = useCallback(
    (onSuccess?: () => void) => {
      if (!task.id) {
        showSnackbar("Task ID is missing", "error");
        return;
      }

      releasePaymentMutation.mutate(
        { task_id: task.id },
        {
          onSuccess: () => {
            invalidateQueries();
            hideAlert(`release_payment_${task.id}`);
            releasePaymentModal.closeModal();
            onSuccess?.();
            showSnackbar("Payment released successfully", "success");
          },
          onError: (err) => {
            const errorMessage = errorHandler(err);
            showSnackbar(errorMessage, "error");
          },
        },
      );
    },
    [
      task.id,
      releasePaymentMutation,
      invalidateQueries,
      hideAlert,
      releasePaymentModal,
      showSnackbar,
    ],
  );

  const openOfferModal = useCallback(
    (offer?: IOffer) => {
      if (offer) {
        setSelectedOffer(offer);
      }
      setOfferStep("review");
      offerModal.openModal();
    },
    [offerModal],
  );

  const closeOfferModal = useCallback(() => {
    methods.reset();
    setOfferStep("review");
    offerModal.closeModal();
  }, [methods, offerModal]);

  const openReleasePaymentModal = useCallback(() => {
    releasePaymentModal.openModal();
  }, [releasePaymentModal]);

  const closeReleasePaymentModal = useCallback(() => {
    releasePaymentMethods.reset();
    releasePaymentModal.closeModal();
  }, [releasePaymentMethods, releasePaymentModal]);

  // Reset offer step (useful for modal reopening)
  const resetOfferStep = useCallback(() => {
    setOfferStep("review");
  }, []);

  return {
    // State
    balance,
    selectedOffer,
    offerStep,
    offerAmount,
    paymentMethod,

    // Form methods
    methods,
    releasePaymentMethods,

    // Modals
    offerModal,
    releasePaymentModal,

    // Mutations
    paymentMutation,
    releasePaymentMutation,
    isPaymentPending: paymentMutation.isPending,
    isReleasePaymentPending: releasePaymentMutation?.isPending,

    // Actions
    handleOfferPayment,
    handleReleasePayment,
    openOfferModal,
    openReleasePaymentModal,
    closeOfferModal,
    closeReleasePaymentModal,
    resetOfferStep,
    setOfferStep,
  };
};

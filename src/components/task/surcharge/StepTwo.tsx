"use client";

import { FormProvider, useForm } from "react-hook-form";

import ReviewPayment from "../modals/payment/ReviewPayment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { surchargeSchema } from "./schema";
import { useAppSelector } from "@/store/hook";
import { useCallback, useMemo } from "react";
import { useCreateIntent } from "@/services/tasks/tasks.hook";
import Paystack from "@/utils/paystackSetup";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { errorHandler } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/constant";
import { FeedbackAction } from "@/components/reusables/Modals/UniversalFeedbackModal/constants";

interface IProps {
  acceptedOffer: IOffer | undefined;
  onClose: () => void;
  showSuccess: (
    message: string,
    options?:
      | {
          title?: string | undefined;
          autoClose?: number | undefined;
          actions?: FeedbackAction[] | undefined;
        }
      | undefined
  ) => void;
}
const schema = surchargeSchema.pick({
  agreed: true,
});
type SchemaType = z.infer<typeof schema>;

export default function StepTwo({
  acceptedOffer,
  showSuccess,
  onClose,
}: IProps) {
  const { offer, taskDetails } = useAppSelector((state) => state.task);
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_TASK_BY_ID, String(taskDetails?.id)],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_USER_TASK, String(taskDetails?.id)],
    });
    showSuccess("Surcharge payment successful", {
      title: "Payment Successful",
    });
  }, [queryClient, taskDetails?.id, showSuccess]);

  const paymentMutation = useCreateIntent({
    onSuccess: (data) => {
      onClose();
      const { hash_id, amount } = data.data;

      const email = taskDetails?.poster?.email;
      if (!email) {
        showSnackbar("Poster email is missing.", "error");
        return;
      }

      Paystack.startPayment({
        email,
        amount: amount * 100,
        reference: hash_id,
        handleSuccess,
      });
    },
    onError: (error) => showSnackbar(errorHandler(error), "error"),
  });

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      agreed: false,
    },
  });

  const preview = useMemo(() => {
    if (offer && acceptedOffer) {
      return {
        offer_amount: offer.offer_amount,
        tasker: acceptedOffer.tasker,
      };
    }
    return undefined;
  }, [offer, acceptedOffer]);

  const onSubmit = async () => {
    paymentMutation.mutate({
      payable_id: offer.payable_id!,
      task_id: offer.task_id!,
      intent: "surcharge_payment",
    });
  };

  return (
    <FormProvider {...methods}>
      <ReviewPayment
        loading={paymentMutation.isPending}
        selectedOffer={preview}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}

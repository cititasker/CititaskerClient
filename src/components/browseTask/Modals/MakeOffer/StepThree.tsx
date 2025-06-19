"use client";

import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { queryClient } from "@/providers/ServerProvider";
import { purgeStateData } from "@/store/slices/task";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { offerSchema, offerSchemaType } from "@/schema/offer";
import { makeOffer, updateOffer } from "@/services/offer";
import StepThreeForm from "./StepThreeForm";
import { calculateFees } from "@/utils";
import { API_ROUTES, ROUTES } from "@/constant";
import { useMakeOrUpdateOffer } from "@/services/offers/offers.hook";

const schema = offerSchema.pick({ accepted: true });

interface StepThreeProps {
  nextStep: () => void;
  prevStep: () => void;
  isEdit: boolean;
}

export default function StepThree({
  nextStep,
  prevStep,
  isEdit,
}: StepThreeProps) {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();

  const { offer, taskersOffer } = useAppSelector((state) => state.task);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { accepted: false },
  });

  const mutation = useMakeOrUpdateOffer({
    isUpdating: isEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
      });
      dispatch(purgeStateData({ path: "offer" }));
      nextStep();
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });

  const handleSubmit = (data: { accepted: boolean }) => {
    if (!session?.user) {
      router.push(
        `${ROUTES.LOGIN}?redirect=${encodeURIComponent(window.location.href)}`
      );
      return;
    }
    const payload = isEdit ? { ...offer, offer_id: taskersOffer?.id } : offer;
    mutation.mutate(payload as offerSchemaType);
  };

  const feeInfo = calculateFees(Number(offer.offer_amount));

  return (
    <StepThreeForm
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
      prevStep={prevStep}
      feeInfo={feeInfo}
      isSubmitting={mutation.isPending}
      isUpdating={isEdit}
      offerAmount={Number(offer.offer_amount)}
    />
  );
}

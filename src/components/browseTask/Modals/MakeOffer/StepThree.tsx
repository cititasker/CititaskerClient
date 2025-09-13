"use client";

import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/store/hook";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { baseSchema, offerSchemaType } from "@/schema/offer";
import StepThreeForm from "./StepThreeForm";
import { calculateFees } from "@/utils";
import { API_ROUTES, ROUTES } from "@/constant";
import { useMakeOrUpdateOffer } from "@/services/offers/offers.hook";
import { z } from "zod";
import { usePurgeData } from "@/utils/dataPurge";
import { useQueryClient } from "@tanstack/react-query";

const schema = baseSchema.pick({ accepted: true });
type SchemaType = z.infer<typeof schema>;

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
  const { showSnackbar } = useSnackbar();
  const { purgeOffer } = usePurgeData();
  const queryClient = useQueryClient();

  const { offer, taskersOffer } = useAppSelector((state) => state.task);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { accepted: false },
  });

  const mutation = useMakeOrUpdateOffer({
    isUpdating: isEdit,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.TASKS],
      });
      await purgeOffer();
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

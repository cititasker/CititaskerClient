"use client";

import { FormProvider, useForm } from "react-hook-form";

import ReviewPayment from "../ReviewPayment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { surchargeSchema } from "./schema";
import { useAppSelector } from "@/store/hook";
import { useMemo } from "react";

interface IProps {
  acceptedOffer: IOffer | undefined;
  nextStep: () => void;
}
const schema = surchargeSchema.pick({
  agreed: true,
});
type SchemaType = z.infer<typeof schema>;

export default function StepTwo({ acceptedOffer, nextStep }: IProps) {
  const { offer } = useAppSelector((state) => state.task);

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

  const onSubmit = () => {
    console.log(offer);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ReviewPayment loading={false} selectedOffer={preview} />
      </form>
    </FormProvider>
  );
}

"use client";
import * as React from "react";
import Image from "next/image";
import { errorHandler, formatCurrency } from "@/utils";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema, offerSchemaType } from "@/schema/offer";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import FormCheckbox from "../../../forms/FormCheckbox";
import { useMutation } from "@tanstack/react-query";
import { makeOffer, updateOffer } from "@/services/offer";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { queryClient } from "@/providers/ServerProvider";
import { TASK_ID } from "@/queries/queryKeys";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { connectionFee } from "@/constant";
import { purgeStateData } from "@/store/slices/task";
import ActionsButtons from "@/components/reusables/ActionButtons";

interface ModalType {
  nextStep: () => void;
  prevStep: () => void;
}
const schema = offerSchema.pick({ accepted: true });
type schemaType = z.infer<typeof schema>;

export default function StepThree({ nextStep, prevStep }: ModalType) {
  const { showSnackbar } = useSnackbar();
  const { offer, taskersOffer } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { push } = useRouter();
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: makeOffer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: TASK_ID(id) });
      nextStep();
      dispatch(purgeStateData({ path: "offer" }));
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOffer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: TASK_ID(id) });
      nextStep();
      dispatch(purgeStateData({ path: "offer" }));
    },
    onError(error) {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const method = useForm<schemaType>({
    defaultValues: {
      accepted: false,
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = method;

  const onSubmit = (data: schemaType) => {
    if (session?.user) {
      const newData = { ...offer, ...data } as offerSchemaType;
      if (taskersOffer) {
        updateMutation.mutate({ ...newData, offer_id: taskersOffer.id });
      } else {
        mutation.mutate(newData);
      }
    } else {
      push(`/login?redirect=${encodeURIComponent(window.location.href)}`);
    }
  };

  const connectionFeeTotal = offer.offer_amount
    ? (connectionFee / 100) * Number(offer.offer_amount)
    : "0";

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-black-2 font-[600] text-2xl">Preview Offer</p>
        <p className="mt-9 text-dark-grey-2 text-base font-normal text-center ">
          Your Offer
        </p>
        <div className="mt-2 mx-auto bg-light-blue rounded-20 px-[34px] py-[20px] w-fit">
          <p className="text-[32px] text-black-2 font-semibold">
            {formatCurrency({
              value: Number(offer.offer_amount),
              noFraction: true,
            })}
          </p>
        </div>

        <div className="grid gap-10 mt-10">
          <div className="w-full flex justify-between">
            <p className="text-[16px] font-normal text-black-2">
              10% Connection Fee
            </p>
            <p className="text-[16px] font-normal text-black-2">
              - {formatCurrency({ value: `${connectionFeeTotal}` })}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-1">
              <p className="text-[16px] font-normal text-black-2">
                You’ll Receive
              </p>
              <Image
                src="/icons/circle_notice.svg"
                alt="notice"
                width={14}
                height={14}
              />
            </div>
            <p className="text-[16px] font-normal text-black-2">
              {formatCurrency({
                value: Number(offer.offer_amount) - Number(connectionFeeTotal),
              })}
            </p>
          </div>
        </div>

        <div className="mt-24">
          <FormCheckbox
            name="accepted"
            label="I accept the Terms & Conditions including Insurance."
          />
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText={!!taskersOffer ? "Update Offer" : "Send Offer"}
          className="mt-5 sm:gap-x-5"
          handleCancel={prevStep}
          loading={mutation.isPending || updateMutation.isPending}
        />
      </form>
    </FormProvider>
  );
}

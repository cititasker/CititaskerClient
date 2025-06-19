"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

import { offerSchema } from "@/schema/offer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData, setTaskDetails } from "@/store/slices/task";
import { OfferBreakdown } from "./OfferBreakdown";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { connectionFee } from "@/constant";
import FormButton from "@/components/forms/FormButton";

const schema = offerSchema.pick({ task_id: true, offer_amount: true });
type FormData = z.infer<typeof schema>;

interface Props {
  nextStep: () => void;
  isEdit: boolean;
}

const StepOne = ({ nextStep, isEdit }: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { taskDetails, taskersOffer, offer } = useAppSelector(
    (state) => state.task
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task_id: Number(id),
      offer_amount:
        taskersOffer?.offer_amount?.toString() ||
        taskDetails?.budget?.toString() ||
        "0",
    },
  });

  const offerAmount = Number(form.watch("offer_amount") || 0);

  useEffect(() => {
    if (!taskDetails?.budget) {
      if (id) {
        dispatch(setTaskDetails({ id: +id, budget: 1000 }));
      }
    }

    if (taskersOffer?.offer_amount) {
      form.setValue("offer_amount", String(taskersOffer.offer_amount));
    }
  }, [taskersOffer, taskDetails, dispatch, id, form]);

  const handleSubmit = (data: FormData) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 flex flex-col min-h-[450px]"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-black">
            {isEdit ? "Update Offer" : "Make Offer"}
          </h2>
          <p className="text-center text-muted-foreground text-base mt-4">
            {isEdit ? "Update your offer" : "Add your offer"}
          </p>

          <FormField
            control={form.control}
            name="offer_amount"
            render={({ field }) => (
              <FormItem>
                <div className="bg-light-blue rounded-2xl px-4 py-5 w-fit mx-auto">
                  <NumericFormat
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    thousandSeparator
                    prefix="₦"
                    allowNegative={false}
                    className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
                  />
                </div>
                <FormMessage className="text-center mt-2" />
              </FormItem>
            )}
          />

          <OfferBreakdown
            offerAmount={offerAmount}
            connectionFeePercent={connectionFee}
          />
        </div>

        <FormButton type="submit" className="!mt-auto w-full">
          Next
        </FormButton>
      </form>
    </Form>
  );
};

export default StepOne;

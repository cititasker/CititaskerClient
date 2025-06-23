"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { OfferBreakdown } from "../shared/OfferBreakdown";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IEdit2 } from "@/constant/icons";
import { baseSchema } from "@/schema/offer";
import ActionsButtons from "@/components/reusables/ActionButtons";

const schema = baseSchema.pick({
  task_id: true,
  offer_amount: true,
});
type SchemaType = z.infer<typeof schema>;

interface Props {
  nextStep: () => void;
  title: string;
  budgetLabel: string;
  firstRowLabel?: string;
  increasePrice?: boolean;
}

const StepOne = ({
  nextStep,
  title,
  budgetLabel,
  firstRowLabel = "Total offer",
  increasePrice = false,
}: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { taskersOffer, offer } = useAppSelector((state) => state.task);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      task_id: Number(id),
      offer_amount: offer.offer_amount || "",
    },
  });

  useEffect(() => {
    if (taskersOffer) {
      const payload = {
        offer_id: taskersOffer.id,
        task_id: id,
        offer_amount: `${taskersOffer.offer_amount}`,
      };
      dispatch(setOfferData({ ...payload, ...offer }));
    }
  }, [taskersOffer]);

  const handleSubmit = (data: any) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col min-h-[450px]"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
          {title}
        </h2>

        <div>
          <p className="text-center text-muted-foreground text-base mb-2">
            {budgetLabel}
          </p>

          <FormField
            control={form.control}
            name="offer_amount"
            render={({ field }) => (
              <FormItem>
                <div className="relative bg-light-blue rounded-20 px-4 py-5 w-fit mx-auto max-w-[180px]">
                  <NumericFormat
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    thousandSeparator
                    prefix="₦"
                    allowNegative={false}
                    className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
                  />
                  {increasePrice && (
                    <IEdit2 className="absolute bottom-2 right-2" />
                  )}
                </div>
                <FormMessage className="text-center mt-2" />
              </FormItem>
            )}
          />
          <OfferBreakdown firstRowLabel={firstRowLabel} />
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText="Next"
          className="mt-auto"
        />
      </form>
    </Form>
  );
};

export default StepOne;

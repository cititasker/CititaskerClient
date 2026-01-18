"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IEdit2 } from "@/constant/icons";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { surchargeSchema } from "./schema";
import SummaryItem from "@/components/reusables/SummaryItem";
import { formatCurrency } from "@/utils";
import { connectionFee } from "@/constant";
import { ISurcharge } from "@/services/offers/offers.types";
import { LazyNumericFormat } from "@/components/forms/LazyNumericFormat";

const schema = surchargeSchema.pick({
  task_id: true,
  payable_id: true,
  offer_amount: true,
  payable: true,
});

type SchemaType = z.infer<typeof schema>;

interface Props {
  nextStep: () => void;
  pendingSurcharge: ISurcharge | undefined;
  edit?: boolean;
}

const StepOne = ({ nextStep, pendingSurcharge, edit = false }: Props) => {
  const params = useParams();
  const task_id = params.id ? Number(params.id) : undefined;
  const dispatch = useAppDispatch();
  const { offer } = useAppSelector((state) => state.task);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      task_id,
      payable_id: offer?.payable_id,
      offer_amount: `${offer?.offer_amount || 0}`,
      payable: 0,
    },
  });

  const offerAmount = Number(form.watch("offer_amount") || 0);

  // Memoize calculations to avoid unnecessary recalculations
  const { fee, payable } = useMemo(() => {
    const calculatedFee = (connectionFee / 100) * offerAmount;
    const calculatedPayable = offerAmount + calculatedFee;
    return { fee: calculatedFee, payable: calculatedPayable };
  }, [offerAmount]);

  useEffect(() => {
    if (pendingSurcharge) {
      const { amount } = pendingSurcharge;
      form.reset({
        offer_amount: `${amount}`,
        payable_id: pendingSurcharge.id,
        task_id,
        payable,
      });
    }
  }, [pendingSurcharge, payable, form, task_id]);

  const handleSubmit = (values: SchemaType) => {
    dispatch(setOfferData({ ...offer, ...values, payable })); // Include calculated payable
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="space-y-4">
          <p className="text-center text-muted-foreground text-base">
            Enter additional amount
          </p>

          <FormField
            control={form.control}
            name="offer_amount"
            render={({ field }) => (
              <FormItem>
                <div className="relative bg-light-blue rounded-20 px-4 py-5 w-fit mx-auto max-w-[180px]">
                  <LazyNumericFormat
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    thousandSeparator
                    prefix="₦"
                    allowNegative={false}
                    className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
                    disabled={!edit}
                  />
                  {edit && <IEdit2 className="absolute bottom-2 right-2" />}
                </div>
                <FormMessage className="text-center mt-1" />
              </FormItem>
            )}
          />

          <div className="grid gap-2 mt-8">
            <SummaryItem
              label="Surcharge for the task"
              value={formatCurrency({ value: offerAmount })}
            />
            <SummaryItem
              label="Service fee"
              value={formatCurrency({ value: fee })}
            />
            <SummaryItem
              label="Total"
              value={formatCurrency({ value: payable })}
              isStrong
            />
          </div>
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

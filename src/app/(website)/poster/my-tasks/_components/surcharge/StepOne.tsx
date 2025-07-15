"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IEdit2, IInfoCircle } from "@/constant/icons";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { surchargeSchema } from "./schema";
import OfferBreakdownRow from "@/components/reusables/OfferBreakdownRow";
import { formatCurrency } from "@/utils";
import { connectionFee } from "@/constant";

const schema = surchargeSchema
  .pick({
    task_id: true,
    offer_id: true,
    offer_amount: true,
    default_offer_amount: true,
  })
  .superRefine(({ offer_amount, default_offer_amount }, ctx) => {
    const numericAmount = Number(offer_amount);
    if (numericAmount <= default_offer_amount) {
      ctx.addIssue({
        path: ["offer_amount"],
        code: z.ZodIssueCode.custom,
        message: `Amount must be greater than the original offer (${formatCurrency(
          {
            value: default_offer_amount,
          }
        )})`,
      });
    }
  });
type SchemaType = z.infer<typeof schema>;

interface Props {
  nextStep: () => void;
  acceptedOffer: IOffer | undefined;
  edit?: boolean;
}

const StepOne = ({ nextStep, acceptedOffer, edit = false }: Props) => {
  const params = useParams();
  const task_id = params.id ? Number(params.id) : undefined;
  const dispatch = useAppDispatch();
  const { offer } = useAppSelector((state) => state.task);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      task_id,
      offer_id: offer?.offer_id ? Number(offer.offer_id) : undefined,
      offer_amount: `${offer?.offer_amount}`,
      default_offer_amount: 0,
    },
  });

  const offerAmount = Number(form.watch("offer_amount") || 0);
  const fee = (connectionFee / 100) * offerAmount;
  const received = offerAmount - fee;

  useEffect(() => {
    if (acceptedOffer) {
      const { offer_amount, id } = acceptedOffer;
      form.reset({
        offer_amount: `${offer_amount}`,
        default_offer_amount: offer_amount,
        offer_id: id,
        task_id,
      });
    }
  }, [acceptedOffer]);

  const handleSubmit = ({ default_offer_amount: _, ...rest }: SchemaType) => {
    dispatch(setOfferData({ ...offer, ...rest }));
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col min-h-[450px]"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
          Pay surcharge
        </h2>

        <div>
          <p className="text-center text-muted-foreground text-base mb-2">
            Enter additional amount
          </p>

          <FormField
            control={form.control}
            name="offer_amount"
            render={({ field }) => (
              <FormItem>
                <div className="relative bg-light-blue rounded-20 px-4 py-5 w-fit mx-auto max-w-[180px]">
                  <NumericFormat
                    value={field.value}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                    thousandSeparator
                    prefix="₦"
                    allowNegative={false}
                    className="text-3xl font-semibold text-center bg-transparent outline-none w-full"
                  />
                  {edit && <IEdit2 className="absolute bottom-2 right-2" />}
                </div>
                <FormMessage className="text-center mt-1" />
              </FormItem>
            )}
          />
          <div className="grid mt-[30px]">
            <OfferBreakdownRow
              label="Surcharge for the task"
              value={formatCurrency({ value: offerAmount })}
            />
            <OfferBreakdownRow
              label={`Service fee (${connectionFee}%)`}
              value={formatCurrency({ value: fee })}
              isNegative
              icon={<IInfoCircle />}
            />
            <OfferBreakdownRow
              label="Total"
              value={formatCurrency({ value: received })}
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

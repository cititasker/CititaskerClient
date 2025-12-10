"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { maxLengthChar, rejectionReasonOptions } from "@/constant";
import { Form } from "@/components/ui/form";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSelect from "@/components/forms/FormSelect";

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
}

const schema = z
  .object({
    reason: z.string().min(1, "Please select a reason"),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.reason === "other") {
      if (!data.description?.trim()) {
        ctx.addIssue({
          path: ["description"],
          code: z.ZodIssueCode.custom,
          message: "Description is required'",
        });
      } else if (data.description.trim().length < 15) {
        ctx.addIssue({
          path: ["description"],
          code: z.ZodIssueCode.custom,
          message: "Must contain at least 15 characters",
        });
      } else if (data.description.length > maxLengthChar) {
        ctx.addIssue({
          path: ["description"],
          code: z.ZodIssueCode.custom,
          message: `Maximum length of ${maxLengthChar} characters exceeded`,
        });
      }
    }
  });

type SchemaType = z.infer<typeof schema>;

export default function StepTwo({ nextStep, prevStep }: StepTwoProps) {
  const dispatch = useAppDispatch();
  const { offer } = useAppSelector((state) => state.task);

  const methods = useForm<SchemaType>({
    defaultValues: {
      reason: offer?.reason || "",
      description: offer?.description || "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, watch } = methods;

  const reason = watch("reason");

  const onSubmit = (data: SchemaType) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex-1">
          <div className="space-y-4">
            <FormSelect
              name="reason"
              options={rejectionReasonOptions}
              placeholder="Please select a reason"
            />
            {reason === "other" && (
              <FormTextArea
                name="description"
                label="Explain the reason"
                placeholder="Write here...."
                maxLength={maxLengthChar}
              />
            )}
          </div>
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText="Next"
          className="mt-auto sm:gap-x-5"
          handleCancel={prevStep}
        />
      </form>
    </Form>
  );
}

"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { maxLengthChar } from "@/constant";
import { Form } from "@/components/ui/form";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSelect from "@/components/forms/FormSelect";
import { baseSchema } from "@/schema/offer";

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
}

const schema = baseSchema
  .pick({
    reason: true,
    description: true,
  })
  .superRefine((data, ctx) => {
    if (data.reason === "5" && !data.description?.trim()) {
      ctx.addIssue({
        path: ["description"],
        code: z.ZodIssueCode.custom,
        message: "Description is required when reason is 'Other'",
      });
    }
  });
type SchemaType = z.infer<typeof schema>;

const options = [
  { name: "The offer was too small for the job", id: "1" },
  { name: "The poster changed scope of work", id: "2" },
  { name: "The offer didn't match the workload.", id: "3" },
  { name: "The poster added a new task", id: "4" },
  { name: "Other reasons", id: "5" },
];

export default function StepTwo({ nextStep, prevStep }: StepTwoProps) {
  const dispatch = useAppDispatch();
  const { offer, taskersOffer } = useAppSelector((state) => state.task);

  const methods = useForm<SchemaType>({
    defaultValues: {
      reason: offer?.reason || "",
      description: offer?.description || "",
    },
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const reason = watch("reason");
  const description = watch("description");
  const remainingChars = maxLengthChar - (description?.length || 0);

  React.useEffect(() => {
    if (taskersOffer) {
      const payload = {
        reason: taskersOffer.reason ?? "",
        description: taskersOffer.description ?? "",
      };
      dispatch(setOfferData({ ...payload, ...offer }));
    }
  }, [taskersOffer]);

  const onSubmit = (data: SchemaType) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-[350px]"
        >
          <div className="flex-1">
            <div className="space-y-4">
              <FormSelect
                name="reason"
                options={options}
                placeholder="Please select a reason"
              />
              {reason == "5" && (
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
    </FormProvider>
  );
}

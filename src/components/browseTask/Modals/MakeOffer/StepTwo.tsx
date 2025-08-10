"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { baseSchema } from "@/schema/offer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { maxLengthChar } from "@/constant";

import { Form } from "@/components/ui/form";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormTextArea from "@/components/forms/FormTextArea";

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  isEdit: boolean;
}

const schema = baseSchema
  .pick({ description: true })
  .superRefine((data, ctx) => {
    if (!data.description?.trim()) {
      ctx.addIssue({
        path: ["description"],
        code: z.ZodIssueCode.custom,
        message: "Description is required",
      });
    }
  });
type SchemaType = z.infer<typeof schema>;

export default function StepTwo({ nextStep, prevStep, isEdit }: StepTwoProps) {
  const dispatch = useAppDispatch();
  const { offer, taskersOffer } = useAppSelector((state) => state.task);

  const methods = useForm<SchemaType>({
    defaultValues: {
      description: offer?.description ?? "",
    },
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  console.log(555, errors);

  const description = watch("description");
  const remainingChars = maxLengthChar - (description?.length || 0);

  React.useEffect(() => {
    if (taskersOffer?.description) {
      setValue("description", taskersOffer.description);
    }
  }, [taskersOffer, setValue]);

  const onSubmit = (data: SchemaType) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col space-y-6"
        >
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-base font-semibold text-black-2">
                Why are you the best person for this task?
              </p>
              <p className="text-sm text-black-2">
                Write a short description to help the task poster know why
                you're a great fit.
              </p>
            </div>
            <div>
              <FormTextArea
                name="description"
                placeholder="Write here...."
                className="mt-3 h-[120px] mb-0 px-5 rounded-[10px] bg-light-grey"
                maxLength={maxLengthChar}
              />
              {!errors.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {remainingChars} characters remaining
                </p>
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

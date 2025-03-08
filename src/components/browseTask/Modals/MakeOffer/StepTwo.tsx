"use client";
import * as React from "react";
import FormTextArea from "../../../forms/FormTextArea";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormButton from "../../../forms/FormButton";
import { offerSchema } from "@/schema/offer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOfferData } from "@/store/slices/task";
import { FormHelperText } from "@mui/material";
import { maxLengthChar } from "@/constant";

interface ModalType {
  nextStep: () => void;
  prevStep: () => void;
}

const schema = offerSchema.pick({ description: true });

type schemaType = z.infer<typeof schema>;

export default function StepTwo({ nextStep, prevStep }: ModalType) {
  const dispatch = useAppDispatch();
  const { offer, taskersOffer } = useAppSelector((state) => state.task);

  const methods = useForm<schemaType>({
    defaultValues: {
      description: offer.description ?? "",
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const description = watch("description");

  React.useEffect(() => {
    if (taskersOffer) {
      setValue("description", taskersOffer.description);
    }
  }, [taskersOffer]);

  const remainingChars = maxLengthChar - description.length;

  const onSubmit = (data: schemaType) => {
    dispatch(setOfferData({ ...offer, ...data }));
    nextStep();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-black-2 font-[600] text-2xl">Make Offer</p>

        <p className="text-black-2 text-base font-[600] mt-[35px] ">
          Why are you the best person for this task?
        </p>
        <p className="text-black-2 text-sm font-normal mt-[0px]">
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate liber.
        </p>

        <FormTextArea
          name="description"
          placeholder="Write here...."
          className="mt-3 h-[120px] mb-0"
        ></FormTextArea>
        {!errors.description && (
          <FormHelperText className="form__error text-sm text-dark-grey-2 ">
            {remainingChars} characters remaining
          </FormHelperText>
        )}

        <div className="flex gap-5 mt-[154px]">
          <FormButton
            handleClick={prevStep}
            btnStyle="text-primary border border-primary bg-transparent w-full"
          >
            Back
          </FormButton>
          <FormButton type="submit" btnStyle="text-white bg-[#236F8E] w-full">
            Next
          </FormButton>
        </div>
      </form>
    </FormProvider>
  );
}

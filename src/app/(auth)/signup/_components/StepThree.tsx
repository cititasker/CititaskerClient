"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { verifyPhoneSchema, verifyPhoneSchemaType } from "@/schema/auth";
import { sendPhoneVerificationToken } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";

import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import Image from "next/image";
import StepWrapper from "./StepWrapper";
import { Logo } from "@/constant/icons";

const StepThree = ({ onNext }: { onNext: () => void }) => {
  const { showSnackbar } = useSnackbar();

  const methods = useForm<verifyPhoneSchemaType>({
    defaultValues: { phone_number: "" },
    resolver: zodResolver(verifyPhoneSchema),
  });

  const mutation = useMutation({
    mutationFn: sendPhoneVerificationToken,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      localStorage.setItem("phone_number", methods.getValues("phone_number"));
      onNext();
    },
    onError: (error: any) =>
      showSnackbar(error?.message || "Failed to verify phone", "error"),
  });

  const onSubmit: SubmitHandler<verifyPhoneSchemaType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <StepWrapper>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-[342px] mx-auto"
        >
          <div className="mb-7 flex items-center w-fit mx-auto">
            <h2 className="text-center text-xl font-semibold mr-2">
              Sign Up on
            </h2>
            <Logo />
          </div>

          <FormInput
            label="Phone Number"
            name="phone_number"
            type="text"
            placeholder="Enter your phone number"
            className="mb-[65px]"
          />

          <FormButton
            text="Verify"
            type="submit"
            className="w-full"
            loading={mutation.isPending}
          />
        </form>
      </FormProvider>
    </StepWrapper>
  );
};

export default StepThree;

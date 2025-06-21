"use client";
import {
  posterWaitListFormSchema,
  posterWaitListFormSchemaType,
} from "@/schema/waitlist";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { joinPosterApi } from "@/services";
import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";
import { useSnackbar } from "@/providers/SnackbarProvider";

interface IProps {
  toggleSuccessModal: () => void;
}

const PosterWaitListForm = ({ toggleSuccessModal }: IProps) => {
  const { showSnackbar } = useSnackbar();

  const methods = useForm<posterWaitListFormSchemaType>({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(posterWaitListFormSchema),
  });

  const mutation = useMutation({
    mutationFn: joinPosterApi,
    onSuccess: () => {
      toggleSuccessModal();
    },
    onError(error: any) {
      if (error?.errors?.email) {
        const err = error.errors.email[0];
        methods.setError("email", { type: "manual", message: err });
        showSnackbar(error.message, "error");
      }
      showSnackbar(error.message, "error");
    },
  });

  const onSubmit: SubmitHandler<posterWaitListFormSchemaType> = (values) => {
    mutation.mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="w-full space-y-5">
          <FormInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="!mb-0"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            className="!mb-0"
          />
        </div>

        <FormButton
          type="submit"
          text="Join waitlist"
          className="w-full mt-[28px] sm:mt-[5rem]"
          loading={mutation.isPending}
        />
      </form>
    </FormProvider>
  );
};

export default PosterWaitListForm;

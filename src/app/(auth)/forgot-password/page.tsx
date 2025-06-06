"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, forgotPasswordSchemaType } from "@/schema/auth";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { ROUTES } from "@/constant";

const ForgotPassword = () => {
  const { showSnackbar } = useSnackbar();
  const methods = useForm<forgotPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
    },
    onError(error) {
      showSnackbar(error.message, "error");
    },
  });

  const onSubmit: SubmitHandler<forgotPasswordSchemaType> = (values) => {
    mutation.mutate(values);
  };
  return (
    <div className="sm:shadow-md mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-7">
            <h2 className="text-center text-xl font-semibold mb-3">
              Forgot your password?
            </h2>
            <p className="text-center text-sm font-normal">
              We&apos;ll email you a link to reset your password. If you have
              any issues, contact support@cititasker.com.
            </p>
          </div>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            className="mb-2"
          />

          <FormButton
            type="submit"
            text="Reset Password"
            className="w-full mt-4"
            loading={mutation.isPending}
          />
          <Link
            href={ROUTES.LOGIN}
            className="mt-3 underline text-dark-secondary text-sm font-normal text-left w-fit block mx-auto"
          >
            Return to Login
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;

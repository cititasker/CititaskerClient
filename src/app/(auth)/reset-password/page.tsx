"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema, passwordResetSchemaType } from "@/schema/auth";
import { useRouter, useSearchParams } from "next/navigation"; // Import the hook
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "@/services/auth";
import Link from "next/link";
import FormButton from "@/components/forms/FormButton";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormInput from "@/components/forms/FormInput";
import { ROUTES } from "@/constant";

const ResetPasswordPage = () => {
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const methods = useForm<passwordResetSchemaType>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(passwordResetSchema),
  });

  const mutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      push("login");
    },
    onError(error) {
      showSnackbar(error.message, "error");
    },
  });
  const onSubmit: SubmitHandler<passwordResetSchemaType> = (values) => {
    if (!email || !token) {
      showSnackbar(
        "Invalid reset link. Please check your email or try again.",
        "error"
      );
      return;
    }
    const payload = {
      email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      token,
    };
    mutation.mutate(payload);
  };
  return (
    <div className="sm:shadow-md mt-[40px] flex flex-col items-center md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-7">
            <h2 className="text-center text-xl font-semibold mb-3">
              Change your password
            </h2>
            <p className="text-center text-base font-normal">
              Enter a new password below to change your password.
            </p>
          </div>
          <FormInput
            label="New Password"
            name="password"
            type="password"
            placeholder="******"
            wrapperStyle="mb-2"
          />
          <FormInput
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            placeholder="******"
            wrapperStyle="mb-0"
          />
          <FormButton
            loading={mutation.isPending}
            disabled={mutation.isPending}
            type="submit"
            text="Reset Password"
            className="mt-8 w-full"
          />
        </form>
      </FormProvider>
      <Link
        href={ROUTES.LOGIN}
        className="underline text-primary my-6 text-center text-[14px]"
      >
        Back to login
      </Link>
    </div>
  );
};

export default ResetPasswordPage;

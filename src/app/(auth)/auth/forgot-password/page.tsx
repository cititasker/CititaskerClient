"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Mail, ArrowLeft } from "@/components/icons/index";

import { forgotPasswordSchema, forgotPasswordSchemaType } from "@/schema/auth";
import { forgotPasswordApi } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { ROUTES } from "@/constant";
import AuthCard from "@/components/auth/AuthCard";

const ForgotPasswordPage = () => {
  const { showSnackbar } = useSnackbar();

  const methods = useForm<forgotPasswordSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
    },
    onError: (error: any) => {
      showSnackbar(error.message, "error");
    },
  });

  const onSubmit = (values: forgotPasswordSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>

        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Forgot your password?
        </h2>
        <p className="text-text-secondary leading-relaxed">
          No worries! Enter your email to get a reset link.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
          />

          <FormButton
            type="submit"
            text="Send Reset Link"
            className="w-full h-12 text-base font-medium"
            loading={mutation.isPending}
          />

          <Link
            href={ROUTES.LOGIN}
            className="flex items-center justify-center gap-2 text-sm text-text-secondary hover:text-primary-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          <div className="text-center pt-4 border-t border-border-light">
            <p className="text-sm text-text-muted">
              Need help?{" "}
              <a
                href="mailto:support@cititasker.com"
                className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthCard>
  );
};

export default ForgotPasswordPage;

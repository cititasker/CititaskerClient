"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { verifyPhoneSchema, verifyPhoneSchemaType } from "@/schema/auth";
import { sendPhoneVerificationToken } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormInput from "@/components/forms/FormInput";
import AuthCard from "../../components/AuthCard";
import StepIndicator from "../../components/StepIndicator";
import AuthForm from "../../components/AuthForm";

interface Props {
  onNext?: () => void;
}

const StepThree = ({ onNext }: Props) => {
  const { showSnackbar } = useSnackbar();

  const methods = useForm<verifyPhoneSchemaType>({
    defaultValues: { phone_number: "" },
    resolver: zodResolver(verifyPhoneSchema),
  });

  const mutation = useMutation({
    mutationFn: sendPhoneVerificationToken,
    onSuccess: (data) => {
      localStorage.setItem("phone_number", methods.getValues("phone_number"));
      showSnackbar(data?.message, "success");
      onNext?.();
    },
    onError: (error: any) =>
      showSnackbar(error?.message || "Failed to verify phone", "error"),
  });

  return (
    <AuthCard>
      <StepIndicator currentStep={3} totalSteps={5} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}>
          <AuthForm
            title="Phone Verification"
            showGoogleAuth={false}
            submitButton={{
              text: "Send Code",
              loading: mutation.isPending,
              type: "submit",
            }}
            bottomLink={{
              text: "Need help?",
              linkText: "Contact Support",
              href: "/support",
            }}
          >
            <div className="mb-4">
              <p className="text-center text-text-secondary mb-8">
                We'll send a verification code to your phone number for
                security.
              </p>
            </div>

            <FormInput
              label="Phone Number"
              name="phone_number"
              type="tel"
              placeholder="Enter your phone number"
            />
          </AuthForm>
        </form>
      </FormProvider>
    </AuthCard>
  );
};

export default StepThree;

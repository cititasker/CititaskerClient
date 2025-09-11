"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/schema/auth";
import { registerApi } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormInput from "@/components/forms/FormInput";
import { ROUTES } from "@/constant";
import AuthCard from "../../components/AuthCard";
import StepIndicator from "../../components/StepIndicator";
import AuthForm from "../../components/AuthForm";

interface Props {
  onNext?: () => void;
}

const StepOne = ({ onNext }: Props) => {
  const { showSnackbar } = useSnackbar();
  const role = useSearchParams().get("role") ?? "";

  const methods = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "", role },
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      localStorage.setItem("signup-token", data.data.token);
      localStorage.setItem("email", methods.getValues("email"));
      showSnackbar(data?.message, "success");
      onNext?.();
    },
    onError: (error: any) => {
      showSnackbar(error?.message || "Registration failed", "error");
    },
  });

  return (
    <AuthCard>
      <StepIndicator currentStep={1} totalSteps={5} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}>
          <AuthForm
            title="Sign Up to"
            submitButton={{
              text: "Create Account",
              loading: mutation.isPending,
              type: "submit",
            }}
            bottomLink={{
              text: "Already have an account?",
              linkText: "Login",
              href: ROUTES.LOGIN,
            }}
            termsText="By creating an account, I agree to CitiTasker's"
          >
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Create a strong password"
            />
          </AuthForm>
        </form>
      </FormProvider>
    </AuthCard>
  );
};

export default StepOne;

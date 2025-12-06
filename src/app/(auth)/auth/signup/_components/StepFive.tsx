"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpSchema, signupSchemaType } from "@/schema/auth";
import { completeOnboarding } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormInput from "@/components/forms/FormInput";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormSelect from "@/components/forms/FormSelect";
import { ROUTES } from "@/constant";
import AuthCard from "@/components/auth/AuthCard";
import StepIndicator from "@/components/auth/StepIndicator";
import AuthForm from "@/components/auth/AuthForm";
import { getMaxDate } from "@/utils";

const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
  { id: "prefer-not-to-say", name: "Prefer not to say" },
];

const StepFive = () => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const methods = useForm<signupSchemaType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      showSnackbar("Welcome to CitiTasker! 🎉", "success");
      localStorage.removeItem("signup-token");
      localStorage.removeItem("email");
      localStorage.removeItem("phone_number");
      router.push(ROUTES.LOGIN);
    },
    onError: (error: any) =>
      showSnackbar(error?.message || "Onboarding failed", "error"),
  });

  return (
    <AuthCard>
      <StepIndicator currentStep={5} totalSteps={5} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}>
          <AuthForm
            title="Complete Profile"
            showGoogleAuth={false}
            submitButton={{
              text: "Complete Registration",
              loading: mutation.isPending,
              type: "submit",
            }}
            bottomLink={{
              text: "Already have an account?",
              linkText: "Login",
              href: ROUTES.LOGIN,
            }}
            termsText="By completing registration, I confirm that I agree to CitiTasker's"
          >
            <div className="mb-6">
              <p className="text-center text-text-secondary">
                Just a few more details to complete your account setup.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="first_name"
                type="text"
                placeholder="First name"
              />

              <FormInput
                label="Last Name"
                name="last_name"
                type="text"
                placeholder="Last name"
              />
            </div>

            <FormDatePicker
              name="date_of_birth"
              label="Date of Birth"
              maxDate={getMaxDate(18)}
            />

            <FormSelect
              name="gender"
              label="Gender"
              options={genderOptions}
              required
            />
          </AuthForm>
        </form>
      </FormProvider>
    </AuthCard>
  );
};

export default StepFive;

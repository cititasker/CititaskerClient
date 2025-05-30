"use client";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signUpSchema, signupSchemaType } from "@/schema/auth";
import { completeOnboarding } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormSelect from "@/components/forms/FormSelect";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/../public/images/cititasker_logo.svg";
import StepWrapper from "./StepWrapper";
import Link from "next/link";
import { maxDate } from "@/utils";
import { ROUTES } from "@/constant";

const options = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

const StepFive = () => {
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();

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
      showSnackbar("Welcome to CitiTasker 🎉", "success");
      localStorage.removeItem("signup-token");
      push(ROUTES.LOGIN);
    },
    onError: (error: any) =>
      showSnackbar(error?.message || "Onboarding failed", "error"),
  });

  const onSubmit: SubmitHandler<signupSchemaType> = (data) => {
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
            <Image src={Logo} alt="citi-tasker" />
          </div>

          <FormInput
            label="First Name"
            name="first_name"
            type="text"
            placeholder="Enter your first name"
            wrapperStyle="mb-2"
          />

          <FormInput
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Enter your last name"
            wrapperStyle="mb-2"
          />

          <FormDatePicker
            name="date_of_birth"
            label="Date of Birth"
            className="mb-2"
            maxDate={maxDate}
          />

          <FormSelect name="gender" label="Gender" options={options} required />

          <p className="mt-8 text-sm text-left w-fit block ml-auto">
            By creating an account, I agree to CitiTasker&apos;s{" "}
            <Link href="#" className="text-primary">
              Terms and Privacy Policy
            </Link>
            .
          </p>

          <FormButton
            text="Create an account"
            type="submit"
            className="w-full mt-3"
            loading={mutation.isPending}
          />

          <p className="mt-4 text-center text-base">
            Already have an account?{" "}
            <Link href={ROUTES.LOGIN} className="text-primary">
              Login
            </Link>
          </p>
        </form>
      </FormProvider>
    </StepWrapper>
  );
};

export default StepFive;

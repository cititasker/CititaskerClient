"use client";

import React from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

import { loginSchema, loginSchemaType } from "@/schema/auth";
import { registerApi } from "@/services/auth";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useSearchParams } from "next/navigation";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import Logo from "@/../public/images/cititasker_logo.svg";
import StepWrapper from "./StepWrapper";
import { ROUTES } from "@/constant";

const StepOne = ({ onNext }: { onNext: () => void }) => {
  const { showSnackbar } = useSnackbar();
  const role = useSearchParams().get("role") ?? "";

  const methods = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "", role },
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log(12, data);
      localStorage.setItem("signup-token", data.data.token);
      showSnackbar(data?.message, "success");
      onNext();
    },
    onError: (error: any) =>
      showSnackbar(error?.message || "Registration failed", "error"),
  });

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
    localStorage.setItem("email", data.email);
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
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            className="mb-2"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="******"
            className="mb-0"
          />

          <p className="mt-8 text-sm text-left">
            By creating an account, I agree to CitiTasker&apos;s{" "}
            <Link href="#" className="text-primary">
              Terms and Privacy Policy.
            </Link>
          </p>

          <div className="mt-3">
            <FormButton
              text="Create an account"
              type="submit"
              className="w-full"
              loading={mutation.isPending}
            />
            <span className="uppercase text-center py-4 block">or</span>
            <FormButton className="w-full bg-white border border-dark-secondary text-[#1B2149]">
              <div className="flex justify-center items-center">
                <FcGoogle className="mr-2" size={20} />
                Continue with Google
              </div>
            </FormButton>
          </div>

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

export default StepOne;

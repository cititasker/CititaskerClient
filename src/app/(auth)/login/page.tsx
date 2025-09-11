"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginWithCredentials } from "@/actions/authActions";
import FormInput from "@/components/forms/FormInput";
import { loginSchema, loginSchemaType } from "@/schema/auth";
import { ROUTES } from "@/constant";
import { useAuth } from "../hooks/useAuth";
import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const {
    loading,
    setLoading,
    handleGoogleAuth,
    handleAuthSuccess,
    handleAuthError,
  } = useAuth();

  const methods = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: loginSchemaType) => {
    setLoading(true);
    const res = await loginWithCredentials(values);

    if (res?.success) {
      handleAuthSuccess(res.message);
    } else {
      handleAuthError(res.message);
    }
  };

  return (
    <AuthCard>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AuthForm
            title="Welcome back to"
            onGoogleAuth={handleGoogleAuth}
            submitButton={{
              text: "Sign In",
              loading,
              type: "submit",
            }}
            bottomLink={{
              text: "Don't have an account?",
              linkText: "Create an Account",
              href: ROUTES.CREATE_ACCOUNT,
            }}
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
              placeholder="Enter your password"
            />

            <div className="flex justify-end">
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </AuthForm>
        </form>
      </FormProvider>
    </AuthCard>
  );
}

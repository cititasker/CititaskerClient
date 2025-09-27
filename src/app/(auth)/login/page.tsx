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
import { useLogin } from "@/services/user/user.hook";

export default function LoginPage() {
  const {
    loading,
    setLoading,
    handleGoogleAuth,
    handleAuthSuccess,
    handleAuthError,
  } = useAuth();

  const loginMutation = useLogin();

  const methods = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: loginSchemaType) => {
    setLoading(true);
    loginMutation.mutate(values, {
      onSuccess: async (data) => {
        await loginWithCredentials(data.data);
        handleAuthSuccess(data.message);
      },
      onError: (error) => {
        handleAuthError(error.message);
      },
    });
    setLoading(false);
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
              loading: loading || loginMutation.isPending,
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

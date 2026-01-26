"use client";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { z } from "zod";
import { loginWithCredentials } from "@/actions/authActions";
import FormInput from "@/components/forms/FormInput";
import type { loginSchemaType } from "@/schema/auth";
import { ROUTES } from "@/constant";
import { useLogin } from "@/services/user/user.hook";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "@/components/auth/AuthForm";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  const [schema, setSchema] = useState<z.ZodType<loginSchemaType> | null>(null);

  const {
    loading,
    setLoading,
    handleGoogleAuth,
    handleAuthSuccess,
    handleAuthError,
  } = useAuth();

  const loginMutation = useLogin();

  useEffect(() => {
    import("@/schema/auth").then(({ loginSchema }) => {
      setSchema(loginSchema);
    });
  }, []);

  const methods = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: schema ? zodResolver(schema) : undefined,
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

  // Don't render form until schema loads
  // if (!schema) {
  //   return (
  //     <AuthCard>
  //       <div className="flex items-center justify-center py-12">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //       </div>
  //     </AuthCard>
  //   );
  // }

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

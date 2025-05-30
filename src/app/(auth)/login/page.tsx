"use client";
import { loginWithCredentials } from "@/actions/authActions";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { loginSchema, loginSchemaType } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Logo from "@/../public/images/cititasker_logo.svg";
import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ROLE, ROUTES } from "@/constant";
import FadeUp from "@/components/reusables/FadeUp";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const methods = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleAuth = () => {
    signIn("google");
  };

  const onSubmit = async (values: loginSchemaType) => {
    setLoading(true);
    const res = await loginWithCredentials(values);

    if (res?.success) {
      showSnackbar(res.message, "success");
      const redirect = searchParams.get("redirect");
      window.location.href = redirect
        ? decodeURIComponent(redirect)
        : session?.user?.role === ROLE.poster
        ? ROUTES.POSTER
        : ROUTES.DASHBOARD;
    } else {
      showSnackbar(res.message, "error");
    }

    setLoading(false);
  };

  return (
    <FadeUp>
      <div className="lg:shadow-sm mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mb-7 flex items-center w-fit mx-auto">
              <h2 className="text-center text-xl font-semibold mr-2">
                Login on
              </h2>
              <Image src={Logo} alt="citi-tasker" />
            </div>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
              wrapperStyle="mb-2"
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="******"
              wrapperStyle="mb-0"
            />
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="mt-1 text-primary text-sm font-normal text-left w-fit block ml-auto"
            >
              Forgot Password?
            </Link>
            <div className="mt-8">
              <FormButton
                loading={loading}
                text="Login"
                type="submit"
                className="w-full"
              />
              <span className="uppercase text-center py-4 block">or</span>
              <FormButton
                handleClick={handleGoogleAuth}
                className="w-full py-4 bg-white border border-dark-secondary text-[#1B2149]"
              >
                <div className="flex justify-center items-center">
                  <FcGoogle className="mr-2" size={20} />
                  Continue with Google
                </div>
              </FormButton>
            </div>
            <p className="mt-4 text-center text-base">
              Don’t have an account?{" "}
              <Link href={ROUTES.SIGNUP} className=" text-primary">
                Create an Account
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </FadeUp>
  );
}

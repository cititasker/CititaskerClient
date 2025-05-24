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
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Logo from "@/../public/images/cititasker_logo.svg";
import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ROLE } from "@/constant";

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

  const handleGoogleAuth = async () => {
    signIn("google");
    // try {
    //   const res = await googleAuth();
    //   console.log(234, res);
    // } catch (error) {
    //   console.log("Error", error);
    // }
  };

  const onSubmit: SubmitHandler<loginSchemaType> = async (values) => {
    setLoading(true);
    try {
      const res = (await loginWithCredentials(values)) as any;
      if (res.success) {
        const redirect = searchParams.get("redirect") as string;
        if (redirect) {
          location.href = decodeURIComponent(redirect);
        } else {
          if (session?.user.role == ROLE.poster) {
            location.href = "/poster";
          } else {
            location.href = "/dashboard";
          }
        }
      } else {
        showSnackbar(res.message, "error");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:shadow-sm mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-7 flex items-center w-fit mx-auto">
            <h2 className="text-center text-xl font-semibold mr-2">Login on</h2>
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
            href="/forgot-password"
            className="mt-1 text-primary text-sm font-normal text-left w-fit block ml-auto"
          >
            Forgot Password?
          </Link>
          <div className="mt-8">
            <FormButton
              loading={loading}
              text="Login"
              type="submit"
              btnStyle="w-full"
            />
            <span className="uppercase text-center py-4 block">or</span>
            <FormButton
              handleClick={handleGoogleAuth}
              btnStyle="w-full py-4 bg-white border border-dark-secondary text-[#1B2149]"
            >
              <div className="flex justify-center items-center">
                <FcGoogle className="mr-2" size={20} />
                Continue with Google
              </div>
            </FormButton>
          </div>
          <p className="mt-4 text-center text-base">
            Don’t have an account?{" "}
            <Link href="/signup" className=" text-primary">
              Create an Account
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}

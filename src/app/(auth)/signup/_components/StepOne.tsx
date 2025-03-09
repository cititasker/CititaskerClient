import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/auth";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/services/auth";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { FcGoogle } from "react-icons/fc";
import Logo from "@/../public/images/cititasker_logo.svg";
import Image from "next/image";

interface IAuthService {
  onNext: () => void;
}

const StepOne = ({ onNext }: IAuthService) => {
  const cookies = new Cookies();
  const { showSnackbar } = useSnackbar();

  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      cookies.set("citi-user", data?.data.token, {
        path: "/",
        maxAge: 21600, // Expiry time in seconds (6 hours)
        sameSite: "strict", // Prevent CSRF
      });
      showSnackbar(data?.message, "success");
      onNext();
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  const methods = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      role: role ?? "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginSchemaType> = (values) => {
    localStorage.setItem("email", values.email);
    mutation.mutate(values);
  };

  return (
    <div className="lg:shadow-sm mt-[40px] md:-mt-[3.5rem] max-w-[31.25rem] h-fit w-full mx-auto sm:bg-white rounded-30 px-0 sm:px-5 xl:px-[4.875rem] lg:py-[3.125rem] overflow-hidden">
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
            wrapperStyle="mb-2"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="******"
            wrapperStyle="mb-0"
          />
          <p className="mt-8  text-sm font-normal text-left w-fit block ml-auto">
            By creating an account, I agree to citiTasker&apos;s
            <Link href="#" className="text-primary">
              {" "}
              Terms and Privacy Policy.
            </Link>
          </p>
          <div className="mt-3">
            <FormButton
              text="Create an account"
              type="submit"
              btnStyle="w-full"
              loading={mutation.isPending}
            />
            <span className="uppercase text-center py-4 block">or</span>
            <FormButton btnStyle="w-full bg-white border border-dark-secondary text-[#1B2149]">
              <div className="flex justify-center items-center">
                <FcGoogle className="mr-2" size={20} />
                Continue with Google
              </div>
            </FormButton>
          </div>
          <p className="mt-4 text-center text-base">
            Already have an account?{" "}
            <Link href="/login" className=" text-primary">
              Login
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepOne;

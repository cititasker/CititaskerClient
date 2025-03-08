import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signupSchemaType } from "@/schema/auth";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { completeOnboarding } from "@/services/auth";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Logo from "@/../public/images/cititasker_logo.svg";
import Image from "next/image";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormSelect from "@/components/forms/FormSelect";
import { useRouter } from "next/navigation";
import { maxDate } from "@/utils";

const options = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

const StepFive = () => {
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();

  const mutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      push("/dashboard");
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  const methods = useForm<signupSchemaType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<signupSchemaType> = (values) => {
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
          <p className="mt-8  text-sm font-normal text-left w-fit block ml-auto">
            By creating an account, I agree to citiTasker&apos;s
            <Link href="#" className="text-primary">
              {" "}
              Terms and Privacy Policy.
            </Link>
          </p>
          <FormButton
            text="Create an account"
            type="submit"
            btnStyle="w-full mt-3"
            loading={mutation.isPending}
          />
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

export default StepFive;

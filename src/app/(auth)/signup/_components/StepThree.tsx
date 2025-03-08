import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyPhoneSchema, verifyPhoneSchemaType } from "@/schema/auth";
import { useMutation } from "@tanstack/react-query";
import { sendPhoneVerificationToken } from "@/services/auth";
import { useSearchParams } from "next/navigation";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Logo from "@/../public/images/cititasker_logo.svg";
import Image from "next/image";

interface IProps {
  onNext: () => void;
}

const StepThree = ({ onNext }: IProps) => {
  const { showSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: sendPhoneVerificationToken,
    onSuccess: (data) => {
      showSnackbar(data?.message, "success");
      onNext();
    },
    onError(error) {
      showSnackbar(error?.message, "error");
    },
  });

  const methods = useForm<verifyPhoneSchemaType>({
    defaultValues: {
      phone_number: "",
    },
    resolver: zodResolver(verifyPhoneSchema),
  });

  const onSubmit: SubmitHandler<verifyPhoneSchemaType> = (values) => {
    localStorage.setItem("phone_number", values.phone_number);
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
            label="Phone Number"
            name="phone_number"
            type="text"
            placeholder="Enter your phone number"
            wrapperStyle="mb-[65px]"
          />
          <FormButton
            text="Verify"
            type="submit"
            btnStyle="w-full"
            loading={mutation.isPending}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default StepThree;

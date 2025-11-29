import AnimatedStep from "@/components/reusables/AnimatedStep";
import CustomModal from "@/components/reusables/CustomModal";
import React from "react";
import Success from "@/components/reusables/Success";
import FormButton from "@/components/forms/FormButton";
import { FormProvider, UseFormReturn } from "react-hook-form";
import ReleasePayment from "./ReleasePayment";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  step: "success" | "release";
  taskerName: string | undefined;
  loading: boolean;
  methods: UseFormReturn<any>;
  onSubmit: () => void;
  taskerProfile?: {
    profile_image?: string;
    first_name?: string;
    last_name?: string;
  };
  task: {
    name: string;
    address: string;
  };
  acceptedOffer?: {
    offer_amount: number;
  };
}

export default function ReleasePaymentModal({
  isOpen,
  onClose,
  step,
  taskerName,
  loading,
  methods,
  onSubmit,
  taskerProfile,
  task,
  acceptedOffer,
}: IProps) {
  const isReleaseStep = step === "release";
  const isSuccessStep = step === "success";

  return (
    <CustomModal
      title={isReleaseStep ? "Release payment" : undefined}
      isOpen={isOpen}
      onClose={onClose}
      confetti={isSuccessStep}
      contentClassName="max-w-lg"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AnimatedStep currentStep={step}>
            {isReleaseStep && (
              <ReleasePayment
                loading={loading}
                taskerName={taskerName}
                closeModal={onClose}
                taskerProfile={taskerProfile}
                task={task}
                acceptedOffer={acceptedOffer}
              />
            )}
            {isSuccessStep && (
              <Success
                title="Success"
                desc={`Payment has been released to ${taskerName}`}
                action={
                  <FormButton
                    text="Post a new task"
                    href="/post-task"
                    className="w-full"
                  />
                }
              />
            )}
          </AnimatedStep>
        </form>
      </FormProvider>
    </CustomModal>
  );
}

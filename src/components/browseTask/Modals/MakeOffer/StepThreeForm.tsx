import { Form } from "@/components/ui/form";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { formatCurrency } from "@/utils";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormCheckbox from "@/components/forms/FormCheckbox";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";

interface Props {
  form: UseFormReturn<{ accepted: boolean }>;
  onSubmit: () => void;
  prevStep: () => void;
  offerAmount: number;
  feeInfo: { fee: number; receive: number };
  isSubmitting: boolean;
  isUpdating: boolean;
}

export default function StepThreeForm({
  form,
  onSubmit,
  prevStep,
  offerAmount,
  feeInfo,
  isSubmitting,
  isUpdating,
}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="space-y-8 mb-5">
          <div>
            <p className="text-center text-dark-grey-2">Your Offer</p>

            <div className="mt-2 mx-auto bg-light-blue rounded-2xl px-8 py-5 w-fit">
              <p className="text-[32px] text-black-2 font-semibold">
                {formatCurrency({ value: offerAmount, noFraction: true })}
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <div className="flex justify-between">
              <p className="text-base text-black-2">Connection Fee</p>
              <p className="text-base text-black-2">
                - {formatCurrency({ value: feeInfo.fee })}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <p className="text-base text-black-2">You’ll Receive</p>
                <Image
                  src="/icons/circle_notice.svg"
                  alt="info"
                  width={14}
                  height={14}
                />
              </div>
              <p className="text-base text-black-2">
                {formatCurrency({ value: feeInfo.receive })}
              </p>
            </div>
          </div>

          <FormCheckbox name="accepted" label={<AcceptTermsCheckboxLabel />} />
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText={isUpdating ? "Update offer" : "Send offer"}
          className="mt-auto sm:gap-x-5"
          handleCancel={prevStep}
          loading={isSubmitting}
        />
      </form>
    </Form>
  );
}

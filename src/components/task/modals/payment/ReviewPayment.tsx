"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormButton from "@/components/forms/FormButton";
import { formatCurrency, initializeName } from "@/utils";
import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";

interface Tasker {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  profile_image: string;
}

interface Offer {
  offer_amount: string | number | undefined;
  tasker: Tasker;
}

interface ReviewPaymentProps {
  loading: boolean;
  selectedOffer: Offer | undefined;
  onSubmit: () => void;
}

const PaymentSummaryRow = ({
  label,
  amount,
}: {
  label: string;
  amount: string | number | undefined;
}) => (
  <div className="flex justify-between">
    <p className="font-semibold text-black">{label}</p>
    <p className="font-semibold text-black">
      {formatCurrency({ value: amount })}
    </p>
  </div>
);

export default function ReviewPayment({
  loading,
  selectedOffer,
  onSubmit,
}: ReviewPaymentProps) {
  const { handleSubmit } = useFormContext();
  const { taskDetails } = useAppSelector((state) => state.task);

  if (!selectedOffer) return null;

  const fullName = initializeName({
    first_name: selectedOffer.tasker.first_name,
    last_name: selectedOffer.tasker.last_name,
  });

  const offerAmount = selectedOffer.offer_amount;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tasker Info */}
      <div className="flex gap-3 items-center">
        <Image
          src={selectedOffer.tasker.profile_image || defaultProfile}
          alt={`${fullName} profile`}
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-base font-semibold text-black-2 mb-1">
            {fullName}
          </h2>
          <p className="text-sm text-black-2">{taskDetails?.name}</p>
        </div>
      </div>

      {/* Payment Summary */}
      <div>
        <h3 className="text-xl font-semibold text-dark-grey-2 mb-6">Summary</h3>

        <div className="space-y-4">
          <div className="pb-4 border-b border-light-grey">
            <PaymentSummaryRow
              label="Total offer for the task"
              amount={offerAmount}
            />
          </div>
          <PaymentSummaryRow label="Total" amount={offerAmount} />
        </div>
      </div>

      {/* Terms Agreement */}
      <FormCheckbox
        name="agreed"
        label={
          <p className="text-black-2 text-sm">
            I accept the{" "}
            <Link
              href="/legal/terms-and-conditions"
              className="text-primary underline"
            >
              Terms & Conditions
            </Link>
            . Please note that payment will be secured on CitiTasker until
            you're happy the task has been completed.
          </p>
        }
      />

      {/* Submit Button */}
      <FormButton
        text="Securely hold payment"
        className="w-full"
        type="submit"
        loading={loading}
      />
    </form>
  );
}

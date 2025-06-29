"use client";

import Image from "next/image";
import Link from "next/link";

import FormCheckbox from "@/components/forms/FormCheckbox";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import { formatCurrency, initializeName } from "@/utils";
import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";

interface Offer {
  offer_amount: string | number | undefined;
  tasker: {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    profile_image: string;
  };
}
interface ReviewPaymentProps {
  loading: boolean;
  selectedOffer: Offer | undefined;
}

export default function ReviewPayment({
  loading,
  selectedOffer,
}: ReviewPaymentProps) {
  const { task } = useAppSelector((state) => state.task);
  const fullName = initializeName({
    first_name: selectedOffer?.tasker.first_name,
    last_name: selectedOffer?.tasker.last_name,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex gap-5 items-center mb-8">
        <Image
          src={selectedOffer?.tasker.profile_image || defaultProfile}
          alt="Tasker profile"
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-black-2 mb-1">
            {fullName}
          </h2>
          <p className="text-base text-dark-grey-2">{task.name}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-dark-grey-2 mb-6">Summary</h3>

        <div className="flex justify-between pb-4 mb-4 border-b border-light-grey">
          <p className="font-semibold text-black">Total offer for the task</p>
          <p className="font-semibold text-black">
            {formatCurrency({ value: selectedOffer?.offer_amount })}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold text-black">Total</p>
          <p className="font-semibold text-black">
            {formatCurrency({ value: selectedOffer?.offer_amount })}
          </p>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="flex gap-3 mb-4">
        <Icons.info width={32} height={32} />
        <div>
          <p className="text-black-2 font-semibold text-base mb-1">
            Cancellation Policy
          </p>
          <p className="text-sm text-black-2">
            If you are responsible for cancelling this task, the Connection fee
            will be non-refundable.{" "}
            <Link href="#" className="text-primary">
              Learn more
            </Link>
          </p>
        </div>
      </div>

      {/* Agreement */}
      <FormCheckbox
        name="agreed"
        label={
          <p className="text-black-2 text-sm">
            I accept the{" "}
            <Link href="#" className="text-primary">
              Terms & Conditions
            </Link>
            including
            <Link href="#" className="text-primary">
              Insurance
            </Link>
            . Please note that payment will be secured on CitiTasker until
            you’re happy the task has been completed.
          </p>
        }
      />

      {/* Submit */}
      <FormButton
        text="Securely hold payment"
        className="w-full mt-10"
        type="submit"
        loading={loading}
      />
    </div>
  );
}

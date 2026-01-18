import FormButton from "@/components/forms/FormButton";
import FormCheckbox from "@/components/forms/FormCheckbox";
import SummaryItem from "@/components/reusables/SummaryItem";
import { defaultProfile } from "@/constant/images";
import { ISurcharge } from "@/services/offers/offers.types";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  acceptedOffer: IOffer | undefined;
  taskerName?: string;
  pendingSurcharge?: ISurcharge;
  loading?: boolean;
  onSubmit: () => void;
}

export default function AcceptRequest({
  acceptedOffer,
  taskerName,
  pendingSurcharge,
  loading,
  onSubmit,
}: IProps) {
  const { taskDetails } = useAppSelector((state) => state.task);
  const methods = useFormContext();

  const offerAmount = pendingSurcharge?.amount || 0;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="flex gap-3 items-center mb-4 sm:mb-6">
        <Image
          src={acceptedOffer?.tasker.profile_image || defaultProfile}
          alt="Tasker profile"
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-base font-semibold text-black-2 mb-1">
            {taskerName}
          </h2>
          <p className="text-sm text-black-2">{taskDetails?.name}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-5 sm:mb-8">
        <h3 className="text-xl font-semibold text-dark-grey-2 mb-1.5">
          Summary
        </h3>
        <div>
          <SummaryItem
            label="Price increase for the task"
            value={formatCurrency({ value: offerAmount })}
          />
          <SummaryItem
            isStrong
            label="Total"
            value={formatCurrency({ value: offerAmount })}
          />
        </div>
      </div>

      {/* Cancellation Policy */}
      {/* <div className="flex gap-3 mb-4">
        <IInfoPrimary className="shrink-0 mt-1" />
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
      </div> */}

      {/* Agreement */}
      <FormCheckbox
        name="agreed"
        label={
          <p className="text-black-2 text-sm font-normal">
            I accept the{" "}
            <Link href="/legal/terms-and-conditions" className="text-primary">
              Terms & Conditions.
            </Link>{" "}
            Please note that payment will be secured in CitiTasker Escrow until
            you release payment.
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
    </form>
  );
}

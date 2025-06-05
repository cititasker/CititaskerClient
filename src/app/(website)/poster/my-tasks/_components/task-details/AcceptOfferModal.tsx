"use client";

import Image from "next/image";
import Link from "next/link";
import { FormProvider, useFormContext } from "react-hook-form";

import CustomModal from "@/components/reusables/CustomModal";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import { formatCurrency, initializeName } from "@/utils";
import { defaultProfile } from "@/constant/images";

interface AcceptOfferModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  selectedOffer: IOffer | null;
  taskName: string;
}

export default function AcceptOfferModal({
  open,
  onClose,
  onSubmit,
  loading,
  selectedOffer,
  taskName,
}: AcceptOfferModalProps) {
  const methods = useFormContext();

  const fullName = initializeName({
    first_name: selectedOffer?.tasker.first_name,
    last_name: selectedOffer?.tasker.last_name,
  });

  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      showCloseBtn
      contentClassName="max-w-[576px] px-6 py-8 sm:px-10 sm:py-12"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex gap-5 items-center mb-8">
            <Image
              src={defaultProfile}
              alt="Tasker profile"
              width={60}
              height={60}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-black-2 mb-1">
                {fullName}
              </h2>
              <p className="text-base text-dark-grey-2">{taskName}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-dark-grey-2 mb-6">
              Summary
            </h3>

            <div className="flex justify-between pb-4 mb-4 border-b border-light-grey">
              <p className="font-semibold text-black">
                Total offer for the task
              </p>
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
                If you are responsible for cancelling this task, the Connection
                fee will be non-refundable.{" "}
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
        </form>
      </FormProvider>
    </CustomModal>
  );
}

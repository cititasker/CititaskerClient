"use client";

import Image from "next/image";
import { initializeName } from "@/utils";
import ExtraInfo from "@/components/forms/ExtraInfo";
import ActionsButtons from "@/components/reusables/ActionButtons";
import CustomModal from "@/components/reusables/CustomModal";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOffer: IOffer | null;
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  selectedOffer,
}: PaymentSuccessModalProps) {
  const fullName = initializeName({
    first_name: selectedOffer?.tasker.first_name,
    last_name: selectedOffer?.tasker.last_name,
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      confetti={isOpen}
      // contentClassName="max-w-[576px] px-6 py-10 sm:px-10 sm:py-12 rounded-3xl"
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src="/icons/check_circle.svg"
          alt="success"
          width={80}
          height={80}
          className="mx-auto"
        />

        <h2
          id="payment-success-title"
          className="mt-4 text-xl font-semibold text-black-2"
        >
          Payment Successfully Secured 🎉
        </h2>

        <p
          id="payment-success-description"
          className="mt-6 text-base text-black-2 max-w-[400px]"
        >
          {`Your payment is secured and ${fullName} has been notified to begin your task. You’ll only release the payment when the task is completed to your satisfaction.`}
        </p>

        <ExtraInfo className="mt-6">
          You can now send private messages with important information like the
          task location. Message your tasker the details to get your task done.
        </ExtraInfo>

        <ActionsButtons
          cancelText="Go to task"
          okText={`Message ${selectedOffer?.tasker.first_name ?? ""}`}
          className="mt-10 font-medium"
          handleCancel={onClose}
        />
      </div>
    </CustomModal>
  );
}

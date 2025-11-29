import FormCheckbox from "@/components/forms/FormCheckbox";
import ActionsButtons from "@/components/reusables/ActionButtons";
import SummaryItem from "@/components/reusables/SummaryItem";
import { defaultProfile } from "@/constant/images";
import { formatCurrency, truncate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  taskerName: string | undefined;
  closeModal: () => void;
  loading: boolean;
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

export default function ReleasePayment({
  taskerName,
  closeModal,
  loading,
  taskerProfile,
  task,
  acceptedOffer,
}: IProps) {
  return (
    <>
      <div>
        {/* Header */}
        <div className="flex gap-3 items-center mb-4 sm:mb-6">
          <Image
            src={taskerProfile?.profile_image || defaultProfile}
            alt="Tasker profile"
            width={60}
            height={60}
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div>
            <h2 className="text-base font-semibold text-black-2 mb-1">
              {taskerName}
            </h2>
            <p className="text-sm text-black-2">{task.name}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5 sm:mb-8">
          <h3 className="text-xl font-semibold text-dark-grey-2 mb-4">
            Summary
          </h3>
          <div>
            <SummaryItem label="Task title" value={task.name} />
            <SummaryItem label="Location" value={truncate(task.address)} />
            <SummaryItem
              isStrong
              label="Total"
              value={formatCurrency({ value: acceptedOffer?.offer_amount })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <FormCheckbox
            name="acknowledged"
            label={
              <p className="text-black-2 text-sm font-normal">
                I acknowledge that the task has been completed as requested
              </p>
            }
          />
          <FormCheckbox
            name="agreed"
            label={
              <p className="text-black-2 text-sm font-normal">
                By releasing payment, I accept the{" "}
                <Link
                  href="/legal/terms-and-conditions"
                  className="text-primary"
                >
                  Terms & Conditions.
                </Link>
              </p>
            }
          />
        </div>
      </div>

      <ActionsButtons
        handleCancel={closeModal}
        okText="Release payment"
        className="mt-8"
        loading={loading}
      />
    </>
  );
}

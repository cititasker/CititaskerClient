import ActionsButtons from "@/components/reusables/ActionButtons";
import SummaryItem from "@/components/reusables/SummaryItem";
import { Label } from "@/components/ui/label";
import { surchargeReasons } from "@/constant";
import { ISurcharge } from "@/services/offers/offers.types";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils";
import React from "react";

interface IProps {
  acceptedOffer: IOffer | undefined;
  taskerName?: string;
  pendingSurcharge?: ISurcharge;
  handleReject: () => void;
  handleSubmit: () => void;
}
export default function Request({
  taskerName,
  pendingSurcharge,
  handleReject,
  handleSubmit,
}: IProps) {
  const { taskDetails } = useAppSelector((s) => s.task);
  const surchargeReason = pendingSurcharge
    ? surchargeReasons[pendingSurcharge.reason]
    : undefined;

  const offerAmount = pendingSurcharge?.amount || 0;

  if (!pendingSurcharge) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <p>{`${taskerName} is requesting for an Increase in price for the task “${taskDetails?.name}”.`}</p>
      <div>
        <Label className="text-base font-bold text-black-2">Reason:</Label>
        <p>{surchargeReason}</p>
      </div>
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
      <ActionsButtons
        type="button"
        cancelText="Reject"
        okText="Accept"
        className="mt-auto sm:gap-x-5"
        handleCancel={handleReject}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

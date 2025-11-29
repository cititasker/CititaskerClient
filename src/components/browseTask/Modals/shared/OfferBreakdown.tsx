import { IInfoCircle } from "@/constant/icons";
import { formatCurrency } from "@/utils";
import { connectionFee } from "@/constant";
import { useFormContext } from "react-hook-form";
import SummaryItem from "@/components/reusables/SummaryItem";
import IconTooltipButton from "@/components/reusables/IconTooltipButton";

interface Props {
  firstRowLabel: string;
  increasePrice?: boolean;
  initialOffer: number;
}

export const OfferBreakdown = ({
  firstRowLabel,
  initialOffer,
  increasePrice,
}: Props) => {
  const { watch } = useFormContext();
  const offerAmount = Number(watch("offer_amount") || 0);

  const total = increasePrice ? offerAmount + initialOffer : offerAmount;
  const fee = (connectionFee / 100) * total;
  const received = total - fee;

  return (
    <div className="grid mt-10">
      {increasePrice && (
        <SummaryItem
          label="Total offer amount"
          subLabel="Note: This is the amount the poster will see."
          value={formatCurrency({ value: total })}
        />
      )}
      <SummaryItem
        label={firstRowLabel}
        value={formatCurrency({ value: offerAmount })}
      />

      <SummaryItem
        label="Service fee"
        value={formatCurrency({ value: fee })}
        isNegative
        icon={
          <IconTooltipButton
            side="top"
            label="This helps us operate our platform and offer 24/7 customer support for your tasks."
            icon={<IInfoCircle />}
            tooltipStyle={{
              width: "214px",
              background: "#7C8698",
              color: "white",
            }}
          />
        }
      />
      <SummaryItem
        label="You’ll Receive"
        value={formatCurrency({ value: received })}
        isStrong
      />
    </div>
  );
};

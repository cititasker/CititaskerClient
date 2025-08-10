import { IInfoCircle } from "@/constant/icons";
import { formatCurrency } from "@/utils";
import { connectionFee } from "@/constant";
import { useFormContext } from "react-hook-form";
import OfferBreakdownRow from "@/components/reusables/OfferBreakdownRow";

interface Props {
  firstRowLabel: string;
}

export const OfferBreakdown = ({ firstRowLabel }: Props) => {
  const { watch } = useFormContext();
  const offerAmount = Number(watch("offer_amount") || 0);
  const fee = (connectionFee / 100) * offerAmount;
  const received = offerAmount - fee;

  return (
    <div className="grid mt-10">
      <OfferBreakdownRow
        label={firstRowLabel}
        subLabel="Note: This is the amount the poster will see."
        value={formatCurrency({ value: offerAmount })}
      />
      <OfferBreakdownRow
        label="Service fee"
        value={formatCurrency({ value: fee })}
        isNegative
        icon={<IInfoCircle />}
      />
      <OfferBreakdownRow
        label="You’ll Receive"
        value={formatCurrency({ value: received })}
        isStrong
      />
    </div>
  );
};

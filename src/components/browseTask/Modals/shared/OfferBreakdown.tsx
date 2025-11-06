import { IInfoCircle } from "@/constant/icons";
import { formatCurrency } from "@/utils";
import { connectionFee } from "@/constant";
import { useFormContext } from "react-hook-form";
import OfferBreakdownRow from "@/components/reusables/OfferBreakdownRow";

interface Props {
  firstRowLabel: string;
  increasePrice?: boolean;
  initialOffer?: number;
}

export const OfferBreakdown = ({
  firstRowLabel,
  initialOffer,
  increasePrice,
}: Props) => {
  const { watch } = useFormContext();
  const offerAmount = Number(watch("offer_amount") || 0);

  console.log(44, offerAmount);

  const total = offerAmount + (initialOffer || 0);
  const fee = (connectionFee / 100) * total;
  const received = total - fee;

  return (
    <div className="grid mt-10">
      {increasePrice && (
        <OfferBreakdownRow
          label="Total offer amount"
          subLabel="Note: This is the amount the poster will see."
          value={formatCurrency({ value: total })}
        />
      )}
      <OfferBreakdownRow
        label={firstRowLabel}
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

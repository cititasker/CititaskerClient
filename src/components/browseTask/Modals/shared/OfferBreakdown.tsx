import { IInfoCircle } from "@/constant/icons";
import { formatCurrency } from "@/utils";
import { connectionFee } from "@/constant";
import { useFormContext } from "react-hook-form";

interface Props {
  firstRowLabel: string;
}

const Row = ({
  label,
  value,
  subLabel,
  isStrong = false,
  isNegative = false,
  icon,
}: {
  label: string;
  value: string;
  subLabel?: string;
  isStrong?: boolean;
  isNegative?: boolean;
  icon?: React.ReactNode;
}) => (
  <div className="flex justify-between pb-5 mb-5 border-b-[0.6px] border-light-grey last:border-b-0">
    <div className="flex items-center gap-1">
      <div>
        <p
          className={`text-base ${
            isStrong ? "font-semibold" : "text-muted-foreground"
          }`}
        >
          {label}
        </p>
        {subLabel && (
          <p className="text-xs text-muted-foreground">{subLabel}</p>
        )}
      </div>
      {icon}
    </div>
    <p className={`text-base ${isStrong ? "font-semibold" : "text-black-2"}`}>
      {isNegative ? `- ${value}` : value}
    </p>
  </div>
);

export const OfferBreakdown = ({ firstRowLabel }: Props) => {
  const { watch } = useFormContext();
  const offerAmount = Number(watch("offer_amount") || 0);
  const fee = (connectionFee / 100) * offerAmount;
  const received = offerAmount - fee;

  return (
    <div className="grid mt-10">
      <Row
        label={firstRowLabel}
        subLabel="Note: This is the amount the poster will see."
        value={formatCurrency({ value: offerAmount })}
      />
      <Row
        label={`Service fee (${connectionFee}%)`}
        value={formatCurrency({ value: fee })}
        isNegative
        icon={<IInfoCircle />}
      />
      <Row
        label="You’ll Receive"
        value={formatCurrency({ value: received })}
        isStrong
      />
    </div>
  );
};

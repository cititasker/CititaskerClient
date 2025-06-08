import { formatCurrency } from "@/utils";
import Image from "next/image";

interface Props {
  offerAmount: number;
  connectionFeePercent: number;
}

export const OfferBreakdown = ({
  offerAmount,
  connectionFeePercent,
}: Props) => {
  const fee = (connectionFeePercent / 100) * offerAmount;
  const received = offerAmount - fee;

  return (
    <div className="grid gap-6 mt-10">
      <div className="flex justify-between">
        <div>
          <p className="text-base font-medium text-muted-foreground">
            Total Offer
          </p>
          <p className="text-xs text-muted-foreground">
            This is what the poster sees
          </p>
        </div>
        <p className="text-base font-semibold">
          {formatCurrency({ value: offerAmount })}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-muted-foreground">
          Connection Fee ({connectionFeePercent}%)
        </p>
        <p className="text-base text-muted-foreground">
          - {formatCurrency({ value: fee })}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-base font-semibold">You’ll Receive</p>
          <Image
            src="/icons/circle_notice.svg"
            alt="notice"
            width={14}
            height={14}
          />
        </div>
        <p className="text-base font-semibold">
          {formatCurrency({ value: received })}
        </p>
      </div>
    </div>
  );
};

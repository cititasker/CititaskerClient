// components/ReviewPayment.tsx
"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { Wallet, CreditCard } from "lucide-react";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormButton from "@/components/forms/FormButton";
import { formatCurrency, initializeName } from "@/utils";
import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";
import { cn } from "@/lib/utils";

interface ReviewPaymentProps {
  loading: boolean;
  selectedOffer: IOffer | undefined;
  balance: number;
  paymentMethod: PaymentMethodType;
  onSubmit: () => void;
}

const PaymentSummaryRow = memo(
  ({
    label,
    amount,
    icon,
    highlight = false,
  }: {
    label: string;
    amount: string | number | undefined;
    icon?: React.ReactNode;
    highlight?: boolean;
  }) => (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {icon && <span className="text-neutral-500">{icon}</span>}
        <p
          className={cn(
            "text-sm",
            highlight ? "font-semibold text-black" : "text-neutral-700",
          )}
        >
          {label}
        </p>
      </div>
      <p
        className={cn(
          "text-sm",
          highlight ? "font-bold text-black" : "font-semibold text-black",
        )}
      >
        {formatCurrency({ value: amount })}
      </p>
    </div>
  ),
);

PaymentSummaryRow.displayName = "PaymentSummaryRow";

const ReviewPayment = ({
  loading,
  selectedOffer,
  balance,
  paymentMethod,
  onSubmit,
}: ReviewPaymentProps) => {
  const { handleSubmit } = useFormContext();
  const { taskDetails } = useAppSelector((state) => state.task);

  const paymentBreakdown = useMemo(() => {
    if (!selectedOffer) return null;

    const offerAmount = Number(selectedOffer.offer_amount) || 0;

    let walletAmount = 0;
    let cardAmount = 0;

    if (paymentMethod === "wallet") {
      walletAmount = offerAmount;
    } else if (paymentMethod === "hybrid") {
      walletAmount = balance;
      cardAmount = offerAmount - balance;
    } else {
      cardAmount = offerAmount;
    }

    return {
      offerAmount,
      walletAmount,
      cardAmount,
      hasWalletPayment: walletAmount > 0,
      hasCardPayment: cardAmount > 0,
    };
  }, [selectedOffer, balance, paymentMethod]);

  if (!selectedOffer || !paymentBreakdown) return null;

  const fullName = initializeName({
    first_name: selectedOffer.tasker.first_name,
    last_name: selectedOffer.tasker.last_name,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tasker Info */}
      <div className="flex gap-3 items-center">
        <Image
          src={selectedOffer.tasker.profile_image || defaultProfile}
          alt={`${fullName} profile`}
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-base font-semibold text-black-2 mb-1">
            {fullName}
          </h2>
          <p className="text-sm text-black-2">{taskDetails?.name}</p>
        </div>
      </div>

      {/* Payment Summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-dark-grey-2">Summary</h3>
          <p className="text-sm font-medium text-primary">
            Wallet: {formatCurrency({ value: balance, noFraction: true })}
          </p>
        </div>

        <div className="space-y-3">
          {/* Wallet Payment */}
          {paymentBreakdown.hasWalletPayment && (
            <PaymentSummaryRow
              label="From wallet"
              amount={paymentBreakdown.walletAmount}
              icon={<Wallet className="w-4 h-4" />}
            />
          )}

          {/* Card Payment */}
          {paymentBreakdown.hasCardPayment && (
            <PaymentSummaryRow
              label={
                paymentMethod === "hybrid"
                  ? "From card (remaining)"
                  : "From card"
              }
              amount={paymentBreakdown.cardAmount}
              icon={<CreditCard className="w-4 h-4" />}
            />
          )}

          {/* Divider */}
          <div className="pt-3 border-t border-light-grey">
            <PaymentSummaryRow
              label="Total"
              amount={paymentBreakdown.offerAmount}
              highlight
            />
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <FormCheckbox
        name="agreed"
        required
        label={
          <span className="text-black-2 text-sm">
            I accept the{" "}
            <Link
              href="/legal/terms-and-conditions"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </Link>
            . Please note that payment will be secured on CitiTasker until
            you're happy the task has been completed.
          </span>
        }
      />

      {/* Submit Button */}
      <FormButton
        text="Securely hold payment"
        className="w-full"
        type="submit"
        loading={loading}
        disabled={loading}
      />
    </form>
  );
};

export default memo(ReviewPayment);

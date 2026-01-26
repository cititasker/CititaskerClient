import { memo } from "react";
import { formatCurrency } from "@/utils";
import FormCheckbox from "@/components/forms/FormCheckbox";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface StepTwoProps {
  amountPaid: number;
  feeBreakdown?: {
    fee: number;
    receive: number;
  };
}

const RefundInfo = memo(
  ({ feeBreakdown }: { feeBreakdown?: StepTwoProps["feeBreakdown"] }) => {
    if (!feeBreakdown) return null;

    return (
      <div className="bg-info-light/30 border border-info-light rounded-lg p-4 space-y-2">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
          <div className="space-y-1 text-sm">
            <p className="font-medium text-neutral-900">Refund Breakdown</p>
            <div className="space-y-1 text-neutral-600">
              <div className="flex justify-between">
                <span>Service Fee:</span>
                <span className="font-medium">
                  {formatCurrency({
                    value: feeBreakdown.fee,
                    noFraction: true,
                  })}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-neutral-900">
                <span>You'll Receive:</span>
                <span>
                  {formatCurrency({
                    value: feeBreakdown.receive,
                    noFraction: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

RefundInfo.displayName = "RefundInfo";

export const StepTwo = memo<StepTwoProps>(({ amountPaid, feeBreakdown }) => {
  const renderCurrency = (value: number) =>
    formatCurrency({ value, noFraction: true });

  return (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-neutral-600 text-sm mb-3">
            Amount Held in CitiPay
          </p>
          <Card className="mx-auto w-fit bg-gradient-to-br from-info-light to-primary-50 border-info-light/50 shadow-sm">
            <CardContent className="px-8 py-6">
              <p className="text-3xl sm:text-4xl font-bold text-neutral-900">
                {renderCurrency(amountPaid)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Refund Info */}
        {/* <RefundInfo feeBreakdown={feeBreakdown} /> */}
      </div>

      {/* Terms Agreement */}
      <div className="pt-4 border-t border-neutral-200">
        <FormCheckbox
          name="agreed"
          label={<AcceptTermsCheckboxLabel />}
          required
        />
      </div>
    </div>
  );
});

StepTwo.displayName = "StepTwo";

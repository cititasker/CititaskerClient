import React from "react";
import { formatCurrency } from "@/utils";
import FormCheckbox from "@/components/forms/FormCheckbox";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface StepTwoProps {
  amountPaid: number;
  feeBreakdown?: {
    fee: number;
    receive: number;
  };
}

export const StepTwo: React.FC<StepTwoProps> = ({ amountPaid }) => {
  const renderCurrency = (value: number) =>
    formatCurrency({ value, noFraction: true });

  return (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="text-center space-y-4">
        <div>
          <p className="text-neutral-600 text-sm mb-3">
            Amount held in CitiPay
          </p>
          <Card className="mx-auto max-w-xs bg-gradient-to-br from-info-light to-primary-50 border-info-light/50">
            <CardContent className="py-6">
              <p className="text-3xl sm:text-4xl font-bold text-neutral-900">
                {renderCurrency(amountPaid)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          A 10% cancellation fee will be deducted to process your refund
          according to our terms of service.
        </p> */}
      </div>

      {/* Fee Breakdown */}
      <Card className="border-neutral-200 rounded-none shadow-none">
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold text-neutral-900 mb-4">
            Refund Breakdown
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">Original Amount</span>
              <span className="font-medium text-neutral-900">
                {renderCurrency(amountPaid)}
              </span>
            </div>

            {/* <div className="flex justify-between items-center">
              <span className="text-neutral-700">Cancellation Fee (10%)</span>
              <span className="font-medium text-error">
                -{renderCurrency(feeBreakdown.fee)}
              </span>
            </div> */}

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-neutral-900">
                You'll Receive
              </span>
              <span className="font-bold text-success text-lg">
                {renderCurrency(amountPaid)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Agreement */}
      <div className="pt-2">
        <FormCheckbox name="agreed" label={<AcceptTermsCheckboxLabel />} />
      </div>
    </div>
  );
};

import React from "react";
import { formatCurrency } from "@/utils";
import FormCheckbox from "@/components/forms/FormCheckbox";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
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
          <Card className="mx-auto w-fit bg-gradient-to-br from-info-light to-primary-50 border-info-light/50">
            <CardContent className="py-6">
              <p className="text-3xl sm:text-4xl font-bold text-neutral-900">
                {renderCurrency(amountPaid)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terms Agreement */}
      <FormCheckbox name="agreed" label={<AcceptTermsCheckboxLabel />} />
    </div>
  );
};

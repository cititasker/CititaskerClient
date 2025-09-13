import { calculateFees, formatCurrency } from "@/utils";
import FormCheckbox from "@/components/forms/FormCheckbox";
import { useAppSelector } from "@/store/hook";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
import { useMemo } from "react";

export default function StepTwo() {
  const { taskDetails } = useAppSelector((state) => state.task);

  const amountPaid = useMemo(() => {
    const offers = taskDetails?.offers ?? [];
    const accepted = offers.find((offer) => offer.status === "accepted");

    return accepted?.offer_amount ?? taskDetails?.budget ?? 0;
  }, [taskDetails]);

  const { fee, receive } = calculateFees(amountPaid);

  // Helper for rendering formatted currency
  const renderCurrency = (value: number) =>
    formatCurrency({ value, noFraction: true });

  return (
    <div className="space-y-8 mb-5">
      {/* Cancellation Fee Section */}
      <div className="text-center">
        <p className="text-dark-grey-2">Amount held in CitiPay</p>
        <div className="mt-2 mx-auto bg-light-blue rounded-2xl px-8 py-5 w-fit">
          <p className="text-[32px] text-black-2 font-semibold">
            {renderCurrency(amountPaid)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-4 max-w-[420px] mx-auto">
          You will be charged a 10% cancellation fee to process your refund.
        </p>
      </div>

      {/* Fee Breakdown Section */}
      <div className="mt-10">
        <div className="flex justify-between border-b border-light-grey pb-4 mb-4">
          <p className="text-base text-black-2">Cancellation Fee</p>
          <p className="text-base text-black-2">- {renderCurrency(fee)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-black-2">You’ll Receive</p>
          <p className="text-base text-black-2">{renderCurrency(receive)}</p>
        </div>

        {/* Terms Acceptance */}
        <FormCheckbox
          name="agreed"
          label={<AcceptTermsCheckboxLabel />}
          className="mt-10"
        />
      </div>
    </div>
  );
}

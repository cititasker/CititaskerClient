import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { formatCurrency } from "@/utils";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormCheckbox from "@/components/forms/FormCheckbox";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
import SummaryItem from "@/components/reusables/SummaryItem";
import IconTooltipButton from "@/components/reusables/IconTooltipButton";
import { IInfoCircle } from "@/constant/icons";

interface Props {
  form: UseFormReturn<{ accepted: boolean }>;
  onSubmit: () => void;
  prevStep: () => void;
  offerAmount: number;
  feeInfo: { fee: number; receive: number };
  isSubmitting: boolean;
  isUpdating: boolean;
}

export default function StepThreeForm({
  form,
  onSubmit,
  prevStep,
  offerAmount,
  feeInfo,
  isSubmitting,
  isUpdating,
}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="mb-5">
          <div>
            <p className="text-center text-dark-grey-2">Your Offer</p>

            <div className="mt-2 mx-auto bg-light-blue rounded-2xl px-8 py-5 w-fit">
              <p className="text-[32px] text-black-2 font-semibold">
                {formatCurrency({ value: offerAmount, noFraction: true })}
              </p>
            </div>
          </div>

          <div className="grid mt-10">
            <SummaryItem
              label="Service fee"
              value={formatCurrency({ value: feeInfo.fee })}
              isNegative
            />
            <SummaryItem
              label="You’ll Receive"
              value={formatCurrency({ value: feeInfo.receive })}
              isStrong
              icon={
                <IconTooltipButton
                  side="top"
                  label="This is the amount you will receive"
                  icon={<IInfoCircle />}
                  tooltipStyle={{
                    width: "214px",
                    background: "#7C8698",
                    color: "white",
                  }}
                />
              }
            />
          </div>

          <FormCheckbox name="accepted" label={<AcceptTermsCheckboxLabel />} />
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText={isUpdating ? "Update offer" : "Send offer"}
          className="mt-auto sm:gap-x-5"
          handleCancel={prevStep}
          loading={isSubmitting}
        />
      </form>
    </Form>
  );
}

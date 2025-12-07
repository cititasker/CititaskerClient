import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formatCurrency } from "@/utils";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormCheckbox from "@/components/forms/FormCheckbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { baseSchema } from "@/schema/offer";
import AcceptTermsCheckboxLabel from "@/components/reusables/AcceptTermsCheckboxLabel";
import SummaryItem from "@/components/reusables/SummaryItem";
import { IInfoCircle } from "@/constant/icons";
import { API_ROUTES, connectionFee, surchargeReasons } from "@/constant";
import { useSurchargeRequest } from "@/services/offers/offers.hook";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { setOfferData } from "@/store/slices/task";
import IconTooltipButton from "@/components/reusables/IconTooltipButton";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const schema = baseSchema.pick({ accepted: true });

export default function StepThree({ prevStep, nextStep }: Props) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { offer, taskersOffer } = useAppSelector((state) => state.task);

  const taskerAmount = Number(taskersOffer?.offer_amount ?? 0);
  const offerAmount = Number(offer?.offer_amount ?? 0);
  const total = taskerAmount + offerAmount;

  const fee = (connectionFee / 100) * total;
  const received = total - fee;

  const mutateSurchargeRequest = useSurchargeRequest();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { accepted: false },
  });

  const onSubmit = () => {
    const payload = {
      task_id: `${offer?.task_id}`,
      amount: offerAmount,
      reason:
        offer.reason !== "5"
          ? surchargeReasons[offer.reason as string]
          : offer.description,
    } as any;

    mutateSurchargeRequest.mutate(payload, {
      onSuccess: (data) => {
        nextStep();
        dispatch(setOfferData({}));
        toast.success(
          data.message || "Surcharge request submitted successfully"
        );
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.GET_TASK_BY_ID, String(offer?.task_id)],
        });
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.GET_USER_TASK, String(offer?.task_id)],
        });
      },
      onError(error) {
        console.log("Error submitting surcharge request:", error);
        toast.error(
          error?.message ||
            "Failed to submit surcharge request. Please try again."
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div>
          <div>
            <p className="text-center text-dark-grey-2">Price increase</p>

            <div className="mt-2 mx-auto bg-light-blue rounded-2xl px-5 py-4 w-fit">
              <p className="text-[32px] text-black-2 font-semibold">
                {formatCurrency({ value: offerAmount })}
              </p>
            </div>
          </div>

          <div className="grid mt-8">
            <SummaryItem
              label="Previous offer for the task"
              value={formatCurrency({ value: taskerAmount })}
            />

            <SummaryItem
              label="Total offer amount"
              subLabel="Note: This is the amount you will receive."
              value={formatCurrency({ value: total })}
            />
            <SummaryItem
              label="Service fee"
              value={formatCurrency({ value: fee })}
              isNegative
              icon={
                <IconTooltipButton
                  side="top"
                  label="This helps us operate our platform and offer 24/7 customer support for your tasks."
                  icon={<IInfoCircle />}
                  tooltipStyle={{
                    width: "214px",
                    background: "#7C8698",
                    color: "white",
                  }}
                />
              }
            />

            <SummaryItem
              label="You’ll Receive"
              value={formatCurrency({ value: received })}
              isStrong
            />

            <FormCheckbox
              name="accepted"
              label={<AcceptTermsCheckboxLabel />}
            />
          </div>
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText="Send request"
          className="sm:gap-x-5"
          handleCancel={prevStep}
          loading={mutateSurchargeRequest.isPending}
        />
      </form>
    </Form>
  );
}

import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { calculateFees, formatCurrency } from "@/utils";
import ActionsButtons from "@/components/reusables/ActionButtons";
import FormCheckbox from "@/components/forms/FormCheckbox";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/store/hook";
import { baseSchema } from "@/schema/offer";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const schema = baseSchema.pick({ accepted: true });

export default function StepThree({ prevStep, nextStep }: Props) {
  const { offer } = useAppSelector((state) => state.task);

  const feeInfo = calculateFees(Number(offer.offer_amount));
  const offerAmount = Number(offer.offer_amount);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { accepted: false },
  });

  const onSubmit = () => {
    console.log(444, offer);
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col min-h-[450px]"
      >
        <div className="space-y-8 mb-5">
          <h2 className="text-2xl font-semibold text-black-2">Preview price</h2>
          <div>
            <p className="text-center text-dark-grey-2">Price increase</p>

            <div className="mt-2 mx-auto bg-light-blue rounded-2xl px-8 py-5 w-fit">
              <p className="text-[32px] text-black-2 font-semibold">
                {formatCurrency({ value: offerAmount, noFraction: true })}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between border-b border-light-grey pb-5 mb-5">
              <p className="text-base text-black-2">Service fee</p>
              <p className="text-base text-black-2">
                - {formatCurrency({ value: feeInfo.fee })}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <p className="text-base text-black-2">You’ll Receive</p>
              </div>
              <p className="text-base text-black-2">
                {formatCurrency({ value: feeInfo.receive })}
              </p>
            </div>
            <FormCheckbox
              name="accepted"
              label={<Label />}
              className="mt-10 sm:mt-[80px]"
            />
          </div>
        </div>

        <ActionsButtons
          type="submit"
          cancelText="Back"
          okText="Send request"
          className="mt-auto sm:gap-x-5"
          handleCancel={prevStep}
          loading={false}
        />
      </form>
    </Form>
  );
}

const Label = () => {
  return (
    <p className="text-sm text-black-2">
      I accept the{" "}
      <Link href="#" className="text-primary">
        Terms & Conditions
      </Link>{" "}
      including{" "}
      <Link href="#" className="text-primary">
        Insurance
      </Link>
      .
    </p>
  );
};

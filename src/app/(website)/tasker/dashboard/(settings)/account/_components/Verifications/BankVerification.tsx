import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import Image from "next/image";
import PadLock from "@/../public/images/padlock.png";
import { BankVerificationSchema } from "../../_utils/schemas";
import CustomModal from "@/components/reusables/CustomModal";
import FormInput from "@/components/forms/FormInput";
import { FormAutoComplete } from "@/components/forms/FormAutoComplete";
import ActionsButtons from "@/components/reusables/ActionButtons";

interface IOption {
  id: number;
  name: string;
  bank_code: string;
}

interface PaymentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  methods: UseFormReturn<BankVerificationSchema>;
  onSubmit: (values: BankVerificationSchema) => void;
  bankList: IOption[];
  name: string;
  isSubmitting: boolean;
}

const BankVerificationModal: React.FC<PaymentVerificationModalProps> = ({
  isOpen,
  onClose,
  methods,
  onSubmit,
  bankList,
  name,
  isSubmitting,
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="relative">
          <div className="mb-9">
            <h3 className="text-xl font-semibold mb-3">Verify bank account</h3>
            <p className="max-w-[360px] w-full text-sm">
              Please provide your bank name and account number to complete your
              payment method verification.
            </p>
          </div>
          <div className="space-y-6 w-full">
            <FormAutoComplete
              name="bank"
              placeholder="Select a bank"
              label="Bank"
              options={bankList}
              getOptionLabel={(option: IOption) => option?.name || ""}
              isOptionEqualToValue={(option, value) =>
                option?.bank_code === value?.bank_code
              }
              className="mb-0"
            />
            <FormInput name="account_number" label="Account number" />
            {name && <p className="text-center text-base capitalize">{name}</p>}
            <ActionsButtons
              okText="Verify bank account"
              type="submit"
              loading={isSubmitting}
              className="pb-0"
              disabled={!name}
            />
          </div>
          <Image
            src={PadLock}
            alt=""
            width={245}
            height={245}
            className="absolute top-0 bottom-0 right-0 left-0 m-auto -z-10"
          />
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default BankVerificationModal;

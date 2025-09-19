"use client";

import React, { useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreditCard, Building2, Loader } from "lucide-react";

import BaseVerificationModal from "./BaseVerificationModal";
import FormInput from "@/components/forms/FormInput";
import { FormAutoComplete } from "@/components/forms/FormAutoComplete";
import { Button } from "@/components/ui/button";
import ExtraInfo from "@/components/forms/ExtraInfo";
import { cn } from "@/lib/utils";

interface BankOption {
  id: number | string;
  name: string;
  bank_code: string;
}

interface BankVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  methods: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  bankList: BankOption[];
  name: string;
  isSubmitting: boolean;
}

const AccountNameDisplay = ({
  name,
  isLoading,
}: {
  name: string;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
        <Loader className="w-4 h-4 animate-spin text-primary" />
        <span className="text-sm text-text-muted">Verifying account...</span>
      </div>
    );
  }

  if (!name) return null;

  return (
    <div className="p-4 bg-success-light rounded-xl border border-success/20">
      <div className="text-center">
        <p className="text-sm text-text-muted">Account Name</p>
        <p className="font-semibold text-success capitalize">{name}</p>
      </div>
    </div>
  );
};

const BankVerificationModal: React.FC<BankVerificationModalProps> = ({
  isOpen,
  onClose,
  methods,
  onSubmit,
  bankList,
  name,
  isSubmitting,
}) => {
  const [isValidating, setIsValidating] = useState(false);

  // Watch form values to show validation state
  const accountNumber = methods.watch("account_number");
  const selectedBank = methods.watch("bank");

  const canSubmit =
    name && selectedBank && accountNumber?.length >= 10 && !isSubmitting;

  return (
    <BaseVerificationModal
      isOpen={isOpen}
      onClose={onClose}
      title="Verify Bank Account"
      description="Link your bank account for secure payments and withdrawals"
      icon={<CreditCard className="w-8 h-8 text-primary" />}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bank Selection */}
          <div className="space-y-4">
            <FormAutoComplete
              name="bank"
              label="Select Your Bank"
              placeholder="Choose your bank"
              options={bankList}
              getOptionLabel={(option: BankOption) => option?.name || ""}
              isOptionEqualToValue={(option, value) =>
                option?.bank_code === value?.bank_code
              }
              renderOption={(props, option) => (
                <div
                  {...props}
                  className="flex items-center gap-3 p-3 hover:bg-neutral-50 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-text-muted" />
                  <span className="font-medium">{option.name}</span>
                </div>
              )}
            />

            <FormInput
              name="account_number"
              label="Account Number"
              placeholder="Enter your account number"
              type="text"
              // maxLength={10}
              className={cn(
                "transition-colors",
                accountNumber?.length >= 10 &&
                  selectedBank &&
                  "border-success focus:border-success"
              )}
            />
          </div>

          {/* Account Name Display */}
          <AccountNameDisplay name={name} isLoading={isValidating} />

          {/* Security Notice */}
          <ExtraInfo type="info" compact>
            <div className="space-y-1">
              <p className="font-medium">Bank verification is secure</p>
              <p className="text-sm">
                We use bank-grade encryption to verify your account details
                safely.
              </p>
            </div>
          </ExtraInfo>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 order-2 sm:order-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                "flex-1 order-1 sm:order-2 btn-primary font-semibold py-3 rounded-xl",
                !canSubmit && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Verify Bank Account
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </BaseVerificationModal>
  );
};

export default BankVerificationModal;

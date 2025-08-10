"use client";

import { FormProvider, useFormContext } from "react-hook-form";
import CustomModal from "@/components/reusables/CustomModal";
import ReviewPayment from "../ReviewPayment";
import { useMemo } from "react";

interface AcceptOfferModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  selectedOffer: IOffer | null;
}

export default function AcceptOfferModal({
  open,
  onClose,
  onSubmit,
  loading,
  selectedOffer,
}: AcceptOfferModalProps) {
  const methods = useFormContext();

  const preview = useMemo(() => {
    if (selectedOffer) {
      return {
        offer_amount: selectedOffer.offer_amount,
        tasker: selectedOffer.tasker,
      };
    }
    return undefined;
  }, [selectedOffer]);

  return (
    <CustomModal isOpen={open} onClose={onClose} hideClose contentClassName="">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ReviewPayment loading={loading} selectedOffer={preview} />
        </form>
      </FormProvider>
    </CustomModal>
  );
}

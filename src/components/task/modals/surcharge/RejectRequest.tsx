import FormTextArea from "@/components/forms/FormTextArea";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { maxLengthChar } from "@/constant";
import { ISurcharge } from "@/services/offers/offers.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  onClose: () => void;
  handleSubmit: () => void;
  pendingSurcharge: ISurcharge | undefined;
  rejectSurcharge: any;
}

const schema = z.object({
  reason: z
    .string()
    .min(10, "Must be at least 10 characters")
    .max(
      maxLengthChar,
      `Maximum length of ${maxLengthChar} characters exceeded`
    ),
});

type FormValues = z.infer<typeof schema>;

export default function RejectRequest({
  onClose,
  rejectSurcharge,
  handleSubmit,
  pendingSurcharge,
}: IProps) {
  const methods = useForm<FormValues>({
    defaultValues: { reason: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    rejectSurcharge.mutate(
      {
        surcharge_id: String(pendingSurcharge?.id),
        rejection_reason: data.reason,
      },
      {
        onSuccess: () => {
          handleSubmit();
        },
        onError(error: any) {
          toast.error(error?.message || "Failed to reject surcharge request");
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextArea
          name="reason"
          label="Let the Tasker know why you rejected the request"
          maxLength={maxLengthChar}
          className="resize-none"
        />
        <ActionsButtons
          okText="Send"
          handleCancel={onClose}
          loading={rejectSurcharge.isPending}
        />
      </form>
    </FormProvider>
  );
}

import FormTextArea from "@/components/forms/FormTextArea";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { maxLengthChar } from "@/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

interface IProps {
  onClose: () => void;
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

export default function RejectRequest({ onClose }: IProps) {
  const methods = useForm<FormValues>({
    defaultValues: { reason: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data);
    // your API logic here...
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextArea
          name="reason"
          label="Explain the reason"
          maxLength={maxLengthChar}
          className="resize-none"
        />
        <ActionsButtons okText="Send" handleCancel={onClose} />
      </form>
    </FormProvider>
  );
}

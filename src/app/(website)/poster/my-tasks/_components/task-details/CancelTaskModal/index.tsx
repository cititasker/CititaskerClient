import CustomModal from "@/components/reusables/CustomModal";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ActionsButtons from "@/components/reusables/ActionButtons";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Success from "@/components/reusables/Success";

// Validation schema
const schema = z
  .object({
    reason: z.string().min(1, "Please select your reason"),
    description: z.string(),
    agreed: z.boolean().refine((v) => v, {
      message: "Please confirm you agree to the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.reason === "5" && !data.description?.trim()) {
      ctx.addIssue({
        path: ["description"],
        code: z.ZodIssueCode.custom,
        message: "Description is required when reason is 'Other'",
      });
    }
  });

type SchemaType = z.infer<typeof schema>;

const steps = [
  {
    title: "Give a reason for cancellation",
    description: "Let the Tasker know why you want to cancel the task.",
    component: StepOne,
  },
  { title: "Cancellation fee", component: StepTwo },
  {
    component: () => (
      <Success
        title="Success!"
        desc="Your task has been cancelled successfully."
        className="justify-center"
        contentClassName="mt-0"
      />
    ),
  },
];

export default function CancelTaskModal({ isOpen, onClose }: IModal) {
  const [step, setStep] = useState(1);
  const methods = useForm<SchemaType>({
    defaultValues: { agreed: false, reason: "", description: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { trigger, reset } = methods;

  const onSubmit = (values: SchemaType) => {
    // Perform cancellation
  };

  const handleNext = async () => {
    const validationFields: ("reason" | "description" | "agreed")[] =
      step === 1 ? ["reason", "description"] : ["agreed"];
    const isValid = await trigger(validationFields);

    if (!isValid) return;

    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setStep(1);
  };

  const { title, description, component: CurrentStep } = steps[step - 1];

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
    >
      <FormProvider {...methods}>
        <form className="flex flex-col min-h-[300px] overflow-y-auto no-scrollbar">
          <CurrentStep />
          {step < steps.length && (
            <ActionsButtons
              className="mt-auto"
              type="button"
              showCancelButton={step > 1}
              handleCancel={() => setStep((prev) => prev - 1)}
              handleSubmit={handleNext}
            />
          )}
        </form>
      </FormProvider>
    </CustomModal>
  );
}

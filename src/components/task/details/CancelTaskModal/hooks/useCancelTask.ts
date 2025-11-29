import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppSelector } from "@/store/hook";
import { calculateFees } from "@/utils";

const cancelReasons = [
  { id: "1", name: "Tasker is not responding to messages" },
  { id: "2", name: "Tasker requested to cancel the task" },
  { id: "3", name: "Found someone else outside CitiTasker" },
  { id: "4", name: "Don't need the task done anymore" },
  { id: "5", name: "Other reasons" },
];

const schema = z
  .object({
    reason: z.string().min(1, "Please select your reason"),
    description: z.string().optional(),
    agreed: z.boolean().refine((v) => v, {
      message: "Please agree to the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.reason === "5" && !data.description?.trim()) {
      ctx.addIssue({
        path: ["description"],
        code: z.ZodIssueCode.custom,
        message: "Description is required for other reasons",
      });
    }
  });

export type CancelTaskFormData = z.infer<typeof schema>;

export const useCancelTask = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { taskDetails } = useAppSelector((state) => state.task);

  const methods = useForm<CancelTaskFormData>({
    defaultValues: {
      agreed: false,
      reason: "",
      description: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { trigger, reset, watch } = methods;
  const selectedReason = watch("reason");

  // Calculate fees
  const { amountPaid, feeBreakdown } = useMemo(() => {
    const offers = taskDetails?.offers ?? [];
    const accepted = offers.find((offer) => offer.status === "accepted");
    const amount = accepted?.offer_amount ?? taskDetails?.budget ?? 0;

    return {
      amountPaid: amount,
      feeBreakdown: calculateFees(amount),
    };
  }, [taskDetails]);

  const handleNext = async () => {
    const validationFields =
      currentStep === 1
        ? (["reason", "description"] as const)
        : (["agreed"] as const);

    const isValid = await trigger(validationFields);
    if (!isValid) return;

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
      setCurrentStep(3); // Success step
    } catch (error) {
      console.error("Cancellation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    reset();
    setCurrentStep(1);
    setIsSubmitting(false);
  };

  return {
    methods,
    currentStep,
    isSubmitting,
    selectedReason,
    amountPaid,
    feeBreakdown,
    cancelReasons,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm,
  };
};

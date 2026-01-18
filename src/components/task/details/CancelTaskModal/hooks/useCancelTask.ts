import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppSelector } from "@/store/hook";
import { calculateFees } from "@/utils";

export const CANCEL_REASON = {
  NOT_RESPONDING: "not_responding",
  TASKER_REQUESTED_CANCEL: "tasker_requested_cancel",
  FOUND_SOMEONE_ELSE: "found_someone_else",
  NO_LONGER_NEEDED: "no_longer_needed",
  OTHER: "other",
} as const;

export type CancelReason = (typeof CANCEL_REASON)[keyof typeof CANCEL_REASON];

export const cancelReasons = [
  {
    id: CANCEL_REASON.NOT_RESPONDING,
    name: "Tasker is not responding to messages",
  },
  {
    id: CANCEL_REASON.TASKER_REQUESTED_CANCEL,
    name: "Tasker requested to cancel the task",
  },
  {
    id: CANCEL_REASON.FOUND_SOMEONE_ELSE,
    name: "Found someone else outside CitiTasker",
  },
  {
    id: CANCEL_REASON.NO_LONGER_NEEDED,
    name: "Don't need the task done anymore",
  },
  {
    id: CANCEL_REASON.OTHER,
    name: "Other reasons",
  },
] as const;

export const cancelReasonMap: Record<CancelReason, string> = Object.fromEntries(
  cancelReasons.map((r) => [r.id, r.name])
) as Record<CancelReason, string>;

const schema = z
  .object({
    reason: z.string().min(1, "Please select your reason"),
    description: z.string().optional(),
    agreed: z.boolean().refine((v) => v, {
      message: "Please agree to the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.reason === "other" && !data.description?.trim()) {
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

  const handleSubmit = async (data: any) => {
    console.log(11, data);
    setCurrentStep(3); // Success step
  };

  const resetForm = () => {
    reset();
    setCurrentStep(1);
  };

  return {
    methods,
    currentStep,
    isSubmitting: false,
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

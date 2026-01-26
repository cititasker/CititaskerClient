// hooks/useCancelTask.ts
import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppSelector } from "@/store/hook";
import { calculateFees } from "@/utils";
import { useBaseMutation } from "@/hooks/useBaseMutation";
import { cancelTask } from "@/services/tasks/tasks.api";
import { API_ROUTES, ROLE } from "@/constant";

export const CANCEL_REASON = {
  // Poster reasons
  NOT_RESPONDING: "not_responding",
  TASKER_REQUESTED_CANCEL: "tasker_requested_cancel",
  FOUND_SOMEONE_ELSE: "found_someone_else",
  NO_LONGER_NEEDED: "no_longer_needed",

  // Tasker reasons
  POSTER_NOT_RESPONDING: "poster_not_responding",
  POSTER_REQUESTED_CANCEL: "poster_requested_cancel",
  POSTER_CHANGED_TASK: "poster_changed_task",
  POSTER_ADDED_ADDITIONAL_TASK: "poster_added_additional_task",

  // Common
  OTHER: "other",
} as const;

export type CancelReason = (typeof CANCEL_REASON)[keyof typeof CANCEL_REASON];

// Poster cancellation reasons
export const posterCancelReasons = [
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

// Tasker cancellation reasons
export const taskerCancelReasons = [
  {
    id: CANCEL_REASON.POSTER_NOT_RESPONDING,
    name: "Poster is not responding to messages",
  },
  {
    id: CANCEL_REASON.POSTER_REQUESTED_CANCEL,
    name: "Poster requested to cancel the task",
  },
  {
    id: CANCEL_REASON.POSTER_CHANGED_TASK,
    name: "Poster changed the task",
  },
  {
    id: CANCEL_REASON.POSTER_ADDED_ADDITIONAL_TASK,
    name: "Poster added additional task",
  },
  {
    id: CANCEL_REASON.OTHER,
    name: "Other reasons",
  },
] as const;

// Create dynamic schema based on user role
const createSchema = (isTasker: boolean) => {
  const baseSchema = z.object({
    reason: z.string().min(1, "Please select a reason for cancellation"),
    description: z.string().optional(),
    agreed: z.boolean().refine((v) => v === true, {
      message: "You must agree to the terms and conditions to proceed",
    }),
  });

  return baseSchema.superRefine((data, ctx) => {
    // Require description when "other" is selected
    if (data.reason === CANCEL_REASON.OTHER && !data.description?.trim()) {
      ctx.addIssue({
        path: ["description"],
        code: z.ZodIssueCode.custom,
        message: "Please provide details about your cancellation reason",
      });
    }
  });
};

export type CancelTaskFormData = z.infer<ReturnType<typeof createSchema>>;

export const useCancelTask = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { taskDetails } = useAppSelector((state) => state.task);
  const { user } = useAppSelector((state) => state.user);

  const isTasker = useMemo(() => user?.role === ROLE.tasker, [user?.role]);

  // Get appropriate cancel reasons based on role
  const cancelReasons = useMemo(
    () => (isTasker ? taskerCancelReasons : posterCancelReasons),
    [isTasker],
  );

  const cancelTaskMutation = useBaseMutation(cancelTask, {
    invalidateQueryKeys: [[API_ROUTES.TASKS]],
    disableSuccessToast: true,
    onSuccess: () => {
      setCurrentStep(3); // Both roles go to step 3 for success
    },
  });

  const methods = useForm<CancelTaskFormData>({
    defaultValues: {
      agreed: false,
      reason: "",
      description: "",
    },
    resolver: zodResolver(createSchema(isTasker)),
    mode: "onChange",
  });

  const { trigger, reset, watch } = methods;
  const selectedReason = watch("reason");

  // Calculate fees (only relevant for posters)
  const { amountPaid, feeBreakdown } = useMemo(() => {
    if (isTasker) {
      return { amountPaid: 0, feeBreakdown: undefined };
    }

    const offers = taskDetails?.offers ?? [];
    const accepted = offers.find((offer) => offer.status === "accepted");
    const amount = accepted?.offer_amount ?? taskDetails?.budget ?? 0;

    return {
      amountPaid: amount,
      feeBreakdown: calculateFees(amount),
    };
  }, [taskDetails, isTasker]);

  const handleNext = useCallback(async () => {
    // Step 1 validation: reason and description (if other)
    const validationFields: (keyof CancelTaskFormData)[] = ["reason"];
    if (selectedReason === CANCEL_REASON.OTHER) {
      validationFields.push("description");
    }

    const isValid = await trigger(validationFields);
    if (!isValid) return;

    // Move to step 2
    setCurrentStep(2);
  }, [selectedReason, trigger]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleSubmit = useCallback(
    async (data: CancelTaskFormData) => {
      const payload: any = {
        task_id: taskDetails?.id,
        cancellation_reason: data.reason,
      };

      if (data.description?.trim()) {
        payload.cancellation_description = data.description.trim();
      }

      cancelTaskMutation.mutate(payload);
    },
    [taskDetails?.id, cancelTaskMutation],
  );

  const resetForm = useCallback(() => {
    reset();
    setCurrentStep(1);
  }, [reset]);

  return {
    methods,
    currentStep,
    isTasker,
    selectedReason,
    amountPaid,
    feeBreakdown,
    cancelReasons,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm,
    isCancelTaskPending: cancelTaskMutation.isPending,
  };
};

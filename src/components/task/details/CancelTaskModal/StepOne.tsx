// components/StepOne.tsx
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import FormSelect from "@/components/forms/FormSelect";
import FormTextArea from "@/components/forms/FormTextArea";
import { maxLengthChar } from "@/constant";
import { CancelTaskFormData, CANCEL_REASON } from "./hooks/useCancelTask";
import { cn } from "@/lib/utils";

interface StepOneProps {
  reasons: readonly SelectOption[];
  selectedReason: string;
  isTasker: boolean;
}

export const StepOne = memo<StepOneProps>(
  ({ reasons, selectedReason, isTasker }) => {
    const { watch } = useFormContext<CancelTaskFormData>();
    const description = watch("description") || "";
    const remainingChars = maxLengthChar - description.length;

    const showDescription = selectedReason === CANCEL_REASON.OTHER;

    return (
      <div className="space-y-6">
        {/* Reason Selection */}
        <div>
          <FormSelect
            name="reason"
            label="Cancellation Reason"
            options={reasons}
            placeholder="Select a reason for cancellation"
            required
          />
        </div>

        {/* Description for "Other" reason */}
        {showDescription && (
          <div className="space-y-2">
            <FormTextArea
              name="description"
              label="Additional Details"
              placeholder="Please provide more details about your reason for cancellation..."
              maxLength={maxLengthChar}
              rows={4}
              className="resize-none"
              required
            />
            <div className="flex justify-end">
              <span
                className={cn(
                  "text-xs transition-colors",
                  remainingChars < 50 ? "text-warning" : "text-neutral-500",
                )}
              >
                {remainingChars} character{remainingChars !== 1 ? "s" : ""}{" "}
                remaining
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
);

StepOne.displayName = "StepOne";

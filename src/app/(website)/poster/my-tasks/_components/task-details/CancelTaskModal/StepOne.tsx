import React from "react";
import { useFormContext } from "react-hook-form";
import FormSelect from "@/components/forms/FormSelect";
import FormTextArea from "@/components/forms/FormTextArea";
import { maxLengthChar } from "@/constant";
import { CancelTaskFormData } from "./hooks/useCancelTask";

interface StepOneProps {
  reasons: SelectOption[];
  selectedReason: string;
}

export const StepOne: React.FC<StepOneProps> = ({
  reasons,
  selectedReason,
}) => {
  const { watch } = useFormContext<CancelTaskFormData>();
  const description = watch("description") || "";
  const remainingChars = maxLengthChar - description.length;

  return (
    <div className="space-y-6">
      <div>
        <FormSelect
          name="reason"
          options={reasons}
          placeholder="Select a reason for cancellation"
        />
      </div>

      {selectedReason === "5" && (
        <div className="space-y-2">
          <FormTextArea
            name="description"
            placeholder="Please provide more details about your reason for cancellation..."
            maxLength={maxLengthChar}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-end">
            <span
              className={`text-xs ${
                remainingChars < 50 ? "text-warning" : "text-neutral-500"
              }`}
            >
              {remainingChars} characters remaining
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

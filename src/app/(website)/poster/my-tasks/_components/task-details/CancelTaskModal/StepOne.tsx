import FormSelect from "@/components/forms/FormSelect";
import FormTextArea from "@/components/forms/FormTextArea";
import { maxLengthChar } from "@/constant";
import React from "react";
import { useFormContext } from "react-hook-form";

const options = [
  { id: "1", name: "Tasker is not responding to messages" },
  { id: "2", name: "Taskers requested to cancel the task" },
  {
    id: "3",
    name: "You found someone else outside CitiTasker to complete the task",
  },
  { id: "4", name: "You don’t need the task done anymore" },
  { id: "5", name: "Other reasons" },
];

export default function StepOne() {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const reason = watch("reason");
  const description = watch("description");
  const remainingChars = maxLengthChar - (description?.length || 0);
  return (
    <div>
      <div className="space-y-6">
        <FormSelect name="reason" options={options} />
        {reason == "5" && (
          <div>
            <FormTextArea
              name="description"
              placeholder="Write here...."
              className="h-[104px] mb-0 p-4 rounded-[10px] bg-light-grey"
              maxLength={maxLengthChar}
            />
            {!errors.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {remainingChars} characters remaining
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

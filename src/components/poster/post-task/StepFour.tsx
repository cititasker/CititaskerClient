"use client";
import { FormProvider } from "react-hook-form";
import { postTaskSchema } from "@/schema/task";

import CurrencyInput from "@/components/forms/CurrencyInput";
import ExtraInfo from "@/components/forms/ExtraInfo";
import PostTaskFormActions from "./partials/PostTaskFormActions";
import { useStepForm } from "./hooks/useStepForm";

export default function StepFour() {
  const { methods, onSubmit } = useStepForm({
    schema: postTaskSchema,
    pickFields: ["budget"],
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="sflex-1 overflow-y-auto no-scrollbar px-1 pb-4 space-y-4">
          <CurrencyInput
            name="budget"
            label="Enter Amount"
            placeholder="Enter amount here"
          />

          <ExtraInfo className="p-4 bg-info-light border border-info/20 rounded-xl">
            <p className="text-sm text-info font-medium">
              💡 This might not be the final amount you'll pay for the task.
              There's still room for negotiation between you and the tasker.
            </p>
          </ExtraInfo>
        </div>

        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
}

"use client";
import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { postTaskSchema } from "@/schema/task";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import CurrencyInput from "@/components/forms/CurrencyInput";
import ExtraInfo from "@/components/forms/ExtraInfo";
import PostTaskFormActions from "./PostTaskFormActions";

const schema = postTaskSchema.pick({ budget: true });
type FormValues = z.infer<typeof schema>;

export default function StepFour() {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") || 1);

  const methods = useForm<FormValues>({
    defaultValues: { budget: task.budget || "" },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (task.budget) {
      setValue("budget", task.budget);
    }
  }, [task.budget, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    dispatch(setTaskData(values));
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(step + 1));
    router.push(url.toString());
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
    </div>
  );
}

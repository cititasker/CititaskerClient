"use client";
import React, { useEffect } from "react";
import CurrencyInput from "../forms/CurrencyInput";
import ExtraInfo from "../forms/ExtraInfo";
import { postTaskSchema } from "@/schema/task";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setTaskData } from "@/store/slices/task";
import PostTaskFormActions from "./PostTaskFormActions";

const schema = postTaskSchema.pick({
  budget: true,
});
type schemaType = z.infer<typeof schema>;

const StepFour = () => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || 1;

  const methods = useForm<schemaType>({
    defaultValues: {
      budget: task.budget || "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (task.budget) setValue("budget", task.budget);
  }, [task]);

  const onSubmit: SubmitHandler<any> = (values) => {
    dispatch(setTaskData(values));
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("step", `${+step + 1}`);
    currentUrl.searchParams.set("d", "f");
    push(`${currentUrl}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-auto hide-scrollbar min-h-[65dvh] max-h-[600px] flex flex-col"
      >
        <div className="flex-1">
          <CurrencyInput
            name="budget"
            label="Enter Amount"
            placeholder="Enter amount here"
          />
          <ExtraInfo className="mt-10">
            Note that this might not be the final amount you will pay for the
            task. There’s still room for negotiation between you and the tasker.
          </ExtraInfo>
        </div>
        <PostTaskFormActions />
      </form>
    </FormProvider>
  );
};

export default StepFour;

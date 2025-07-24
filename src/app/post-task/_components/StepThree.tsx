"use client";

import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTaskSchema } from "@/schema/task";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TimeFrameSelector } from "./TimeFrameSelector";
import { TimeOfDaySelector } from "./TimeOfDaySelector";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormCheckbox from "@/components/forms/FormCheckbox";
import PostTaskFormActions from "./PostTaskFormActions";
import moment from "moment";
import { useUpdateTask } from "@/services/tasks/tasks.hook";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useQueryClient } from "@tanstack/react-query";
import { API_ROUTES, ROUTES } from "@/constant";
import { errorHandler } from "@/utils";

const schema = postTaskSchema
  .pick({
    time_frame: true,
    date: true,
    showTimeOfDay: true,
    time: true,
  })
  .superRefine((values, ctx) => {
    if (values.showTimeOfDay && !values.time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select time of the day",
        path: ["time"],
      });
    }
  });

type SchemaType = z.infer<typeof schema>;

const StepThree = () => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  const params = useParams();
  const id = params?.id;
  const action = searchParams.get("action");
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { role } = useAppSelector((state) => state.user);
  const router = useRouter();

  const isReschedule = action == "reschedule";

  const updateMutation = useUpdateTask({
    onSuccess: async (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_USER_TASK, id],
      });
      router.push(`/${role}/${ROUTES.MY_TASKS}/${id}`);
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const methods = useForm<SchemaType>({
    defaultValues: {
      time_frame: task.time_frame || null,
      date: task.date || "",
      showTimeOfDay: task.showTimeOfDay || false,
      time: task.time || null,
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (task.time_frame) setValue("time_frame", task.time_frame);
    if (task.date) setValue("date", task.date);
    if (task.time) setValue("time", task.time);
    if (task.showTimeOfDay) setValue("showTimeOfDay", task.showTimeOfDay);
  }, [task]);

  const onSubmit: SubmitHandler<SchemaType> = (values) => {
    dispatch(setTaskData(values));
    const currentUrl = new URL(window.location.href);
    if (isReschedule) {
      currentUrl.searchParams.set("step", "4");
      push(`${currentUrl}`);
      // const { showTimeOfDay: _, ...rest } = values;
      // const payload = { ...task, ...rest, task_id: id };
      // console.log(10, payload);
      // updateMutation.mutate(payload);
    } else {
      currentUrl.searchParams.set("step", `${step + 1}`);
      push(`${currentUrl}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-auto hide-scrollbar min-h-[65dvh] md:max-h-[600px] flex flex-col"
      >
        <div className="flex-1 space-y-4 sm:space-y-6">
          <TimeFrameSelector />
          <FormDatePicker
            name="date"
            label="When do you need this done?"
            minDate={moment().toDate()}
          />
          <FormCheckbox
            name="showTimeOfDay"
            label="Pick a particular time of the day."
          />
          <TimeOfDaySelector />
        </div>
        <PostTaskFormActions
          okText={isReschedule ? "Submit" : "Next"}
          loading={updateMutation.isPending}
        />
      </form>
    </FormProvider>
  );
};

export default StepThree;

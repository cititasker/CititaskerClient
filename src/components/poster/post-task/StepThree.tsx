"use client";
import { FormProvider } from "react-hook-form";
import { useParams } from "next/navigation";
import { postTaskSchema } from "@/schema/task";
import { useUpdateTask } from "@/services/tasks/tasks.hook";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { API_ROUTES, ROUTES } from "@/constant";
import { errorHandler } from "@/utils";
import dayjs from "dayjs";
import { z } from "zod";

import { TimeFrameSelector } from "./partials/TimeFrameSelector";
import { TimeOfDaySelector } from "./partials/TimeOfDaySelector";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormCheckbox from "@/components/forms/FormCheckbox";
import PostTaskFormActions from "./partials/PostTaskFormActions";
import { useUrlParams } from "./hooks/useUrlParams";
import { useStepForm } from "./hooks/useStepForm";

const stepThreeSchema = postTaskSchema
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

export default function StepThree() {
  const { id } = useParams();
  const urlParams = useUrlParams();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { role } = useAppSelector((state) => state.user);
  const router = useRouter();

  const isReschedule = urlParams.action === "reschedule";

  const { methods, onSubmit: handleFormSubmit } = useStepForm({
    schema: postTaskSchema,
    pickFields: ["time_frame", "date", "showTimeOfDay", "time"],
    customSchema: stepThreeSchema,
  });

  const updateMutation = useUpdateTask({
    onSuccess: async (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.USER_TASKS, id],
      });
      router.push(`/${role}/${ROUTES.MY_TASKS}/${id}`);
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isReschedule) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", "5");
      router.push(url.toString());
    } else {
      handleFormSubmit(e);
    }
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="space-y-6">
          <TimeFrameSelector />

          <FormDatePicker
            name="date"
            label="When do you need this done?"
            minDate={dayjs().toDate()}
          />

          <FormCheckbox
            name="showTimeOfDay"
            label="Pick a particular time of the day."
          />

          <TimeOfDaySelector />

          <PostTaskFormActions
            okText={isReschedule ? "Submit" : "Next"}
            loading={updateMutation.isPending}
          />
        </form>
      </FormProvider>
    </div>
  );
}

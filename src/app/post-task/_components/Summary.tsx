"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useAppSelector } from "@/store/hook";
import {
  errorHandler,
  base64ToFile,
  formatCurrency,
  formatDate,
} from "@/utils";
import { persistor } from "@/store";
import { queryClient } from "@/providers/ServerProvider";
import { API_ROUTES, ROUTES } from "@/constant";
import { useSnackbar } from "@/providers/SnackbarProvider";

import { Label } from "@/components/ui/label";
import { usPostTask } from "@/services/tasks/tasks.hook";
import PostTaskFormActions from "./PostTaskFormActions";

const TIME_FRAMES = {
  morning: { value: "Morning", label: "Before 10 am" },
  mid_day: { value: "Mid Day", label: "10am - 2pm" },
  afternoon: { value: "Afternoon", label: "2pm - 6pm" },
  evening: { value: "Evening", label: "After 6pm" },
} as const;

interface SummaryFieldProps {
  label: string;
  value: React.ReactNode;
}

const SummaryField = ({ label, value }: SummaryFieldProps) => (
  <div>
    <Label className="text-sm text-muted-foreground mb-1.5">{label}</Label>
    <p className="text-base text-foreground">{value ?? "N/A"}</p>
  </div>
);

const Summary = () => {
  const { data: session } = useSession();
  const { task } = useAppSelector((state) => state.task);
  const router = useRouter();
  const { id } = useParams() as { id?: string };
  const { showSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const isReschedule = action == "reschedule";

  const taskMutation = usPostTask();

  const timeFrameText = useMemo(() => {
    if (!task.showTimeOfDay || !task.time) return null;
    const frame = TIME_FRAMES[task.time as keyof typeof TIME_FRAMES];
    return frame ? `${frame.value} (${frame.label})` : null;
  }, [task.showTimeOfDay, task.time]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.href)}`
      );
      return;
    }

    const { category_id, state, sub_category_id, location, images, ...rest } =
      task;

    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      if (key !== "showTimeOfDay" && value != null)
        formData.append(key, String(value));
    });

    // images?.forEach((el: any, i: any) => {
    //   if (el.new) {
    //     const file = base64ToFile(el.src, i) as any;
    //     formData.append("images[]", file);
    //   }
    // });

    formData.append("category_id", String(category_id?.id ?? ""));
    formData.append("sub_category_id", String(sub_category_id?.id ?? ""));
    formData.append("state", String(state?.name ?? ""));
    if (id) formData.append("task_id", id);

    location?.forEach((loc: string) => formData.append("location[]", loc));

    taskMutation.mutate(
      { id, body: formData },
      {
        onSuccess: async (data) => {
          showSnackbar(data.message, "success");
          queryClient.invalidateQueries({
            queryKey: [API_ROUTES.GET_USER_TASK, id],
          });
          queryClient.invalidateQueries({
            queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
          });
          await persistor.purge();
          const baseUrl = `/${session?.user.role}/${ROUTES.MY_TASKS}`;
          const url = id ? `${baseUrl}/${id}` : baseUrl;
          router.push(url);
        },
        onError: (error) => {
          showSnackbar(errorHandler(error), "error");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Task Summary Form"
      className="flex flex-col min-h-[82dvh] max-h-[600px] overflow-auto hide-scrollbar w-full"
    >
      <div className="flex flex-col sm:flex-row gap-6 flex-1">
        <div
          className="flex-1 max-[300px] max-w-full h-[300px] shrink-0 rounded-2xl bg-muted overflow-hidden"
          aria-label="Task Image"
        >
          {task.images?.[0]?.src ? (
            <Image
              src={task.images[0].src}
              alt={task.name || "Task image"}
              width={300}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-4 flex-1">
          <SummaryField label="Title" value={task.name} />
          <SummaryField label="Description" value={task.description} />
          <SummaryField label="Category" value={task.category_id?.name} />
          <SummaryField label="Location" value={task.address} />
          <SummaryField
            label="Date"
            value={task.date ? formatDate(task.date, "DD - MM - YYYY") : null}
          />
          {timeFrameText && <SummaryField label="Time" value={timeFrameText} />}
          <SummaryField
            label="Budget"
            value={formatCurrency({ value: task.budget })}
          />
        </div>
      </div>

      <PostTaskFormActions
        type="submit"
        loading={taskMutation.isPending}
        className="mt-6 self-end"
        okText={id ? "Update Task" : "Create Task"}
        backwardStep={isReschedule ? "3" : undefined}
      />
    </form>
  );
};

export default Summary;

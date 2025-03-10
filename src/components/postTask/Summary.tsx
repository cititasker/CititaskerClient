"use client";
import { useAppSelector } from "@/store/hook";
import {
  base64ToFile,
  errorHandler,
  formatCurrency,
  formatDate,
} from "@/utils";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import PostTaskFormActions from "./PostTaskFormActions";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useMutation } from "@tanstack/react-query";
import { createTask, updateTask } from "@/services/task";
import { persistor } from "@/store";
import { queryClient } from "@/providers/ServerProvider";
import { USER_TASK_ID } from "@/queries/queryKeys";

const Summary = () => {
  const { data: session } = useSession();
  const { task } = useAppSelector((state) => state.task);
  const { push } = useRouter();
  const { id }: { id: string | undefined } = useParams();
  const { showSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: async (data) => {
      showSnackbar(data.message, "success");
      await persistor.purge();
      push("/my-tasks");
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: async (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({ queryKey: USER_TASK_ID(id) });
      await persistor.purge();
      push(`/my-tasks/${id}`);
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  const timeFrame = (value: any) => {
    switch (value) {
      case "morning": {
        return { value: "Morning", label: "Before 10 am" };
      }
      case "mid_day": {
        return { value: "Mid Day", label: "10am - 2pm" };
      }
      case "afternoon": {
        return { value: "Afternoon", label: "2pm - 6pm" };
      }
      case "evening": {
        return { value: "Evening", label: "After 6pm" };
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (session) {
      const { category_id, state, sub_category_id, location, images, ...rest } =
        task;
      const formData = new FormData();
      Object.entries(rest).forEach(([key, value]: any) => {
        if (key !== "showTimeOfDay" && value) {
          formData.append(key, `${value}`);
        }
      });
      if (images && images.length) {
        images.forEach((el: any, i: any) => {
          if (el.new) {
            const file = base64ToFile(el.src, i) as any;
            formData.append("images[]", file);
          }
        });
      }
      formData.append("category_id", `${category_id?.id}`);
      formData.append("sub_category_id", `${sub_category_id?.id}`);
      formData.append("state", `${state?.name}`);
      if (location?.length) {
        location.forEach((el: any) => {
          formData.append("location[]", el);
        });
      }
      if (id) {
        formData.append("task_id", id);
        updateMutation.mutate(formData);
      } else {
        mutation.mutate(formData);
      }
    } else {
      push(`/login?redirect=${encodeURIComponent(location.href)}`);
    }
  };

  return (
    <form className="overflow-auto hide-scrollbar min-h-[82dvh] max-h-[600px] w-full flex flex-col">
      <div className="flex gap-6 flex-1">
        <div className="max-w-[300px] w-full shrink-0 h-[300px] bg-[#D9D9D9] rounded-20 overflow-hidden">
          {task.images?.length ? (
            <Image
              src={task.images[0].src}
              alt=""
              width={300}
              height={300}
              className="object-cover w-full h-full rounded-20 shrink-0"
            />
          ) : null}
        </div>
        <div>
          <div className="mb-4">
            <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
              Title
            </label>
            <Typography className="text-black text-base">
              {task.name}
            </Typography>
          </div>
          <div className="mb-4">
            <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
              Description
            </label>
            <Typography className="text-black text-base">
              {task.description}
            </Typography>
          </div>
          <div className="mb-4">
            <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
              Category
            </label>
            <Typography className="text-black text-base">
              {task.category_id?.name}
            </Typography>
          </div>
          <div className="mb-4">
            <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
              Location
            </label>
            <Typography className="text-black text-base">
              {task.address}
            </Typography>
          </div>
          <div className="mb-4">
            <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
              Date
            </label>
            <Typography className="text-black text-base">
              {formatDate(task.date, "DD - MM - YYYY")}
            </Typography>
          </div>
          {task.showTimeOfDay && (
            <div className="mb-4">
              <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
                Time
              </label>
              <Typography className="text-black text-base">
                {`${timeFrame(task.time)?.value} (${
                  timeFrame(task.time)?.label
                })`}
              </Typography>
            </div>
          )}
          <div className="mb-4">
            <label className="inline-block mb-1.5 text-dark-grey-2 text-sm">
              Budget
            </label>
            <Typography className="text-black text-base">
              {formatCurrency({ value: task.budget })}
            </Typography>
          </div>
        </div>
      </div>
      <PostTaskFormActions
        loading={mutation.isPending || updateMutation.isPending}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default Summary;

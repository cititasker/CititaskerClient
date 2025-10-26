"use client";
import React, { useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook";
import { formatCurrency, formatDate } from "@/utils";
import { Badge } from "@/components/ui/badge";
import PostTaskFormActions from "../partials/PostTaskFormActions";
import {
  Calendar,
  MapPin,
  DollarSign,
  Tag,
  Clock,
  User,
  FileText,
  ImageIcon,
} from "lucide-react";
import { useTaskSubmission } from "../../hooks/useTaskSubmission";
import { usePurgeData } from "@/utils/dataPurge";
import SummaryField from "./SummaryField";
import ImageGallery from "./ImageGallery";
import { ROUTES } from "@/constant";
import { NormalizedImage } from "@/lib/image-uploader-utils";

const TIME_FRAMES = {
  morning: { value: "Morning", label: "Before 10 am" },
  mid_day: { value: "Mid Day", label: "10am - 2pm" },
  afternoon: { value: "Afternoon", label: "2pm - 6pm" },
  evening: { value: "Evening", label: "After 6pm" },
} as const;

export default function Summary() {
  const { task } = useAppSelector((state) => state.task);
  const { isAuth } = useAppSelector((state) => state.user);
  const { id } = useParams() as { id?: string };
  const searchParams = useSearchParams();
  const router = useRouter();
  const isReschedule = searchParams.get("action") === "reschedule";
  const { submitTask, isLoading } = useTaskSubmission();
  const { purgeTask } = usePurgeData();

  const timeFrameText = useMemo(() => {
    if (!task.showTimeOfDay || !task.time) return null;
    const frame = TIME_FRAMES[task.time as keyof typeof TIME_FRAMES];
    return frame ? `${frame.value} (${frame.label})` : null;
  }, [task.showTimeOfDay, task.time]);

  const buildFormData = () => {
    const { category_id, state, sub_category_id, location, images, ...rest } =
      task;
    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      if (key !== "showTimeOfDay" && value != null) {
        formData.append(key, String(value));
      }
    });

    if (category_id?.id) formData.append("category_id", String(category_id.id));
    if (sub_category_id?.id)
      formData.append("sub_category_id", String(sub_category_id.id));
    if (state?.name) formData.append("state", String(state.name));
    if (id) formData.append("task_id", id);

    if (Array.isArray(location)) {
      location.forEach((loc) => formData.append("location[]", String(loc)));
    }
    if (images && Array.isArray(images)) {
      images.forEach((img) => formData.append("images[]", img.url));
    }

    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!isAuth) {
        const currentUrl = window.location.href;
        const redirect = encodeURIComponent(currentUrl);
        router.push(`${ROUTES.LOGIN}?redirect=${redirect}`);
        return;
      }

      // User is authenticated, proceed with submission
      const formData = buildFormData();
      await submitTask(formData, id);

      // Only purge data after successful submission
      await purgeTask();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">
          Review Your Task
        </h2>
        <p className="text-text-muted">
          Please review the details before submitting
          {!isAuth && (
            <span className="block mt-2 text-sm text-amber-600">
              You'll be asked to log in before submitting this task
            </span>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImageGallery
            images={(task.images as NormalizedImage[]) || []}
            taskName={task.name}
          />

          <div className="space-y-4">
            <SummaryField
              icon={<User className="w-4 h-4" />}
              label="Task Title"
              value={task.name}
            />
            <SummaryField
              icon={<FileText className="w-4 h-4" />}
              label="Description"
              value={task.description}
            />
            <SummaryField
              icon={<Tag className="w-4 h-4" />}
              label="Category"
              value={task.category_id?.name}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryField
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={task.address}
          />
          <SummaryField
            icon={<Calendar className="w-4 h-4" />}
            label="Date"
            value={task.date ? formatDate(task.date) : null}
          />
          {timeFrameText && (
            <SummaryField
              icon={<Clock className="w-4 h-4" />}
              label="Time"
              value={timeFrameText}
            />
          )}
          <SummaryField
            icon={<DollarSign className="w-4 h-4" />}
            label="Budget"
            value={formatCurrency({ value: task.budget })}
          />
          <SummaryField
            icon={<Tag className="w-4 h-4" />}
            label="Location Type"
            value={
              <Badge variant="secondary" className="capitalize">
                {task.location_type?.replace("_", "-")}
              </Badge>
            }
          />
          {task.images && task.images.length > 0 && (
            <SummaryField
              icon={<ImageIcon className="w-4 h-4" />}
              label="Images"
              value={`${task.images.length} image${
                task.images.length > 1 ? "s" : ""
              } attached`}
            />
          )}
        </div>

        <PostTaskFormActions
          type="submit"
          loading={isLoading}
          okText={
            !isAuth ? "Continue to Login" : id ? "Update Task" : "Post Task"
          }
          backwardStep={isReschedule ? "3" : undefined}
        />
      </form>
    </div>
  );
}

import { useEffect, useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useFetchTaskById } from "@/services/tasks/tasks.hook";
import { usePurgeData } from "@/utils/dataPurge";
import { normalizeFromCloudinaryUrl } from "@/lib/image-uploader-utils";
import { findStateByName } from "@/lib/utils/nigeria-states";

export const useTaskData = () => {
  const { id } = useParams() as { id?: string };
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { purgeTask } = usePurgeData();
  const searchParams = useSearchParams();

  const currentStep = Number(searchParams.get("step")) || 1;
  const similarId = searchParams.get("similar");

  const isEditMode = Boolean(id);
  const isSimilarMode = Boolean(similarId);
  const isCreateMode = !id && !similarId;

  const fetchId = id || similarId || "";

  const { data, isLoading, error } = useFetchTaskById({ id: fetchId });

  const transformedTaskData = useMemo(() => {
    if (!data?.data) return null;

    const task = data.data;
    const state = findStateByName(task.state);

    return {
      name: task.name,
      description: task.description,
      category_id: task.category,
      sub_category_id: task.sub_category,
      location_type: task.location_type,
      state: state ? { id: state.isoCode, name: state.name } : null,
      location: Array.isArray(task.location)
        ? task.location.map((coord) => Number(coord))
        : [],
      address: task.address,
      time_frame: task.time_frame,
      date: task.date,
      time: task.time,
      showTimeOfDay: !!task.date,
      budget: String(task.budget),
      images: task.images?.map((src) => normalizeFromCloudinaryUrl(src)) || [],
    };
  }, [data?.data]);

  useEffect(() => {
    if (isCreateMode && currentStep === 1) {
      purgeTask().catch(console.error);
    }
  }, [isCreateMode, currentStep, purgeTask]);

  useEffect(() => {
    if ((isEditMode || isSimilarMode) && transformedTaskData) {
      dispatch(setTaskData(transformedTaskData));
    }
  }, [isEditMode, isSimilarMode, transformedTaskData, dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Only clear if in edit mode and explicitly leaving the app
      if (isEditMode) {
        purgeTask().catch(console.error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (
        isEditMode &&
        !pathname.includes("/post-task") &&
        !pathname.includes("auth/login") &&
        !pathname.includes("/auth")
      ) {
        purgeTask().catch(console.error);
      }
    };
  }, [pathname, isEditMode, purgeTask]);

  return {
    taskData: transformedTaskData,
    isLoading: isEditMode || isSimilarMode ? isLoading : false,
    error: isEditMode || isSimilarMode ? error : null,
    hasData: isEditMode || isSimilarMode ? !!transformedTaskData : false,
    isEditMode,
    isCreateMode,
    isSimilarMode,
  };
};

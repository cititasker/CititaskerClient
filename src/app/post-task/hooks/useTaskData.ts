import { useEffect, useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { setTaskData } from "@/store/slices/task";
import { useFetchTaskById } from "@/services/tasks/tasks.hook";
import { IState, State } from "country-state-city";
import { usePurgeData } from "@/utils/dataPurge";

export const useTaskData = () => {
  const { id } = useParams() as { id?: string };
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data, isLoading, error } = useFetchTaskById({ id: id ?? "" });
  const { purgeTask } = usePurgeData();
  const searchParams = useSearchParams();

  const currentStep = Number(searchParams.get("step")) || 1;

  const isEditMode = Boolean(id);
  const isCreateMode = !id;

  const transformedTaskData = useMemo(() => {
    if (!data?.data || isCreateMode) return null;

    const task = data.data;
    const allStates = State.getStatesOfCountry("NG") as IState[];
    const state = allStates.find((el) => el.name === task.state);

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
      images: task.images?.map((src) => ({ src, new: false })) || [],
    };
  }, [data?.data]);

  useEffect(() => {
    if (isCreateMode && currentStep == 1) {
      purgeTask().catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (isEditMode && transformedTaskData) {
      dispatch(setTaskData(transformedTaskData));
    }
  }, [transformedTaskData, dispatch, isEditMode]);

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
      // Only clear data when:
      // 1. Leaving edit mode AND not going to create mode
      // 2. Going to a completely different section of the app
      if (
        isEditMode &&
        !pathname.includes("/post-task") &&
        !pathname.includes("/login") &&
        !pathname.includes("/auth")
      ) {
        purgeTask().catch(console.error);
      }
    };
  }, [pathname, isEditMode, purgeTask]);

  return {
    taskData: transformedTaskData,
    isLoading: isEditMode ? isLoading : false,
    error: isEditMode ? error : null,
    hasData: isEditMode ? !!transformedTaskData : false,
    isEditMode,
    isCreateMode,
  };
};

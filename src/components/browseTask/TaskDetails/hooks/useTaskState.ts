import { useMemo } from "react";
import { TaskState } from "../types";
import { useAppSelector } from "@/store/hook";

export const useTaskState = (task?: ITask | null): TaskState => {
  const { taskDetails } = useAppSelector((s) => s.task);
  const { user } = useAppSelector((state) => state.user);

  const effectiveTask = task ?? taskDetails;

  return useMemo(() => {
    const status = effectiveTask?.status;
    const isOpen = status === "open";
    // const isAssigned = status === "assigned";
    const isCompleted = status === "completed";

    const isTaskAssignedToYou = effectiveTask?.tasker?.id === user?.id;

    const hasMadeOffer =
      effectiveTask?.offers?.some((offer) => offer.tasker.id === user?.id) ??
      false;

    const hasCompletedTask = !!(isCompleted && isTaskAssignedToYou);

    const hasCompletedKyc = user?.kyc_stage
      ? Object.entries(user.kyc_stage)
          .filter(([key]) => key !== "profile")
          .every(([, value]) => Boolean(value))
      : false;

    return {
      canMakeOffer: isOpen && !hasMadeOffer,
      canUpdateOffer: isOpen && hasMadeOffer,
      canCompleteTask: hasMadeOffer && isTaskAssignedToYou && !hasCompletedTask,
      canReschedule: isTaskAssignedToYou && !task?.reschedule,
      hasCompletedTask,
      hasMadeOffer,
      hasCompletedKyc,
    };
  }, [effectiveTask, user]);
};

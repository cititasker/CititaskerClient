import { useMemo } from "react";
import { TaskState } from "../types";

export const useTaskState = (task: ITask, user: any): TaskState => {
  return useMemo(() => {
    const status = task.status;
    const isOpen = status === "open";
    const isAssigned = status === "assigned";
    const isTaskAssignedToYou = isAssigned && task.tasker?.id === user?.id;
    const hasCompletedTask = task.payment_requested && isTaskAssignedToYou;
    const hasMadeOffer = task.offers.some(
      (offer) => offer.tasker.id === user?.id
    );

    const hasCompletedKyc = user?.kyc_stage
      ? Object.entries(user.kyc_stage)
          .filter(([key]) => key !== "profile")
          .every(([, value]) => Boolean(value))
      : false;

    return {
      canMakeOffer: isOpen && !hasMadeOffer,
      canUpdateOffer: isOpen && hasMadeOffer,
      canCompleteTask: hasMadeOffer && isTaskAssignedToYou && !hasCompletedTask,
      canReschedule: isTaskAssignedToYou,
      hasCompletedTask,
      hasMadeOffer,
      hasCompletedKyc,
    };
  }, [task, user]);
};

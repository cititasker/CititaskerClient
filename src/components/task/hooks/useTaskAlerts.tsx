import { useMemo } from "react";
import { getPartialInitials } from "@/utils";

export interface TaskAlert {
  id: string;
  type: "surcharge" | "reschedule" | "release_payment";
  message: React.ReactNode;
  actionText: string;
  onAction: () => void;
  priority: number;
}

interface UseTaskAlertsProps {
  task: ITask;
  acceptedOffer?: IOffer;
  role: "poster" | "tasker";
  onSurchargeAction: () => void;
  onRescheduleAction: () => void;
  onReleasePaymentAction: () => void;
}

export const useTaskAlerts = ({
  task,
  acceptedOffer,
  role,
  onSurchargeAction,
  onRescheduleAction,
  onReleasePaymentAction,
}: UseTaskAlertsProps) => {
  const alerts = useMemo(() => {
    const alertList: TaskAlert[] = [];

    // Release Payment alert (Highest Priority) - Poster only
    if (
      role === "poster" &&
      task?.status === "completed" &&
      task?.payment_requested
    ) {
      const taskerName = getPartialInitials(task?.tasker?.profile);
      alertList.push({
        id: "release_payment",
        type: "release_payment",
        priority: 0,
        message: (
          <p>
            {taskerName} has completed the task
            <span className="text-primary"> "{task?.name}"</span> and is
            requesting payment release.
          </p>
        ),
        actionText: "Release payment",
        onAction: onReleasePaymentAction,
      });
    }

    // Surcharge alert - Poster only
    if (role === "poster" && task?.has_surcharge_requests && acceptedOffer) {
      const taskerName = getPartialInitials(acceptedOffer.tasker);
      alertList.push({
        id: "surcharge",
        type: "surcharge",
        priority: 1,
        message: (
          <p>
            {taskerName} requested additional payment for
            <span className="text-primary"> "{task?.name}"</span>
          </p>
        ),
        actionText: "Respond to request",
        onAction: onSurchargeAction,
      });
    }

    const agreedDate = task?.reschedule?.agreed_date;
    const agreedTime = task?.reschedule?.agreed_time;

    // Reschedule alert - Poster
    if (
      !agreedDate &&
      !agreedTime &&
      task?.reschedule?.initiated_by == "tasker" &&
      role === "poster"
    ) {
      const taskerName = getPartialInitials(task?.tasker?.profile);
      alertList.push({
        id: "reschedule",
        type: "reschedule",
        priority: 2,
        message: (
          <p>
            {taskerName} is requesting to reschedule the task
            <span className="text-primary"> "{task?.name}"</span>
          </p>
        ),
        actionText: "Respond to request",
        onAction: onRescheduleAction,
      });
    }

    // Reschedule alert - Tasker
    if (
      !agreedDate &&
      !agreedTime &&
      task?.reschedule?.initiated_by == "poster" &&
      role === "tasker"
    ) {
      const posterName = getPartialInitials(task.poster.profile);
      alertList.push({
        id: "reschedule",
        type: "reschedule",
        priority: 2,
        message: (
          <p>
            {posterName} is requesting to reschedule the task
            <span className="text-text-primary"> "{task.name}"</span>
          </p>
        ),
        actionText: "Respond to request",
        onAction: onRescheduleAction,
      });
    }

    return alertList.sort((a, b) => a.priority - b.priority);
  }, [
    task,
    acceptedOffer,
    role,
    onSurchargeAction,
    onRescheduleAction,
    onReleasePaymentAction,
  ]);

  return {
    alerts,
    hasAlerts: alerts.length > 0,
    activeAlert: alerts[0],
  };
};

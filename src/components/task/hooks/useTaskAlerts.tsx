import { useEffect, useMemo, useRef } from "react";
import { getPartialInitials } from "@/utils";
import { useTaskAlert } from "@/providers/TaskAlertContext";

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
  const { showAlert } = useTaskAlert();
  const shownAlertsRef = useRef<Set<string>>(new Set());

  const alerts = useMemo(() => {
    const alertList: TaskAlert[] = [];

    if (!task) return alertList;

    const { status, payment_requested, has_surcharge_requests, reschedule } =
      task;
    const agreedDate = reschedule?.agreed_date;
    const agreedTime = reschedule?.agreed_time;

    // Release Payment alert
    if (role === "poster" && status === "completed" && payment_requested) {
      const taskerName = getPartialInitials(task?.tasker?.profile);
      alertList.push({
        id: `release_payment_${task?.id}`,
        type: "release_payment",
        priority: 0,
        message: (
          <p>
            {taskerName} has completed the task
            <span className="font-semibold"> "{task?.name}"</span> and is
            requesting payment release.
          </p>
        ),
        actionText: "Release Payment",
        onAction: onReleasePaymentAction,
      });
    }

    // Surcharge alert
    if (role === "poster" && has_surcharge_requests && acceptedOffer) {
      const taskerName = getPartialInitials(acceptedOffer.tasker);
      alertList.push({
        id: `surcharge_${task?.id}`,
        type: "surcharge",
        priority: 1,
        message: (
          <p>
            {taskerName} requested additional payment for
            <span className="font-semibold"> "{task?.name}"</span>
          </p>
        ),
        actionText: "Respond to Request",
        onAction: onSurchargeAction,
      });
    }

    // Reschedule alert - Poster
    if (
      !agreedDate &&
      !agreedTime &&
      reschedule?.initiated_by === "tasker" &&
      role === "poster"
    ) {
      const taskerName = getPartialInitials(task?.tasker?.profile);
      alertList.push({
        id: `reschedule_${task?.id}`,
        type: "reschedule",
        priority: 2,
        message: (
          <p>
            {taskerName} is requesting to reschedule the task
            <span className="font-semibold"> "{task?.name}"</span>
          </p>
        ),
        actionText: "Respond to Request",
        onAction: onRescheduleAction,
      });
    }

    // Reschedule alert - Tasker
    if (
      !agreedDate &&
      !agreedTime &&
      reschedule?.initiated_by === "poster" &&
      role === "tasker"
    ) {
      const posterName = getPartialInitials(task?.poster.profile);
      alertList.push({
        id: `reschedule_${task?.id}`,
        type: "reschedule",
        priority: 2,
        message: (
          <p>
            {posterName} is requesting to reschedule the task
            <span className="font-semibold"> "{task?.name}"</span>
          </p>
        ),
        actionText: "Respond to Request",
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

  const alertsKey = useMemo(() => alerts.map((a) => a.id).join(","), [alerts]);

  useEffect(() => {
    if (shownAlertsRef.current.has(alertsKey)) return;

    alerts.forEach((alert) => showAlert(alert));
    shownAlertsRef.current.add(alertsKey);

    // Cleanup
    if (shownAlertsRef.current.size > 10) {
      const entries = Array.from(shownAlertsRef.current);
      shownAlertsRef.current = new Set(entries.slice(-5));
    }
  }, [alertsKey, alerts]);

  return {
    alerts,
    hasAlerts: alerts.length > 0,
    activeAlert: alerts[0],
  };
};

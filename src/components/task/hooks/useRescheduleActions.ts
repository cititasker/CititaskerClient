import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRescheduleTask,
  useCreateReschedule,
  useAcceptReschedule,
} from "@/services/tasks/tasks.hook";
import { API_ROUTES } from "@/constant";
import { formatDate } from "@/utils";
import useModal from "@/hooks/useModal";
import { rescheduleTaskSchemaType } from "@/components/task/modals/reschedule/schema";
import { toast } from "sonner";
import { RescheduleStep } from "../modals/reschedule/constants";
import { useTaskAlert } from "@/providers/TaskAlertContext";

interface UseRescheduleActionsProps {
  task: ITask;
}

export const useRescheduleActions = ({ task }: UseRescheduleActionsProps) => {
  const [step, setStep] = useState<RescheduleStep>("request");
  const queryClient = useQueryClient();
  const rescheduleModal = useModal();
  const { hideAlert } = useTaskAlert();

  const rescheduleTask = useRescheduleTask();
  const createReschedule = useCreateReschedule();
  const acceptReschedule = useAcceptReschedule();

  const invalidateQueries = useCallback(() => {
    if (!task?.id) return;

    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.USER_TASKS, String(task.id)],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.TASKS, String(task.id)],
    });
  }, [queryClient, task?.id]);

  const handleCreateReschedule = useCallback(
    (data: rescheduleTaskSchemaType, onSuccess: () => void) => {
      if (!task?.id) return;

      const payload = {
        task_id: String(task.id),
        date: formatDate(data.proposed_date, "YYYY-MM-DD"),
        time: data.proposed_time,
      };

      createReschedule.mutate(payload, {
        onSuccess: () => {
          invalidateQueries();
          onSuccess();
        },
        onError: () => {
          toast.error("Task reschedule failed, please try again");
        },
      });
    },
    [task?.id, createReschedule, invalidateQueries],
  );

  const handleRescheduleSubmit = useCallback(
    (data: rescheduleTaskSchemaType, onSuccess: () => void) => {
      if (!task?.reschedule?.reschedule_id) return;

      const payload = {
        reschedule_id: task.reschedule.reschedule_id,
        proposed_date: formatDate(data.proposed_date, "YYYY-MM-DD"),
        proposed_time: data.proposed_time,
      };

      const rejectWithCounter =
        task.reschedule.id == task.reschedule.reschedule_id;

      rescheduleTask.mutate(
        { data: payload, rejectWithCounter },
        {
          onSuccess: () => {
            invalidateQueries();
            hideAlert(`reschedule_${task?.id}`);
            onSuccess();
          },
          onError: () => {
            toast.error("Failed to reschedule task");
          },
        },
      );
    },
    [task, rescheduleTask, invalidateQueries, hideAlert],
  );

  const handleAcceptReschedule = useCallback(() => {
    if (!task?.reschedule?.id) {
      toast.error("No reschedule request found");
      return;
    }

    const payload = {
      reschedule_id: task.reschedule.reschedule_id,
    };

    acceptReschedule.mutate(
      { data: payload },
      {
        onSuccess: () => {
          invalidateQueries();
          hideAlert(`reschedule_${task?.id}`);
          setStep("success");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [task, acceptReschedule, invalidateQueries, hideAlert]);

  const openRescheduleModal = useCallback(
    (type?: RescheduleStep) => {
      if (type) setStep(type);
      rescheduleModal.openModal();
    },
    [rescheduleModal],
  );

  const closeRescheduleModal = useCallback(() => {
    rescheduleModal.closeModal();
    setStep("request");
  }, [rescheduleModal]);

  return {
    // State
    task,
    step,

    // Modals
    rescheduleModal,

    // Mutations
    rescheduleTask,
    createReschedule,
    acceptReschedule,

    // Actions
    setStep,
    handleCreateReschedule,
    handleRescheduleSubmit,
    handleAcceptReschedule,
    openRescheduleModal,
    closeRescheduleModal,
  };
};

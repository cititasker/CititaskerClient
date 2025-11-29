import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRescheduleTask,
  useCreateReschedule,
  useAcceptReschedule,
} from "@/services/tasks/tasks.hook";
import { API_ROUTES, ROLE } from "@/constant";
import { formatDate } from "@/utils";
import useModal from "@/hooks/useModal";
import { rescheduleTaskSchemaType } from "@/components/task/modals/reschedule/schema";
import { toast } from "sonner";
import { RescheduleStep } from "../modals/reschedule/constants";

interface UseRescheduleActionsProps {
  task: ITask;
  role: "poster" | "tasker";
}

export const useRescheduleActions = ({
  task,
  role,
}: UseRescheduleActionsProps) => {
  const [step, setStep] = useState<RescheduleStep>("request");
  const queryClient = useQueryClient();
  const rescheduleModal = useModal();

  const rescheduleTask = useRescheduleTask();
  const createReschedule = useCreateReschedule();
  const acceptReschedule = useAcceptReschedule();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_USER_TASK, String(task.id)],
    });
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_TASK_BY_ID, String(task.id)],
    });
  };

  const handleCreateReschedule = (
    data: rescheduleTaskSchemaType,
    onSuccess: () => void
  ) => {
    const payload = {
      task_id: String(task?.id),
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
  };

  const handleRescheduleSubmit = (
    data: rescheduleTaskSchemaType,
    onSuccess: () => void
  ) => {
    const payload = {
      reschedule_id: task?.reschedule?.reschedule_id,
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
          onSuccess();
        },
        onError: () => {
          toast.error("Failed to reschedule task");
        },
      }
    );
  };

  const handleAcceptReschedule = () => {
    if (!task?.reschedule?.id) {
      toast.error("No reschedule request found");
      return;
    }

    const payload = {
      reschedule_id: task.reschedule.reschedule_id,
    };

    acceptReschedule.mutate(
      { data: payload, role: ROLE[role] },
      {
        onSuccess: () => {
          invalidateQueries();
          setStep("success");
        },
        onError: () => {
          toast.error("Failed to accept reschedule");
        },
      }
    );
  };

  const openRescheduleModal = (type?: RescheduleStep) => {
    if (type) setStep(type);
    rescheduleModal.openModal();
  };

  const closeRescheduleModal = () => {
    rescheduleModal.closeModal();
    setStep("request");
  };

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

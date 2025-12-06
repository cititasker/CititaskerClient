"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import useModal from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";
import { useFetchTaskById } from "@/services/tasks/tasks.hook";
import { Card } from "@/components/ui/card";
import TaskDetailSkeleton from "@/components/skeletons/TaskDetailSkeleton";
import { useTaskActions, useTaskAlerts } from "@/components/task/hooks";
import { TaskHeader } from "./TaskHeader";
import { TaskContent } from "./TaskContent";

const ShareTaskModal = dynamic(() => import("../Modals/ShareTaskModal"), {
  ssr: false,
  loading: () => null,
});

const TaskModals = dynamic(
  () =>
    import("@/components/task/modals").then((mod) => ({
      default: mod.TaskModals,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

interface TaskDetailsProps {
  back: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ back }) => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useFetchTaskById({ id });
  const shareModal = useModal();

  const task = data?.data as ITask;

  const actions = useTaskActions({ task });

  useTaskAlerts({
    task,
    acceptedOffer: undefined,
    role: "tasker",
    onSurchargeAction: () => {},
    onRescheduleAction: () => actions.openRescheduleModal("request"),
    onReleasePaymentAction: () => {},
  });

  useEffect(() => {
    if (!task) return;
    dispatch(setTaskDetails(task));
    const userOffer = task.offers.find((offer) => offer.tasker.id === user?.id);
    dispatch(setUserTaskOffer(userOffer ?? null));
  }, [task, user?.id, dispatch]);

  const handleHeaderAction = (key: string) => {
    const headerActions: Record<string, () => void> = {
      share: shareModal.openModal,
      report: () => console.log("Report task"),
      bookmark: () => console.log("Bookmark task"),
    };
    headerActions[key]?.();
  };

  const handleOptionSelect = (action: MoreOptionItem) => {
    if (action.name === "reschedule") {
      actions.openRescheduleModal("create");
    }
  };

  if (isLoading) return <TaskDetailSkeleton />;

  return (
    <>
      <Card className="overflow-hidden">
        <TaskHeader back={back} onAction={handleHeaderAction} />
        <TaskContent task={task} onOptionSelect={handleOptionSelect} />
      </Card>

      {shareModal.isOpen && (
        <ShareTaskModal
          open={shareModal.isOpen}
          onClose={shareModal.closeModal}
          taskId={id}
        />
      )}

      {task && <TaskModals task={task} actions={actions} role="tasker" />}
    </>
  );
};

export default TaskDetails;

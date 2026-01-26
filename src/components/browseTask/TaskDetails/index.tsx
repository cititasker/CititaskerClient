"use client";

import React, { useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import useModal from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";
import { useFetchTaskById } from "@/services/tasks/tasks.hook";
import { Card } from "@/components/ui/card";
import { useTaskActions, useTaskAlerts } from "@/components/task/hooks";
import { TaskHeader } from "./TaskHeader";
import { TaskContent } from "./TaskContent";
import { JsonLd } from "@/components/seo/JsonLd";

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
  },
);

interface TaskDetailsProps {
  back: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ back }) => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { data } = useFetchTaskById({ id });
  const shareModal = useModal();

  const task = data?.data as ITask;

  const actions = useTaskActions({ task });

  const handleSurchargeAction = useCallback(() => {}, []);

  const handleRescheduleAction = useCallback(() => {
    actions.openRescheduleModal("request");
  }, [actions.openRescheduleModal]);

  const handleReleasePaymentAction = useCallback(() => {}, []);

  useTaskAlerts({
    task,
    acceptedOffer: undefined,
    pendingSurcharge: actions.pendingSurcharge,
    role: "tasker",
    onSurchargeAction: handleSurchargeAction,
    onRescheduleAction: handleRescheduleAction,
    onReleasePaymentAction: handleReleasePaymentAction,
  });

  useEffect(() => {
    if (!task) return;
    dispatch(setTaskDetails(task));
    const userOffer = task.offers?.find(
      (offer) => offer.tasker.id === user?.id,
    );
    dispatch(setUserTaskOffer(userOffer ?? null));
  }, [task, user?.id, dispatch]);

  const handleHeaderAction = useCallback(
    (key: string) => {
      const headerActions: Record<string, () => void> = {
        share: shareModal.openModal,
        report: () => console.log("Report task"),
        bookmark: () => console.log("Bookmark task"),
      };
      headerActions[key]?.();
    },
    [shareModal],
  );

  const handleOptionSelect = useCallback(
    (action: MoreOptionItem) => {
      if (action.name === "reschedule") {
        actions.openRescheduleModal("create");
      } else if (action.name === "cancel-task") {
        actions.cancelTaskModal.openModal();
      }
    },
    [actions.openRescheduleModal],
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: task.name,
    description: task.description,
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/browse-tasks/${task.id}`,
    provider: {
      "@type": "Person",
      name: `${task.poster.profile.first_name} ${task.poster.profile.last_name}`,
    },
    offers: {
      "@type": "Offer",
      price: task.budget,
      priceCurrency: "NGN",
    },
    datePosted: task.created_at,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Card className="overflow-hidden rounded-b-none">
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

      <TaskModals task={task} actions={actions} role="tasker" />
    </>
  );
};

export default TaskDetails;

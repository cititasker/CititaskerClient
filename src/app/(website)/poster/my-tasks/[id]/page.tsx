"use client";

import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import TaskStatusCard from "@/components/task/details/TaskStatusCard";
import TaskSummaryCard from "@/components/task/details/TaskSummaryCard/TaskSummaryCard";
import AllOffers from "@/components/myTasks/AllOffers";
import Reviews from "@/components/myTasks/Reviews";
import CustomTab from "@/components/reusables/CustomTab";
import Questions from "@/components/shared/components/comment/Questions";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { setTaskDetails } from "@/store/slices/task";
import { useTaskActions, useTaskAlerts } from "@/components/task/hooks";
import { TaskModals } from "@/components/task/modals";
import { TaskAlertBanner } from "@/components/task/alerts";
import {
  useFetchTaskQuestion,
  useFetchUserTaskById,
} from "@/services/tasks/tasks.hook";

export default function Offer() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useFetchUserTaskById({ id: id as string });
  const task = data?.data;

  const { data: questionData } = useFetchTaskQuestion(task?.id);
  const questions = questionData?.data?.data ?? [];

  useEffect(() => {
    if (task) dispatch(setTaskDetails(task));
  }, [task, dispatch]);

  const actions = useTaskActions({ task });

  const { alerts } = useTaskAlerts({
    task,
    acceptedOffer: actions.acceptedOffer,
    role: "poster",
    onSurchargeAction: actions.surchargeModal.openModal,
    onRescheduleAction: () => actions.openRescheduleModal("request"),
    onReleasePaymentAction: actions.openReleasePaymentModal,
  });

  const handlePrimaryAction = () => {
    if (task.status === "open") {
      router.push(`/post-task/${task.id}`);
    } else if (task.status === "assigned") {
      actions.surchargeModal.openModal();
    } else if (task.payment_requested) {
      actions.openReleasePaymentModal();
    }
  };

  const tabs = [
    {
      label: `Offers (${task.offer_count})`,
      value: "offers",
      render: () => (
        <AllOffers task={task} toggleModal={actions.openOfferModal} />
      ),
    },
    {
      label: `Questions (${questions.length})`,
      value: "questions",
      render: () => <Questions questions={questions} taskId={task.id} />,
    },
    {
      label: "Reviews",
      value: "reviews",
      render: () => <Reviews task={task} />,
    },
  ];

  return (
    <FormProvider {...actions.methods}>
      <div className="p-top bg-background-secondary h-full flex flex-col">
        <div className="container-w py-0 lg:flex-1 lg:min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-full">
            <div className="lg:col-span-2 space-y-6 lg:overflow-y-auto no-scrollbar">
              <TaskStatusCard
                date={task.date}
                offerCount={task.offer_count}
                status={task.status}
              />
              <TaskSummaryCard
                task={task}
                onEditDate={() => router.push(`/post-task/${task.id}?step=3`)}
                onEditPrice={() => router.push(`/post-task/${task.id}?step=4`)}
                onPrimaryAction={handlePrimaryAction}
                buttonText={
                  task.status === "open"
                    ? "Edit task"
                    : task.payment_requested || task.status == "assigned"
                    ? "Release payment"
                    : "Payment released"
                }
                disabledButtonText={
                  !task.payment_requested && task.status === "assigned"
                }
              />
            </div>

            <div className="lg:col-span-3 lg:min-h-0">
              <div className="space-y-2 mb-2">
                {alerts.map((alert) => (
                  <TaskAlertBanner key={alert.id} alert={alert} />
                ))}
              </div>

              <CustomTab
                items={tabs}
                className="lg:h-full"
                contentClassName="p-5 sm:p-8 lg:overflow-y-auto"
              />
            </div>
          </div>
        </div>

        {/* All Modals */}
        <TaskModals task={task} actions={actions} role="poster" />
      </div>
    </FormProvider>
  );
}

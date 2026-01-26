"use client";

import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import TaskStatusCard from "@/components/task/details/TaskStatusCard";
import TaskSummaryCard from "@/components/task/details/TaskSummaryCard/TaskSummaryCard";
import AllOffers from "@/components/myTasks/AllOffers";
import Reviews from "@/components/myTasks/Reviews";
import CustomTab from "@/components/reusables/CustomTab";
import Questions from "@/components/shared/components/comment/Questions";
import { useEffect, useCallback, useMemo } from "react";
import { useAppDispatch } from "@/store/hook";
import { setTaskDetails } from "@/store/slices/task";
import { useTaskActions, useTaskAlerts } from "@/components/task/hooks";
import { TaskModals } from "@/components/task/modals";
import {
  useFetchTaskQuestion,
  useFetchUserTaskById,
} from "@/services/tasks/tasks.hook";
import Loader from "@/components/reusables/Loading";
import useModal from "@/hooks/useModal";
import DisputeCenter from "@/components/task/details/dispute/DisputeCenter";

export default function Offer() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const helpModal = useModal();

  const { data, isLoading } = useFetchUserTaskById({ id: id as string });
  const task = data?.data;

  const { data: questionData } = useFetchTaskQuestion(task?.id);
  const questions = questionData?.data?.data ?? [];

  useEffect(() => {
    if (task) dispatch(setTaskDetails(task));
  }, [task, dispatch]);

  const actions = useTaskActions({ task });

  // Stable callback references
  const handleSurchargeAction = useCallback(() => {
    actions.surchargeModal.openModal();
  }, [actions.surchargeModal]);

  const handleRescheduleAction = useCallback(() => {
    actions.openRescheduleModal("request");
  }, [actions.openRescheduleModal]);

  const handleReleasePaymentAction = useCallback(() => {
    actions.openReleasePaymentModal();
  }, [actions.openReleasePaymentModal]);

  useTaskAlerts({
    task,
    acceptedOffer: actions.acceptedOffer,
    pendingSurcharge: actions.pendingSurcharge,
    role: "poster",
    onSurchargeAction: handleSurchargeAction,
    onRescheduleAction: handleRescheduleAction,
    onReleasePaymentAction: handleReleasePaymentAction,
  });

  const handlePrimaryAction = () => {
    if (!task) return;

    if (task.status === "open") {
      router.push(`/post-task/${task.id}`);
    } else if (task.status === "assigned" && task.has_surcharge_requests) {
      actions.surchargeModal.openModal();
    } else if (task.payment_requested) {
      actions.openReleasePaymentModal();
    }
  };

  const buttonText = useMemo(() => {
    if (task.status === "open") return "Edit task";
    if (task.has_surcharge_requests) return "Pay surcharge";
    if (task.payment_requested && !task.payment_released)
      return "Release payment";
    if (task.status === "assigned") return "Release payment";
    return "Payment released";
  }, [task]);

  const handleSelectedOption = (opt: MoreOptionItem) => {
    switch (opt.name) {
      case "cancel-task": {
        actions.cancelTaskModal.openModal();
        break;
      }
      case "help": {
        helpModal.openModal();
        break;
      }
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

  if (isLoading || !task) {
    return <Loader />;
  }

  return (
    <FormProvider {...actions.methods}>
      <div className="min-h-screen bg-background-secondary overflow-x-hidden">
        <div className="container-w p-top pb-5 lg:h-screen lg:flex lg:flex-col lg:overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:flex-1 lg:min-h-0">
            {/* Left column - Scrollable on desktop */}
            <div className="lg:col-span-2 space-y-6 lg:overflow-y-auto lg:pr-2 no-scrollbar">
              <TaskStatusCard
                date={task.date}
                offerCount={task.offer_count}
                status={task.status}
              />

              <TaskSummaryCard
                task={task}
                handleSelectedOption={handleSelectedOption}
                onEditDate={() => router.push(`/post-task/${task.id}?step=3`)}
                onEditPrice={() => router.push(`/post-task/${task.id}?step=4`)}
                onPrimaryAction={handlePrimaryAction}
                buttonText={buttonText}
                disabledButtonText={
                  task.payment_released ||
                  (task.status == "assigned" &&
                    !task.payment_requested &&
                    !task.has_surcharge_requests)
                }
              />

              {task.status !== "open" && (
                <DisputeCenter
                  helpModal={helpModal}
                  taskId={id}
                  hasDispute={task?.has_disputes}
                />
              )}
            </div>

            {/* Right column - Tabs with proper overflow handling */}
            <div className="lg:col-span-3 lg:min-h-0 lg:overflow-hidden w-full min-w-0">
              <CustomTab
                items={tabs}
                className="lg:h-full lg:flex lg:flex-col"
                contentClassName="p-4 sm:p-5 md:p-8"
                mobileAsCards={false}
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

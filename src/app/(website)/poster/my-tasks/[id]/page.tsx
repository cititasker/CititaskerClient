"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import TaskStatusCard from "../_components/task-details/TaskStatusCard";
import TaskSummaryCard from "../_components/task-details/TaskSummaryCard/TaskSummaryCard";
import AllOffers from "@/components/myTasks/AllOffers";
import Reviews from "@/components/myTasks/Reviews";
import AcceptOfferModal from "../_components/task-details/AcceptOfferModal";
import PaymentSuccessModal from "../_components/task-details/PaymentSuccessModal";
import PaySurChargeModal from "../_components/surcharge/PaySurChargeModal";
import CustomTab from "@/components/reusables/CustomTab";

import {
  useFetchTaskQuestion,
  useFetchUserTaskById,
} from "@/services/tasks/tasks.hook";
import { useOfferTaskLogic } from "../_components/hooks/useOfferTaskLogic";
import Questions from "@/components/shared/components/comment/Questions";
import BannerAlert from "@/components/reusables/BannerAlert";
import ActionsButtons from "@/components/reusables/ActionButtons";
import { DeleteConfirmModal } from "@/components/reusables/Modals/ConfirmModal";
import { useEffect, useMemo } from "react";
import { initializeName } from "@/utils";
import { surchargeReasons } from "@/constant";
import useModal from "@/hooks/useModal";
import CustomModal from "@/components/reusables/CustomModal";
import { useAppDispatch } from "@/store/hook";
import { setTaskDetails } from "@/store/slices/task";

const schema = z.object({
  agreed: z.boolean().refine((v) => v, {
    message: "Please confirm you agree to the terms and conditions",
  }),
});

type SchemaType = z.infer<typeof schema>;

export default function Offer() {
  const { id } = useParams();
  const router = useRouter();
  const suchargeReasonModal = useModal();
  const dispatch = useAppDispatch();

  const { data } = useFetchUserTaskById({ id: id as string });
  const task = data?.data;

  useEffect(() => {
    dispatch(setTaskDetails(task ?? {}));
  }, [task]);

  const { data: questionData } = useFetchTaskQuestion(task?.id);
  const questions = questionData?.data?.data || [];

  const {
    showAcceptModal,
    toggleAcceptModal,
    showSuccessModal,
    toggleSuccessModal,
    onSubmit,
    handlePrimaryAction,
    closeSurcharge,
    acceptedOffer,
    surchargeModal,
    paymentMutation,
    selectedOffer,
    rejectSurchargeModal,
    rejectSurcharge,
    surcharges,
  } = useOfferTaskLogic(task);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { agreed: false },
  });

  const tabs = [
    {
      label: `Offers (${task.offer_count || 0})`,
      value: "offers",
      render: () => <AllOffers task={task} toggleModal={toggleAcceptModal} />,
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

  const getButtonText = () => {
    switch (task.status) {
      case "open":
        return "Edit Task";
      case "assigned":
        return "Pay Surcharge";
      default:
        return null;
    }
  };

  const pendingSurcharge = useMemo(() => {
    if (!surcharges?.data) return;
    const pending = surcharges.data.data.find(
      (surcharges) => surcharges.status === "pending"
    );
    if (!pending) return;
    return { ...pending, payable_id: acceptedOffer?.id };
  }, [surcharges?.data]);

  const surchargeReason = pendingSurcharge
    ? surchargeReasons[pendingSurcharge.reason]
    : undefined;

  const taskerName = useMemo(() => {
    if (!acceptedOffer?.tasker) return "This tasker";
    const fullName =
      acceptedOffer?.tasker.first_name + " " + acceptedOffer?.tasker.last_name;
    return initializeName({ full_name: fullName });
  }, []);

  const onConfirm = () => {
    if (!pendingSurcharge?.id) return;
    rejectSurcharge.mutate({ surcharge_id: pendingSurcharge.id.toString() });
  };

  return (
    <FormProvider {...methods}>
      <div className="p-top bg-background-secondary h-full flex flex-col">
        <div className="container-w py-0 lg:flex-1 lg:min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-full">
            {/* Left Column - Task Cards */}
            <div className="lg:col-span-2 space-y-6 lg:overflow-y-auto no-scrollbar lg:min-h-0">
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
                buttonText={getButtonText()}
              />
            </div>

            {/* Right Column - Tabs */}
            <div className="lg:col-span-3 lg:min-h-0">
              {task.has_surcharge_requests && (
                <BannerAlert
                  message={
                    <p>
                      {taskerName} has requested additional payments for this
                      task.{" "}
                      <span
                        onClick={suchargeReasonModal.openModal}
                        className="underline cursor-pointer"
                      >
                        See Reason
                      </span>
                    </p>
                  }
                  className="mb-3"
                >
                  <ActionsButtons
                    size="lg"
                    okText="Accept request"
                    cancelText="Reject request"
                    handleCancel={rejectSurchargeModal.openModal}
                    handleSubmit={surchargeModal.openModal}
                    className="sm:gap-x-3"
                  />
                </BannerAlert>
              )}

              <CustomTab
                items={tabs}
                className="lg:h-full"
                contentClassName="p-5 sm:p-8 lg:overflow-y-auto no-scrollbar"
              />
            </div>
          </div>
        </div>

        {/* Modals */}
        <AcceptOfferModal
          open={showAcceptModal}
          onClose={toggleAcceptModal}
          onSubmit={onSubmit}
          loading={paymentMutation.isPending}
          selectedOffer={selectedOffer}
        />
        <PaymentSuccessModal
          isOpen={showSuccessModal}
          onClose={toggleSuccessModal}
          selectedOffer={selectedOffer}
        />
        <PaySurChargeModal
          isOpen={surchargeModal.isOpen}
          onClose={closeSurcharge}
          acceptedOffer={acceptedOffer}
          pendingSurcharge={pendingSurcharge}
        />
        <DeleteConfirmModal
          open={rejectSurchargeModal.isOpen}
          onClose={rejectSurchargeModal.closeModal}
          type="warning"
          title="Reject Surcharge Request"
          description={`You are about to reject the surcharge request made by ${taskerName}. This means the task cannot proceed until the surcharge is accepted. Are you sure you want to continue?`}
          confirmText="Reject Request"
          loading={rejectSurcharge.isPending}
          onConfirm={onConfirm}
        />
        <CustomModal
          title="Surcharge Reason"
          isOpen={suchargeReasonModal.isOpen}
          onClose={suchargeReasonModal.closeModal}
          contentClassName="max-w-md"
        >
          <p>{surchargeReason}</p>
        </CustomModal>
      </div>
    </FormProvider>
  );
}

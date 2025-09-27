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

const schema = z.object({
  agreed: z.boolean().refine((v) => v, {
    message: "Please confirm you agree to the terms and conditions",
  }),
});

type SchemaType = z.infer<typeof schema>;

export default function Offer() {
  const { id } = useParams();
  const router = useRouter();

  const { data } = useFetchUserTaskById({ id: id as string });
  const task = data?.data;

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

  return (
    <FormProvider {...methods}>
      <div className="p-top bg-background-secondary h-full flex flex-col">
        <div className="container-w py-0 lg:flex-1 lg:min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-full">
            {/* Left Column - Task Cards */}
            <div className="lg:col-span-2 space-y-6 lg:overflow-y-auto lg:min-h-0">
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
        />
      </div>
    </FormProvider>
  );
}

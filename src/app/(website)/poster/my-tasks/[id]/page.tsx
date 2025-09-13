"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import HeaderNavigation from "../_components/task-details/HeaderNavigation";
import TaskStatusCard from "../_components/task-details/TaskStatusCard";
import TaskSummaryCard from "../_components/task-details/TaskSummaryCard";
import AllOffers from "@/components/myTasks/AllOffers";
import Questions from "@/components/myTasks/Questions";
import Reviews from "@/components/myTasks/Reviews";
import AcceptOfferModal from "../_components/task-details/AcceptOfferModal";
import PaymentSuccessModal from "../_components/task-details/PaymentSuccessModal";
import PaySurChargeModal from "../_components/surcharge/PaySurChargeModal";
import CustomTab from "@/components/reusables/CustomTab";

import { useFetchUserTaskById } from "@/services/tasks/tasks.hook";
import { useOfferTaskLogic } from "../_components/hooks/useOfferTaskLogic";
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
  const dispatch = useAppDispatch();

  const { data } = useFetchUserTaskById({ id: id as string });
  const task = data?.data;

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

  // useEffect(() => {
  //   if (task) {
  //     dispatch(setTaskDetails(task));
  //   }
  // }, [task, dispatch]);

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    {
      label: `Offers (${task.offer_count || 0})`,
      value: "offers",
      render: () => <AllOffers task={task} toggleModal={toggleAcceptModal} />,
    },
    {
      label: "Questions",
      value: "questions",
      render: () => <Questions />,
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
      <div className="min-h-screen bg-background-secondary p-top">
        <div className="container-w mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* <HeaderNavigation /> */}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Task Cards */}
            <div className="lg:col-span-2 space-y-6">
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
            <div className="lg:col-span-3">
              <CustomTab
                items={tabs}
                className="h-full"
                // listClassName="mb-6"
                contentClassName="max-h-[600px] h-full"
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

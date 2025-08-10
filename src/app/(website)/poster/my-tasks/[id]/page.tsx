"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import HeaderNavigation from "../_components/task-details/HeaderNavigation";
import TaskStatusCard from "../_components/task-details/TaskStatusCard";
import TaskSummaryCard from "../_components/task-details/TaskSummaryCard";

import AllOffers from "@/components/myTasks/AllOffers";
import Questions from "@/components/myTasks/Questions";
import Reviews from "@/components/myTasks/Reviews";

import AcceptOfferModal from "../_components/task-details/AcceptOfferModal";
import PaymentSuccessModal from "../_components/task-details/PaymentSuccessModal";
import CustomTab from "@/components/reusables/CustomTab";
import PaySurChargeModal from "../_components/surcharge/PaySurChargeModal";

import { useFetchUserTaskById } from "@/services/tasks/tasks.hook";
import { useOfferTaskLogic } from "../_components/hooks/useOfferTaskLogic";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { setTaskDetails } from "@/store/slices/task";

const schema = z.object({
  agreed: z.boolean().refine((v) => v, {
    message: "Please confirm you agree to the terms and condition",
  }),
});

type SchemaType = z.infer<typeof schema>;

export default function Offer() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useFetchUserTaskById({ id: id as string });
  const task = data?.data;

  useEffect(() => {
    if (task) {
      dispatch(setTaskDetails(task));
    }
  }, [task, dispatch]);

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
      label: `Offers (${task.offer_count})`,
      value: "offers",
      render: () => <AllOffers task={task} toggleModal={toggleAcceptModal} />,
    },
    { label: "Questions (0)", value: "questions", render: () => <Questions /> },
    {
      label: "Reviews",
      value: "reviews",
      render: () => <Reviews task={task} />,
    },
  ];

  return (
    <FormProvider {...methods}>
      <div className="p-top bg-light-grey min-h-dvh">
        <div className="max-w-[1300px] mx-auto px-5">
          <HeaderNavigation />
          <div className="flex flex-col md:flex-row gap-4 lg:gap-x-6 w-full">
            <div className="w-full md:w-2/5 flex flex-col gap-y-4 lg:gap-6">
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
                    ? "Edit Task"
                    : task.status === "assigned"
                    ? "Pay Surcharge"
                    : null
                }
              />
            </div>
            <div className="w-full md:w-3/5">
              <CustomTab
                items={tabs}
                className="h-full"
                listClassName="mb-0"
                contentClassName="max-h-[calc(100dvh-250px)] h-full"
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

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { USER_TASK_ID } from "@/queries/queryKeys";
import { queryClient } from "@/providers/ServerProvider";
import { useSnackbar } from "@/providers/SnackbarProvider";

import Paystack from "@/utils/paystackSetup";
import { errorHandler } from "@/utils";

import HeaderNavigation from "../_components/task-details/HeaderNavigation";
import TaskStatusCard from "../_components/task-details/TaskStatusCard";
import TaskSummaryCard from "../_components/task-details/TaskSummaryCard";

import AllOffers from "@/components/myTasks/AllOffers";
import Questions from "@/components/myTasks/Questions";
import Reviews from "@/components/myTasks/Reviews";

import AcceptOfferModal from "../_components/task-details/AcceptOfferModal";
import PaymentSuccessModal from "../_components/task-details/PaymentSuccessModal";
import CustomTab from "@/components/reusables/CustomTab";
import {
  useCreateIntent,
  useFetchUserTaskById,
} from "@/services/poster/tasks/tasks.hook";

const schema = z.object({
  agreed: z.boolean().refine((v) => v, {
    message: "Please confirm you agree to the terms and condition",
  }),
});

type SchemaType = z.infer<typeof schema>;

export default function Offer() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data } = useFetchUserTaskById({ id });
  const task = data.data;
  const status = task?.status;

  console.log(89, data);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { agreed: false },
  });

  const paymentMutation = useCreateIntent({
    onSuccess: (data) => {
      setShowAcceptModal(false);
      const { amount, hash_id } = data.data;
      Paystack.startPayment({
        email: task.poster.email,
        amount: amount * 100,
        reference: hash_id,
        handleSuccess,
      });
    },
    onError: (error) => {
      showSnackbar(errorHandler(error), "error");
    },
  });

  function toggleAcceptModal(offer?: IOffer) {
    setSelectedOffer((prev) => (prev ? null : offer || null));
    setShowAcceptModal((prev) => !prev);
  }

  function toggleSuccessModal() {
    setShowSuccessModal((prev) => !prev);
  }

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: USER_TASK_ID(id) });
    toggleSuccessModal();
  }

  async function onSubmit() {
    if (!selectedOffer) return;
    await paymentMutation.mutateAsync({
      offer_id: selectedOffer.id,
      task_id: task.id,
    });
  }

  function handlePrimaryAction() {
    if (status === "open") {
      router.push(`/post-task/${id}`);
    }
  }

  const buttonText =
    status === "open"
      ? "Edit Task"
      : status === "assigned"
      ? "Pay Surcharge"
      : null;

  const tabs = [
    {
      label: `Offers (${task.offer_count})`,
      value: "offers",
      content: <AllOffers task={task} toggleModal={toggleAcceptModal} />,
    },
    { label: "Questions (3)", value: "questions", content: <Questions /> },
    { label: "Reviews", value: "reviews", content: <Reviews /> },
  ];

  return (
    <FormProvider {...methods}>
      <div className="p-top bg-light-grey min-h-dvh">
        <div className="max-w-[1300px] mx-auto px-5">
          <HeaderNavigation />
          <div className="flex flex-col md:flex-row gap-x-8 w-full">
            <div className="w-full md:w-2/5">
              <TaskStatusCard
                date={task.date}
                offerCount={task.offer_count}
                status={status}
              />
              <TaskSummaryCard
                task={task}
                onMoreOptionSelect={(option) =>
                  console.log("Selected:", option)
                }
                onEditDate={() => router.push(`/post-task/${task.id}?step=3`)}
                onEditPrice={() => router.push(`/post-task/${task.id}?step=4`)}
                onPrimaryAction={handlePrimaryAction}
                buttonText={buttonText}
              />
            </div>
            <div className="w-full md:w-3/5">
              <CustomTab
                items={tabs}
                className="h-full"
                contentClassName="max-h-[calc(100dvh-250px)] h-full"
              />
            </div>
          </div>
        </div>

        {/* Accept Offer Modal */}
        <AcceptOfferModal
          open={showAcceptModal}
          onClose={() => toggleAcceptModal()}
          onSubmit={onSubmit}
          loading={paymentMutation.isPending}
          selectedOffer={selectedOffer}
          taskName={task.name}
        />

        {/* Payment Success Modal */}
        <PaymentSuccessModal
          isOpen={showSuccessModal}
          onClose={toggleSuccessModal}
          selectedOffer={selectedOffer}
        />
      </div>
    </FormProvider>
  );
}

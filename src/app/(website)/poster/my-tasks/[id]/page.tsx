"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
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
} from "@/services/tasks/tasks.hook";
import { API_ROUTES } from "@/constant";
import PaySurChargeModal from "../_components/surcharge/PaySurChargeModal";
import useModal from "@/hooks/useModal";
import { useAppDispatch } from "@/store/hook";
import { purgeStateData } from "@/store/slices/task";

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
  const surchargeModal = useModal();
  const dispatch = useAppDispatch();

  const { data } = useFetchUserTaskById({ id });
  const task = data.data;
  const status = task?.status;

  const acceptedOffer = useMemo(() => {
    return task.offers.find((offer) => offer.status == "accepted");
  }, [task.offers]);

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
    queryClient.invalidateQueries({
      queryKey: [API_ROUTES.GET_USER_TASK, id],
    });
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
    } else if (status == "assigned") {
      surchargeModal.openModal();
    }
  }

  const closeSurcharge = () => {
    dispatch(purgeStateData({ path: "offer" }));
    surchargeModal.closeModal();
  };

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
          <div className="flex flex-col md:flex-row gap-x-8 w-full">
            <div className="w-full md:w-2/5">
              <TaskStatusCard
                date={task.date}
                offerCount={task.offer_count}
                status={status}
              />
              <TaskSummaryCard
                task={task}
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
                listClassName="mb-0"
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
        />

        {/* Payment Success Modal */}
        <PaymentSuccessModal
          isOpen={showSuccessModal}
          onClose={toggleSuccessModal}
          selectedOffer={selectedOffer}
        />

        {/* Pay surcharge modal */}
        <PaySurChargeModal
          isOpen={surchargeModal.isOpen}
          onClose={closeSurcharge}
          acceptedOffer={acceptedOffer}
        />
      </div>
    </FormProvider>
  );
}

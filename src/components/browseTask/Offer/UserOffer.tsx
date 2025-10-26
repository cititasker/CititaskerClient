import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { capitalize, formatCurrency, loggedInUser } from "@/utils";
import StatusChip from "../../reusables/StatusChip";
import Icons from "../../Icons";
import FormButton from "../../forms/FormButton";
import { FaStar } from "react-icons/fa";
import React, { useMemo } from "react";
import Link from "next/link";
import { API_ROUTES } from "@/constant";
import { getOfferReplies } from "@/services/offers/offers.api";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import OfferReplyThread from "./OfferReplyThread";

interface IProps {
  offer: IOffer;
  task: ITask;
  toggleModal: (offer: IOffer) => void;
}

// Extracted sub-components for better organization
const TaskerInfo = ({
  tasker,
  task,
}: {
  tasker: IOffer["tasker"];
  task: ITask;
}) => (
  <div className="flex gap-3 items-start flex-1">
    <Avatar className="w-12 h-12 ring-2 ring-primary-100">
      <AvatarImage src={tasker.profile_image} alt="Tasker profile" />
      <AvatarFallback className="font-semibold bg-primary-50 text-primary-600">
        {tasker.profile_image
          ? null
          : `${tasker.first_name?.[0] || ""}${tasker.last_name?.[0] || ""}`}
      </AvatarFallback>
    </Avatar>

    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="font-semibold text-text-primary truncate">
          {loggedInUser(tasker.first_name, tasker.last_name)}
        </h3>

        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium text-warning">5.0</span>
          <FaStar className="text-warning w-3 h-3" />
          <span className="text-text-muted">(82)</span>
        </div>

        {task.tasker?.id === tasker.id && (
          <StatusChip status={capitalize(task.status)} isActive={false} />
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 px-2 text-text-muted hover:text-primary"
        >
          <Link
            href={`/tasker/profile/${tasker.id}`}
            className="flex items-center gap-1"
          >
            <Icons.person className="w-4 h-4" />
            View Profile
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-text-muted hover:text-error"
        >
          <Icons.flag className="w-4 h-4" />
          Report Offer
        </Button>
      </div>
    </div>
  </div>
);

const OfferActions = ({
  offer,
  task,
  toggleModal,
}: {
  offer: IOffer;
  task: ITask;
  toggleModal: (offer: IOffer) => void;
}) => {
  const isAssignedToThisTasker =
    task.status === "assigned" && task.tasker?.id === offer.tasker.id;
  const isPending = offer.status === "pending";

  if (isPending) {
    return (
      <FormButton
        text="Accept Offer"
        size="lg"
        className="btn-primary min-w-[120px] bg-success hover:bg-success/90"
        onClick={() => toggleModal(offer)}
      />
    );
  }

  if (isAssignedToThisTasker) {
    return (
      <FormButton
        text="Message"
        size="lg"
        className="btn-primary min-w-[120px]"
        href="/poster/dashboard/messages"
      />
    );
  }

  return null;
};

const UserOffer = ({ offer, task, toggleModal }: IProps) => {
  const { data } = useQuery({
    queryKey: [API_ROUTES.OFFER_REPLIES, offer.id],
    queryFn: () => getOfferReplies(`${offer.id}`),
  });

  const replies = data?.data;

  const comment = useMemo(() => {
    if (!replies) return undefined;
    return {
      id: replies.id,
      files: [],
      replies: replies.replies,
      user: replies.tasker,
      created_at: replies.created_at,
      content: replies.description,
    };
  }, [replies]);

  return (
    <Card className="p-6 border border-border-light hover:border-border-medium mb-6 last:mb-0 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <TaskerInfo tasker={offer.tasker} task={task} />

        {/* Price - Always visible on desktop, mobile shows below */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-2xl font-bold text-text-primary">
            {formatCurrency({ value: offer.offer_amount, noFraction: true })}
          </span>
        </div>
      </div>

      {/* Mobile Price & Actions Row */}
      <div className="flex items-center justify-between sm:hidden mb-4">
        <span className="text-xl font-bold text-text-primary">
          {formatCurrency({ value: offer.offer_amount, noFraction: true })}
        </span>
        <OfferActions offer={offer} task={task} toggleModal={toggleModal} />
      </div>

      {/* Desktop Actions */}
      <div className="hidden sm:flex justify-end mb-4">
        <OfferActions offer={offer} task={task} toggleModal={toggleModal} />
      </div>

      {/* Comments Thread */}
      {data?.data && (
        <div className="border-t border-border-light pt-4 mt-4">
          <OfferReplyThread comment={comment} />
        </div>
      )}
    </Card>
  );
};

export default UserOffer;

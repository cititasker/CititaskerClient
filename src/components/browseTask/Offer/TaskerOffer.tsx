"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";
import { useAppSelector } from "@/store/hook";
import { formatCurrency, initializeName, loggedInUser } from "@/utils";
import FormButton from "@/components/forms/FormButton";
import CustomAvatar from "@/components/reusables/CustomAvatar";
import { useGetOfferReplies } from "@/services/offers/offers.hook";
import OfferReplyThread from "./OfferReplyThread";

interface TaskerOfferProps {
  offer: IOffer;
  onWithdrawRequest: () => void;
}

const TaskerStats = ({
  rating = 0,
  taskCompleted = 0,
  completionRate = 0,
}: {
  rating?: number;
  taskCompleted?: number;
  completionRate?: number;
}) => (
  <div className="flex flex-wrap items-center gap-4 text-sm">
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-warning text-warning" />
      <span className="font-semibold text-text-primary">{rating}</span>
      <span className="text-text-muted">
        ({taskCompleted.toLocaleString()})
      </span>
    </div>

    <div className="flex items-center gap-1.5">
      <TrendingUp className="w-4 h-4 text-success" />
      <span className="font-semibold text-text-primary">
        {Math.round(completionRate)}%
      </span>
      <span className="text-text-muted">completion</span>
    </div>
  </div>
);

const OfferAmount = ({
  amount,
  isPending,
  isOwner,
  onWithdraw,
}: {
  amount: number;
  isPending: boolean;
  isOwner: boolean;
  onWithdraw: () => void;
}) => {
  if (!isPending) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <p className="text-2xl font-bold text-primary">
        {formatCurrency({ value: amount, noFraction: true })}
      </p>

      {isOwner && (
        <FormButton
          variant="outline"
          size="sm"
          onClick={onWithdraw}
          className="text-error hover:text-error hover:bg-error-light border-error-light"
        >
          Withdraw
        </FormButton>
      )}
    </div>
  );
};

const TaskerOffer: React.FC<TaskerOfferProps> = ({
  offer,
  onWithdrawRequest,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const isOwner = offer.tasker.id === user?.id;
  const isPending = offer.status === "pending";

  const stats = useMemo(() => {
    const { average_rating, completion_rate, number_of_tasks_completed } =
      offer.tasker;

    return {
      rating: average_rating,
      completionRate: completion_rate,
      taskCompleted: number_of_tasks_completed,
    };
  }, [offer]);

  const fullName = loggedInUser(
    offer.tasker.first_name,
    offer.tasker.last_name
  );

  const {
    data,
    isLoading,
    isPending: loadingReplies,
  } = useGetOfferReplies(offer.id);

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

  // console.log(12, comment);

  if (isLoading || loadingReplies) return <p>Loading...</p>;

  return (
    <div className="flex gap-2 sm:gap-4">
      <div className="flex-shrink-0">
        <CustomAvatar
          src={offer.tasker.profile_image}
          alt={`${fullName}'s profile`}
          size="md"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 sm:space-y- flex-1 min-w-0">
            <Link
              href={`/tasker/profile/${offer.tasker.id}`}
              className="text-lg font-semibold text-text-primary hover:text-primary transition-colors inline-block truncate"
            >
              {initializeName({ full_name: fullName })}
            </Link>

            <TaskerStats {...stats} />
          </div>

          <OfferAmount
            amount={offer.offer_amount}
            isPending={isPending}
            isOwner={isOwner}
            onWithdraw={onWithdrawRequest}
          />
        </div>

        {/* Comment Thread */}
        <OfferReplyThread comment={comment} />
      </div>
    </div>
  );
};

export default TaskerOffer;

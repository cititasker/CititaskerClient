"use client";

import React from "react";
import Link from "next/link";
import { Star, Award, TrendingUp } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hook";
import { formatCurrency, initializeName, loggedInUser } from "@/utils";
import CommentThread from "./CommentThread";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/constant";
import { getOfferReplies } from "@/services/offers/offers.api";

interface TaskerOfferProps {
  offer: IOffer;
  onWithdrawRequest: () => void;
}

const TaskerStats = ({
  rating = 5.0,
  reviewCount = 3259,
  completionRate = 90,
}: {
  rating?: number;
  reviewCount?: number;
  completionRate?: number;
}) => (
  <div className="flex flex-wrap items-center gap-4 text-sm">
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-warning text-warning" />
      <span className="font-semibold text-text-primary">{rating}</span>
      <span className="text-text-muted">({reviewCount.toLocaleString()})</span>
    </div>

    <div className="flex items-center gap-1.5">
      <TrendingUp className="w-4 h-4 text-success" />
      <span className="font-semibold text-text-primary">{completionRate}%</span>
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
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">
          {formatCurrency({ value: amount, noFraction: true })}
        </div>
        <Badge
          variant="outline"
          className="bg-primary-50 text-primary-700 border-primary-200"
        >
          Pending
        </Badge>
      </div>

      {isOwner && (
        <Button
          variant="outline"
          size="sm"
          onClick={onWithdraw}
          className="text-error hover:text-error hover:bg-error-light border-error-light"
        >
          Withdraw
        </Button>
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

  const fullName = loggedInUser(
    offer.tasker.first_name,
    offer.tasker.last_name
  );

  const { data } = useQuery({
    queryKey: [API_ROUTES.OFFER_REPLIES, offer.id],
    queryFn: () => getOfferReplies(offer.id.toString()),
  });

  return (
    <div className="">
      <div className="flex gap-2 sm:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="w-10 h-10 sm:w-16 sm:h-16 border-2 border-neutral-200">
            <AvatarImage
              src={offer.tasker.profile_image}
              alt={`${fullName}'s profile`}
            />
            <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold">
              {offer.tasker.first_name?.[0] || "T"}
            </AvatarFallback>
          </Avatar>
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

              <TaskerStats />
            </div>

            <OfferAmount
              amount={offer.offer_amount}
              isPending={isPending}
              isOwner={isOwner}
              onWithdraw={onWithdrawRequest}
            />
          </div>

          {/* Comment Thread */}
          <CommentThread offer={data?.data} />
        </div>
      </div>
    </div>
  );
};

export default TaskerOffer;

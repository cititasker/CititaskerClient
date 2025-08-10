import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { capitalize, formatCurrency, loggedInUser } from "@/utils";
import StatusChip from "../../reusables/StatusChip";
import Icons from "../../Icons";
import FormButton from "../../forms/FormButton";
import { FaStar } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { API_ROUTES } from "@/constant";
import { getOfferReplies } from "@/services/offers/offers.api";
import { useQuery } from "@tanstack/react-query";
import CommentThread from "./CommentThread";

interface IProps {
  offer: IOffer;
  task: ITask;
  toggleModal: (offer: IOffer) => void;
}

const UserOffer = ({ offer, task, toggleModal }: IProps) => {
  const { data } = useQuery({
    queryKey: [API_ROUTES.OFFER_REPLIES, offer.id],
    queryFn: () => getOfferReplies(`${offer.id}`),
  });

  return (
    <div className="mb-5 last:mb-0 sm:border border-muted sm:rounded-[30px] sm:p-5 max-w-[691px] mx-auto">
      <div className="w-full mb-4 sm:mb-6 flex justify-between gap-3">
        <div className="flex gap-3 items-start">
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage
              src={offer.tasker.profile_image}
              alt="Tasker profile"
            />
            <AvatarFallback className="font-medium">
              {offer.tasker.first_name[0]}
              {offer.tasker.last_name[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2 text-sm">
              <p className="font-semibold">
                {loggedInUser(offer.tasker.first_name, offer.tasker.last_name)}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">5.0</span>
                <FaStar className="text-yellow-500" />
                <span className="text-muted-foreground">(82)</span>
              </div>
              {task.tasker?.id === offer.tasker.id && (
                <StatusChip status={capitalize(task.status)} isActive={false} />
              )}
            </div>
            <div className="flex gap-4 mt-2 text-muted-foreground text-sm">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/tasker/profile/${offer.tasker.id}`}
                  className="flex items-center gap-1"
                >
                  <Icons.person />
                  View Profile
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <Icons.flag />
                Report Offer
              </Button>
            </div>
          </div>
        </div>

        <p className="font-bold text-lg whitespace-nowrap hidden sm:inline-block">
          {formatCurrency({ value: offer.offer_amount, noFraction: true })}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-bold text-base whitespace-nowrap inline-block sm:hidden">
          {formatCurrency({ value: offer.offer_amount, noFraction: true })}
        </p>

        {offer.status === "pending" && (
          <FormButton
            text="Accept Offer"
            size="lg"
            className="w-fit ml-auto mb-5 bg-green-state-color hover:bg-green-state-color/80"
            onClick={() => toggleModal(offer)}
          />
        )}

        {task.status === "assigned" && task.tasker?.id === offer.tasker.id && (
          <FormButton
            text="Message"
            size="lg"
            className="w-fit ml-auto mb-5"
            href="/poster/dashboard/message"
          />
        )}
      </div>

      <CommentThread offer={data?.data} />
    </div>
  );
};

export default UserOffer;

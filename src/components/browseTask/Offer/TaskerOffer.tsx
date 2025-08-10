"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hook";
import { formatCurrency, initializeName, loggedInUser } from "@/utils";
import FormButton from "@/components/forms/FormButton";
import CommentThread from "./CommentThread";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/constant";
import { getOfferReplies } from "@/services/offers/offers.api";
import Link from "next/link";
import { Star } from "lucide-react";
import { useGetUserProfile } from "@/services/user/user.hook";

interface TaskerOfferProps {
  offer: IOffer;
  toggleModal: (id: number) => void;
}

const TaskerOffer: React.FC<TaskerOfferProps> = ({ offer, toggleModal }) => {
  const { user } = useAppSelector((state) => state.user);
  const isOwner = offer.tasker.id === user?.id;
  const isPending = offer.status === "pending";

  const fullName = loggedInUser(
    offer.tasker.first_name,
    offer.tasker.last_name
  );

  const { data: tasker } = useGetUserProfile({ id: offer.tasker.id });
  const takserDetail = tasker?.data;

  console.log(1, takserDetail);
  console.log(2, offer.tasker);

  const { data } = useQuery({
    queryKey: [API_ROUTES.OFFER_REPLIES, offer.id],
    queryFn: () => getOfferReplies(`${offer.id}`),
  });

  return (
    <div className="flex gap-2.5 sm:gap-4 mb-6 last:mb-0">
      <Avatar className="w-[30px] h-[30px] sm:h-[60px] sm:w-[60px]">
        <AvatarImage src={offer.tasker.profile_image} alt="Tasker profile" />
        <AvatarFallback>{offer.tasker.first_name?.[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center gap-3">
          <div className="space-y-0.5">
            <Link
              href={`/tasker/profile/${offer.tasker.id}`}
              className="text-base  text-black-2 font-semibold inline-block hover:underline"
            >
              {initializeName({ full_name: fullName })}
            </Link>
            <div className="flex items-center gap-1.5">
              <Star size={18} fill="#F2AF42" strokeWidth={0} />
              <span className="text-black-2 text-sm font-bold">5.0</span>
              <span className="text-dark-grey-2 text-sm font-normal">
                (3259)
              </span>
            </div>
            <p className="flex items-center gap-1.5">
              <span className="text-[#000] text-sm font-bold">90%</span>
              <span className="text-[#7C8698] text-sm">Completion rate</span>
            </p>
          </div>

          {isPending && (
            <div className="flex flex-col sm:flex-row items-center gap-y-2 gap-x-4">
              <span className="font-semibold text-primary">
                {formatCurrency({
                  value: offer.offer_amount,
                  noFraction: true,
                })}
              </span>
              {isOwner && (
                <FormButton size="lg" onClick={() => toggleModal(offer.id)}>
                  Withdraw
                </FormButton>
              )}
            </div>
          )}
        </div>

        <CommentThread offer={data?.data} />
      </div>
    </div>
  );
};

export default TaskerOffer;

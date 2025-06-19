"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hook";
import { formatCurrency, loggedInUser } from "@/utils";
import ReplyOffer from "./ReplyOffer";
import Icons from "@/components/Icons";
import FormButton from "@/components/forms/FormButton";

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

  return (
    <div className="flex gap-4 mb-6 last:mb-0">
      <Avatar className="h-[60px] w-[60px]">
        <AvatarImage src={offer.tasker.profile_image} alt="Tasker profile" />
        <AvatarFallback>{offer.tasker.first_name?.[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-1 text-xl font-medium text-muted-foreground">
            {fullName}
            <Icons.info />
          </div>

          {isPending && (
            <div className="flex items-center gap-4">
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

        <ReplyOffer offer={offer} />
      </div>
    </div>
  );
};

export default TaskerOffer;

import React from "react";
import UserOffer from "../browseTask/Offer/UserOffer";
import Empty from "./Empty";
import EmptyState from "../reusables/EmptyState";
import { ReceiptText } from "lucide-react";

interface IProps {
  task: ITask;
  toggleModal: (offer: IOffer) => void;
}

function AllOffers({ task, toggleModal }: IProps) {
  const hasOffers = task.offers.length > 0;
  const isAssigned = Boolean(task.tasker);

  if (!hasOffers) {
    return (
      <EmptyState
        title="No offer has been made yet."
        message="You will be notified when you get offers."
        icon={<ReceiptText className="w-8 h-8 text-neutral-400" />}
      />
    );
  }

  const visibleOffers = isAssigned
    ? task.offers.filter((offer) => offer.status === "accepted")
    : task.offers;

  return (
    <div className="overflow-y-auto no-scrollbar">
      {visibleOffers.map((offer) => (
        <UserOffer
          key={offer.id}
          offer={offer}
          task={task}
          toggleModal={toggleModal}
        />
      ))}
    </div>
  );
}

export default AllOffers;

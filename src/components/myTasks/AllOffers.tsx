import React from "react";
import UserOffer from "../browseTask/Offer/UserOffer";
import Empty from "./Empty";

interface IProps {
  task: ITask;
  toggleModal: (offer: IOffer) => void;
}

function AllOffers({ task, toggleModal }: IProps) {
  const hasOffers = task.offers.length > 0;
  const isAssigned = Boolean(task.tasker);

  if (!hasOffers) {
    return (
      <Empty
        text="No offer has been made yet. You will be notified when you get offers."
        btnText="Check task"
      />
    );
  }

  const visibleOffers = isAssigned
    ? task.offers.filter((offer) => offer.status === "accepted")
    : task.offers;

  return (
    <div className="paper rounded-none p-8 h-full overflow-y-auto">
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

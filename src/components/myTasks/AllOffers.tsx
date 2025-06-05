import React, { Fragment } from "react";
import UserOffer from "./UserOffer";
import Empty from "./Empty";

interface IProps {
  task: ITask;
  toggleModal: any;
}

function AllOffers({ task, toggleModal }: IProps) {
  return (
    <>
      {task.offers.length ? (
        <div className="paper rounded-none p-8 h-full">
          {task.offers.map((offer) => (
            <Fragment key={offer.id}>
              {task.tasker ? (
                <Fragment key={offer.id}>
                  {offer.status == "accepted" && (
                    <UserOffer
                      offer={offer}
                      task={task}
                      toggleModal={toggleModal}
                    />
                  )}
                </Fragment>
              ) : (
                <UserOffer
                  key={offer.id}
                  offer={offer}
                  task={task}
                  toggleModal={toggleModal}
                />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <Empty
          text=" No offer has been made yet. You will be notified when you get
          offers."
        />
      )}
    </>
  );
}

export default AllOffers;

"use client";

import { useState } from "react";
import ReviewCard from "./ReviewCard";
import Empty from "./Empty";
import Rating from "../reusables/Rating";
import ClientReviewModal from "./myTasksModal/ClientReviewModal";
import TaskerReviewModal from "./myTasksModal/TaskerReviewModal";

const Reviews = () => {
  const [hasPosterReviewed, setHasPosterReviewed] = useState(false);
  const [hasTaskerReviewed, setHasTaskerReviewed] = useState(false);

  const [posterModalOpen, setPosterModalOpen] = useState(false);
  const [taskerModalOpen, setTaskerModalOpen] = useState(false);

  const [posterReview, setPosterReview] = useState<any>(null);
  const [taskerReview, setTaskerReview] = useState<any>(null);

  const isAssigned = true;

  const handlePosterSubmit = (posterData: any) => {
    setPosterReview({ ...posterData, name: "Me", date: "1 day ago" });
    setHasPosterReviewed(true);
    setPosterModalOpen(false);
  };

  const handleTaskerSubmit = (taskerData: any) => {
    setTaskerReview({
      ...taskerData,
      name: "Glory Okonkwo",
      date: "1 day ago",
      avatar: "/images/avatar.svg",
    });
    setHasTaskerReviewed(true);
    setTaskerModalOpen(false);
  };

  if (!isAssigned) {
    return (
      <Empty text="No review has been made yet. You will be notified when you get a review." />
    );
  }

  return (
    <div className="space-y-12 px-10 bg-white pb-28">
      {/* My Review Section */}
      {!hasPosterReviewed ? (
        <div
          onClick={() => setPosterModalOpen(true)}
          className="cursor-pointer pt-6"
        >
          <p className="font-bold">My Review</p>
          <p className="text-sm text-muted-foreground">
            How would you rate your experience with Glory Okonkwo?
          </p>
          <div className="flex justify-center mt-6">
            <Rating
              value={posterReview?.rating || 0}
              readOnly={false}
              size={30}
            />
          </div>
        </div>
      ) : (
        <ReviewCard
          label="My Review"
          name={posterReview?.name}
          date={posterReview?.date}
          rating={posterReview?.rating}
          comment={posterReview?.comment}
          onEdit={() => setPosterModalOpen(true)}
        />
      )}

      {/* Tasker's Review Section */}
      {!hasTaskerReviewed ? (
        <div
          onClick={() => setTaskerModalOpen(true)}
          className="cursor-pointer"
        >
          <p className="font-bold">Tasker’s Review</p>
          <div className="flex flex-col items-center justify-center border rounded-[20px] py-8 bg-[#F3F5F6]">
            <Rating
              value={taskerReview?.rating || 0}
              readOnly={false}
              size={30}
            />
            <p className="text-sm text-gray-400 mt-2">No reviews yet.</p>
          </div>
        </div>
      ) : (
        <ReviewCard
          label="Tasker's Review"
          name={taskerReview?.name}
          date={taskerReview?.date}
          rating={taskerReview?.rating}
          comment={taskerReview?.comment}
          avatar={taskerReview?.avatar}
          onEdit={() => setTaskerModalOpen(true)}
        />
      )}

      {/* Poster Review Modal */}
      <ClientReviewModal
        isOpen={posterModalOpen}
        onClose={() => setPosterModalOpen(false)}
        onSubmit={handlePosterSubmit}
        clientName="Judith"
        taskerName="Glory Okonkwo"
      />

      {/* Tasker Review Modal */}
      <TaskerReviewModal
        isOpen={taskerModalOpen}
        onClose={() => setTaskerModalOpen(false)}
        onSubmit={handleTaskerSubmit}
        taskerName="Glory Okonkwo"
      />
    </div>
  );
};

export default Reviews;

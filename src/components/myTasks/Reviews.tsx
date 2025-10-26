"use client";

import { useState, useMemo } from "react";
import { MessageSquare } from "lucide-react";
import ReviewCard from "./ReviewCard";
import Rating from "../reusables/Rating";
import RatingModal from "./RatingModal";
import EmptyState from "../reusables/EmptyState";
import { initializeName } from "@/utils";
import useModal from "@/hooks/useModal";
import useToggle from "@/hooks/useToggle";
import { postReview } from "@/services/user/users.api";
import { useGetReviews } from "@/services/user/user.hook";
import { useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import { cn } from "@/lib/utils";
import { useBaseMutation } from "@/hooks/useBaseMutation";
import { API_ROUTES } from "@/constant";

interface ReviewsProps {
  task: ITask;
}

export default function Reviews({ task }: ReviewsProps) {
  const { user } = useAppSelector((state) => state.user);
  const [selectedRating, setSelectedRating] = useState(0);

  const ratingModal = useModal();
  const successModal = useToggle();

  const { data: reviews } = useGetReviews(task.id);
  const reviewList = reviews?.data || [];

  // Extract poster and tasker reviews
  const { posterReview, taskerReview } = useMemo(
    () => ({
      posterReview: reviewList[0] || null,
      taskerReview: reviewList[1] || null,
    }),
    [reviewList]
  );

  // Task and tasker info
  const isCompleted = task?.status === "completed";
  const tasker = task.tasker?.profile;
  const taskerName = tasker
    ? initializeName({
        first_name: tasker.first_name,
        last_name: tasker.last_name,
      })
    : "";

  // Submit review mutation
  const postReviewMutation = useBaseMutation(postReview, {
    invalidateQueryKeys: [[API_ROUTES.POST_REVIEW, task.id]],
  });

  const handleSubmitReview = (data: any) => {
    postReviewMutation.mutate({ ...data, task_id: task.id, role: "poster" });
  };

  const handleModalClose = () => {
    ratingModal.closeModal();
    successModal.handleClose();
    setSelectedRating(0);
  };

  const handleEditReview = () => {
    if (posterReview) {
      setSelectedRating(posterReview.rating);
      ratingModal.openModal();
    }
  };

  // Show empty state if task is not completed
  if (!isCompleted) {
    return (
      <div className="px-4 sm:px-6 py-8">
        <EmptyState
          title="No Reviews Yet"
          message="Reviews will appear once the task is assigned and completed."
          icon={<MessageSquare className="w-12 h-12 text-neutral-400" />}
        />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 bg-white min-h-screen">
      {/* My Review Section */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">
          My Review
        </h2>

        {!posterReview ? (
          <button
            onClick={ratingModal.openModal}
            className={cn(
              "w-full p-6 sm:p-8 rounded-2xl border-2 border-dashed",
              "border-neutral-200 hover:border-primary/50",
              "bg-neutral-50 hover:bg-primary/5",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            <p className="text-sm sm:text-base text-neutral-700 mb-4">
              How would you rate your experience with{" "}
              <span className="font-medium text-neutral-900">
                {tasker.first_name} {tasker.last_name}
              </span>
              ?
            </p>
            <Rating
              value={selectedRating}
              onChange={setSelectedRating}
              size={window.innerWidth < 640 ? 28 : 32}
              className="justify-center gap-2 sm:gap-3"
            />
          </button>
        ) : (
          <div className="border border-neutral-200 rounded-2xl p-4 sm:p-6">
            <ReviewCard
              label="My Review"
              name={posterReview.reviewer}
              date={posterReview.created_at}
              rating={posterReview.rating}
              comment={posterReview.comment}
              avatar={user.profile_image ?? defaultProfile}
              onEdit={handleEditReview}
            />
          </div>
        )}
      </section>

      {/* Tasker's Review Section */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">
          Tasker's Review
        </h2>

        {taskerReview ? (
          <div className="border border-neutral-200 rounded-2xl p-4 sm:p-6">
            <ReviewCard
              name={taskerReview.reviewer}
              date={taskerReview.created_at}
              rating={taskerReview.rating}
              comment={taskerReview.comment}
              avatar={tasker.profile_image || defaultProfile}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl bg-neutral-50">
            <Rating
              value={0}
              readOnly
              size={window.innerWidth < 640 ? 24 : 28}
              className="gap-2"
            />
            <p className="text-sm sm:text-base text-neutral-600 mt-4">
              No review from tasker yet.
            </p>
          </div>
        )}
      </section>

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={handleModalClose}
        taskerName={taskerName}
        initialRating={selectedRating}
        onSubmit={handleSubmitReview}
        showSuccess={successModal.isOpen}
        isLoading={postReviewMutation.isPending}
      />
    </div>
  );
}

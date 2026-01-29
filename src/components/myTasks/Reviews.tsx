"use client";

import { useCallback, useState } from "react";
import { MessageSquare } from "lucide-react";

import ReviewCard from "./ReviewCard";
import Rating from "../reusables/Rating";
import RatingModal from "./RatingModal";
import EmptyState from "../reusables/EmptyState";

import { initializeName } from "@/utils";
import { useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import { cn } from "@/lib/utils";

import { useBaseMutation } from "@/hooks/useBaseMutation";
import { API_ROUTES, ROLE } from "@/constant";
import { postReview, updateReview } from "@/services/review/reviews.api";
import { useGetReviews } from "@/services/review/reviews.hook";

interface ReviewsProps {
  task: ITask;
}

export default function Reviews({ task }: ReviewsProps) {
  const { user } = useAppSelector((state) => state.user);

  const [selectedRating, setSelectedRating] = useState(0);
  const [initialComment, setInitialComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: reviews } = useGetReviews(task?.id);

  const isCompleted = task?.status === "completed";

  // Determine logged-in user role
  const isPoster = reviews?.user_role === ROLE.poster;

  // Review data
  const myReview = reviews?.my_review;
  const otherPartyReview = reviews?.other_party_review;
  const hasReviewed = !!myReview?.reviewed_at;
  const otherPartyHasReviewed = !!otherPartyReview?.reviewed_at;
  const canEdit = reviews?.can_update;
  const reviewsVisible = reviews?.reviews_visible ?? false;

  // Other party's profile & name
  const otherPartyProfile = isPoster
    ? task.tasker?.profile
    : task.poster?.profile;
  const otherPartyName = initializeName({
    first_name: otherPartyProfile?.first_name ?? "",
    last_name: otherPartyProfile?.last_name ?? "",
  });

  // Mutations
  const postReviewMutation = useBaseMutation(postReview, {
    invalidateQueryKeys: [[API_ROUTES.GET_REVIEWS, task.id]],
    onSuccess: () => setShowSuccess(true),
    disableSuccessToast: true,
  });

  const updateReviewMutation = useBaseMutation(updateReview, {
    invalidateQueryKeys: [[API_ROUTES.GET_REVIEWS, task.id]],
    onSuccess: () => setShowSuccess(true),
    disableSuccessToast: true,
  });

  // Submit handler (create or update dynamically)
  const handleSubmitReview = useCallback(
    (data: { rating: number; comment: string }) => {
      if (hasReviewed && !canEdit) return;

      const payload = {
        role: user.role as TRole,
        data: {
          ...data,
          task_id: task.id,
        },
      };

      if (!hasReviewed) {
        postReviewMutation.mutate(payload);
        return;
      }

      if (hasReviewed && canEdit) {
        updateReviewMutation.mutate(payload);
      }
    },
    [
      hasReviewed,
      canEdit,
      postReviewMutation,
      updateReviewMutation,
      task.id,
      user.role,
    ],
  );

  // Modal handlers
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setSelectedRating(0);
    setInitialComment("");
    setShowModal(true);
  };

  const handleEditReview = () => {
    if (!myReview || !canEdit) return;

    setIsEditMode(true);
    setSelectedRating(myReview.rating);
    setInitialComment(myReview.comment);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowSuccess(false);
    setIsEditMode(false);
    setSelectedRating(0);
    setInitialComment("");
  };

  const isSubmitting =
    postReviewMutation.isPending || updateReviewMutation.isPending;

  // Empty state before task completion
  if (!isCompleted) {
    return (
      <div className="px-4 sm:px-6 py-8">
        <EmptyState
          title="No Reviews Yet"
          message="Reviews will appear once the task is completed."
          icon={<MessageSquare className="w-12 h-12 text-neutral-400" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10 bg-white px-4 sm:px-6">
      {/* ================= My Review ================= */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">
          My Review
        </h2>

        {!hasReviewed ? (
          <button
            onClick={handleOpenCreateModal}
            className={cn(
              "w-full p-6 sm:p-8 rounded-2xl border-2 border-dashed",
              "border-neutral-200 hover:border-primary/50",
              "bg-neutral-50 hover:bg-primary/5",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
            )}
          >
            <p className="text-sm sm:text-base text-neutral-700 mb-4">
              How would you rate your experience with{" "}
              <span className="font-medium text-neutral-900">
                {otherPartyName}
              </span>
              ?
            </p>

            <Rating
              value={selectedRating}
              onChange={setSelectedRating}
              size={32}
              className="justify-center gap-3"
            />
          </button>
        ) : (
          <div className="border border-neutral-200 rounded-2xl p-4 sm:p-6">
            <ReviewCard
              label="My Review"
              name={initializeName({
                first_name: user.first_name,
                last_name: user.last_name,
              })}
              date={myReview.reviewed_at}
              rating={myReview.rating}
              comment={myReview.comment}
              avatar={user.profile_image ?? defaultProfile}
              canEdit={canEdit}
              onEdit={handleEditReview}
              userId={user?.id}
              role={user?.role}
            />
          </div>
        )}
      </section>

      {/* ================= Other Party Review ================= */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">
          {isPoster ? "Tasker's Review" : "Poster's Review"}
        </h2>

        {otherPartyHasReviewed && reviewsVisible ? (
          <div className="border border-neutral-200 rounded-2xl p-4 sm:p-6">
            <ReviewCard
              name={otherPartyName}
              date={otherPartyReview.reviewed_at}
              rating={otherPartyReview.rating}
              comment={otherPartyReview.comment}
              avatar={otherPartyProfile?.profile_image || defaultProfile}
              userId={isPoster ? task?.tasker?.id : task?.poster?.id}
              role={
                isPoster
                  ? (task?.tasker?.role as TRole | undefined)
                  : (task?.poster?.role as TRole | undefined)
              }
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl bg-neutral-50">
            <Rating value={0} readOnly size={28} className="gap-2" />
            <p className="text-sm sm:text-base text-neutral-600 mt-4">
              {!otherPartyHasReviewed
                ? `No review from ${isPoster ? "tasker" : "poster"} yet.`
                : `${isPoster ? "Tasker's" : "Poster's"} review will be visible once both parties have submitted their reviews.`}
            </p>
          </div>
        )}
      </section>

      {/* ================= Rating Modal ================= */}
      <RatingModal
        isOpen={showModal}
        onClose={handleModalClose}
        taskerName={otherPartyName}
        userName={`${user.first_name} ${user.last_name}`}
        initialRating={selectedRating}
        initialComment={initialComment}
        isEditMode={isEditMode}
        onSubmit={handleSubmitReview}
        showSuccess={showSuccess}
        isLoading={isSubmitting}
      />
    </div>
  );
}

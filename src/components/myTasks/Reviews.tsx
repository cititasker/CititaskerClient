"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Rating from "../reusables/Rating";
import RatingModal from "./RatingModal";
import { initializeName } from "@/utils";
import useModal from "@/hooks/useModal";
import useToggle from "@/hooks/useToggle";
import { useMutation } from "@tanstack/react-query";
import { postReview } from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { useGetReviews } from "@/services/user/user.hook";
import { useAppSelector } from "@/store/hook";
import { defaultProfile } from "@/constant/images";
import { useScreenBreakpoints } from "@/hooks/useScreenBreakpoints";
import EmptyState from "../reusables/EmptyState";
import { MessageSquare } from "lucide-react";

interface IProps {
  task: ITask;
}

const Reviews = ({ task }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [posterReview, setPosterReview] = useState<TaskerReview | null>(null);
  const [rating, setRating] = useState(0);

  const posterModal = useModal();
  const success = useToggle();
  const { showSnackbar } = useSnackbar();

  const { isSmallScreen } = useScreenBreakpoints();

  const { data: reviews } = useGetReviews({ id: task.id });
  const reviewList = reviews?.data || [];

  console.log(87, reviews);

  useEffect(() => {
    if (reviewList.length) setPosterReview(reviewList[0]);
  }, [reviewList]);

  const isAssigned = task?.status === "assigned";
  const tasker = task.tasker?.profile;
  const taskerName = initializeName({
    first_name: tasker?.first_name,
    last_name: tasker?.last_name,
  });

  const postReviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => success.handleOpen(),
    onError: (error) => showSnackbar(error.message, "error"),
  });

  const onSubmit = (data: any) => {
    postReviewMutation.mutate({ ...data, task_id: task.id });
  };

  const handleRatingClose = () => {
    posterModal.closeModal();
    success.handleClose();
    setRating(0);
  };

  if (!isAssigned || !tasker) {
    return (
      <EmptyState
        title="No review has been made yet."
        message="You will be notified when you get a review."
        icon={<MessageSquare className="w-8 h-8 text-neutral-400" />}
      />
    );
  }

  return (
    <div className="space-y-10 sm:space-y-12 px-5 sm:px-6 md:px-10 bg-white pb-28 pt-6">
      {/* My Review Section */}
      {!posterReview ? (
        <div onClick={posterModal.openModal} className="cursor-pointer">
          <p className="font-bold">My review</p>
          <p className="text-[#000]">
            How would you rate your experience with{" "}
            {`${tasker.first_name} ${tasker.last_name}`}?
          </p>
          <div className="flex justify-center mt-6">
            <Rating
              value={rating}
              size={isSmallScreen ? 25 : 30}
              className="gap-6"
              onChange={setRating}
            />
          </div>
        </div>
      ) : (
        <div className="relative border rounded-20 space-y-10 p-5">
          <ReviewCard
            label="My Review"
            name={posterReview.reviewer}
            date={posterReview.created_at}
            rating={posterReview.rating}
            comment={posterReview.comment}
            avatar={user.profile_image ?? defaultProfile}
            onEdit={() => {
              setRating(posterReview.rating);
              posterModal.openModal();
            }}
          />
        </div>
      )}

      {/* Tasker's Review Section */}
      {!reviewList[1] && (
        <div className="cursor-pointer">
          <p className="font-bold mb-3">Tasker’s review</p>
          <div className="flex flex-col items-center justify-center rounded-20 py-10 sm:py-12 bg-[#F3F5F6]">
            <Rating value={0} readOnly size={isSmallScreen ? 25 : 30} />
            <p className="text-sm text-black mt-4 sm:mt-[22px] text-center">
              No reviews yet.
            </p>
          </div>
        </div>
      )}

      <RatingModal
        isOpen={posterModal.isOpen}
        onClose={handleRatingClose}
        name={taskerName}
        rating={rating}
        onSubmit={onSubmit}
        success={success.isOpen}
        loading={postReviewMutation.isPending}
      />
    </div>
  );
};

export default Reviews;

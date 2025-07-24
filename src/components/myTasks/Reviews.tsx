"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Empty from "./Empty";
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

interface IProps {
  task: ITask;
}

interface IRatings {
  rating: number;
  comment: string;
  name: string;
  date: string;
}

const Reviews = ({ task }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [hasTaskerReviewed, setHasTaskerReviewed] = useState(false);

  const [posterReview, setPosterReview] = useState<TaskerReview | null>(null);
  const [taskerReview, setTaskerReview] = useState<IRatings | null>(null);

  const [rating, setRating] = useState(0);
  const posterModalOpen = useModal();
  const success = useToggle();
  const { showSnackbar } = useSnackbar();

  const postReviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      success.handleOpen();
    },
    onError(error) {
      console.log(7, error);
      showSnackbar(error.message, "error");
    },
  });

  const { data: reviews } = useGetReviews({ id: task.id });
  const reviewList = reviews?.data || [];

  useEffect(() => {
    if (reviewList.length) {
      setPosterReview(reviewList[0]);
    }
  }, [reviewList]);

  console.log(46, reviewList);

  const isAssigned = true;

  console.log(45, task);

  const tasker = task.tasker.profile;
  const taskerName = initializeName({
    first_name: tasker.first_name,
    last_name: tasker.last_name,
  });

  const onSubmit = (data: any) => {
    postReviewMutation.mutate({ ...data, task_id: task.id });
  };

  const handleRatingClose = () => {
    posterModalOpen.closeModal();
    success.handleClose();
    setRating(0);
  };

  if (!isAssigned) {
    return (
      <Empty text="No review has been made yet. You will be notified when you get a review." />
    );
  }

  return (
    <div className="space-y-12 px-10 bg-white pb-28 pt-6">
      {/* My Review Section */}
      {!posterReview ? (
        <div onClick={posterModalOpen.openModal} className="cursor-pointer">
          <p className="font-bold">My review</p>
          <p className="text-[#000]">
            How would you rate your experience with{" "}
            {`${tasker.first_name} ${tasker.last_name}`}?
          </p>
          <div className="flex justify-center mt-6">
            <Rating
              value={rating}
              size={30}
              className="gap-6"
              onChange={(v: number) => {
                setRating(v);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative border rounded-20 space-y-10 p-5">
          <ReviewCard
            label="My Review"
            name={posterReview?.reviewer}
            date={posterReview?.created_at}
            rating={posterReview?.rating}
            comment={posterReview?.comment}
            avatar={user.profile_image ?? defaultProfile}
            onEdit={() => {}}
          />
        </div>
      )}

      {/* Tasker's Review Section */}
      {!hasTaskerReviewed && (
        <div onClick={() => {}} className="cursor-pointer">
          <p className="font-bold mb-3">Tasker’s review</p>
          <div className="flex flex-col items-center justify-center rounded-20 py-12 bg-[#F3F5F6]">
            <Rating value={taskerReview?.rating || 0} readOnly size={30} />
            <p className="text-sm text-black mt-[22px] text-center">
              No reviews yet.
            </p>
          </div>
        </div>
      )}

      <RatingModal
        isOpen={posterModalOpen.isOpen}
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

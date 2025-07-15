"use client";

import React, { useState } from "react";
import RatingCard from "@/components/reusables/RatingCard";
import FormButton from "@/components/forms/FormButton";
import ReviewModal from "./ReviewModal";
import Rating from "@/components/reusables/Rating";
import { initializeName } from "@/utils";

export type ReviewItem = {
  image: string;
  name: string;
  profession: string;
  timeAgo: string;
  review: string;
};

export type ProfileSummary = {
  image: string;
  name: string;
  address: string;
  rating: number;
  totalReviews: number;
};

interface ReviewSectionProps {
  title?: string;
  buttonText?: string;
  reviews: ReviewItem[];
  profileSummary?: ProfileSummary;
  maxPreview?: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  title = "Reviews",
  buttonText = "See all reviews",
  reviews,
  profileSummary,
  maxPreview = 3,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">{title}</p>
        {reviews && reviews.length > maxPreview && (
          <FormButton
            text={buttonText}
            handleClick={handleOpen}
            className="w-fit !bg-[#D0F0FB] text-primary"
          />
        )}
      </div>

      {reviews.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] overflow-x-auto gap-4 scrollbar-hide py-2">
          {reviews.slice(0, maxPreview).map((review, idx) => (
            <RatingCard key={idx} {...review} />
          ))}
        </div>
      ) : (
        <div className="p-5 bg-light-grey rounded-20 min-h-[214px] flex justify-center items-center w-full">
          <div className="w-fit h-fit text-center flex flex-col items-center">
            <Rating size={30} value={0} readOnly />
            <p className="text-center text-sm mt-[10px]">
              {`${initializeName({
                first_name: "Taiwo",
                last_name: "Joseph",
              })} doesn’t have a review yet.`}
            </p>
          </div>
        </div>
      )}

      <ReviewModal
        isOpen={open}
        onClose={handleClose}
        profileSummary={profileSummary}
        reviews={reviews}
      />
    </div>
  );
};

export default ReviewSection;

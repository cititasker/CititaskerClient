"use client";

import React, { useState } from "react";
import RatingCard from "@/components/reusables/RatingCard";
import FormButton from "@/components/forms/FormButton";
import ReviewModal from "./ReviewModal";
import Rating from "@/components/reusables/Rating";

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
  userName?: string;
  className?: string;
}

const EmptyReviewsState = ({ userName }: { userName?: string }) => (
  <div className="bg-neutral-100 rounded-xl p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
    <Rating size={24} value={0} readOnly className="mb-4" />
    <h4 className="font-medium text-text-primary mb-2">No reviews yet</h4>
    <p className="text-text-muted text-sm max-w-sm">
      {userName
        ? `${userName} doesn't have any reviews yet.`
        : "This profile doesn't have any reviews yet."}
    </p>
  </div>
);

const ReviewGrid = ({
  reviews,
  maxPreview,
}: {
  reviews: ReviewItem[];
  maxPreview: number;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {reviews.slice(0, maxPreview).map((review, index) => (
      <RatingCard key={index} {...review} />
    ))}
  </div>
);

const ReviewSection: React.FC<ReviewSectionProps> = ({
  title = "Reviews",
  buttonText = "See all reviews",
  reviews = [],
  profileSummary,
  maxPreview = 3,
  userName,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasMoreReviews = reviews.length > maxPreview;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {hasMoreReviews && (
          <FormButton
            text={buttonText}
            handleClick={handleOpenModal}
            className="w-fit sm:w-auto bg-primary-50 hover:bg-primary-100 text-primary border-0 transition-colors"
          />
        )}
      </div>

      {reviews.length > 0 ? (
        <ReviewGrid reviews={reviews} maxPreview={maxPreview} />
      ) : (
        <EmptyReviewsState userName={userName} />
      )}

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          profileSummary={profileSummary}
          reviews={reviews}
        />
      )}
    </section>
  );
};

export default ReviewSection;

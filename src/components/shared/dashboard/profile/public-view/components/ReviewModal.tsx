"use client";

import React from "react";
import Image from "next/image";
import CustomModal from "@/components/reusables/CustomModal";
import Icons from "@/components/Icons";
import RatingCard from "@/components/reusables/RatingCard";
import { ProfileSummary } from "./Reviews";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileSummary?: ProfileSummary;
  reviews: ReviewItem[];
}

const ProfileSummaryCard = ({ summary }: { summary: ProfileSummary }) => (
  <aside className="h-fit w-full md:max-w-[300px] flex-shrink-0 bg-primary rounded-xl p-6 space-y-4 md:sticky md:top-0">
    <div className="flex items-center gap-4">
      <Image
        src={summary.image}
        alt={`${summary.name}'s profile`}
        width={60}
        height={60}
        className="rounded-full object-cover ring-2 ring-primary-400"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-white truncate">
          {summary.name}
        </h3>
        <p className="text-sm text-primary-100 truncate">{summary.address}</p>
      </div>
    </div>

    <div className="bg-primary-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-white">Overall Rating</h4>
        <div className="flex items-center gap-1">
          <Icons.star variant="Bold" className="text-yellow-400 w-4 h-4" />
          <span className="text-lg font-bold text-white">
            {summary.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-sm text-primary-200">
        Based on {summary.totalReviews} review
        {summary.totalReviews !== 1 ? "s" : ""}
      </p>
    </div>
  </aside>
);

const ReviewList = ({ reviews }: { reviews: ReviewItem[] }) => (
  <main className="flex-1 space-y-4 min-h-0">
    {reviews.length > 0 ? (
      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review, index) => (
          <RatingCard key={index} review={review} />
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center py-12">
        <p className="text-text-muted">No reviews to display</p>
      </div>
    )}
  </main>
);

const ReviewModal = ({
  isOpen,
  onClose,
  profileSummary,
  reviews,
}: ReviewModalProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-4xl max-h-[90vh]"
    >
      <div className="flex flex-col h-full">
        <header className="bg-background border-b border-border-light p-6 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-text-primary text-center">
            All Reviews ({reviews.length})
          </h2>
        </header>

        <div className="flex-1 overflow-hidden p-6">
          <div className="flex flex-col md:flex-row gap-6 h-full">
            {profileSummary && <ProfileSummaryCard summary={profileSummary} />}

            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ReviewModal;

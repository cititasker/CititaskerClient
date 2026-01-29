"use client";

import React, { useState, memo, useMemo } from "react";
import RatingCard from "@/components/reusables/RatingCard";
import FormButton from "@/components/forms/FormButton";
import ReviewModal from "./ReviewModal";
import { useUserReviewsInfinite } from "@/services/review/reviews.hook";
import { useAppSelector } from "@/store/hook";
import { Star, MessageSquare } from "lucide-react";

interface ReviewSectionProps {
  id?: string;
  title?: string;
  buttonText?: string;
  maxPreview?: number;
  userName?: string;
  className?: string;
  userPublicData: UserProfileData;
}

const EmptyReviewsState = memo(({ userName }: { userName?: string }) => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 text-center border border-gray-200">
    <div className="max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900 text-lg">No reviews yet</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          {userName
            ? `${userName} hasn't received any reviews yet.`
            : "This profile doesn't have any reviews yet. Reviews help others make informed decisions."}
        </p>
      </div>
      <div className="flex items-center justify-center gap-1 pt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-gray-300 fill-gray-300" />
        ))}
      </div>
    </div>
  </div>
));

EmptyReviewsState.displayName = "EmptyReviewsState";

const ReviewList = memo(
  ({ reviews, maxPreview }: { reviews: ReviewItem[]; maxPreview: number }) => (
    <div className="space-y-4">
      {reviews.slice(0, maxPreview).map((review, index) => (
        <RatingCard key={review.id || `review-${index}`} review={review} />
      ))}
    </div>
  ),
);

ReviewList.displayName = "ReviewList";

const LoadingSkeleton = memo(() => (
  <section className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="h-10 w-40 bg-gray-100 rounded-lg animate-pulse" />
    </div>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-44 bg-white border border-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  </section>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

const ReviewsHeader = memo(
  ({
    title,
    totalReviews,
    averageRating,
    hasMoreReviews,
    onOpenModal,
  }: {
    title: string;
    totalReviews: number;
    averageRating?: number;
    hasMoreReviews: boolean;
    buttonText: string;
    onOpenModal: () => void;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {totalReviews > 0 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
              {totalReviews}
            </span>
          )}
        </div>
        {totalReviews > 0 && averageRating !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              • Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
      {hasMoreReviews && (
        <FormButton
          text={`View all ${totalReviews} reviews`}
          handleClick={onOpenModal}
          className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 transition-all hover:shadow-sm font-medium"
        />
      )}
    </div>
  ),
);

ReviewsHeader.displayName = "ReviewsHeader";

const ReviewSection: React.FC<ReviewSectionProps> = ({
  id,
  title = "Reviews",
  buttonText = "See all reviews",
  maxPreview = 5,
  userName,
  userPublicData,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((s) => s.user);
  const userId = id ?? user?.id;

  const { data, isLoading } = useUserReviewsInfinite(userId);

  const reviews = useMemo(() => {
    return data?.pages?.[0]?.data || [];
  }, [data]);

  const totalReviews = useMemo(() => {
    return userPublicData.reviews_count || 0;
  }, [data]);

  const hasMoreReviews = totalReviews > maxPreview;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <ReviewsHeader
        title={title}
        totalReviews={totalReviews}
        averageRating={userPublicData.average_rating}
        hasMoreReviews={hasMoreReviews}
        buttonText={buttonText}
        onOpenModal={handleOpenModal}
      />

      {reviews.length > 0 ? (
        <>
          <ReviewList reviews={reviews} maxPreview={maxPreview} />

          {hasMoreReviews && (
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-auto text-sm text-primary hover:text-primary-600 font-medium transition-colors inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-primary-50"
              >
                <span>
                  View {totalReviews - maxPreview} more review
                  {totalReviews - maxPreview !== 1 ? "s" : ""}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyReviewsState userName={userName} />
      )}

      {isModalOpen && userId && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={userId}
          totalReviews={totalReviews}
          userPublicData={userPublicData}
        />
      )}
    </section>
  );
};

export default memo(ReviewSection);

"use client";

import React, { memo, useMemo } from "react";
import Icons from "@/components/Icons";
import RatingCard from "@/components/reusables/RatingCard";
import BasicModal from "@/components/reusables/BasicModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useUserReviewsInfinite } from "@/services/review/reviews.hook";
import { Loader2 } from "lucide-react";
import Avatar from "@/components/reusables/Avatar";
import { initializeName } from "@/utils";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | number;
  initialReviews?: ReviewItem[]; // Receive initial data
  totalReviews?: number;
  userPublicData: UserProfileData;
}

const ProfileSummaryCard = memo(({ summary }: { summary: UserProfileData }) => {
  const fullName = initializeName({
    first_name: summary.first_name,
    last_name: summary.last_name,
  });

  return (
    <aside className="w-full md:w-[280px] flex-shrink-0">
      <div className="bg-gradient-to-br from-primary to-primary-600 rounded-xl shadow-lg md:sticky md:top-4">
        {/* Profile Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={""} name={fullName} className="h-12 w-12" />
              <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm">
                <Icons.star
                  variant="Bold"
                  className="w-2.5 h-2.5 text-yellow-500"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-white truncate">
                {fullName}
              </h3>
              {summary.location && (
                <p className="text-xs text-white/70 truncate flex items-center gap-1 mt-0.5">
                  <Icons.distance className="[&_path]:fill-white" />
                  {summary.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Rating Stats */}
        <div className="p-5">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-white/80 uppercase tracking-wide">
                Overall Rating
              </h4>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white leading-none">
                  {summary.average_rating.toFixed(1)}
                </span>
                <span className="text-sm text-white/60 font-medium">/5</span>
              </div>
              <Icons.star variant="Bold" className="w-6 h-6 text-yellow-400" />
            </div>

            <p className="text-xs text-white/60 mt-3 pt-3 border-t border-white/10">
              {summary.reviews_count} review
              {summary.reviews_count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
});

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center py-4">
    <Loader2 className="w-6 h-6 animate-spin text-primary" />
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

const EmptyState = memo(() => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Icons.star className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
      <p className="text-text-muted">No reviews to display</p>
    </div>
  </div>
));

EmptyState.displayName = "EmptyState";

const ReviewList = memo(
  ({
    userId,
    initialReviews,
  }: {
    userId: string | number;
    initialReviews?: ReviewItem[];
  }) => {
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
    } = useUserReviewsInfinite(userId);

    const observerRef = useInfiniteScroll({
      hasNextPage: hasNextPage ?? false,
      isFetching: isFetchingNextPage,
      onLoadMore: fetchNextPage,
      rootMargin: "100px",
    });

    const reviews = useMemo(() => {
      // Use infinite query data if available, otherwise fall back to initial
      if (data?.pages) {
        return data.pages.flatMap((page) => page.data);
      }
      return initialReviews || [];
    }, [data, initialReviews]);

    if (isLoading && !initialReviews) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-error mb-2">Failed to load reviews</p>
            <button
              onClick={() => fetchNextPage()}
              className="text-sm text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    if (reviews.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <RatingCard key={review.id || `review-${index}`} review={review} />
        ))}

        {/* Infinite scroll trigger */}
        <div ref={observerRef} className="h-0.5" />

        {/* Loading indicator */}
        {isFetchingNextPage && <LoadingSpinner />}

        {/* {!hasNextPage && reviews.length > 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-text-muted">
              You've reached the end of the reviews
            </p>
          </div>
        )} */}
      </div>
    );
  },
);

ReviewList.displayName = "ReviewList";

const ReviewModal = ({
  isOpen,
  onClose,
  userId,
  initialReviews,
  totalReviews,
  userPublicData,
}: ReviewModalProps) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onClose} size="xl" className="p-0">
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Fixed Header */}
        <header className="flex-shrink-0 bg-background border-b border-border-light px-5 sm:px-6 py-4">
          <h2 className="text-xl font-semibold text-text-primary text-center">
            All Reviews {totalReviews ? `(${totalReviews})` : ""}
          </h2>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 h-full p-5 sm:p-6">
            <div className="md:flex-shrink-0 hidden md:block">
              <ProfileSummaryCard summary={userPublicData} />
            </div>

            {/* Reviews List - Scrollable with Infinite Scroll */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <ReviewList userId={userId} initialReviews={initialReviews} />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default memo(ReviewModal);

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { formatDateAgo } from "@/utils";

const STAR_COUNT = 5;

const RatingCard = ({ review }: { review: ReviewItem }) => {
  const rating = review.rating ?? 0;
  const comment = review.comment?.trim() || "No review comment was provided.";

  return (
    <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
            {review.image ? (
              <Image
                src={review.image}
                alt={`${review.reviewer}'s profile photo`}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-5 w-5 text-gray-400" aria-hidden />
              </div>
            )}
          </div>

          {/* Name + Rating */}
          <div className="flex-1 min-w-0">
            <h4 className="truncate text-sm font-semibold text-gray-900">
              {review.reviewer}
            </h4>

            <div className="mt-1 flex items-center gap-2">
              <div
                className="flex items-center gap-0.5"
                aria-label={`Rating: ${rating} out of ${STAR_COUNT}`}
              >
                {Array.from({ length: STAR_COUNT }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>

              <span className="text-xs text-gray-400">
                {formatDateAgo(review.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Review Text */}
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-gray-800 line-clamp-5">
            {comment}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(RatingCard);

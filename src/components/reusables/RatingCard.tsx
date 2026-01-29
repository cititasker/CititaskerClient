import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { formatDateAgo } from "@/utils";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const STAR_COUNT = 5;
const COMMENT_PREVIEW_LENGTH = 200;

interface ReviewCardProps {
  review: ReviewItem;
  className?: string;
}

const RatingCard = ({ review, className }: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const rating = review.rating ?? 0;
  const comment =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum dignissimos recusandae, voluptate perspiciatis rem sunt nisi similique veniam quam obcaecati esse odio ipsam ex nobis veritatis a eos explicabo soluta! Autem quaerat non minima, eveniet sunt tempore pariatur vero totam suscipit consectetur magnam incidunt voluptatum voluptates aspernatur tempora officiis aut omnis. Ratione deserunt enim, tempora minima amet ullam alias fuga aut consequatur neque velit odio atque dolores nam expedita nihil. Officia dicta deleniti quis aspernatur, fugit labore velit repellat quos inventore, voluptatibus, porro sint enim. Adipisci veritatis et esse quam minima alias repellat illo ab, ducimus laboriosam sint! Expedita, dolorum tempore obcaecati voluptates iste vitae recusandae corrupti repudiandae ipsa cum praesentium enim accusamus possimus, mollitia non minus iure quam, dolores fugiat voluptate aut cumque blanditiis quidem eaque? Incidunt neque distinctio numquam officiis totam consequuntur modi, reiciendis repudiandae ratione quia repellat porro, impedit sequi reprehenderit exercitationem provident consectetur nemo eius? Porro asperiores ad perferendis aliquam facilis repellendus deserunt libero tenetur rem sed necessitatibus officiis blanditiis a officia nostrum magnam voluptatem recusandae, vel voluptas dolorum accusantium delectus. Excepturi dolor quibusdam quo corrupti, ullam dolorum asperiores exercitationem natus doloremque debitis eaque sed nobis vel ipsa? Aliquam nobis deserunt repellendus quas odio, minus recusandae.";
  const hasComment = comment.length > 0;
  const isLongComment = comment.length > COMMENT_PREVIEW_LENGTH;
  const displayComment =
    isExpanded || !isLongComment
      ? comment
      : `${comment.slice(0, COMMENT_PREVIEW_LENGTH)}...`;

  return (
    <Card
      className={cn(
        "bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 h-fit",
        className,
      )}
    >
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <Avatar
            src={review.image}
            name={review.reviewer}
            size="md"
            className="h-12 w-12 shrink-0 border-2 border-gray-100"
            fallbackClassName="bg-gradient-to-br from-primary/10 to-primary/20 font-semibold text-primary"
          />

          {/* Reviewer Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 text-base truncate">
                {review.reviewer}
              </h4>
            </div>

            {/* Rating & Date */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Star Rating */}
              <div
                className="flex items-center gap-0.5"
                role="img"
                aria-label={`Rating: ${rating} out of ${STAR_COUNT} stars`}
              >
                {Array.from({ length: STAR_COUNT }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 transition-colors",
                      i < rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Numeric Rating */}
              {rating > 0 && (
                <span className="text-sm font-medium text-gray-700">
                  {rating}.0
                </span>
              )}

              {/* Separator */}
              <span className="text-gray-300">•</span>

              {/* Time */}
              <time
                className="text-sm text-gray-500"
                dateTime={review.created_at}
              >
                {formatDateAgo(review.created_at)}
              </time>
            </div>
          </div>
        </div>

        {/* Review Comment */}
        {hasComment ? (
          <div className="space-y-2">
            <p className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {displayComment}
            </p>

            {/* Read More/Less Button */}
            {isLongComment && (
              <Button
                variant="custom"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-0 py-1 text-primary text-sm font-medium focus:outline-none"
                aria-expanded={isExpanded}
              >
                {isExpanded ? "Show less" : "Read more"}
              </Button>
            )}
          </div>
        ) : (
          /* Empty State for No Comment */
          <p className="text-gray-400 text-sm italic">
            No written review provided
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(RatingCard);

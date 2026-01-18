import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { ReviewItem } from "@/components/shared/dashboard/profile/types/profile";

const RatingCard = ({
  image,
  name,
  profession,
  timeAgo,
  review,
  rating = 5,
}: ReviewItem) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Rating Stars */}
        <div className="flex justify-center items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Reviewer Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm truncate">
              {name}
            </h4>
            <p className="text-xs text-gray-500 truncate">{profession}</p>
          </div>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {timeAgo}
          </span>
        </div>

        {/* Review Text */}
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
            {review}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingCard;

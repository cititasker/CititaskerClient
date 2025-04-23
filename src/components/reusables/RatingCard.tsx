import React from "react";
import Icons from "../Icons";
import Image from "next/image";

interface RatingCardProps {
  image: string;
  name: string;
  profession: string;
  timeAgo: string;
  review: string;
}

const RatingCard: React.FC<RatingCardProps> = ({
  image,
  name,
  profession,
  timeAgo,
  review,
}) => {
  return (
    <div className="w-full max-w-[290px] min-h-[214px] px-4 py-4 rounded-2xl shadow-md space-y-4 bg-light-grey">
      {/* Stars */}
      <div className="flex justify-center items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icons.star
            key={i}
            size=""
            variant="Bold"
            className="text-yellow-400 "
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src={image}
            alt={name}
            width={60}
            height={60}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm">{name}</h3>
            <p className="text-xs text-gray-500">{profession}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">{timeAgo}</p>
      </div>

      {/* Review */}
      <p className="text-sm text-gray-700 text-center">{review}</p>
    </div>
  );
};

export default RatingCard;

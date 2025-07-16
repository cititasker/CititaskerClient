"use client";

import React from "react";
import Image from "next/image";
import Rating from "../reusables/Rating";

export interface ReviewCardProps {
  label: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  onEdit?: () => void;
}

const ReviewCard = ({
  label,
  name,
  rating,
  date,
  comment,
  avatar = "/images/avatar.svg",
  onEdit,
}: ReviewCardProps) => {
  return (
    <main className="bg-white pt-6">
      <div className="relative border border-gray-200 rounded-[20px] space-y-3 p-4">
        {/* Label */}
        {label && <h3 className="text-sm font-bold text-gray-800">{label}</h3>}

        {/* Avatar, Name, Date */}
        <div className="flex items-center gap-3">
          <Image
            src={avatar}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>

        {/* Rating */}
        <Rating value={rating} readOnly />

        {/* Comment box with edit icon */}
        <div className="relative mt-2">
          <div className="bg-[#F3F5F6] border border-gray-300 border-l-0 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-3 text-sm text-gray-700 relative">
            {comment}

            {/* Edit button inside the comment box */}
            {onEdit && (
              <button
                onClick={onEdit}
                className="absolute top-4 right-2 text-gray-500 hover:text-black"
              >
                <Image
                  src="/icons/edit.svg"
                  alt="edit"
                  width={4}
                  height={4}
                  className="object-contain"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReviewCard;

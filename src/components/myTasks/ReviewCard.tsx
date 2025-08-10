"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Rating from "../reusables/Rating";
import { formatDateAgo } from "@/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import CustomDropdown from "../reusables/CustomDropdown";

export interface ReviewCardProps {
  label: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string | StaticImageData;
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
    <main className="bg-white">
      <div>
        {label && <h3 className="font-bold text-[#000] mb-1">{label}</h3>}

        <div className="flex items-center gap-3 mb-1">
          <Image
            src={avatar}
            alt="avatar"
            width={42}
            height={42}
            className="rounded-full object-cover shrink-0 w-[42px] h-[42px]"
          />
          <div>
            <p className="font-medium text-black-2">{name}</p>
            <p className="text-sm text-dark-grey-2">{formatDateAgo(date)}</p>
          </div>
        </div>

        <Rating value={rating} readOnly className="gap-2" />

        <div className="w-full flex items-start gap-1 mt-2.5 bg-light-grey rounded-20 rounded-tl-none p-5 relative">
          <p className="text-sm text-black-2 flex-1">{comment}</p>
          {onEdit && (
            <CustomDropdown align="center" contentClassName="p-0">
              <DropdownMenuItem onClick={onEdit} className="px-4 py-2">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2">Delete</DropdownMenuItem>
            </CustomDropdown>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReviewCard;

"use client";

import Image, { StaticImageData } from "next/image";
import Rating from "../reusables/Rating";
import { formatDateAgo } from "@/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import CustomDropdown from "../reusables/CustomDropdown";
import { Pencil, Trash2 } from "lucide-react";

interface ReviewCardProps {
  label?: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string | StaticImageData;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewCard({
  label,
  name,
  rating,
  date,
  comment,
  avatar = "/images/avatar.svg",
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const isEditable = onEdit || onDelete;

  return (
    <div className="space-y-4">
      {label && (
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
          {label}
        </h3>
      )}

      {/* User Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={avatar}
            alt={`${name}'s avatar`}
            width={48}
            height={48}
            className="rounded-full object-cover shrink-0 w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-neutral-100"
          />
          <div className="min-w-0">
            <p className="font-medium text-neutral-900 truncate">{name}</p>
            <p className="text-xs sm:text-sm text-neutral-500">
              {formatDateAgo(date)}
            </p>
          </div>
        </div>

        {isEditable && (
          <CustomDropdown align="end" contentClassName="w-40">
            {onEdit && (
              <DropdownMenuItem onClick={onEdit} className="gap-2">
                <Pencil className="w-4 h-4" />
                Edit Review
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                onClick={onDelete}
                className="gap-2 text-error focus:text-error"
              >
                <Trash2 className="w-4 h-4" />
                Delete Review
              </DropdownMenuItem>
            )}
          </CustomDropdown>
        )}
      </div>

      {/* Rating */}
      <Rating value={rating} readOnly size={18} className="gap-1" />

      {/* Comment */}
      <div className="bg-neutral-50 rounded-2xl rounded-tl-none p-4 sm:p-5">
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          {comment}
        </p>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import CustomModal from "@/components/reusables/CustomModal";
import Icons from "@/components/Icons";
import RatingCard from "@/components/reusables/RatingCard";
import { ProfileSummary, ReviewItem } from "./Reviews";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profileSummary?: ProfileSummary;
  reviews: ReviewItem[];
}

const ReviewModal = ({ isOpen, onClose, profileSummary, reviews }: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-[750px]"
    >
      <div className="relative h-full">
        <h3 className="bg-white text-xl font-semibold text-center pb-6 sticky top-0">
          All Reviews
        </h3>
        <div className="h-[calc(90vh-100px)] overflow-y-auto flex flex-col md:flex-row gap-4 hide-scrollbar">
          {profileSummary && (
            <aside className="h-fit w-full md:max-w-[350px] flex-shrink-0 bg-primary p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={profileSummary.image}
                  alt={profileSummary.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-bold text-white">
                    {profileSummary.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {profileSummary.address}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    Overall review rating
                  </h2>
                  <div className="flex items-center">
                    <Icons.star
                      variant="Bold"
                      className="text-yellow-400 w-4 h-4"
                    />
                    <p className="ml-2 text-lg font-bold text-white">
                      {profileSummary.rating}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white">
                  {profileSummary.totalReviews} Reviews
                </p>
              </div>
            </aside>
          )}

          <main className="flex-1 space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((review, idx) => (
                <RatingCard key={idx} {...review} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </CustomModal>
  );
};

export default ReviewModal;

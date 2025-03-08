"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

const TestimonialCard = () => {
  return (
    <div className="px-1.5 sm:px-5 py-2.5 sm:py-[2.5rem] rounded-md sm:rounded-[1.25rem] bg-[#FDF0F0]">
      <div className="flex flex-col">
        <p className="text-xs sm:text-base font-medium font-lato text-dark-secondary leading-normal">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <div className="mt-[0.875rem] sm:mt-[3.125rem]">
          <div className="flex items-center gap-1 sm:gap-x-5 mb-1.5 sm:mb-5">
            <Image
              src="/images/testimonial.svg"
              alt=""
              width={52}
              height={52}
              className="rounded-full object-contain w-[2rem] sm:w-[3.25rem] h-[2rem] sm:h-[3.25rem] shrink-0"
            />
            <div>
              <p className="text-xs sm:text-xl font-medium font-lato mb-[3px] sm:mb-2.5">
                Theresa Odunayo
              </p>
              <span className="block text-[0.625rem] sm:text-sm font-lato font-medium">
                Manager Buz Bank
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-[#f2af41] text-xs sm:text-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

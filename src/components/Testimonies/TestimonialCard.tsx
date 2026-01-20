"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa6";

type TestimonialCardProps = {
  message: string;
  name: string;
  image: string;
  rating: number;
};

const TestimonialCard = ({
  message,
  name,
  image,
  rating,
}: TestimonialCardProps) => {
  return (
    <article className="h-full rounded-xl bg-white p-4 sm:p-6 shadow-sm flex flex-col justify-between">
      <p className="text-sm sm:text-base font-medium text-dark-secondary leading-relaxed">
        {message}
      </p>

      <div className="mt-6">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={image}
            alt={name}
            width={54}
            height={54}
            className="rounded-full object-cover w-14 h-14 shrink-0"
          />

          <div>
            <p className="text-sm sm:text-lg font-semibold">{name}</p>
            <div className="flex gap-1">
              {Array.from({ length: rating }).map((_, i) => (
                <FaStar key={i} className="text-[#f2af41] text-sm sm:text-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;

"use client";
import Image from "next/image";
import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonies = () => {
  return (
    <div className="container py-[2.25rem] md:py-[4.25rem]">
      <div className="h-fit w-full rounded-[13px] md:rounded-[3.125rem] bg-dark-secondary relative overflow-hidden pt-6 pb-8 sm:py-[6.25rem]">
        <Image
          src="/images/dotted_shape.svg"
          alt=""
          width={208}
          height={280}
          className="object-cover absolute -top-1 -left-1 sm:-top-[10%] sm:-left-[10%] w-auto h-[71px] sm:h-[13rem]"
        />

        <h1 className="w-[80%] max-w-[16.375rem] sm:max-w-[40.625rem] pt-6 mx-auto text-center text-white text-xl md:text-3xl lg:text-[2.5rem] font-bold leading-relaxed md:leading-snug lg:leading-[3.25rem]">
          See what happy customers are saying about CitiTasker
        </h1>

        <div>
          <TestimonialCarousel />
        </div>
      </div>
    </div>
  );
};

export default Testimonies;

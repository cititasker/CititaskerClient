"use client";
import Image from "next/image";
import React from "react";

interface PosterTestimoniesProps {
  showHeading?: boolean;
}

const PosterTestimonies: React.FC<PosterTestimoniesProps> = ({
  showHeading = true,
}) => {
  return (
    <div className="container-w pt[0] md:pt-[4.875rem] pb-[3rem] md:pb-[7.5rem]">
      {showHeading && (
        <h2 className="header max-w-[35.875rem] mx-auto text-center mb-[3.375rem]">
          Meet our top posters & their testimonies{" "}
        </h2>
      )}
      <div className="flex flex-col md:flex-row justify-between gap-3 min-h-[25rem]">
        <div className="relative max-w-[50.375rem] w-full h-[20rem] md:h-[25rem] rounded-40 overflow-hidden">
          <Image
            src="/images/poster_testimony.png"
            alt=""
            width={900}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="rounded-40 absolute w-[calc(100%-32px)] bottom-4 left-1/2 -translate-x-1/2 border border-white bg-[rgba(202,215,220,0.50)] backdrop-blur-[10px] p-7">
            <p className="text-white max-w-[41.25rem] text-3xl sm:text-5xl sm:leading-[52px] -tracking-[1.44px]">
              “CitiTasker has really helped me with domestic tasks at home.”
            </p>
          </div>
        </div>
        <div className="md:max-w-[26.5rem] w-full bg-red-light-1 rounded-[2rem] px-6 py-10">
          <div className="flex flex-col h-full">
            <p className="text-xl uppercase text-white font-normal">
              Facts & numbers
            </p>
            <div className="mt-auto w-full">
              <h1 className="text-[4rem] sm:text-[6rem] text-white -tracking-[6px] font-normal mb-2">
                85%
              </h1>
              <p className="text-2xl sm:text-[2.25rem] text-white sm:-tracking-[0.64px]">
                of our customers recommend us to other people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterTestimonies;

"use client";
import Image from "next/image";
import React, { useState } from "react";

interface IProps {
  src: any;
  thumbnail: any;
}
const TaskerTestimoniesVideos = ({ data }: { data: IProps[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="">
      <div className="flex max-w-[70.75rem] mx-auto w-full relative overflow-hidden rounded-30 border-8 sm:border-[16px] border-primary">
        {data.map((el, i) => (
          <video
            key={i}
            src={el.src}
            controls
            className={`min-w-full h-full transition-all duration-500`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          />
        ))}
      </div>
      <div className="flex gap-3 sm:gap-6 w-fit mx-auto mt-4 sm:mt-8">
        {data.map((el, i) => (
          <div
            key={i}
            className={`max-w-[120px] sm:max-w-[12.5rem] w-full rounded-2xl duration-300 transition-transform overflow-hidden border-[1px] sm:border-[3px] ${
              activeIndex === i
                ? "scale-[1.08] sm:scale-[1.12] border-secondary"
                : "border-transparent"
            }`}
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={el.thumbnail}
              alt=""
              width={300}
              height={280}
              className={`object-cover cursor-pointer w-full h-full`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskerTestimoniesVideos;

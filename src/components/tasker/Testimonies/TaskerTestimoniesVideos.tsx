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
      <div className="flex h-[38.938rem] max-w-[74.75rem] mx-auto w-full relative overflow-hidden rounded-30 border-[10px] border-secondary">
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
      <div className="flex w-fit mx-auto mt-8">
        {data.map((el, i) => (
          <div
            key={i}
            className={`max-w-[12.5rem] w-full h-[120px] mr-7 last:mr-0 rounded-[1rem] duration-300 transition-transform overflow-hidden border-[3px] ${
              activeIndex === i
                ? "scale-[1.12] border-secondary"
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

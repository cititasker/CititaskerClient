"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import TaskerStats from "@/components/TaskerStats";

interface IProps {
  images: {
    img: any;
  }[];
  extraClass?: string;
}
const HeroCarousel = ({ images, extraClass }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === 1) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={cn(
        "max-w-[32.875rem] w-[85%] sm:w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[32.875rem] relative bg-white rounded-[2rem]",
        extraClass
      )}
    >
      {images.map((el, i) => (
        <Image
          key={i}
          src={el.img}
          alt=""
          width={1200}
          height={700}
          className={` absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 p-[30px] lg:p-[3.5rem] ${
            activeIndex === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <TaskerStats extraClass="absolute top-[15%] -left-[12%]" />
      <TaskerStats extraClass="absolute bottom-[15%] -right-[12%]" />
    </div>
  );
};

export default HeroCarousel;

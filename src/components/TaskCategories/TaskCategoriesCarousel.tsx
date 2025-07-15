"use client";
import React from "react";
import TaskCategoryCard from "./TaskCategoryCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { cn } from "@/utils";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1204, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};

const TaskCategoriesCarousel = ({
  data,
  className,
  rtl = false,
}: {
  data: ITaskerProfile[];
  className?: string;
  rtl?: boolean;
}) => {
  return (
    <div className={cn("", className)}>
      <Carousel
        swipeable={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        additionalTransfrom={0}
        arrows={false}
        autoPlay
        autoPlaySpeed={0}
        centerMode={false}
        className=""
        containerClass="container-w-with-dots"
        customTransition="all 10s linear"
        transitionDuration={10000}
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="px-2.5 md:px-[1rem]"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={rtl}
        shouldResetAutoplay
      >
        {data.map((el, i) => (
          <TaskCategoryCard key={i} data={el} rtl={rtl} />
        ))}
      </Carousel>
    </div>
  );
};

export default TaskCategoriesCarousel;

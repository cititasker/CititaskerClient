"use client";
import React from "react";
import TaskCategoryCard from "./TaskCategoryCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// Custom arrow components with your brand colors
const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 group border border-light-primary-2"
    whileHover={{ scale: 1.1, x: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <svg
      className="w-5 h-5 text-dark-grey group-hover:text-primary transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </motion.button>
);

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 group border border-light-primary-2"
    whileHover={{ scale: 1.1, x: 2 }}
    whileTap={{ scale: 0.95 }}
  >
    <svg
      className="w-5 h-5 text-dark-grey group-hover:text-primary transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </motion.button>
);

interface TaskCategoriesCarouselProps {
  data: any[];
  className?: string;
  rtl?: boolean;
}

const TaskCategoriesCarousel: React.FC<TaskCategoriesCarouselProps> = ({
  data,
  className,
  rtl = false,
}) => {
  return (
    <div className={cn("relative group", className)}>
      <div className="carousel-container relative overflow-hidden">
        {/* Gradient overlays for visual depth using your colors */}
        {/* <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-light-primary-1 via-light-primary-1 to-transparent z-10 pointer-events-none opacity-60" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-light-primary-1 via-light-primary-1 to-transparent z-10 pointer-events-none opacity-60" /> */}

        <Carousel
          swipeable={true}
          responsive={responsive}
          ssr={true}
          additionalTransfrom={0}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={rtl ? 4000 : 3500}
          centerMode={false}
          className="pb-4"
          containerClass="carousel-inner-container"
          customTransition="transform 800ms ease-in-out"
          transitionDuration={800}
          dotListClass=""
          draggable={true}
          focusOnSelect={false}
          infinite={true}
          itemClass="px-3 md:px-4 flex"
          keyBoardControl={true}
          minimumTouchDrag={80}
          pauseOnHover={true}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={rtl}
          shouldResetAutoplay={true}
          showDots={false}
          slidesToSlide={1}
        >
          {data.map((el, i) => (
            <motion.div
              key={el.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <TaskCategoryCard data={el} rtl={rtl} />
            </motion.div>
          ))}
        </Carousel>
      </div>

      {/* Carousel Progress Indicator using your colors */}
      {/* <div className="flex justify-center mt-6 space-x-2">
        {data.slice(0, Math.ceil(data.length / 3)).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-light-primary-2 animate-pulse"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default TaskCategoriesCarousel;

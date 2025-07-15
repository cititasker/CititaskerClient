"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TestimonialCard from "./TestimonialCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

const TestimonialCarousel = () => {
  return (
    <div className="pt-[15px] md:pt-[70px] lg:pt-[6.75rem]">
      <Carousel
        swipeable={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        additionalTransfrom={0}
        arrows={false}
        autoPlay
        autoPlaySpeed={10000}
        centerMode={false}
        className=""
        containerClass="container-w-with-dots"
        customTransition="all 8s linear"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="px-[0.375rem] sm:px-[1.25rem]"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
      >
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;

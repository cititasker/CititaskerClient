"use client";
import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { taskByCategories } from "../../../../../data";
import CustomArrow from "../CustomArrow";
import { cn } from "@/utils";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1204, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
  },
};

const BrowseCategoryCarousel = () => {
  const ref = useRef<any>(null);

  return (
    <div className={cn("relative")}>
      <CustomArrow
        onClick={() => ref.current.previous()}
        extraClass={`top-0 bottom-0 my-auto`}
      />
      <Carousel
        ref={ref}
        swipeable={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        additionalTransfrom={0}
        arrows={false}
        autoPlay
        autoPlaySpeed={5000}
        centerMode={false}
        className=""
        containerClass=" max-w-[1100px] mx-auto"
        customTransition="all 0.25s linear"
        transitionDuration={2500}
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        // shouldResetAutoplay
      >
        {taskByCategories.map((el, i) => (
          <div key={i}>
            <div
              className="w-[10.625rem] h-[10.625rem] mx-auto object-cover rounded-full overflow-hidden bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${el.img})` }}
            ></div>
            <div className="mt-3 mx-auto w-fit">
              <p className="font-semibold text-base text-white text-center mb-1">
                {el.name}
              </p>
              <p className="font-normal text-sm text-white text-center">
                (1823 Taskers)
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      <CustomArrow
        dir="right"
        onClick={() => ref.current.next()}
        extraClass={`top-0 bottom-0 my-auto`}
      />
    </div>
  );
};

export default BrowseCategoryCarousel;

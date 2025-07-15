"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Tasker1 from "@/../public/images/plumbing.svg?url";
// import Tasker2 from "@/../public/images/makeup_artist.svg?url";
import Tasker2 from "@/../public/images/wcu-4.svg?url";
import Curl from "@/../public/icons/curl.svg?url";
import Star from "@/../public/icons/star.svg?url";
import CustomArrow from "./CustomArrow";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils";

const PromotionBanner = () => {
  const { user } = useAppSelector((state) => state.user);
  const slides = [
    {
      img: Tasker1,
      text: `Good Morning, ${user.first_name ?? "Guest"} 🎉`,
      title: `Earn up to ${formatCurrency({
        value: "2000",
        noFraction: true,
      })} just by referring your family & friends.`,
    },
    {
      img: Tasker2,
      text: `Good Morning, ${user.first_name ?? "Guest"} 🎉`,
      title: `Earn up to ${formatCurrency({
        value: "4000",
        noFraction: true,
      })} just by referring your family & friends.`,
    },
  ];

  return (
    <div className="relative w-full min-h-[25.5rem] mx-auto">
      <Carousel
        arrows
        customLeftArrow={<CustomArrow />}
        customRightArrow={<CustomArrow dir="right" />}
        autoPlay
        autoPlaySpeed={10000}
        draggable
        infinite
        keyBoardControl
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
          tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
          mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
        }}
        itemClass=""
        slidesToSlide={1}
        swipeable
      >
        {slides.map((el, i) => (
          <div
            key={i}
            className="w-full rounded-2xl sm:rounded-40 h-[25.5rem] bg-dark-secondary px-4 md:px-20 lg:px-15 py-4 overflow-hidden"
          >
            <div className="relative flex flex-col-reverse lg:flex-row justify-center sm:justify-between items-center h-full gap-6 lg:gap-0">
              {/* Text Section */}
              <div className="w-full max-w-[35.125rem] text-center lg:text-left">
                <p className="text-dark-grey-1 text-base mb-2 font-semibold">
                  {el.text}
                </p>
                <h2 className="text-2xl sm:text-[40px] font-bold text-light-primary-1 leading-snug">
                  {el.title}
                </h2>
              </div>

              {/* Image */}
              <div className="image_clip overflow-hidden max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] w-full h-[50%] sm:h-[75%] lg:h-[85%]">
                <Image
                  src={el.img}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Decorative Icons */}
              <Image
                src={Curl}
                alt=""
                className="absolute top-[75%] left-[20%] sm:top-[70%] sm:left-[30%] hidden sm:inline-block"
              />
              <Image
                src={Star}
                alt=""
                className="absolute top-[5%] left-[5%] sm:top-[10%] sm:-left-[2%]"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromotionBanner;

"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Tasker1 from "@/../public/images/plumbing.svg";
import Tasker2 from "@/../public/images/makeup_artist.svg";
import Curl from "@/../public/icons/curl.svg";
import Star from "@/../public/icons/star.svg";
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
    <div className="relative w-full max-w-[79.375rem] h-[25.5rem] mx-auto">
      <Carousel
        additionalTransfrom={0}
        arrows
        customLeftArrow={<CustomArrow />}
        customRightArrow={<CustomArrow dir="right" />}
        autoPlay
        autoPlaySpeed={5000}
        centerMode={false}
        className=""
        containerClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="px-5"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {slides.map((el, i) => (
          <div
            key={i}
            className="w-full h-[25.5rem] bg-dark-secondary rounded-40 px-32"
          >
            <div className="relative flex justify-between items-center h-full">
              <div className="max-w-[35.125rem] w-full h-fit">
                <p className="text-dark-grey-1 text-base mb-2 font-semibold">
                  {el.text}
                </p>
                <h2 className="text-[3rem] font-bold text-light-primary-1 leading-normal">
                  {el.title}
                </h2>
              </div>
              <div className="image_clip overflow-hidden max-w-[400px] w-full h-[85%]">
                <Image
                  src={el.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Image
                src={Curl}
                alt=""
                className="absolute top-[70%] left-[30%]"
              />
              <Image
                src={Star}
                alt=""
                className="absolute top-[10%] -left-[2%]"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromotionBanner;

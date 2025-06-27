"use client";
import React, { useEffect, useRef, useState } from "react";
import UnderlinedHeader from "../reusables/UnderlinedHeader";
import Image from "next/image";

const data = [
  {
    id: "1",
    title: "Pay safely",
    text: "Pay easily, with peace of mind. We hold payments secure in CitiTasker pay escrow account until the task has been completed and you’re 100% satisfied. ",
    image: "/images/wcu-1.svg",
  },
  {
    id: "2",
    title: "Top rated insurance",
    text: "CitiTasker insurance covers the Taskers for their liability to the third parties for personal injury or property damage while performing most task activities. ",
    image: "/images/wcu-2.svg",
  },
  {
    id: "3",
    title: "24/7 Support",
    text: "Our Help Centre and dedicated CitiTasker Support specialist are on hand 24/7 to help you navigate our tools and get the most out of our website.",
    image: "/images/wcu-3.svg",
  },
  {
    id: "4",
    title: "Verified Taskers",
    text: "Every Tasker on our platform goes through a thorough verification process which includes background checks, and skill validation amongst others, to ensure they are skilled, reliable, and trustworthy.",
    image: "/images/wcu-4.svg",
  },
];

const WhyChooseCitiTasker = () => {
  const listItem = useRef<any>(null);
  const [height, setHeight] = useState(172);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (listItem) {
      setHeight(listItem.current.offsetHeight);
    }
  }, []);
  return (
    <div className="bg-[#F5F5F5] relative overflow-hidden">
      <Image
        src="/images/bg-pics.svg"
        alt="background shape"
        width={484}
        height={484}
        className="hidden md:block absolute bottom-0 right-0 w-[200px] h-auto pointer-events-none z-0"
      />

      <div className="container bg-black md:bg-[#F5F5F5] relative z-10 pb-[2.5rem] md:pb-[5.75rem] pt-[2rem] md:pt-[4.375rem]">
        <div className="w-fit font-bold mx-auto text-white md:text-black text-center text-[24px] md:text-[2.6rem] mb-3.5 md:mb-[3.625rem]">
          Why Choose{" "}
          <UnderlinedHeader
            text="CitiTasker?"
            extraStyle="before:!translate-x-0  inline-block"
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-x-5 justify-between items-center">
          <div className="overflow-hidden max-w-full lg:max-w-[32.875rem] w-full mb-[4.375rem] lg:mb-0  relative pl-8 sm:pl-20 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[5px] before:h-full before:bg-dark-grey-2 before:rounded-20">
            <div
              className="w-[5px] bg-primary absolute top-0 left-0 rounded-20 transition-transform duration-300"
              style={{
                transform: `translateY(${height * activeIndex}px)`,
                height: `${height}px`,
              }}
            ></div>
            {data.map((el, i) => (
              <div
                ref={listItem}
                key={el.id}
                className="flex items-center cursor-pointer"
                onClick={() => setActiveIndex(i)}
              >
                <div className="py-[1.5rem]">
                  <h2
                    className={`mb-2.5 sm:mb-4 text-[18px] md:text-base font-semibold ${
                      activeIndex === i ? "text-primary" : "text-dark-grey-2"
                    }`}
                  >
                    {el.title}
                  </h2>
                  <p
                    className={`text-[16px] leading-0 md:text-base font-normal ${
                      activeIndex === i
                        ? "text-white sm:text-black"
                        : "text-dark-grey-2"
                    }`}
                  >
                    {el.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative max-w-[34rem] w-full h-[22.625rem] sm:h-[37.5rem] rounded-[1.125rem] sm:rounded-30 overflow-hidden">
            {data.map((item, i) => (
              <Image
                key={item.id}
                src={item.image}
                alt=""
                width={745}
                height={800}
                className={`absolute top-0 left-0 w-full h-[37.5rem] object-cover transition-opacity duration-500 ${
                  activeIndex === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCitiTasker;

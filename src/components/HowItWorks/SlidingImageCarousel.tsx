"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const imagesData = [
  "/images/hiw-1.svg",
  "/images/hiw-2.svg",
  "/images/hiw-3.svg",
  "/images/hiw-4.svg",
  "/images/hiw-5.svg",
];

const SlidingImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images] = useState(imagesData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[20rem] sm:h-[583px] max-w-[507px] w-[90%] mx-auto">
      <div className="h-full w-full -rotate-[8deg] sm:-rotate-[10deg] bg-light-primary-2 rounded-[0.875rem] sm:rounded-[1.625rem]"></div>
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt=""
          width={507}
          height={583}
          className={`absolute top-0 transition-all duration-1000 w-full h-full object-cover rounded-[0.875rem] sm:rounded-[1.625rem] ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default SlidingImageCarousel;

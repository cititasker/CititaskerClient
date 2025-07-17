"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imagesData = [
  "/images/hiw-1.svg",
  "/images/hiw-2.svg",
  "/images/hiw-3.svg",
  "/images/hiw-4.svg",
  "/images/hiw-5.svg",
];

const SlidingImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 3000);
  };

  useEffect(() => {
    if (!isPaused) startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="relative h-[20rem] sm:h-[583px] w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Layer */}
      {/* <div className="h-full w-full -rotate-[8deg] sm:-rotate-[10deg] bg-light-primary-2 rounded-[0.875rem] sm:rounded-[1.625rem]" /> */}

      {/* Image Stack */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-[90%] max-w-[507px] mx-auto h-full rounded-[0.875rem] sm:rounded-[1.625rem] ">
        {imagesData.map((img, index) => {
          const isActive = index === currentIndex;
          const zIndex = isActive ? 20 : index;

          return (
            <React.Fragment key={index}>
              {/* Animate active image */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`motion-${index}`}
                    initial={{
                      x: 70,
                      opacity: 0,
                      rotate: 15,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      x: -70,
                      opacity: 0,
                      rotate: -15,
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.4,
                      duration: 0.8,
                    }}
                    className={`absolute top-0 left-0 w-full h-full z-[${zIndex}]`}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={507}
                      height={583}
                      className="w-[80%] sm:w-full mx-auto h-full object-cover rounded-[0.875rem] sm:rounded-[1.625rem]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Render stacked behind images */}
              {!isActive && (
                <div
                  key={`static-${index}`}
                  className={`absolute top-0 left-0 w-full h-full z-[${zIndex}] transition-transform duration-300`}
                  style={{
                    transform: `rotate(${
                      index % 2 === 0 ? "-12deg" : "12deg"
                    }) translateX(${
                      index % 2 === 0 ? "-50px" : "50px"
                    }) scaleX(0.8)`,
                  }}
                >
                  <Image
                    src={img}
                    alt=""
                    width={507}
                    height={583}
                    className="w-[80%] sm:w-full mx-auto h-full object-cover rounded-[0.875rem] sm:rounded-[1.625rem]"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SlidingImageCarousel;

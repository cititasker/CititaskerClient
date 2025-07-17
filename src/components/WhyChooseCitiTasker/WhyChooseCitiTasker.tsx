"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"; // Import from framer-motion
import UnderlinedHeader from "../reusables/UnderlinedHeader";
import Image from "next/image";
import { useScreenBreakpoints } from "@/hooks/useScreenBreakpoints";

const data = [
  {
    id: "1",
    title: "Pay safely",
    text: "Pay easily, with peace of mind. We hold payments secure in CitiTasker pay escrow account until the task has been completed and you’re 100% satisfied.",
    image: "/images/wcu-1.svg",
  },
  {
    id: "2",
    title: "Top rated insurance",
    text: "CitiTasker insurance covers the Taskers for their liability to the third parties for personal injury or property damage while performing most task activities.",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const listItemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isSmallScreen, isMediumScreen } = useScreenBreakpoints();
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const [offsets, setOffsets] = useState<number[]>([]);

  const getItemHeight = () => {
    if (isSmallScreen) {
      return 145; // Smaller height for small screens
    } else if (isMediumScreen) {
      return 172; // Standard height for medium screens
    }
    return 172; // Default height
  };

  const itemHeight = getItemHeight();

  // Detect which list item is in view
  const handleScroll = () => {
    listItemsRefs.current.forEach((el, index) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        // If the item is in the middle of the viewport (50% visibility)
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveIndex(index);
        }
      }
    });
  };

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateHeights = () => {
      const heights = listItemsRefs.current.map((el) => el?.offsetHeight || 0);
      setItemHeights(heights);

      const newOffsets = heights.reduce<number[]>((acc, height, i) => {
        const prev = acc[i - 1] || 0;
        acc[i] = prev + height;
        return acc;
      }, []);
      setOffsets(newOffsets);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const offsetTop = activeIndex === 0 ? 0 : offsets[activeIndex - 1] || 0;

  return (
    <div className="bg-[#F5F5F5] relative overflow-hidden">
      <Image
        src="/images/bg-pics.svg"
        alt="background shape"
        width={484}
        height={484}
        className="hidden md:block absolute bottom-0 right-0 w-[200px] h-auto pointer-events-none z-0"
      />

      <div className="container-w bg-black md:bg-[#F5F5F5] relative z-10 pb-[3rem] md:pb-[5.75rem] pt-[2rem] md:pt-[4.375rem]">
        <div className="w-fit font-bold mx-auto text-white md:text-black text-center text-[24px] md:text-[2.6rem] mb-3.5 md:mb-[3.625rem]">
          Why Choose{" "}
          <UnderlinedHeader
            text="CitiTasker?"
            extraStyle="before:!translate-x-0 inline-block"
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-x-5 justify-between items-center">
          <div className="overflow-hidden max-w-full lg:max-w-[32.875rem] w-full mb-[4.375rem] lg:mb-0 relative pl-8 sm::pl-12 md:pl-20 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[5px] before:h-full before:bg-dark-grey-1 before:rounded-20">
            {/* Animated indicator */}
            <motion.div
              className="w-[5px] bg-primary absolute top-0 left-0 rounded-20"
              style={{
                height: itemHeights[activeIndex] ?? 0,
              }}
              animate={{
                translateY: offsetTop,
              }}
              transition={{
                duration: 0.6, // Increased transition time for smoother movement
                ease: "easeInOut", // Smooth easing
              }}
            ></motion.div>

            {data.map((el, i) => (
              <motion.div
                // @ts-ignore
                ref={(el) => (listItemsRefs.current[i] = el)} // Assign refs for each item
                key={el.id}
                className="flex items-center cursor-pointer"
                initial={{ opacity: 0 }} // Initial opacity
                animate={{ opacity: activeIndex === i ? 1 : 0.5 }} // Fade-in/fade-out effect
                transition={{ opacity: { duration: 0.6 } }} // Fade transition with easing
              >
                <div className="py-[1.5rem]">
                  <h2
                    className={`mb-2.5 sm:mb-4 text-[16px] md:text-base font-semibold ${
                      activeIndex === i
                        ? "text-white md:text-primary"
                        : "text-dark-grey-2"
                    }`}
                  >
                    {el.title}
                  </h2>
                  <p
                    className={`text-[14px] leading-0 md:text-base font-normal ${
                      activeIndex === i
                        ? "text-white md:text-black"
                        : "text-dark-grey-2"
                    }`}
                  >
                    {el.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-[34rem] w-full h-[22.625rem] sm:h-[37.5rem] rounded-[1.125rem] sm:rounded-30 overflow-hidden">
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 1 }} // Initial opacity and scale
                animate={{
                  opacity: activeIndex === i ? 1 : 0, // Only show active image
                  scale: activeIndex === i ? 1.05 : 1, // Slight zoom on active image
                  zIndex: activeIndex === i ? 10 : 0, // Ensure active image is on top
                  position: "absolute",
                  top: 0,
                  left: 0,
                }} // Scale and opacity for transition
                transition={{
                  opacity: { duration: 0.8, ease: "easeInOut" }, // Smooth fade-in/out
                  scale: { duration: 0.8, ease: "easeInOut" }, // Smooth zoom effect
                  zIndex: { duration: 0 }, // Instant z-index change
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={745}
                  height={800}
                  className="w-full h-[37.5rem] object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCitiTasker;

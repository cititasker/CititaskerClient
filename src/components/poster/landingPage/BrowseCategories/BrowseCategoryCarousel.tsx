"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { taskByCategories } from "../../../../../data";
import CustomArrow from "../CustomArrow";

// Types
interface CarouselRef {
  next: () => void;
  previous: () => void;
}

interface CategoryItem {
  img: string;
  name: string;
  id?: number;
}

// Constants
const RESPONSIVE_CONFIG = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
};

const CAROUSEL_CONFIG = {
  swipeable: true,
  responsive: RESPONSIVE_CONFIG,
  ssr: true,
  arrows: false,
  autoPlay: true,
  autoPlaySpeed: 6000,
  infinite: true,
  draggable: true,
  keyBoardControl: true,
  pauseOnHover: true,
  customTransition: "transform 400ms ease-in-out",
  containerClass: "max-w-5xl mx-auto relative",
};

const BrowseCategoryCarousel: React.FC = () => {
  const carouselRef = useRef<CarouselRef | any>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <CustomArrow
        direction="left"
        onClick={() => carouselRef.current?.previous()}
        className="top-1/2 -translate-y-1/2"
      />

      {/* Carousel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <Carousel ref={carouselRef} {...CAROUSEL_CONFIG}>
          {taskByCategories.map((category: CategoryItem, index: number) => (
            <motion.div
              key={category.id || index}
              className="px-3"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="group cursor-pointer">
                {/* Category Image */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-2xl group-hover:shadow-glow-primary transition-all duration-300">
                  <Image
                    src={category.img}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 128px, 160px"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/50 transition-all duration-300" />
                </div>

                {/* Category Info */}
                <div className="text-center space-y-1">
                  <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-white/90 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 font-medium">
                    (1,823 Taskers)
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </Carousel>
      </motion.div>

      {/* Right Arrow */}
      <CustomArrow
        direction="right"
        onClick={() => carouselRef.current?.next()}
        className="top-1/2 -translate-y-1/2"
      />

      {/* Progress Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(taskByCategories.length / 5) }).map(
          (_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/30 animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BrowseCategoryCarousel;

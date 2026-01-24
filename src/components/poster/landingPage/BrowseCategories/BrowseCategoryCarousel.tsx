"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import CustomArrow from "../CustomArrow";
import { useGetCategories } from "@/services/general/index.hook";
import { ROUTES } from "@/constant";
import { getCategoryImage } from "@/lib/utils/category-images";

interface CategoryDisplay {
  id: number;
  name: string;
  img: string;
  href: string;
  taskersCount: number;
}

export default function BrowseCategoryCarousel() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  const { data: categories, isLoading, isError } = useGetCategories();

  const displayCategories = useMemo<CategoryDisplay[]>(() => {
    if (!categories?.length) return [];
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      img: getCategoryImage(category.name),
      href: `${ROUTES.BROWSE_TASK}?category_id=${category.id}`,
      taskersCount: Math.floor(Math.random() * (3000 - 500) + 500),
    }));
  }, [categories]);

  // Update image height dynamically for arrow centering
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.offsetHeight);
    }
  }, [categories]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse px-4 sm:px-6 md:px-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-3 rounded-full bg-white/20" />
            <div className="h-3 bg-white/20 rounded mx-auto w-20 mb-1" />
            <div className="h-3 bg-white/20 rounded mx-auto w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || displayCategories.length === 0) return null;

  return (
    <div className="relative max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Arrows */}
      {imageHeight > 0 && (
        <>
          <CustomArrow
            direction="left"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0"
            style={{ top: imageHeight / 2 }}
          />
          <CustomArrow
            direction="right"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0"
            style={{ top: imageHeight / 2 }}
          />
        </>
      )}

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        autoplay={{
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={16}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 12 },
          480: { slidesPerView: 3, spaceBetween: 16 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 24 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }}
      >
        {displayCategories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <Link href={category.href} className="group block text-center">
              {/* Image wrapper */}
              <div
                ref={index === 0 ? imageRef : null} // track first image for height
                className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-3 rounded-full overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105"
              >
                <Image
                  src={category.img}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/50 transition-all" />
              </div>

              {/* Info */}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                {category.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-white/80 font-medium">
                ({category.taskersCount.toLocaleString()} Taskers)
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {displayCategories.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

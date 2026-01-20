"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./constant";

const TestimonialCarousel = () => {
  return (
    <section className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop
        freeMode={{
          enabled: true,
          momentum: false,
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={7000}
        grabCursor
        slidesPerView="auto"
        spaceBetween={24}
        className="!overflow-visible"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="!h-auto flex justify-stretch"
            style={{ width: "400px" }}
          >
            <TestimonialCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialCarousel;

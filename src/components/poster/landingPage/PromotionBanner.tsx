"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils";
import CustomArrow from "./CustomArrow";

import Tasker1 from "@/../public/images/plumbing.svg?url";
import Tasker2 from "@/../public/images/wcu-4.svg?url";

interface SlideData {
  img: string;
  amount: string;
}

const SLIDE_DATA: SlideData[] = [
  {
    img: Tasker1,
    amount: "2000",
  },
  {
    img: Tasker2,
    amount: "4000",
  },
];

export default function PromotionBanner() {
  const { user } = useAppSelector((state) => state.user);
  const userName = user?.first_name || "Anonymous";

  return (
    <div className="relative w-full mx-auto">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop
        navigation={{
          prevEl: ".promo-prev",
          nextEl: ".promo-next",
        }}
        slidesPerView={1}
      >
        {SLIDE_DATA.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative w-full h-auto lg:h-[25.5rem] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-primary-500`}
            >
              {/* Glow */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />

              <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between h-full px-6 md:px-12 lg:px-16 py-8">
                {/* Content */}
                <div className="flex-1 max-w-lg text-center lg:text-left space-y-4">
                  <p className="text-white/80 text-sm md:text-base font-medium">
                    Good Morning, {userName} 🎉
                  </p>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                    Earn up to{" "}
                    <span className="drop-shadow-lg">
                      {formatCurrency({
                        value: slide.amount,
                        noFraction: true,
                      })}
                    </span>
                    <br />
                    <span className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium">
                      just by referring friends
                    </span>
                  </h2>

                  <button className="glass-effect px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-all shadow-lg">
                    Start Referring
                  </button>
                </div>

                {/* Image */}
                <div className="flex-1 max-w-sm lg:max-w-md xl:max-w-lg h-64 lg:h-80 relative">
                  <Image
                    src={slide.img}
                    alt="Tasker illustration"
                    fill
                    priority={index === 0}
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom arrows */}
      <div className="promo-prev">
        <CustomArrow direction="left" />
      </div>
      <div className="promo-next">
        <CustomArrow direction="right" />
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils";
import CustomArrow from "./CustomArrow";

// Images
import Tasker1 from "@/../public/images/plumbing.svg?url";
import Tasker2 from "@/../public/images/wcu-4.svg?url";
// import Curl from "@/../public/icons/curl.svg?url";
// import Star from "@/../public/icons/star.svg?url";

// Types
interface SlideData {
  img: string;
  amount: string;
  gradient?: string;
}

// Constants
const CAROUSEL_CONFIG = {
  autoPlay: true,
  autoPlaySpeed: 8000,
  draggable: true,
  infinite: true,
  keyBoardControl: true,
  arrows: true,
  responsive: {
    all: { breakpoint: { max: 4000, min: 0 }, items: 1 },
  },
};

const SLIDE_DATA: SlideData[] = [
  {
    img: Tasker1,
    amount: "2000",
    gradient: "bg-gradient-primary",
  },
  {
    img: Tasker2,
    amount: "4000",
    gradient: "bg-gradient-secondary",
  },
];

const PromotionBanner: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const userName = user?.first_name || "Anonymous";

  const slideVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="relative w-full mx-auto">
      <Carousel
        {...CAROUSEL_CONFIG}
        customLeftArrow={<CustomArrow direction="left" />}
        customRightArrow={<CustomArrow direction="right" />}
      >
        {SLIDE_DATA.map((slide, index) => (
          <motion.div
            key={index}
            className={`relative w-full h-auto lg:h-[25.5rem] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-primary shadow-2xl ${slide.gradient}`}
            {...slideVariants}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30" />

            {/* Glow Effect */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between h-full px-6 md:px-12 lg:px-16 py-8">
              {/* Content Section */}
              <div className="flex-1 max-w-lg text-center lg:text-left space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-white/80 text-sm md:text-base font-medium tracking-wide">
                    Good Morning, {userName} 🎉
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                    Earn up to{" "}
                    <span className="text-white drop-shadow-lg">
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
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  className="glass-effect px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Referring
                </motion.button>
              </div>

              {/* Image Section */}
              <motion.div
                className="flex-1 max-w-sm lg:max-w-md xl:max-w-lg h-64 lg:h-80 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={slide.img}
                    alt="Tasker illustration"
                    fill
                    className="object-cover object-top"
                    // sizes="(max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
                    priority={index === 0}
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            {/* <motion.div
              className="absolute top-4 left-4 w-8 h-8 opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image src={Star} alt="" fill className="object-contain" />
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-8 w-12 h-12 opacity-40 hidden md:block"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={Curl} alt="" fill className="object-contain" />
            </motion.div> */}
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

export default PromotionBanner;

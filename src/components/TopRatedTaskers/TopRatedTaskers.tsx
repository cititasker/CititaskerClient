"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MOCK_TASKERS } from "./mock-taskers";
import SectionHeader from "../reusables/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import TaskerCard from "./TaskerCard";

const TopRatedTaskers: React.FC = () => {
  const [activeCategory] = useState("party");

  // Filter taskers by category
  const filteredTaskers = useMemo(() => {
    const filtered = MOCK_TASKERS.filter(
      (tasker) => tasker.categoryId === activeCategory,
    );
    return filtered.length > 0 ? filtered : MOCK_TASKERS;
  }, [activeCategory]);

  // Determine if we should show autoscrolling carousel
  const minCardsForOverflow = 6;
  const shouldAutoScroll = filteredTaskers.length > minCardsForOverflow;

  return (
    <section className="bg-primary-100 py-16 md:py-24">
      <div className="max-w-[1920px] mx-auto px-4">
        {/* Header */}
        <SectionHeader title="Top Rated Taskers" />

        <motion.div
          key={activeCategory} // Force remount on category change
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {shouldAutoScroll ? (
            <div className="space-y-8">
              {/* Forward scrolling row */}
              <SwiperRow taskers={filteredTaskers} direction="forward" />

              {/* Backward scrolling row */}
              <SwiperRow taskers={filteredTaskers} direction="backward" />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <SwiperRow
                taskers={filteredTaskers}
                direction="forward"
                isAutoScrolling={false}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

interface SwiperRowProps {
  taskers: typeof MOCK_TASKERS;
  direction?: "forward" | "backward";
  isAutoScrolling?: boolean;
}

const SwiperRow: React.FC<SwiperRowProps> = ({
  taskers,
  direction = "forward",
}) => {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      loop
      freeMode={{ enabled: true, momentum: false }}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: direction === "backward",
      }}
      speed={7000}
      grabCursor
      slidesPerView="auto"
      spaceBetween={24}
    >
      {taskers.map((tasker) => (
        <SwiperSlide
          key={tasker.id}
          className="!w-[280px] sm:!w-[300px] lg:!w-[320px] flex-shrink-0"
        >
          <TaskerCard tasker={tasker} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopRatedTaskers;

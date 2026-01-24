"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useTasksQuery } from "@/components/browseTask/hooks/useTasksQuery";
import { ROUTES } from "@/constant";
import TaskCard from "./TaskCard";

export default function Recommended() {
  const { tasks, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTasksQuery();

  const handleReachEnd = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <section className="container-w py-12 md:py-16">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-64 bg-neutral-200 rounded" />
            <div className="h-6 w-20 bg-neutral-200 rounded" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[17.25rem] space-y-4">
                <div className="h-44 bg-neutral-200 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-200 rounded w-full" />
                  <div className="h-3 bg-neutral-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-w py-12 md:py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Recommended for you
        </h2>
        <Link
          href={ROUTES.BROWSE_TASK}
          className="group flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
        >
          <span className="text-base font-semibold">See All</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={24}
        loop
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        grabCursor
      >
        {tasks.map((task) => (
          <SwiperSlide key={task.id} className="!w-[17.25rem] flex-shrink-0">
            <TaskCard data={task} />
          </SwiperSlide>
        ))}

        {/* Loading indicator */}
        {isFetchingNextPage && (
          <SwiperSlide className="!w-[17.25rem] flex items-center justify-center h-44">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-text-secondary text-sm font-medium">
                Loading more...
              </span>
            </div>
          </SwiperSlide>
        )}

        {/* End state */}
        {!hasNextPage && tasks.length > 0 && (
          <SwiperSlide className="!w-[17.25rem] flex items-center justify-center h-44">
            <div className="text-center text-text-muted">
              <p className="text-sm font-medium">
                You've seen all recommendations!
              </p>
              <Link
                href={ROUTES.BROWSE_TASK}
                className="text-primary hover:text-primary-600 text-sm font-medium mt-2 inline-block"
              >
                Browse all tasks →
              </Link>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Mobile hint */}
      <p className="flex justify-center mt-4 md:hidden text-text-muted text-sm">
        Swipe to see more →
      </p>
    </section>
  );
}

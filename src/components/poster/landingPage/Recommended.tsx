"use client";
import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useTasksQuery } from "@/components/browseTask/hooks/useTasksQuery";
import { ROUTES } from "@/constant";
import TaskCard from "./TaskCard";

// Constants
const SCROLL_THRESHOLD = 0.8; // Trigger when 80% scrolled

const Recommended: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { tasks, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTasksQuery();

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || !hasNextPage || isFetchingNextPage) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const scrollPercentage = (scrollLeft + clientWidth) / scrollWidth;

    if (scrollPercentage >= SCROLL_THRESHOLD) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Attach scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <section className="container-w py-12 md:py-16">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-64 bg-neutral-200 rounded"></div>
            <div className="h-6 w-20 bg-neutral-200 rounded"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[17.25rem] space-y-4">
                <div className="h-44 bg-neutral-200 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 rounded w-full"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Recommended for you
          </h2>
          <Link
            href={ROUTES.BROWSE_TASK}
            className="group flex items-center gap-2 text-primary hover:text-primary-600 transition-colors duration-300"
          >
            <span className="text-base font-semibold">See All</span>
            <HiOutlineChevronRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Scrollable Container */}
        <motion.div variants={itemVariants}>
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex-shrink-0"
              >
                <TaskCard data={task} />
              </motion.div>
            ))}

            {/* Loading Indicator */}
            {isFetchingNextPage && (
              <div className="flex-shrink-0 flex items-center justify-center min-w-[17.25rem] h-44">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <span className="text-text-secondary text-sm font-medium">
                    Loading more...
                  </span>
                </div>
              </div>
            )}

            {/* End of Results Indicator */}
            {!hasNextPage && tasks.length > 0 && (
              <div className="flex-shrink-0 flex items-center justify-center min-w-[17.25rem] h-44">
                <div className="text-center text-text-muted">
                  <p className="text-sm font-medium">
                    You've seen all recommendations!
                  </p>
                  <Link
                    href={ROUTES.BROWSE_TASK}
                    className="text-primary hover:text-primary-600 text-sm font-medium mt-2 inline-block transition-colors"
                  >
                    Browse all tasks →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          className="flex justify-center mt-4 md:hidden"
          variants={itemVariants}
        >
          <p className="text-text-muted text-sm">Swipe to see more →</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Recommended;

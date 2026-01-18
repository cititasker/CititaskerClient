"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CATEGORY_TABS, MOCK_TASKERS } from "./mock-taskers";
import CarouselRow from "./CarouselRow";

const TopRatedTaskers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("automobile");

  // Filter taskers by category
  const filteredTaskers = useMemo(() => {
    const filtered = MOCK_TASKERS.filter(
      (tasker) => tasker.categoryId === activeCategory
    );
    return filtered.length > 0 ? filtered : MOCK_TASKERS;
  }, [activeCategory]);

  // Determine if we should show autoscrolling carousel
  // Threshold: More than 6 cards means overflow on most screens
  const minCardsForOverflow = 6;
  const shouldAutoScroll = filteredTaskers.length > minCardsForOverflow;

  return (
    <section className="bg-light-primary-1 py-16 md:py-24">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            See some of the top rated Taskers
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-8 overflow-x-auto scrollbar-hide px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-3 justify-center min-w-max">
            {CATEGORY_TABS.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full
                  font-medium text-sm transition-all duration-300
                  whitespace-nowrap
                  ${
                    activeCategory === category.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white text-text-black hover:bg-primary/10 hover:text-primary"
                  }
                `}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Conditional Carousel Rendering */}
        <motion.div
          key={activeCategory} // Force remount on category change
          //   className="py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {shouldAutoScroll ? (
            // Multiple rows with bidirectional scrolling (sufficient data)
            <div className="space-y-8">
              {/* Top Row - Scrolls Forward */}
              <CarouselRow
                taskers={filteredTaskers}
                direction="forward"
                isAutoScrolling={true}
                categoryKey={activeCategory}
              />

              {/* Bottom Row - Scrolls Backward */}
              <CarouselRow
                taskers={filteredTaskers}
                direction="backward"
                isAutoScrolling={true}
                categoryKey={activeCategory}
              />
            </div>
          ) : (
            // Single centered row (limited data)
            <div className="max-w-7xl mx-auto">
              <CarouselRow
                taskers={filteredTaskers}
                direction="forward"
                isAutoScrolling={false}
                categoryKey={activeCategory}
              />
            </div>
          )}
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TopRatedTaskers;

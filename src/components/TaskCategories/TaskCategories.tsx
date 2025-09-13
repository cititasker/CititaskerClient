"use client";
import React, { useState, useEffect } from "react";
import TaskCategoriesCarousel from "./TaskCategoriesCarousel";
import { useGetCategories } from "@/services/general/index.hook";
import { capitalize } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

// Utility function for conditional classes
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Enhanced Constants with your custom colors
const STYLES = {
  container:
    "relative min-h-screen bg-gradient-to-br from-light-primary-1 via-light-grey to-light-primary-2 overflow-hidden",
  backgroundPattern: "absolute inset-0 opacity-30",
  floatingElements: "absolute pointer-events-none z-0",
  content: "container-w relative z-10 mx-auto px-4 md:px-8 py-20 md:py-28",
  headerSection: "text-center mb-16 md:mb-20",
  mainTitle:
    "text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight",
  titleGradient:
    "bg-gradient-to-r from-text-black via-primary to-secondary bg-clip-text text-transparent",
  subtitle:
    "text-lg md:text-xl text-dark-grey max-w-2xl mx-auto leading-relaxed",
  tabsSection: "mb-12 md:mb-16",
  tabsContainer:
    "relative bg-white bg-opacity-60 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-light-primary-2 border-opacity-30 max-w-6xl mx-auto",
  tabsScrollWrapper: "overflow-x-auto scrollbar-hide",
  tabsList: "flex items-center gap-2 min-w-fit px-2 py-1",
  tabButton:
    "relative group flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-300 transform hover:scale-105 cursor-pointer border-none outline-none",
  activeTab: "bg-gradient-to-r from-primary to-secondary text-white shadow-lg",
  inactiveTab:
    "text-dark-grey hover:bg-light-primary-1 hover:bg-opacity-50 hover:text-primary",
  tabIcon:
    "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
  carouselSection: "space-y-10 md:space-y-12",
  carouselWrapper: "relative",
  loadingSkeleton: "h-12 w-32 bg-light-grey rounded-xl animate-pulse",
} as const;

// Custom scrollbar hide utility
const customStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

const ENHANCED_TASKERS = [
  {
    id: 1,
    img: "/images/taskers/tasker_1.svg",
    name: "Adebayo Johnson",
    occupation: "Master Electrician",
    specialties: ["Wiring", "Solar Installation"],
    ratings: "4.9",
    taskCompleted: 245,
    charges: "₦15,000 - ₦30,000",
    responseTime: "< 2 hours",
    badge: "Top Rated",
  },
  {
    id: 2,
    img: "/images/taskers/tasker_2.svg",
    name: "Sarah Okonkwo",
    occupation: "Professional Cleaner",
    specialties: ["Deep Cleaning", "Organization"],
    ratings: "4.8",
    taskCompleted: 189,
    charges: "₦8,000 - ₦15,000",
    responseTime: "< 1 hour",
    badge: "Fast Response",
  },
  {
    id: 3,
    img: "/images/taskers/tasker_3.svg",
    name: "Michael Okafor",
    occupation: "Skilled Carpenter",
    specialties: ["Furniture", "Repairs"],
    ratings: "4.7",
    taskCompleted: 167,
    charges: "₦12,000 - ₦25,000",
    responseTime: "< 3 hours",
    badge: "Experienced",
  },
  {
    id: 4,
    img: "/images/taskers/tasker_4.svg",
    name: "Blessing Adamu",
    occupation: "Interior Designer",
    specialties: ["Decoration", "Styling"],
    ratings: "4.9",
    taskCompleted: 134,
    charges: "₦20,000 - ₦50,000",
    responseTime: "< 4 hours",
    badge: "Creative Pro",
  },
];

const FLOATING_SHAPES = [
  {
    size: 60,
    x: "10%",
    y: "20%",
    duration: 8,
    color: "bg-primary bg-opacity-20",
  },
  {
    size: 80,
    x: "85%",
    y: "15%",
    duration: 12,
    color: "bg-secondary bg-opacity-20",
  },
  {
    size: 40,
    x: "75%",
    y: "75%",
    duration: 10,
    color: "bg-green-state-color bg-opacity-20",
  },
  {
    size: 70,
    x: "15%",
    y: "80%",
    duration: 14,
    color: "bg-yellow-state-color bg-opacity-20",
  },
];

const TaskCategories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { data: categories = [], isLoading } = useGetCategories();
  const [filteredTaskers, setFilteredTaskers] = useState(ENHANCED_TASKERS);

  // Filter taskers based on active category (mock functionality)
  useEffect(() => {
    // In a real app, this would filter based on activeTab
    setFilteredTaskers(ENHANCED_TASKERS);
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: (duration: number) => ({
      y: [-20, 20, -20],
      rotate: [0, 360],
      transition: {
        y: { duration: duration, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: duration * 2, repeat: Infinity, ease: "linear" },
      },
    }),
  };

  return (
    <>
      {/* Inject custom styles */}
      <style jsx global>
        {customStyles}
      </style>

      <section className={STYLES.container}>
        {/* Floating Elements */}
        {FLOATING_SHAPES.map((shape, index) => (
          <motion.div
            key={index}
            className={cn(
              STYLES.floatingElements,
              shape.color,
              "rounded-full blur-xl"
            )}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            custom={shape.duration}
          />
        ))}

        <div className={STYLES.content}>
          {/* Enhanced Header */}
          <motion.div
            className={STYLES.headerSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h1 className={STYLES.mainTitle} variants={itemVariants}>
              Discover Nigeria's
              <br />
              <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Top-Rated Taskers
              </span>
            </motion.h1>
            <motion.p className={STYLES.subtitle} variants={itemVariants}>
              Connect with verified professionals who deliver exceptional
              results. From home repairs to creative services, find the perfect
              match for your needs.
            </motion.p>
          </motion.div>

          {/* Enhanced Category Tabs */}
          <motion.div
            className={STYLES.tabsSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className={STYLES.tabsContainer}
              variants={itemVariants}
            >
              <div className={STYLES.tabsScrollWrapper}>
                <div className={STYLES.tabsList}>
                  <AnimatePresence mode="wait">
                    {isLoading
                      ? // Loading skeleton
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className={STYLES.loadingSkeleton} />
                        ))
                      : categories.map((category, index) => (
                          <motion.div
                            key={category.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <motion.button
                              onClick={() => setActiveTab(category.id)}
                              className={cn(
                                STYLES.tabButton,
                                activeTab === category.id
                                  ? STYLES.activeTab
                                  : STYLES.inactiveTab
                              )}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div
                                className={cn(
                                  STYLES.tabIcon,
                                  activeTab === category.id
                                    ? "bg-white bg-opacity-20 text-white"
                                    : "bg-light-primary-2 text-primary"
                                )}
                              >
                                {index + 1}
                              </div>
                              <span className="font-semibold capitalize">
                                {capitalize(category.name)}
                              </span>
                              {activeTab === category.id && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl -z-10"
                                  layoutId="activeTab"
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </motion.button>
                          </motion.div>
                        ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Tasker Carousels */}
          <motion.div
            className={STYLES.carouselSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className={STYLES.carouselWrapper}
            >
              <TaskCategoriesCarousel data={filteredTaskers} className="mb-8" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={STYLES.carouselWrapper}
            >
              <TaskCategoriesCarousel
                data={filteredTaskers.slice().reverse()}
                rtl={true}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaskCategories;

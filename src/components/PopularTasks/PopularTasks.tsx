"use client";
import React from "react";
import TaskCategoryCard from "./TaskCategoryCard";
import FormButton from "../forms/FormButton";
import { motion } from "framer-motion";
import { ROUTES } from "@/constant";

// Mock data for popular tasks using your custom color palette
const POPULAR_TASKS = [
  {
    id: 1,
    title: "House Cleaning",
    icon: "🏠",
    color: "from-primary to-secondary",
  },
  {
    id: 2,
    title: "Plumbing Repairs",
    icon: "🔧",
    color: "from-green-state-color to-primary",
  },
  {
    id: 3,
    title: "Electrical Work",
    icon: "⚡",
    color: "from-yellow-state-color to-red-state-color",
  },
  {
    id: 4,
    title: "Moving & Delivery",
    icon: "📦",
    color: "from-secondary to-primary",
  },
  {
    id: 5,
    title: "Gardening",
    icon: "🌱",
    color: "from-green-state-color to-secondary",
  },
  {
    id: 6,
    title: "Painting",
    icon: "🎨",
    color: "from-red-state-color to-yellow-state-color",
  },
  {
    id: 7,
    title: "Assembly",
    icon: "🔨",
    color: "from-primary to-green-state-color",
  },
  {
    id: 8,
    title: "Pet Care",
    icon: "🐕",
    color: "from-yellow-state-color to-green-state-color",
  },
] as const;

const STYLES = {
  container:
    "bg-gradient-to-br from-light-primary-1 via-light-grey to-light-primary-2 relative overflow-hidden",
  content: "max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20",
  header: "text-center max-w-3xl mx-auto mb-16",
  title: "text-3xl md:text-4xl lg:text-5xl font-bold text-text-black mb-6",
  subtitle:
    "text-lg md:text-xl text-dark-grey leading-relaxed max-w-2xl mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12",
} as const;

const PopularTasks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className={STYLES.container}>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e2e8f0" fill-opacity="0.3"%3E%3Cpath d="M50 50c13.8 0 25-11.2 25-25S63.8 0 50 0 25 11.2 25 25s11.2 25 25 25zm25 25c13.8 0 25-11.2 25-25s-11.2-25-25-25-25 11.2-25 25 11.2 25 25 25z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30' />

      {/* Floating Elements using your brand colors */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-green-state-color/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className={STYLES.content}>
        {/* Header */}
        <motion.div
          className={STYLES.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h1 className={STYLES.title} variants={itemVariants}>
            Explore Popular Tasks on{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              CitiTasker
            </span>
          </motion.h1>
          <motion.p className={STYLES.subtitle} variants={itemVariants}>
            Discover a world of possibilities with CitiTasker. Connect with
            skilled professionals ready to tackle your to-dos with expertise and
            care.
          </motion.p>
        </motion.div>

        {/* Task Cards Grid */}
        <motion.div
          className={STYLES.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {POPULAR_TASKS.map((task, index) => (
            <motion.div
              key={task.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotate: Math.random() * 4 - 2, // Random subtle rotation
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-light-grey hover:border-primary relative overflow-hidden">
                {/* Background Gradient using your colors */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${task.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${task.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {task.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-black group-hover:text-primary transition-colors duration-300">
                    {task.title}
                  </h3>
                  <p className="text-sm text-dark-grey mt-2">
                    Professional & Reliable
                  </p>
                </div>

                {/* Hover Effect Border using your primary color */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <FormButton
            text="Explore More on CitiTasker"
            href={ROUTES.BROWSE_TASK}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTasks;

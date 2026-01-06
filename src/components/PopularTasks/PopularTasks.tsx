"use client";
import React, { useMemo } from "react";
import FormButton from "../forms/FormButton";
import { motion } from "framer-motion";
import { ROUTES } from "@/constant";
import SectionHeader from "../reusables/SectionHeader";
import Link from "next/link";
import { useGetCategories } from "@/services/general/index.hook";

// Icon mapping for categories/subcategories
const ICON_MAP: Record<string, string> = {
  // Categories
  "ASSEMBLING & INSTALLATION": "🔨",
  "AUTOMOBILE AND BICYCLE": "🚗",
  "TELEPHONE, COMPUTER and IT": "💻",
  "BUILDING AND CONSTRUCTION": "🏗️",
  CLEANING: "🧹",
  "MOVING SERVICE": "📦",
  DELIVERY: "🚚",
  EVENT: "🎉",
  HANDYMAN: "🔧",
  "COOKING & CATERING": "🍽️",
  "INTERIOR DESIGN": "🏠",
  "FASHION & BEAUTY": "💄",
  "COACHING & TUTORING": "📚",
  LIFESTYLE: "✨",

  // Popular Subcategories
  "Furniture Assembly": "🔨",
  "Home Cleaning": "🏠",
  Plumbing: "🔧",
  "Electrical and Wiring": "⚡",
  "House Packing": "📦",
  "Loading and unloading": "📦",
  "Gardening and Landscaping": "🌱",
  Painting: "🎨",
  Courier: "🚚",
  "Food Delivery": "🍕",
  "Car Repair": "🚗",
  Mechanic: "🔧",
  "Phone Repair": "📱",
  "Laptop Repair": "💻",
  Makeup: "💄",
  Haircut: "✂️",
  Tutor: "📖",
};

// Color gradients for variety
const COLOR_GRADIENTS = [
  "from-primary to-secondary",
  "from-green-state-color to-primary",
  "from-yellow-state-color to-red-state-color",
  "from-secondary to-primary",
  "from-green-state-color to-secondary",
  "from-red-state-color to-yellow-state-color",
  "from-primary to-green-state-color",
  "from-yellow-state-color to-green-state-color",
] as const;

const STYLES = {
  container:
    "bg-gradient-to-br from-light-primary-1 via-light-grey to-light-primary-2 relative overflow-hidden",
  content: "max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12",
} as const;

interface PopularTask {
  id: number;
  name: string;
  icon: string;
  color: string;
  href: string;
  isSubcategory: boolean;
}

const PopularTasks: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  // Determine popular tasks from categories data
  const popularTasks = useMemo<PopularTask[]>(() => {
    if (!categories || categories.length === 0) return [];

    const tasks: PopularTask[] = [];

    // Define popular subcategories to prioritize
    const popularSubcategoryNames = [
      "Home Cleaning",
      "Plumbing",
      "Electrical and Wiring",
      "Painting",
      "Food Delivery",
      "Courier",
      "Furniture Assembly",
      "Gardening and Landscaping",
    ];

    // First, try to get popular subcategories
    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        if (
          popularSubcategoryNames.includes(subcategory.name) &&
          tasks.length < 8
        ) {
          tasks.push({
            id: subcategory.id,
            name: subcategory.name,
            icon: ICON_MAP[subcategory.name] || "📋",
            color: COLOR_GRADIENTS[tasks.length % COLOR_GRADIENTS.length],
            href: `${ROUTES.BROWSE_TASK}?sub_category_id=${subcategory.id}`,
            isSubcategory: true,
          });
        }
      });
    });

    // If we don't have enough, add some categories
    if (tasks.length < 8) {
      categories.forEach((category) => {
        if (tasks.length < 8) {
          tasks.push({
            id: category.id,
            name: category.name,
            icon: ICON_MAP[category.name] || "📋",
            color: COLOR_GRADIENTS[tasks.length % COLOR_GRADIENTS.length],
            href: `${ROUTES.BROWSE_TASK}?category_id=${category.id}`,
            isSubcategory: false,
          });
        }
      });
    }

    return tasks.slice(0, 8);
  }, [categories]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  // Loading state
  if (isLoading) {
    return (
      <section className={STYLES.container}>
        <div className={STYLES.content}>
          <SectionHeader
            title={
              <h2>
                Explore popular tasks on{" "}
                <span className="text-gradient-primary">Cititasker</span>
              </h2>
            }
            subtitle="Loading popular tasks..."
          />
          <div className={STYLES.grid}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-light-grey" />
                <div className="h-4 bg-light-grey rounded mb-2" />
                <div className="h-3 bg-light-grey rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError || !categories) {
    return null;
  }

  return (
    <section className={STYLES.container}>
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-green-state-color/20 to-primary/20 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className={STYLES.content}>
        {/* Header */}
        <SectionHeader
          title={
            <h2>
              Explore popular tasks on{" "}
              <span className="text-gradient-primary">Cititasker</span>
            </h2>
          }
          subtitle="Discover a world of possibilities with CitiTasker. Connect with
            skilled professionals ready to tackle your to-dos with expertise and
            care."
        />

        {/* Task Cards Grid */}
        <motion.div
          className={STYLES.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {popularTasks.map((task) => (
            <motion.div
              key={`${task.isSubcategory ? "sub" : "cat"}-${task.id}`}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotate: Math.random() * 4 - 2,
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <Link href={task.href}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-light-grey hover:border-primary relative overflow-hidden">
                  {/* Background Gradient */}
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
                      {task.name}
                    </h3>
                    <p className="text-sm text-dark-grey mt-2">
                      Professional & Reliable
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
                </div>
              </Link>
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

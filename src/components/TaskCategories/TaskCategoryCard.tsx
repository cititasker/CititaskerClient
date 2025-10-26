"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaCheckCircle, FaClock, FaAward } from "react-icons/fa";

// Utility function for conditional classes
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface TaskerProfile {
  id?: number;
  img: string;
  name: string;
  occupation: string;
  specialties?: string[];
  ratings: string | number;
  taskCompleted: number;
  charges: string;
  responseTime?: string;
  badge?: string;
}

interface TaskCategoryCardProps {
  data: TaskerProfile;
  rtl?: boolean;
}

// Badge component with your brand colors
const Badge: React.FC<{ badge: string }> = ({ badge }) => {
  const getBadgeStyles = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "top rated":
        return "bg-gradient-to-r from-yellow-state-color to-red-state-color text-white";
      case "fast response":
        return "bg-gradient-to-r from-green-state-color to-primary text-white";
      case "experienced":
        return "bg-gradient-to-r from-primary to-secondary text-white";
      case "creative pro":
        return "bg-gradient-to-r from-secondary to-primary text-white";
      default:
        return "bg-gradient-to-r from-dark-grey to-dark-secondary text-white";
    }
  };

  const getIcon = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "top rated":
        return <FaAward className="w-2.5 h-2.5" />;
      case "fast response":
        return <FaClock className="w-2.5 h-2.5" />;
      case "experienced":
        return <FaCheckCircle className="w-2.5 h-2.5" />;
      default:
        return <FaStar className="w-2.5 h-2.5" />;
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-sm",
        getBadgeStyles(badge)
      )}
    >
      {getIcon(badge)}
      {badge}
    </div>
  );
};

// Star rating component with your brand colors
export const StarRating: React.FC<{
  rating: string | number;
  size?: "sm" | "md";
}> = ({ rating, size = "sm" }) => {
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const numRating = typeof rating === "string" ? parseFloat(rating) : rating;
  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={cn(
            sizeClass,
            i < fullStars
              ? "text-yellow-state-color"
              : i === fullStars && hasHalfStar
              ? "text-yellow-state-color"
              : "text-light-grey"
          )}
        />
      ))}
    </div>
  );
};

const TaskCategoryCard: React.FC<TaskCategoryCardProps> = ({
  data,
  rtl = false,
}) => {
  return (
    <motion.div
      className="h-full w-full"
      // whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={cn(
          "relative h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 border border-light-grey hover:border-primary group",
          rtl && "rtl"
        )}
      >
        {/* Content container */}
        <div
          className={cn(
            "relative z-10 p-4 lg:p-5 h-full flex",
            rtl ? "flex-row-reverse" : "flex-row"
          )}
        >
          {/* Profile Image Section */}
          <div className="flex-shrink-0 relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden">
            <Image
              src={data.img}
              alt={`${data.name} - ${data.occupation}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 64px, 80px"
            />
          </div>

          {/* Content Section */}
          <div
            className={cn(
              "flex-1 min-w-0",
              rtl ? "mr-4 lg:mr-5" : "ml-4 lg:ml-5"
            )}
          >
            {/* Header with badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base lg:text-lg text-text-black truncate mb-1 group-hover:text-primary transition-colors">
                  {data.name}
                </h3>
                <p className="text-sm text-dark-grey truncate mb-2">
                  {data.occupation}
                </p>

                {/* Specialties using your colors */}
                {data.specialties && data.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {data.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-0.5 bg-light-primary-1 text-primary text-xs rounded-md font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {data.specialties.length > 2 && (
                      <span className="inline-block px-2 py-0.5 bg-light-grey text-dark-grey text-xs rounded-md">
                        +{data.specialties.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Badge */}
              {data.badge && (
                <div className="flex-shrink-0">
                  <Badge badge={data.badge} />
                </div>
              )}
            </div>

            {/* Stats and Rating */}
            <div
              className={cn(
                "flex items-center justify-between gap-3",
                rtl && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2",
                  rtl && "flex-row-reverse"
                )}
              >
                {/* <StarRating rating={data.ratings} /> */}
                <span className="text-sm font-semibold text-dark-secondary">
                  {data.ratings}
                </span>
                <span className="text-xs text-dark-grey">
                  ({data.taskCompleted} tasks)
                </span>
              </div>

              {/* Response time */}
              {/* {data.responseTime && (
                <div className="flex items-center gap-1 text-xs text-dark-grey">
                  <FaClock className="w-3 h-3" />
                  {data.responseTime}
                </div>
              )} */}
            </div>

            {/* Price and CTA */}
            {/* <div
              className={cn(
                "flex items-center justify-between gap-3",
                rtl && "flex-row-reverse"
              )}
            >
              <div className="text-sm font-bold text-text-black">
                {data.charges}
              </div>

              <motion.button
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
              </motion.button>
            </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCategoryCard;

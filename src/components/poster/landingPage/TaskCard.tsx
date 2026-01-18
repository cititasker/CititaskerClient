"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { formatCurrency } from "@/utils/index";
import { Badge } from "@/components/ui/badge";
import { LOCATION_TYPE, ROUTES } from "@/constant";
import { PLACEHOLDER } from "@/constant/images";

interface TaskCardProps {
  data: ITask;
  isBookmarked?: boolean;
  onBookmarkToggle?: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  data,
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  const rating = 4.5; // Mock data - replace with actual rating
  const reviewCount = 120; // Mock data - replace with actual review count

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmarkToggle?.(data.id);
  };

  return (
    <motion.div
      className="w-[280px] h-[420px] flex-shrink-0 snap-start"
      // whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="h-full bg-background rounded-3xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden border border-border-light hover:border-border-medium group cursor-pointer">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <Link
            href={`${ROUTES.BROWSE_TASK}/${data.id}`}
            className="block w-full h-full"
          >
            <Image
              src={data.images?.[0] || PLACEHOLDER}
              alt={data.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="280px"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="glass-effect bg-primary/90 text-white border-0 backdrop-blur-md font-semibold capitalize text-xs px-3 py-1">
              {data.status}
            </Badge>
          </div>

          {/* Bookmark Button */}
          <motion.button
            onClick={handleBookmarkClick}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-effect backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
            }
          >
            {isBookmarked ? (
              <MdBookmark className="text-white text-xl drop-shadow-sm" />
            ) : (
              <MdBookmarkBorder className="text-white text-xl drop-shadow-sm" />
            )}
          </motion.button>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shadow-sm">
                  <FaDollarSign className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-bold text-sm drop-shadow-lg">
                  {formatCurrency({ value: data.budget })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 h-[172px] flex flex-col justify-between">
          <Link href={`${ROUTES.BROWSE_TASK}/${data.id}`} className="flex-1">
            {/* Header Section */}
            <div className="flex justify-between items-start gap-3 mb-3">
              <h3 className="text-lg font-bold text-text-primary line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                {data.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 flex-shrink-0 bg-warning/10 rounded-lg px-2 py-1">
                <FaStar className="text-warning w-3 h-3" />
                <span className="text-sm font-bold text-text-primary">
                  {rating}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
              {data.description}
            </p>

            {/* Location & Reviews */}
            <div className="space-y-3">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-info/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-4 h-4 text-info" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-text-primary capitalize">
                    {LOCATION_TYPE[data.location_type]}
                  </span>
                </div>
              </div>

              {/* Reviews Count */}
              <div className="flex items-center justify-between">
                <span className="text-text-muted text-xs">
                  {reviewCount} reviews
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(rating)
                          ? "text-warning"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Accent */}
          <div className="mt-4 h-1 bg-gradient-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default TaskCard;

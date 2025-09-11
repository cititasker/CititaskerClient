"use client";
import React from "react";
import Link from "next/link";
import { useTaskCardUrl } from "./hooks/useTaskCardUrl";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskCardContent } from "./TaskCardContent";
import { TaskCardDetails } from "./TaskCardDetails";

interface TaskCardProps {
  item: ITask;
  path: string;
  className?: string;
}

export default function TaskCard({
  item,
  path,
  className = "",
}: TaskCardProps) {
  const { href, isActive } = useTaskCardUrl(path, item.id);

  return (
    <Link
      href={href}
      scroll={false}
      className={`
        relative block group cursor-pointer p-5 rounded-xl transition-all duration-200 border  
        ${
          isActive
            ? "bg-light-primary-1 border-primary/50 shadow-lg"
            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg hover:scale-[1.01]"
        }
        ${className}
      `}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Header */}
      <TaskCardHeader
        posterImage={item.poster_profile_image}
        budget={item.budget}
        status={item.status}
        isActive={isActive}
      />

      {/* Content */}
      <TaskCardContent title={item.name} description={item.description} />

      {/* Details */}
      <TaskCardDetails
        date={item.date}
        locationType={item.location_type}
        address={item.address}
        offerCount={item.offer_count}
      />

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-3 left-3 w-2 h-2 bg-primary rounded-full animate-pulse" />
      )}
    </Link>
  );
}

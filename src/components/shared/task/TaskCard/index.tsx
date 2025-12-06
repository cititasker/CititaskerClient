"use client";
import React, { memo, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTaskCardUrl } from "./hooks/useTaskCardUrl";

// Lazy load heavy components
const TaskCardHeader = dynamic(
  () =>
    import("./TaskCardHeader").then((mod) => ({ default: mod.TaskCardHeader })),
  { ssr: true }
);
const TaskCardContent = dynamic(
  () =>
    import("./TaskCardContent").then((mod) => ({
      default: mod.TaskCardContent,
    })),
  { ssr: true }
);
const TaskCardDetails = dynamic(
  () =>
    import("./TaskCardDetails").then((mod) => ({
      default: mod.TaskCardDetails,
    })),
  { ssr: true }
);

interface TaskCardProps {
  item: ITask;
  path: string;
  className?: string;
}

const TaskCard = memo(function TaskCard({
  item,
  path,
  className = "",
}: TaskCardProps) {
  const { href, isActive } = useTaskCardUrl(path, item.id);

  const updatedBudget = useMemo(
    () => item.accepted_offer?.offer_amount || item.budget,
    [item.accepted_offer?.offer_amount, item.budget]
  );

  const cardClassName = useMemo(
    () => `
      relative block group cursor-pointer p-5 rounded-xl transition-all duration-200 border  
      ${
        isActive
          ? "bg-light-primary-1 border-primary/50 shadow-lg"
          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg hover:scale-[1.01]"
      }
      ${className}
    `,
    [isActive, className]
  );

  return (
    <Link
      href={href}
      scroll={false}
      className={cardClassName}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Header */}
      <TaskCardHeader
        posterImage={item.poster_profile_image}
        budget={updatedBudget}
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
});

export default TaskCard;

import React, { useEffect, useRef, useState } from "react";
import TaskerCard from "./TaskerCard";
import { Tasker } from "./tasker.types";

interface CarouselRowProps {
  taskers: Tasker[];
  direction?: "forward" | "backward";
  isAutoScrolling: boolean;
  categoryKey: string; // Add key to force reset on category change
}

const CarouselRow: React.FC<CarouselRowProps> = ({
  taskers,
  direction = "forward",
  isAutoScrolling,
  categoryKey,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardWidth = 256 + 24; // w-64 (256px) + gap-6 (24px)

  // Duplicate enough times to ensure seamless loop (only if autoscrolling)
  const duplicatedTaskers = isAutoScrolling
    ? [...taskers, ...taskers, ...taskers, ...taskers]
    : taskers;

  // Reset animation state when category changes
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Reset transform to initial position
    if (isAutoScrolling) {
      const singleSetWidth = cardWidth * taskers.length;
      scrollContainer.style.transform = `translateX(-${singleSetWidth}px)`;
    } else {
      // Reset to zero for static carousel
      scrollContainer.style.transform = `translateX(0px)`;
    }

    // Reset paused state
    setIsPaused(false);
  }, [categoryKey, isAutoScrolling, cardWidth, taskers.length]);

  useEffect(() => {
    if (!isAutoScrolling || isPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate single set width
    const singleSetWidth = cardWidth * taskers.length;

    // Set initial position to second set (for seamless loop)
    scrollContainer.style.transform = `translateX(-${singleSetWidth}px)`;

    let animationId: number;
    let currentPosition = -singleSetWidth;
    const speed = direction === "forward" ? -0.5 : 0.5; // pixels per frame

    const animate = () => {
      currentPosition += speed;

      // Reset position when reaching boundaries (seamless loop)
      if (direction === "forward" && currentPosition <= -singleSetWidth * 2) {
        currentPosition = -singleSetWidth;
      } else if (direction === "backward" && currentPosition >= 0) {
        currentPosition = -singleSetWidth;
      }

      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(${currentPosition}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [
    taskers.length,
    cardWidth,
    direction,
    isAutoScrolling,
    isPaused,
    categoryKey,
  ]);

  // Static carousel for few items (no autoscroll)
  if (!isAutoScrolling) {
    return (
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-4 pb-4 justify-start">
          {taskers.map((tasker) => (
            <TaskerCard key={tasker.id} tasker={tasker} />
          ))}
        </div>
      </div>
    );
  }

  // Autoscrolling carousel with hover pause
  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 will-change-transform pb-4"
        style={{ transition: isPaused ? "transform 0.3s ease-out" : "none" }}
      >
        {duplicatedTaskers.map((tasker, index) => (
          <TaskerCard key={`${tasker.id}-${index}`} tasker={tasker} />
        ))}
      </div>
    </div>
  );
};

export default CarouselRow;

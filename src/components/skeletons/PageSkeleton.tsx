"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TaskCardSkeleton from "./TaskCardSkeleton";

const PageSkeleton = () => {
  return (
    <div className="container pt-[100px] w-full bg-light-grey">
      <div className="flex flex-col md:flex-row gap-2 h-[calc(100vh-100px)] overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-1/4">
          <Skeleton className="w-full h-[493px] rounded-[20px] bg-white" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-3/4">
          {/* Left Column: Task Cards */}
          <div className="w-full md:w-1/3 overflow-auto flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <TaskCardSkeleton key={index} />
            ))}
          </div>

          {/* Right Column: Detail View */}
          <div className="w-full md:w-2/3">
            <Skeleton className="w-full h-full rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;

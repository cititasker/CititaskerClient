import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TaskCardSkeleton = () => {
  return (
    <div className="rounded-xl lg:rounded-3xl border border-muted p-6 space-y-4 bg-white shadow-sm">
      {/* Header: Avatar + Badge */}
      <div className="flex justify-between items-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-12 h-5 rounded-md" />
      </div>

      {/* Title + Description */}
      <Skeleton className="w-36 h-5" />
      <Skeleton className="w-4/5 h-5" />
      <Skeleton className="w-full h-5" />

      {/* Metadata (e.g. location, time, price) */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-3/4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-1/4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;

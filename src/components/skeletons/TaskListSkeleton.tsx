import React from "react";
import { TaskCardSkeleton } from "./TaskCardSkeleton";

interface TaskListSkeletonProps {
  count?: number;
}

export function TaskListSkeleton({ count = 4 }: TaskListSkeletonProps) {
  return (
    <div className="grid gap-4 shrink-0">
      {Array.from({ length: count }, (_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  );
}

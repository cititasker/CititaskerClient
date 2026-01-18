import React from "react";

export function TaskCardSkeleton() {
  return (
    <div className="block p-5 rounded-xl bg-white border border-gray-100 shadow-sm animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="text-right">
          <div className="w-20 h-6 bg-gray-200 rounded mb-1"></div>
          <div className="w-12 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mb-4">
        <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
        <div className="w-4/5 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Details skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-200 rounded-md"></div>
            <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

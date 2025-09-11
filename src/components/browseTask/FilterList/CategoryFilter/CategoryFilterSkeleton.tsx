import React from "react";

export function CategoryFilterSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center gap-3 py-3">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

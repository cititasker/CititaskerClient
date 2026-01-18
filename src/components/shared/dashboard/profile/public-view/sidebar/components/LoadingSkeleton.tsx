export const LoadingSkeleton = () => (
  <aside className="card-modern md:max-w-[300px] h-fit">
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-neutral-200 rounded-full mb-4"></div>
          <div className="h-5 bg-neutral-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-neutral-200 rounded w-24"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-6 border-b border-neutral-200 space-y-3">
          <div className="h-4 bg-neutral-200 rounded w-20"></div>
          <div className="space-y-2">
            <div className="h-3 bg-neutral-200 rounded w-full"></div>
            <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

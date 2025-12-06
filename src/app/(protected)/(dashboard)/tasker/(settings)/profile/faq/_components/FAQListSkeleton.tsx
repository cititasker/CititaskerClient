export const FAQListSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="border border-neutral-200 rounded-xl p-6 animate-pulse"
      >
        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

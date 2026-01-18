export const LoadingGrid = () => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
    {Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="aspect-square p-4 rounded-xl bg-background-secondary animate-pulse"
      >
        <div className="w-8 h-8 bg-border-medium rounded mx-auto mb-2" />
        <div className="h-3 bg-border-medium rounded" />
      </div>
    ))}
  </div>
);

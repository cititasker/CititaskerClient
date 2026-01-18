import { Button } from "@/components/ui/button";

export const LoadMoreButton: React.FC<{
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  count: number;
}> = ({ onLoadMore, isLoading, hasMore, count }) => {
  if (!hasMore) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onLoadMore}
      disabled={isLoading}
      className="mt-3 h-8 text-xs bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        `Load ${count} more replies`
      )}
    </Button>
  );
};

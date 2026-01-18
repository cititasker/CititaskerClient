import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const DashboardCardSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "transition-all duration-200 border-border-light",
        className
      )}
    >
      <CardContent className="p-6">
        {/* Title + icon row */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-24" /> {/* Title */}
          <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
        </div>

        <div className="space-y-2">
          {/* Large number */}
          <Skeleton className="h-7 w-16" />

          {/* Percentage + trend pill */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16 rounded-full" /> {/* Trend pill */}
            <Skeleton className="h-4 w-20" /> {/* vs last period */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { MapPin, Star, CheckCircle } from "lucide-react";
import { StatCard } from "./StatCard";
import Rating from "@/components/reusables/Rating";
import { ROLE } from "@/constant";

export const LocationAndRating = ({
  user,
}: {
  user: UserProfileData | undefined;
}) => {
  const reviewCount = user?.reviews_count || 0;
  const rating = user?.average_rating || 0;
  const completionRate = Math.ceil(user?.task_completion_percentage ?? 0);

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* Location */}
      {user?.location && (
        <StatCard
          icon={<MapPin className="h-4 w-4 text-primary" />}
          label="Location"
          value={user.location}
        />
      )}

      {/* Rating */}
      <StatCard
        icon={<Star className="h-4 w-4 text-warning" />}
        label="Rating"
        value={
          <div className="flex items-center gap-2">
            <Rating value={rating} readOnly size={16} />
            <span className="font-bold">
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </span>
          </div>
        }
        subValue={`${reviewCount} review${reviewCount !== 1 ? "s" : ""}`}
      />

      {/* Completion Rate */}
      {user?.role == ROLE.tasker && (
        <StatCard
          icon={<CheckCircle className="h-4 w-4 text-success" />}
          label="Completion rate"
          value={<span>{completionRate}% Completion rate</span>}
        />
      )}
    </div>
  );
};

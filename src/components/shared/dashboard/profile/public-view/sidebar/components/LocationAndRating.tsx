import { MapPin, Star } from "lucide-react";
import { StatCard } from "./StatCard";
import Rating from "@/components/reusables/Rating";
import { ROLE } from "@/constant";

export const LocationAndRating = ({
  user,
  role,
}: {
  user: any;
  role: TRole | undefined;
}) => {
  const reviewCount = user?.review_count || 0;
  const rating = user?.average_rating || 0;

  return (
    <div className="grid grid-cols-1 gap-3">
      {role == ROLE.tasker && (
        <StatCard
          icon={<MapPin className="w-4 h-4 text-primary" />}
          label="Location"
          value={user?.location || "Location not specified"}
        />
      )}

      <StatCard
        icon={<Star className="w-4 h-4 text-warning" />}
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
    </div>
  );
};

import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  statusBadge: {
    label: string;
    variant: "default" | "outline" | "destructive" | "secondary";
  };
  category?: string;
  subCategory?: string;
  locationType?: string;
}

export default function TaskStatusBadges({
  statusBadge,
  category,
  subCategory,
  locationType,
}: Props) {
  return (
    <div className="flex items-center gap-2 mb-2 flex-wrap">
      <Badge variant={statusBadge.variant} className="text-xs">
        {statusBadge.label}
      </Badge>

      {category && (
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>
      )}

      {subCategory && (
        <Badge variant="outline" className="text-xs opacity-75">
          {subCategory}
        </Badge>
      )}

      <Badge variant="outline" className="text-xs capitalize">
        {locationType?.replace("_", " ") || "Unknown"}
      </Badge>
    </div>
  );
}

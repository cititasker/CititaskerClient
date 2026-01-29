import React from "react";
import { Badge } from "@/components/ui/badge";
import StatusBadge, { StatusType } from "@/components/reusables/StatusBadge";

interface Props {
  status: string;
  category?: string;
  subCategory?: string;
  locationType?: string;
}

export default function TaskStatusBadges({
  status,
  category,
  subCategory,
  locationType,
}: Props) {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <StatusBadge status={status as StatusType} showDot />

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

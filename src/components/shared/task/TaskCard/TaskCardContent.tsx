import React from "react";
import { truncate } from "@/utils";

interface TaskCardContentProps {
  title: string;
  description: string;
}

export function TaskCardContent({ title, description }: TaskCardContentProps) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3">
        {truncate(description, 80)}
      </p>
    </div>
  );
}

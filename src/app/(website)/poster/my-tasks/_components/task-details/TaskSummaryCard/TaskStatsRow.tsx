import React from "react";
import { Eye, MessageCircle } from "lucide-react";

interface Props {
  offerCount: number;
  taskId: string | number;
  createdAt: string;
}

export default function TaskStatsRow({ offerCount, taskId, createdAt }: Props) {
  return (
    <div className="flex items-center gap-4 text-xs text-text-muted">
      {offerCount > 0 && (
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          <span>
            {offerCount} offer{offerCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <Eye className="w-3 h-3" />
        <span>ID: {taskId}</span>
      </div>

      <span>Posted {createdAt}</span>
    </div>
  );
}

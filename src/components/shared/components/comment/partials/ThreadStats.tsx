import React from "react";
import { MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadStatsProps {
  totalComments: number;
  totalReplies: number;
  className?: string;
}

const ThreadStats: React.FC<ThreadStatsProps> = ({
  totalComments,
  totalReplies,
  className,
}) => {
  if (totalComments === 0) return null;

  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="flex items-center gap-1.5">
        <MessageSquare className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-text-primary">
          {totalComments} {totalComments === 1 ? "comment" : "comments"}
        </span>
      </div>

      {totalReplies > 0 && (
        <>
          <div className="w-1 h-1 bg-neutral-300 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-neutral-500" />
            <span className="text-sm text-neutral-600">
              {totalReplies} {totalReplies === 1 ? "reply" : "replies"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ThreadStats;

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  replyCount: number;
  level: number;
  showCount?: boolean;
}

export const ThreadHeader: React.FC<ThreadHeaderProps> = ({
  isCollapsed,
  onToggle,
  replyCount,
  level,
  showCount = true,
}) => {
  if (replyCount === 0 || level > 2) return null;

  return (
    <div className="flex items-center gap-2 mb-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="h-7 px-2 gap-1.5 text-text-muted hover:text-text-primary hover:bg-neutral-100 border-none shadow-none"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
        <MessageSquare className="w-3 h-3" />
        <span className="text-xs font-medium">
          {isCollapsed ? "Show" : "Hide"} replies
        </span>
      </Button>

      {showCount && replyCount > 0 && (
        <Badge
          variant="outline"
          className={cn(
            "text-xs px-2 py-0.5 border shadow-none",
            level === 0
              ? "bg-primary-50 text-primary-700 border-primary-200"
              : "bg-neutral-50 text-neutral-600 border-neutral-200"
          )}
        >
          {replyCount} {replyCount === 1 ? "reply" : "replies"}
        </Badge>
      )}
    </div>
  );
};

import React, { useState, useMemo } from "react";
import { CommentBoxSchemaType } from "./CommentBox";
import { ThreadHeader } from "./partials/ThreadHeader";
import { SingleComment } from "./SingleComment";
import { getThreadIndentClass } from "./utils";

interface CollapsibleThreadProps {
  comment: CommentThreadT;
  level: number;
  onReplySubmit: (values: CommentBoxSchemaType) => Promise<void>;
  isReplyLoading: boolean;
  onLoadMoreReplies?: (commentId: number) => Promise<void>;
  loadingStates?: Record<number, boolean>;
  submissionId?: number;
  defaultCollapsed?: boolean;
  replyQuestion?: () => void;
}

export const CollapsibleThread: React.FC<CollapsibleThreadProps> = ({
  comment,
  level,
  onReplySubmit,
  isReplyLoading,
  onLoadMoreReplies,
  loadingStates,
  submissionId,
  defaultCollapsed = false,
  replyQuestion,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const replyCount = useMemo(() => {
    const countReplies = (replies: CommentThreadT[]): number => {
      return replies.reduce((count, reply) => {
        return count + 1 + (reply.replies ? countReplies(reply.replies) : 0);
      }, 0);
    };
    return comment.replies ? countReplies(comment.replies) : 0;
  }, [comment.replies]);

  const shouldShowHeader = level <= 2 && replyCount > 0;

  return (
    // Thread container
    <div className={getThreadIndentClass(level)}>
      {/* Thread Header */}
      {shouldShowHeader && (
        <ThreadHeader
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          replyCount={replyCount}
          level={level}
        />
      )}

      {/* Main Comment */}
      <SingleComment
        comment={comment}
        level={level}
        onReplySubmit={onReplySubmit}
        isLoading={isReplyLoading}
        // onLoadMoreReplies={onLoadMoreReplies}
        // loadingStates={loadingStates}
        submissionId={submissionId}
        replyQuestion={replyQuestion}
      />

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && !isCollapsed && (
        <div className="replies-container mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CollapsibleThread
              key={reply.id}
              comment={reply}
              level={level + 1}
              onReplySubmit={onReplySubmit}
              isReplyLoading={isReplyLoading}
              onLoadMoreReplies={onLoadMoreReplies}
              loadingStates={loadingStates}
              submissionId={submissionId}
              defaultCollapsed={level >= 2} // Auto-collapse deeper threads
            />
          ))}
        </div>
      )}

      {/* Collapsed Reply Indicator */}
      {comment.replies && comment.replies.length > 0 && isCollapsed && (
        <div
          className="mt-3 p-3 rounded-lg bg-neutral-50 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
          onClick={() => setIsCollapsed(false)}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-700">
                {replyCount}
              </span>
            </div>
            <span className="text-sm text-neutral-600">
              {replyCount} hidden {replyCount === 1 ? "reply" : "replies"}
            </span>
          </div>

          {/* Show first few reply previews */}
          <div className="mt-2 flex gap-2">
            {comment.replies.slice(0, 3).map((reply, index) => {
              const user = reply.user;
              const name = user
                ? `${user.first_name} ${user.last_name}`.trim() || "Anonymous"
                : "Anonymous";

              return (
                <div
                  key={reply.id}
                  className="flex items-center gap-1.5 text-xs text-neutral-500"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="truncate max-w-16">
                    {name.split(" ")[0]}
                  </span>
                  {index < Math.min(comment.replies!.length, 3) - 1 && (
                    <span>•</span>
                  )}
                </div>
              );
            })}
            {comment.replies.length > 3 && (
              <span className="text-xs text-neutral-400">...</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

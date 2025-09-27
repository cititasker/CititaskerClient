import React, { useMemo } from "react";
import { CollapsibleThread } from "./CollapsibleThread";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CommentBoxSchemaType } from "./CommentBox";
import ThreadStats from "./partials/ThreadStats";

interface CommentsThreadProps {
  comments: CommentThreadT[];
  onReplySubmit: (values: CommentBoxSchemaType) => Promise<void>;
  isReplyLoading: boolean;
  onLoadMoreReplies?: (commentId: number) => Promise<void>;
  loadingStates?: Record<number, boolean>;
  submissionId?: number;
  level?: number;
  showStats?: boolean;
  className?: string;
}

const CommentsThread: React.FC<CommentsThreadProps> = ({
  comments,
  onReplySubmit,
  isReplyLoading,
  onLoadMoreReplies,
  loadingStates = {},
  submissionId,
  level = 0,
  showStats = true,
  className,
}) => {
  // Calculate thread statistics
  const threadStats = useMemo(() => {
    const calculateStats = (comments: CommentThreadT[]) => {
      let totalReplies = 0;

      const countReplies = (comment: CommentThreadT): number => {
        const replyCount = comment.replies?.length || 0;
        const nestedReplies =
          comment.replies?.reduce(
            (acc, reply) => acc + countReplies(reply),
            0
          ) || 0;
        return replyCount + nestedReplies;
      };

      comments.forEach((comment) => {
        totalReplies += countReplies(comment);
      });

      return {
        totalComments: comments.length,
        totalReplies,
      };
    };

    return calculateStats(comments);
  }, [comments]);

  // Root level styling
  const isRootLevel = level === 0;

  return (
    <div className={className}>
      {/* Thread Statistics */}
      {isRootLevel && showStats && (
        <>
          <ThreadStats
            totalComments={threadStats.totalComments}
            totalReplies={threadStats.totalReplies}
          />
          <Separator className="mb-6" />
        </>
      )}

      {/* Comments Container */}
      <div
        className={cn(
          "space-y-6",
          // Responsive spacing adjustments
          "sm:space-y-8",
          // Nested thread styling
          !isRootLevel && "space-y-4 sm:space-y-5"
        )}
      >
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <CollapsibleThread
              comment={comment}
              level={level}
              onReplySubmit={onReplySubmit}
              isReplyLoading={isReplyLoading}
              onLoadMoreReplies={onLoadMoreReplies}
              loadingStates={loadingStates}
              submissionId={submissionId}
              defaultCollapsed={level >= 2} // Auto-collapse deep threads
            />

            {/* Separator between root comments */}
            {isRootLevel && index < comments.length - 1 && (
              <Separator className="my-6 sm:my-8" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile optimization notice */}
      {isRootLevel && comments.length > 5 && (
        <div className="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200 sm:hidden">
          <p className="text-xs text-neutral-600 text-center">
            Tip: Tap on thread headers to collapse long conversations
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsThread;

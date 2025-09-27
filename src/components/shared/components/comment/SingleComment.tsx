import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import CommentBox, { CommentBoxSchemaType } from "./CommentBox";
import CustomAvatar from "@/components/reusables/CustomAvatar";
import { CommentContent } from "./partials/CommentContent";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAvatarSize,
  canReply,
  getUserDisplayName,
  formatCommentTime,
} from "./utils";
import { CommentActions } from "./partials/CommentActions";

interface ImprovedSingleCommentProps {
  comment: CommentThreadT;
  level: number;
  onReplySubmit: (values: CommentBoxSchemaType) => Promise<void>;
  isLoading?: boolean;
  submissionId?: number;
  showReplyButton?: boolean;
}

export const SingleComment: React.FC<ImprovedSingleCommentProps> = ({
  comment,
  level,
  onReplySubmit,
  isLoading = false,
  submissionId,
  showReplyButton = true,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplyToggle = () => {
    setShowReplyBox((prev) => !prev);
  };

  const handleReplySubmit = async (values: CommentBoxSchemaType) => {
    await onReplySubmit({ ...values, id: submissionId ?? comment.id });
    setShowReplyBox(false);
  };

  const displayName = getUserDisplayName(comment);
  const avatar = comment.user?.profile_image || "";
  const canShowReply = canReply(level) && showReplyButton;
  const isRootComment = level === 0;

  return (
    <article className={cn("transition-colors duration-200")}>
      <div className="flex gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <CustomAvatar
            src={avatar}
            fullName={displayName}
            size={getAvatarSize(level)}
            className={cn(
              "ring-2 transition-all duration-200",
              isRootComment ? "ring-primary-100" : "ring-neutral-100"
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-text-primary truncate">
                {displayName}
              </h4>

              {/* User Rating */}
              {comment.user?.average_rating != null && (
                <Badge
                  variant="outline"
                  className="px-2 py-0.5 text-xs border-warning-light bg-warning-light text-warning shadow-none"
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {comment.user.average_rating}
                </Badge>
              )}
            </div>

            {/* Timestamp */}
            {comment.created_at && (
              <time className="text-xs text-text-muted">
                {formatCommentTime(comment.created_at)}
              </time>
            )}
          </div>

          {/* Comment Content */}
          <CommentContent comment={comment} level={level} />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <CommentActions
              comment={comment}
              level={level}
              isLoading={isLoading}
              onReply={handleReplyToggle}
              showReplyBox={showReplyBox}
            />

            {/* Reply Count Indicator */}
            {comment.replies && comment.replies.length > 0 && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-2 py-0.5 shadow-none",
                  "bg-neutral-50 text-neutral-600 border-neutral-200"
                )}
              >
                {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </Badge>
            )}
          </div>

          {/* Reply Box */}
          {showReplyBox && canShowReply && (
            <div className="mt-4">
              <CommentBox
                id={comment.id}
                onSubmit={handleReplySubmit}
                onSuccess={() => setShowReplyBox(false)}
                placeholder={`Reply to ${displayName.split(" ")[0]}...`}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

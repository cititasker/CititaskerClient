import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils";
import { LucideMessageCircleQuestion, MessageCircle } from "lucide-react";
import { canReply } from "../utils";
import FormButton from "@/components/forms/FormButton";

export const CommentActions: React.FC<CommentActionsProps> = ({
  comment,
  level,
  isLoading,
  onReply,
  showReplyBox,
  replyQuestion,
}) => {
  const showReplyButton = canReply(level);

  return (
    <div className="flex items-center gap-3 mt-2 px-1">
      <span className="text-xs text-text-muted">
        {formatTime(comment.created_at)}
      </span>

      {showReplyButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReply(comment.id)}
          disabled={isLoading}
          className={`
            h-7 px-2 text-xs transition-all duration-200
            ${
              showReplyBox
                ? "text-primary bg-primary-50 shadow-sm"
                : "text-text-muted hover:text-primary hover:bg-primary-50"
            }
          `}
        >
          <MessageCircle className="w-3 h-3 mr-1" />
          Reply
        </Button>
      )}

      {showReplyButton && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-text-muted hover:text-warning hover:bg-warning-light"
        >
          Report
        </Button>
      )}
      {replyQuestion && (
        <FormButton
          variant="ghost"
          size="sm"
          onClick={() => replyQuestion(comment.user.id)}
          disabled={isLoading}
          icon={<LucideMessageCircleQuestion className="w-3 h-3" />}
          text="View Question"
          className={`
            h-7 px-2 text-xs transition-all duration-200
            ${
              showReplyBox
                ? "text-primary bg-primary-50 shadow-sm"
                : "text-text-muted hover:text-primary hover:bg-primary-50"
            }
          `}
        />
      )}
    </div>
  );
};

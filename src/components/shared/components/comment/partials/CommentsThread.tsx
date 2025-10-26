import React from "react";
import { CommentBoxSchemaType } from "../CommentBox";
import { SingleComment } from "../SingleComment";

interface CommentsThreadProps {
  comments: CommentThreadT[];
  onReplySubmit: (values: CommentBoxSchemaType) => Promise<void>;
  isReplyLoading: boolean;
  onLoadMoreReplies?: (commentId: number) => Promise<void>;
  loadingStates?: Record<number, boolean>;
  submissionId?: number;
  level?: number;
}

const CommentsThread: React.FC<CommentsThreadProps> = ({
  comments,
  onReplySubmit,
  isReplyLoading,
  onLoadMoreReplies,
  loadingStates,
  submissionId,
  level = 0,
}) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          level={level}
          onReplySubmit={onReplySubmit}
          isLoading={isReplyLoading}
          // onLoadMoreReplies={onLoadMoreReplies}
          // loadingStates={loadingStates}
          submissionId={submissionId}
        />
      ))}
    </div>
  );
};

export default CommentsThread;

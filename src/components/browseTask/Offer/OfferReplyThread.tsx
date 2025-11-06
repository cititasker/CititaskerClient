"use client";

import React, { useState } from "react";
import CommentBox, {
  CommentBoxSchemaType,
} from "../../shared/components/comment/CommentBox";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { API_ROUTES } from "@/constant";
import { CommentContent } from "@/components/shared/components/comment/partials/CommentContent";
import { CommentActions } from "@/components/shared/components/comment/partials/CommentActions";
// import CommentsThread from "@/components/shared/components/comment/partials/CommentsThread";
import { useReplyOffer } from "@/services/offers/offers.hook";
import CommentsThread from "@/components/shared/components/comment/CommentsThread";
// import { useFetchTaskQuestion } from "@/services/tasks/tasks.hook";
import { useRouter } from "next/navigation";

interface ReplyOfferProps {
  comment: CommentThreadT | undefined;
  isOwner?: boolean;
}

const OfferReplyThread: React.FC<ReplyOfferProps> = ({
  comment,
  isOwner = false,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  // const { id } = useParams();
  // const { data } = useFetchTaskQuestion(id);
  // const questions = data?.data?.data || [];

  const replyMutation = useReplyOffer();

  const handleReplyToggle = () => {
    setShowReplyBox(!showReplyBox);
  };

  const handleReplySubmit = async (values: CommentBoxSchemaType) => {
    const formData = new FormData();
    formData.append("offer_id", `${values.id}`);
    formData.append("content", values.content);
    values.attachments?.forEach((file) => formData.append("images[]", file));
    replyMutation.mutateAsync(formData, {
      onSuccess(data) {
        showSnackbar(data.message, "success");
        setShowReplyBox(false);
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.OFFER_REPLIES, comment?.id],
        });
      },
      onError(error: any) {
        showSnackbar(error.message || "Failed to send reply", "error");
      },
    });
  };

  const replyQuestion = (id: number) => {
    router.push(`/browse-task/47?tab=questions&user=${id}`);
  };

  if (!comment) return null;

  return (
    <div className="w-full">
      <div className="mb-4">
        <CommentContent comment={comment} level={0} />
        <CommentActions
          comment={comment}
          level={isOwner ? 0 : 1}
          isLoading={replyMutation.isPending}
          onReply={handleReplyToggle}
          showReplyBox={showReplyBox}
          replyQuestion={replyQuestion}
        />
        {showReplyBox && (
          <div className="mt-4">
            <CommentBox
              id={comment.id}
              onSubmit={handleReplySubmit}
              placeholder="Write a reply..."
              isLoading={replyMutation.isPending}
            />
          </div>
        )}
      </div>

      <CommentsThread
        comments={comment?.replies}
        onReplySubmit={handleReplySubmit}
        isReplyLoading={replyMutation.isPending}
        submissionId={comment?.id}
        level={1}
      />
    </div>
  );
};

export default OfferReplyThread;

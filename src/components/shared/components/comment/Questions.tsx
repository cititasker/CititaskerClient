import { useSnackbar } from "@/providers/SnackbarProvider";
import {
  useFetchTaskQuestion,
  usePostQuestion,
  useReplyQuestion,
} from "@/services/tasks/tasks.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CommentBox, { CommentBoxSchemaType } from "./CommentBox";
import { API_ROUTES } from "@/constant";
import EmptyState from "../../../reusables/EmptyState";
import { MessageCircle } from "lucide-react";
import CommentsThread from "./CommentsThread";

interface QuestionsProps {
  questions: CommentThreadT[];
  taskId: number;
}

const Questions: React.FC<QuestionsProps> = ({ questions, taskId }) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const { refetch } = useFetchTaskQuestion(taskId);

  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {}
  );

  const mutation = usePostQuestion();
  const replyMutation = useReplyQuestion();

  useEffect(() => {
    refetch();
  }, []);

  const handleSend = async (values: CommentBoxSchemaType) => {
    const formData = new FormData();
    formData.append("task_id", `${taskId}`);
    formData.append("content", values.content);
    values.attachments?.forEach((file) => formData.append("images[]", file));
    await mutation.mutateAsync(formData, {
      onSuccess: (data) => {
        showSnackbar(data.message, "success");
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.GET_QUESTIONS, taskId],
        });
      },
      onError: (error) => {
        showSnackbar(error.message, "error");
      },
    });
  };

  const handleReply = async (values: CommentBoxSchemaType) => {
    const formData = new FormData();
    formData.append("question_id", `${values.id}`);
    formData.append("content", values.content);
    values.attachments?.forEach((file) => formData.append("images[]", file));

    return replyMutation.mutateAsync(formData, {
      onSuccess(data) {
        showSnackbar(data.message, "success");
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.GET_QUESTIONS, taskId],
        });
      },
      onError(error: any) {
        showSnackbar(error.message || "Failed to send reply", "error");
      },
    });
  };

  const handleLoadMoreReplies = async (commentId: number) => {
    setLoadingStates((prev) => ({ ...prev, [commentId]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    } finally {
      setLoadingStates((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  console.log(12, questions);

  return (
    <section className="w-full max-w-4xl mx-auto space-y-6">
      {/* New Comment Input */}
      <div className="mb-8">
        <CommentBox
          onSubmit={handleSend}
          isLoading={mutation.isPending}
          placeholder="Ask a question or leave a comment..."
        />
      </div>

      {/* Comments Thread */}
      {questions.length === 0 ? (
        <EmptyState
          title="No questions yet"
          message="Be the first to ask a question!"
          icon={<MessageCircle className="w-8 h-8 text-neutral-400" />}
        />
      ) : (
        <CommentsThread
          comments={questions}
          onReplySubmit={handleReply}
          isReplyLoading={replyMutation.isPending}
          onLoadMoreReplies={handleLoadMoreReplies}
          loadingStates={loadingStates}
        />
      )}
    </section>
  );
};

export default Questions;

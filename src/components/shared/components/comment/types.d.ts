type CommentThreadT = {
  id: number;
  content: string;
  created_at: string;
  files: string[];
  replies: CommentThreadT[];
  user: TaskerProfileT;
};

interface PaginatedComments {
  data: CommentThreadT[];
  hasMore: boolean;
  total: number;
}

interface CommentActionsProps {
  comment: CommentThreadT;
  level: number;
  isLoading?: boolean;
  onReply: (commentId: number) => void;
  showReplyBox: boolean;
  replyQuestion?: (id: number) => void;
}

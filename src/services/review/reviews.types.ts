interface UpdateReviewPayload {
  rating: number;
  comment: string;
  task_id: number;
}

interface UpdateReviewArgs {
  data: UpdateReviewPayload;
  role: TRole;
}

interface TaskerReview {
  other_party_review: {
    comment: string;
    rating: number;
    reviewed_at: string;
  };
  reviews_visible: boolean;
  task_id: number;
  user_role: TRole; // poster | tasker
  my_review: {
    comment: string;
    rating: number;
    reviewed_at: string;
  };
  auto_publish_at: string;
  can_update: boolean;
}

type GetReviewsResponse = { data: TaskerReview[] };

type PostReviewInput = {
  role: TRole;
  task_id: string;
  rating: number;
  comment: string;
};

interface UserReviewResponse extends IResponse {
  data: ReviewItem[];
}

type ReviewItem = {
  comment: string | null;
  created_at: string;
  id: number;
  rating: null;
  reviewer: string;
  tasker: string;
  image: string | null;
};

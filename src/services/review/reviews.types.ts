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
  other_party_reviewed: false;
  reviews_visible: false;
  task_id: number;
  user_role: TRole; // poster | tasker
  my_review: {
    comment: string;
    has_reviewed: true;
    rating: number;
    reviewed_at: string;
  };
  auto_publish_at: string;
  can_update: true;
}

type GetReviewsResponse = { data: TaskerReview[] };

type PostReviewInput = {
  role: TRole;
  task_id: string;
  rating: number;
  comment: string;
};

type UserReviewResponse = {
  data: ReviewItem[];
  meta: any;
};

type ReviewItem = {
  comment: string | null;
  created_at: string;
  id: number;
  rating: null;
  reviewer: string;
  tasker: string;
  image: string | null;
};

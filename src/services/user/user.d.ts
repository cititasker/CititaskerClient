interface ILoginRes {
  message: "Login Successful";
  success: true;
  data: {
    role: TRole;
    token: string;
  };
}
interface UserProfileData {
  about_me: string;
  average_rating: number;
  reviews_count: number;
  verification_status: boolean;
  task_completion_percentage: number;
  profile_image: string | null;
  first_name: string;
  id: number;
  last_name: string;
  location: string | null;
  skills: string[];
  certifications: {
    institution: string;
    name: string;
    year: string;
  }[];
}

interface UserProfileRes {
  data: UserProfileData;
}

interface Portfolio {
  key: string;
  url: string;
}

type UserPorfolioRes = {
  data: {
    id: number;
    portfolio: Portfolio[];
  };
};

interface UserFaq {
  answer: string;
  id: number | string;
  question: string;
}
type UserFaqResponse = { data: UserFaq[] };

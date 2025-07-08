interface UserProfileData {
  about_me: string;
  average_rating: number;
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

interface UserPorfolioRes {
  data: {
    id: number;
    portfolio: string[];
  };
}

interface UserFaq {
  answer: string;
  id: number;
  question: string;
}

export interface Skill {
  name: string;
}

export interface Certificate {
  institution: string;
  name: string;
  year: string;
}

export interface ReviewItem {
  image: string;
  name: string;
  profession: string;
  timeAgo: string;
  review: string;
  rating?: number;
}

export interface ProfileSummary {
  image: string;
  name: string;
  address: string;
  rating: number;
  totalReviews: number;
}

export interface ProfileData {
  about_me: string;
  skills: string[];
  certifications: Certificate[];
  first_name: string;
  last_name: string;
}

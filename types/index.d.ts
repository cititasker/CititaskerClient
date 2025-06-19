interface IChildren {
  children: React.ReactNode;
}

interface IResponse {
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
type TUseTimer = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

interface IBank {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
interface IUser {
  isVerified: any;
  date_of_birth: string | null;
  email: string;
  first_name: string | null;
  gender: string | null;
  id: number;
  last_name: string | null;
  phone_number: string | null;
  profile_image: string | null;
  role: TRole;
  created_at: string;
  has_verified_bvn: null;
  phone_number_verified_at: string;
  phone_token: string;
  user_id: number;
  location: string | null;
  occupation: string | null;
  kyc_stage: {
    bank: boolean;
    face_verification: boolean;
    home_address: boolean;
    id_verification: boolean;
    profile: boolean;
  };
}

type TRole = "tasker" | "poster";

interface ITasker {
  created_at: string;
  email: string;
  email_verified_at: string;
  google_id: null;
  id: number;
  profile: IUser;
  role: TRole;
  status: null;
}

interface ITaskerProfile {
  img: string;
  name: string;
  occupation: string;
  ratings: string;
  taskCompleted: number;
  charges: string;
}

interface IOffer {
  created_at: string;
  description: string;
  id: number;
  offer_amount: number;
  status: string;
  tasker: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
}

interface ITask {
  price: React.JSX.Element;
  id: number;
  category: { id: number; name: string };
  sub_category: { id: number; name: string };
  description: string;
  date: string;
  created_at: string;
  budget: number;
  images: string[];
  location: string[];
  location_type: string;
  name: string;
  poster: {
    created_at: string;
    email: string;
    email_verified_at: string;
    google_id: null;
    id: 10;
    profile: IUser;
    role: string;
    status: string | null;
    updated_at: string;
    verification_token: string;
  };
  tasker: ITasker;
  poster_profile: IUser;
  poster_profile_image: string | null;
  state: string;
  time: string;
  time_frame: string;
  offer_count: number;
  offers: IOffer[];
  status: string;
  address: string;
  payment_requested: string;
}

interface ITaskCategory {
  id: number;
  name: string;
}

interface ICategory {
  name: string;
  href: string;
  img?: any;
}

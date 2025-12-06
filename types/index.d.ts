interface IChildren {
  children: React.ReactNode;
}

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionHTMLItem {
  question: string;
  answer: string;
}

interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  current_page: number;
}

type ApiResponsePromise<T> = Promise<ApiResponse<T>>;

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
  bank_details: {
    account_name: string;
    bank_code: string;
    bank_name: string;
    account_number: string;
  };
  message_notifications_route: "email";
  notifications: "true" | "false";
  other_notifications_route: "email";
  recipient_code: string;
  reminder_notifications_route: "email";
  skills: null;
  transactional_notifications_route: "email";
}

type TRole = "tasker" | "poster";

type LocationTypeT = "in_person" | "online";

type TaskStatusT = "open" | "assigned" | "completed";

type TaskTimeT = "morning" | "mid_day" | "afternoon" | "evening";

type TransactionStatusT = "pending" | "approved" | "failed";

type TransactionType = "credit" | "debit";

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

type TaskerProfileT = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  average_rating: number;
  completion_rate: number;
  number_of_tasks_completed: number;
  phone_number: number;
};

interface IOffer {
  created_at: string;
  description: string;
  reason: string;
  id: number;
  offer_amount: number;
  status: string;
  tasker: TaskerProfileT;
}

interface IReschedule {
  id: number;
  reschedule_id: number;
  type: "request" | "counter_proposal";
  status: "pending" | "rejected";
  proposed_date: string;
  proposed_time: "mid_day";
  agreed_date: string | null;
  agreed_time: string | null;
  reason: string | null;
  round: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
  initiated_by: TRole;
}

interface IAcceptedOffer {
  created_at: string;
  description: string;
  id: number;
  offer_amount: number;
  status: "accepted";
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
  location_type: LocationTypeT;
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
  payment_requested: boolean;
  payment_released: boolean;
  has_surcharge_requests: boolean;
  reschedule: IReschedule;
  accepted_offer: IAcceptedOffer;
}

interface ITaskCategory {
  id: number;
  name: string;
  subcategories: { id: number; name: string }[];
}

interface ICloudinary {
  asset_folder: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  display_name: string;
  etag: string;
  format: string;
  height: number;
  isCloudinary: boolean;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: "upload";
  url: string;
  version: number;
  version_id: string;
  width: number;
}

interface ICategory {
  name: string;
  href: string;
  img?: any;
}

interface MoreOptionItem {
  text: string;
  name: string;
  disabled?: boolean;
  type?: "default" | "destructive" | "primary";
  customIcon?: any;
}

interface SelectOption {
  id: string;
  name: string;
  disabled?: boolean;
  [key: string]: string | number | undefined;
}

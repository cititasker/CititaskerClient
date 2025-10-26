import { ContactInfo } from "./types";

export const allowedCategoryNames = [
  "Building And Construction",
  "Cleaning",
  "Delivery",
  "Handyman",
  "Cooking & Catering",
  "Interior Design",
  "Fashion & Beauty",
];

export const CONTACT_INFO: ContactInfo = {
  address: "10 Samuel Arijojoye, Lekki Phase 1, Lagos State.",
  phone: "+234 8054872319",
  email: "cititasker@gmail.com",
};

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

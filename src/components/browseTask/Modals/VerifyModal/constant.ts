import { ROUTES } from "@/constant";
import { CreditCard, Shield, User } from "lucide-react";

export const verificationConfig = {
  id: {
    label: "Identity Verification",
    description: "Verify your government-issued ID",
    icon: Shield,
    actionText: "Verify Identity",
  },
  bank: {
    label: "Payment Method",
    description: "Add a secure payment method",
    icon: CreditCard,
    actionText: "Add Payment",
  },
  profile: {
    label: "Profile Information",
    description: "Complete your profile details",
    icon: User,
    actionText: "Complete Profile",
    href: `/tasker/${ROUTES.DASHBOARD_ACCOUNT}?tab=account`,
  },
} as const;

export const socialPlatforms: SocialPlatform[] = [
  {
    name: "Facebook",
    icon: "/icons/facebook.svg",
    color: "hover:bg-blue-50 hover:border-blue-200",
    shareUrl: (url, text) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(text)}`,
  },
  {
    name: "Twitter",
    icon: "/icons/twitter.svg",
    color: "hover:bg-blue-50 hover:border-blue-200",
    shareUrl: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
  },
  {
    name: "WhatsApp",
    icon: "/icons/whatsapp.svg",
    color: "hover:bg-green-50 hover:border-green-200",
    shareUrl: (url, text) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${text} ${url}`
      )}`,
  },
  //   {
  //     name: "LinkedIn",
  //     icon: "/icons/linkedin.svg",
  //     color: "hover:bg-blue-50 hover:border-blue-200",
  //     shareUrl: (url, text) =>
  //       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  //         url
  //       )}`,
  //   },
];

export interface VerificationStep {
  key: keyof typeof verificationConfig;
  completed: boolean;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  actionText: string;
}

export interface SocialPlatform {
  name: string;
  icon: string;
  color: string;
  shareUrl: (url: string, text: string) => string;
}

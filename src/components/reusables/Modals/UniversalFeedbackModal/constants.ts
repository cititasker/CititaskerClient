import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

export const FEEDBACK_CONFIG = {
  success: {
    icon: CheckCircle,
    iconColor: "text-success",
    iconBg: "bg-success-light",
    borderColor: "border-success/20",
    defaultTitle: "Success!",
  },
  error: {
    icon: XCircle,
    iconColor: "text-error",
    iconBg: "bg-error-light",
    borderColor: "border-error/20",
    defaultTitle: "Error",
  },
  warning: {
    icon: AlertCircle,
    iconColor: "text-warning",
    iconBg: "bg-warning-light",
    borderColor: "border-warning/20",
    defaultTitle: "Warning",
  },
  info: {
    icon: Info,
    iconColor: "text-info",
    iconBg: "bg-info-light",
    borderColor: "border-info/20",
    defaultTitle: "Information",
  },
} as const;

export const SIZE_CONFIG = {
  sm: {
    modal: "max-w-sm",
    icon: "w-12 h-12",
    iconSize: "w-6 h-6",
    title: "text-lg",
    content: "p-6",
    spacing: "space-y-4",
  },
  md: {
    modal: "max-w-md",
    icon: "w-16 h-16",
    iconSize: "w-8 h-8",
    title: "text-xl",
    content: "p-8",
    spacing: "space-y-6",
  },
  lg: {
    modal: "max-w-lg",
    icon: "w-20 h-20",
    iconSize: "w-10 h-10",
    title: "text-2xl",
    content: "p-10",
    spacing: "space-y-8",
  },
} as const;

export type FeedbackType = "success" | "error" | "warning" | "info";
export type FeedbackSize = "sm" | "md" | "lg";
export interface FeedbackAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "ghost";
  loading?: boolean;
}

export interface UniversalFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: FeedbackType;
  title?: string;
  message: string;
  size?: FeedbackSize;
  actions?: FeedbackAction[];
  autoClose?: number; // Auto close after milliseconds
  showCloseButton?: boolean;
  icon?: React.ReactNode; // Custom icon override
  className?: string;
}

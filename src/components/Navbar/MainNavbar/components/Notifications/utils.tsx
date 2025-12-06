import {
  FileText,
  AlertCircle,
  DollarSign,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Bell,
  Calendar,
  User,
  Coins,
  BanknoteArrowUp,
} from "lucide-react";

export function getNotificationIcon(type?: string, icon?: string) {
  const iconProps = { className: "w-4 h-4" };

  // Use backend icon mapping if available
  const iconMap: Record<string, React.ReactNode> = {
    check: <CheckCircle {...iconProps} className="w-4 h-4 text-green-600" />,
    alert: <AlertCircle {...iconProps} className="w-4 h-4 text-red-600" />,
    dollar: <DollarSign {...iconProps} className="w-4 h-4 text-green-600" />,
    clock: <Clock {...iconProps} className="w-4 h-4 text-orange-600" />,
    calendar: <Calendar {...iconProps} className="w-4 h-4 text-blue-600" />,
    user: <User {...iconProps} className="w-4 h-4 text-purple-600" />,
    file: <FileText {...iconProps} className="w-4 h-4 text-blue-600" />,
    coins: <Coins {...iconProps} className="w-4 h-4 text-yellow-600" />,
    message: (
      <MessageSquare {...iconProps} className="w-4 h-4 text-purple-600" />
    ),
    x: <XCircle {...iconProps} className="w-4 h-4 text-red-600" />,
    bell: <Bell {...iconProps} className="w-4 h-4 text-gray-600" />,
  };

  if (icon && iconMap[icon]) {
    return iconMap[icon];
  }

  // Fallback to type-based icons
  const typeShortName =
    type?.split("\\").pop()?.replace("Notification", "") || "";

  switch (typeShortName) {
    case "NewOffer":
    case "OfferWithdrawn":
      return <FileText {...iconProps} className="w-4 h-4 text-blue-600" />;

    case "PaymentRequest":
    case "RequestTaskSurchargeRequest":
      return (
        <BanknoteArrowUp {...iconProps} className="w-4 h-4 text-green-600" />
      );

    case "TaskCompletion":
      return <CheckCircle {...iconProps} className="w-4 h-4 text-green-600" />;

    case "NewDispute":
    case "DisputeProposal":
    case "NewDisputeProposal":
      return <AlertCircle {...iconProps} className="w-4 h-4 text-red-600" />;

    case "RescheduleApproved":
    case "RescheduleCounterAccepted":
      return <CheckCircle {...iconProps} className="w-4 h-4 text-green-600" />;

    case "RescheduleRejectedWithCounter":
    case "RescheduleCounterRejected":
      return <XCircle {...iconProps} className="w-4 h-4 text-red-600" />;

    case "TaskerRescheduleRequest":
    case "PosterCancelledTask":
      return <Clock {...iconProps} className="w-4 h-4 text-orange-600" />;

    case "Registration":
    case "PasswordReset":
      return (
        <MessageSquare {...iconProps} className="w-4 h-4 text-purple-600" />
      );

    default:
      return <Bell {...iconProps} className="w-4 h-4 text-gray-600" />;
  }
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const notifDate = new Date(date);
  const diffMs = now.getTime() - notifDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return notifDate.toLocaleDateString();
}

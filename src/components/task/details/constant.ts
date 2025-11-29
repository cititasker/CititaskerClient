import { Calendar, X, Copy, CreditCard, HelpCircle } from "lucide-react";

export const moreOptions: MoreOptionItem[] = [
  {
    text: "Cancel Task",
    name: "cancel-task",
    type: "destructive",
    customIcon: X,
  },
  {
    text: "Reschedule Task",
    name: "reschedule",
    customIcon: Calendar,
  },
  {
    text: "Post Similar Task",
    name: "similar-task",
    customIcon: Copy,
  },
  {
    text: "Refund Details",
    name: "refund",
    customIcon: CreditCard,
  },
  {
    text: "Help",
    name: "help",
    customIcon: HelpCircle,
  },
];

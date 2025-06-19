import { cn } from "@/utils";
import React from "react";
import { Badge } from "../ui/badge";

const sharedStyles = {
  open: {
    status_color: "bg-light-primary-1 text-black",
    dot: "bg-primary",
  },
  completed: {
    status_color: "bg-[#ECFDF3] text-[#12B76A]",
    dot: "bg-[#12B76A]",
  },
  assigned: {
    status_color: "bg-[#FCEFD9] text-[#F2AF42]",
    dot: "bg-[#F2AF42]",
  },
  cancelled: {
    status_color: "bg-[#FBDDE1] text-[#EB5769]",
    dot: "bg-[#EB5769]",
  },
};

const statusStyles: Record<
  IProps["status"],
  { status_color: string; dot: string }
> = {
  successful: sharedStyles.completed,
  completed: sharedStyles.completed,
  verified: sharedStyles.completed,
  assigned: sharedStyles.assigned,
  on_hold: sharedStyles.assigned,
  unverified: sharedStyles.assigned,
  cancelled: sharedStyles.cancelled,
  failed: sharedStyles.cancelled,
  open: sharedStyles.cancelled,
};
interface IProps {
  status:
    | "open"
    | "assigned"
    | "completed"
    | "cancelled"
    | "successful"
    | "on_hold"
    | "failed"
    | "unverified"
    | "verified";
  className?: string;
  showDot?: boolean;
}
const StatusBadge = ({ status, className, showDot = false }: IProps) => {
  const { status_color, dot } = statusStyles[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "shadow-none inline-flex items-center h-fit gap-[5px] px-2 py-1 rounded-full text-xs capitalize font-medium cursor-default",
        status_color,
        className
      )}
    >
      {showDot && (
        <span className={cn("w-[7px] h-[7px] rounded-full bg-primary", dot)} />
      )}
      {status}
    </Badge>
  );
};

export default StatusBadge;

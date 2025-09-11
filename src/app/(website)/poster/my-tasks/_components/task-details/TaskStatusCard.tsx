"use client";

import { formatDate } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskStatusCardProps {
  status: string;
  offerCount: number;
  date: string;
}

export default function TaskStatusCard({
  status,
  offerCount,
  date,
}: TaskStatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "assigned":
        return {
          title: "Task Assigned",
          content: `Wait for your task to be completed. Completion date: ${formatDate(
            date,
            "DD MMM, YYYY"
          )}`,
          badge: "In Progress",
          badgeColor: "bg-info text-info-light",
        };
      case "completed":
        return {
          title: "Release Payment",
          content:
            "Task completed successfully. Please release payment to the tasker.",
          badge: "Completed",
          badgeColor: "bg-success text-success-light",
        };
      default:
        return {
          title: `You have ${offerCount || 0} offer${
            offerCount !== 1 ? "s" : ""
          }`,
          content:
            "Discuss details with Taskers and accept an offer when you're ready.",
          badge: "New Offers!",
          badgeColor: "bg-accent-orange text-white",
        };
    }
  };

  const { title, content, badge, badgeColor } = getStatusConfig();

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 text-white border-none shadow-xl">
      <CardContent className="p-6 sm:p-8">
        <Badge
          className={cn(
            "mb-4 px-4 py-2 rounded-full text-sm font-medium",
            badgeColor
          )}
        >
          {badge}
        </Badge>

        <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight text-white">
          {title}
        </h2>

        {content && (
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {content}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

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
    // handle the open case with internal branching
    if (status === "open") {
      const hasOffers = offerCount > 0;
      return hasOffers
        ? {
            title: `You have ${offerCount} offer${offerCount !== 1 ? "s" : ""}`,
            content:
              "Discuss details with Taskers and accept an offer when you're ready.",
            badge: "New offers!",
          }
        : {
            title: "Wait for Offers",
            content: "Relax while offers roll in.",
            badge: "Task posted",
          };
    }

    // other statuses stay the same
    const configs: Record<
      string,
      { title: string; content: string; badge: string }
    > = {
      assigned: {
        title: "Task assigned",
        content: `Wait for your task to be completed. Completion date: ${formatDate(
          date
        )}`,
        badge: "In progress",
      },
      completed: {
        title: "Release payment",
        content:
          "Task completed successfully. Please release payment to the tasker.",
        badge: "Completed",
      },
    };

    return (
      configs[status] ?? {
        title: "Task status unknown",
        content: "Something went wrong. Please refresh the page.",
        badge: "Unknown",
      }
    );
  };

  const { title, content, badge } = getStatusConfig();

  return (
    <Card className="overflow-hidden bg-primary text-white border-none shadow-md">
      <CardContent className="p-6 sm:p-8">
        <Badge
          className={cn(
            "mb-4 px-4 py-2 rounded-md text-sm font-medium text-black-2 !bg-light-primary-1"
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

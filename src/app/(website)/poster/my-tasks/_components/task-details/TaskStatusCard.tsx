"use client";

import { formatDate } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";

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
  const renderTaskStatus = () => {
    switch (status) {
      case "assigned":
        return {
          title: "Task Assigned",
          content: `Wait for your task to be completed. Completion date: ${formatDate(
            date,
            "DD MMM, YYYY"
          )}`,
        };
      case "completed":
        return { title: "Release Payment", content: "" };
      default:
        return {
          title: `You have ${offerCount} offers`,
          content:
            "Discuss details with Taskers and accept an offer when you're ready.",
        };
    }
  };

  const { title, content } = renderTaskStatus();

  return (
    <Card className="bg-black text-white">
      <CardContent className="px-[26px] py-[34px]">
        <span className="bg-[#FB9596] px-4 py-2 rounded-[40px] inline-block mb-6 text-base">
          New Offer!
        </span>
        <h2 className="text-[2rem] font-semibold mb-1">{title}</h2>
        {content && (
          <p className="text-sm font-normal text-dark-grey-1">{content}</p>
        )}
      </CardContent>
    </Card>
  );
}

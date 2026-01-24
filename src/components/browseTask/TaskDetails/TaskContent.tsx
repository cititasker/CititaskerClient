"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { DescriptionSection } from "./DescriptionSection";
import { ImagesSection } from "./ImagesSection";
import PosterInfo from "./PosterInfo";
import CustomTab from "@/components/reusables/CustomTab";
import Reviews from "@/components/myTasks/Reviews";

import { useFetchTaskQuestion } from "@/services/tasks/tasks.hook";
import { useAuth } from "@/hooks/useAuth";

// Lazy-loaded components
const Questions = dynamic(
  () => import("@/components/shared/components/comment/Questions"),
  {
    loading: () => (
      <div className="p-4 text-center text-muted-foreground">
        Loading questions...
      </div>
    ),
    ssr: false,
  },
);

const Offer = dynamic(() => import("../Offer"), {
  loading: () => (
    <div className="p-4 text-center text-muted-foreground">
      Loading offers...
    </div>
  ),
  ssr: false,
});

interface TaskContentProps {
  task: ITask;
  onOptionSelect: (action: MoreOptionItem) => void;
}

export const TaskContent = ({ task, onOptionSelect }: TaskContentProps) => {
  const { data } = useFetchTaskQuestion(task.id);
  const { isAuthenticated, user } = useAuth();

  const questions = useMemo(() => data?.data?.data ?? [], [data?.data?.data]);

  const isTasker = isAuthenticated && user?.id === task.tasker?.id;

  const tabs = useMemo(() => {
    const baseTabs = [
      {
        label: `Offers (${task.offer_count || 0})`,
        value: "offers",
        render: () => <Offer offers={task.offers} />,
      },
      {
        label: `Questions (${questions.length})`,
        value: "questions",
        render: () => <Questions questions={questions} taskId={task.id} />,
      },
    ];

    if (isTasker) {
      baseTabs.push({
        label: "Reviews",
        value: "reviews",
        render: () => <Reviews task={task} />,
      });
    }

    return baseTabs;
  }, [task.id, task.offers, task.offer_count, questions, isTasker, task]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <PosterInfo task={task} handleOptionSelect={onOptionSelect} />
      <DescriptionSection description={task.description} />
      <ImagesSection images={task.images} />

      <section>
        <CustomTab items={tabs} />
      </section>
    </div>
  );
};

"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Share, Flag, Bookmark, ArrowLeft } from "lucide-react";
import ShareTaskModal from "../Modals/ShareTaskModal";
import ImageGallery from "../Modals/ImageGalleryModal/ImageGallery";
import CustomTab from "@/components/reusables/CustomTab";
import Offer from "../Offer";
import PosterInfo from "./PosterInfo";
import useModal from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTaskDetails, setUserTaskOffer } from "@/store/slices/task";
import {
  useFetchTaskById,
  useFetchTaskQuestion,
} from "@/services/tasks/tasks.hook";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomDropdown from "@/components/reusables/CustomDropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Questions from "@/components/shared/components/comment/Questions";
import TaskDetailSkeleton from "@/components/skeletons/TaskDetailSkeleton";

interface TaskDetailsProps {
  back: string;
}

const TaskHeader = ({
  back,
  onShare,
  onReport,
  onBookmark,
}: {
  back: string;
  onShare: () => void;
  onReport: () => void;
  onBookmark: () => void;
}) => {
  const headerActions = [
    { icon: Share, label: "Share task", action: onShare },
    { icon: Flag, label: "Report task", action: onReport },
    { icon: Bookmark, label: "Save task", action: onBookmark },
  ];

  return (
    <div className="sticky top-0 z-20 bg-background border-b border-border-light">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">
        {/* Back Button */}
        <Link
          href={back}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden md:inline font-medium">Back to Map</span>
          <span className="md:hidden font-medium">Back</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-1">
          {headerActions.map(({ icon: Icon, label, action }) => (
            <Button
              key={label}
              variant="ghost"
              size="sm"
              onClick={action}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <CustomDropdown>
            {headerActions.map(({ icon: Icon, label, action }) => (
              <DropdownMenuItem
                key={label}
                onClick={action}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </DropdownMenuItem>
            ))}
          </CustomDropdown>
        </div>
      </div>
    </div>
  );
};

const TaskContent = ({ task }: { task: ITask }) => {
  const { data } = useFetchTaskQuestion(task.id);
  const questions = data?.data?.data || [];

  const tabs = [
    {
      label: `Offers (${task.offer_count || 0})`,
      value: "offers",
      render: () => <Offer offers={task.offers} />,
    },
    {
      label: `Questions (${questions.length || 0})`,
      value: "questions",
      render: () => <Questions questions={questions} taskId={task.id} />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Poster Information */}
      <PosterInfo task={task} />

      {/* Description Section */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
          Description
        </h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
            {task.description}
          </p>
        </div>
      </section>

      {/* Images Section */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
          Pictures
        </h2>
        {task.images?.length > 0 ? (
          <ImageGallery images={task.images} />
        ) : (
          <div className="p-6 text-center bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-text-muted">No images available for this task</p>
          </div>
        )}
      </section>

      {/* Tabs Section */}
      <section>
        <CustomTab items={tabs} />
      </section>
    </div>
  );
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ back }) => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useFetchTaskById({ id });
  const task = data?.data as ITask;

  const shareModal = useModal();

  // Set task details in Redux when task loads
  useEffect(() => {
    if (!task) return;

    dispatch(setTaskDetails(task));

    const userOffer = task.offers.find((offer) => offer.tasker.id === user?.id);
    dispatch(setUserTaskOffer(userOffer ?? null));
  }, [task, user?.id, dispatch]);

  const handleReport = () => {
    // Implement report functionality
    console.log("Report task");
  };

  const handleBookmark = () => {
    // Implement bookmark functionality
    console.log("Bookmark task");
  };

  if (isLoading) {
    return <TaskDetailSkeleton />;
  }

  return (
    <>
      <Card className="overflow-hidden">
        <TaskHeader
          back={back}
          onShare={shareModal.openModal}
          onReport={handleReport}
          onBookmark={handleBookmark}
        />
        <TaskContent task={task} />
      </Card>

      <ShareTaskModal
        open={shareModal.isOpen}
        onClose={shareModal.closeModal}
        taskId={id}
      />
    </>
  );
};

export default TaskDetails;

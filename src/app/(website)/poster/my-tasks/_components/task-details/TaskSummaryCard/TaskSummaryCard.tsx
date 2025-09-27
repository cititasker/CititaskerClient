"use client";

import { Card, CardContent } from "@/components/ui/card";
import useModal from "@/hooks/useModal";
import CancelTaskModal from "../CancelTaskModal";
import TaskStatsRow from "./TaskStatsRow";

import { useTaskHelpers } from "./hooks/useTaskHelpers";
import TaskHeader from "./TaskHeader";
import TaskImageGallery from "./TaskImageGallery";
import TaskInfoGrid from "./TaskInfoGrid";
import TaskFooterActions from "./TaskFooterActions";

interface Props {
  task: ITask;
  onEditDate?: () => void;
  onEditPrice?: () => void;
  onPrimaryAction: () => void;
  buttonText?: string | null;
  showViewButton?: boolean;
  onViewTask?: () => void;
}

export default function TaskSummaryCard({
  task,
  onEditDate,
  onEditPrice,
  onPrimaryAction,
  buttonText,
  showViewButton = false,
  onViewTask,
}: Props) {
  const cancelTask = useModal();
  const helpers = useTaskHelpers(task);

  return (
    <>
      <Card className="shadow-sm border-border-light hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 pb-4">
            <TaskHeader task={task} statusBadge={helpers.getStatusBadge()} />
            {task.description && (
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {task.description}
              </p>
            )}
            <TaskStatsRow
              offerCount={task.offer_count}
              taskId={task.id}
              createdAt={helpers.createdAt}
            />
          </div>

          <TaskImageGallery images={task.images} />

          <TaskInfoGrid
            task={task}
            canEdit={helpers.canEdit}
            onEditDate={onEditDate}
            onEditPrice={onEditPrice}
            formattedDate={helpers.formattedDate}
            locationDisplay={helpers.getLocationDisplay()}
            timeDisplay={helpers.getTimeDisplay()}
          />

          <TaskFooterActions
            task={task}
            buttonText={buttonText}
            onPrimaryAction={onPrimaryAction}
            showViewButton={showViewButton}
            onViewTask={onViewTask}
            onSelectOption={() => cancelTask.openModal()}
          />
        </CardContent>
      </Card>

      <CancelTaskModal
        isOpen={cancelTask.isOpen}
        onClose={cancelTask.setIsOpen}
      />
    </>
  );
}

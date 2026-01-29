"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTaskHelpers } from "./hooks/useTaskHelpers";
import TaskHeader from "./TaskHeader";
import TaskInfoGrid from "./TaskInfoGrid";
import TaskFooterActions from "./TaskFooterActions";
import ImageGallery from "@/components/browseTask/Modals/ImageGalleryModal/ImageGallery";

interface Props {
  task: ITask;
  onEditDate?: () => void;
  onEditPrice?: () => void;
  onPrimaryAction: () => void;
  handleSelectedOption: (opt: MoreOptionItem) => void;

  buttonText?: string | null;
  showViewButton?: boolean;
  onViewTask?: () => void;
  disabledButtonText?: boolean;
}

export default function TaskSummaryCard({
  task,
  onEditDate,
  onEditPrice,
  onPrimaryAction,
  handleSelectedOption,
  buttonText,
  showViewButton = false,
  onViewTask,
  disabledButtonText,
}: Props) {
  const helpers = useTaskHelpers(task);

  return (
    <>
      <Card className="shadow-none sm:shadow-sm sm:border-border-light overflow-hidden rounded-none sm:rounded-xl bg-transparent sm:bg-white">
        <CardContent className="p-0 sm:p-5 space-y-6">
          <div>
            <TaskHeader task={task} />
            {task.description && (
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                {task.description}
              </p>
            )}
          </div>

          {task.images.length ? (
            <ImageGallery
              images={task.images}
              columns={4}
              aspectRatio="square"
              showCounter
            />
          ) : null}

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
            onSelectOption={handleSelectedOption}
            disabledButtonText={disabledButtonText}
          />
        </CardContent>
      </Card>
    </>
  );
}

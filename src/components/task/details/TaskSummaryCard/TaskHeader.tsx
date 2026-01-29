import React from "react";
import TaskStatusBadges from "./TaskStatusBadges";

interface Props {
  task: ITask;
}

export default function TaskHeader({ task }: Props) {
  return (
    <div className="mb-3">
      <TaskStatusBadges
        status={task.status}
        category={task.category?.name}
        subCategory={task.sub_category?.name}
        locationType={task.location_type}
      />

      <h2 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight line-clamp-2">
        {task.name}
      </h2>
    </div>
  );
}

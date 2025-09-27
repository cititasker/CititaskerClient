import React from "react";
import TaskStatusBadges from "./TaskStatusBadges";

interface Props {
  task: ITask;
  statusBadge: {
    label: string;
    variant: "default" | "outline" | "destructive" | "secondary";
  };
}

export default function TaskHeader({ task, statusBadge }: Props) {
  return (
    <div className="mb-4">
      <TaskStatusBadges
        statusBadge={statusBadge}
        category={task.category?.name}
        subCategory={task.sub_category?.name}
        locationType={task.location_type}
      />

      <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 leading-tight line-clamp-2">
        {task.name}
      </h2>
    </div>
  );
}

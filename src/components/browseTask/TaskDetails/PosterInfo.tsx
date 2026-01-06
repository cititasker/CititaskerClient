"use client";

import React, { useMemo } from "react";
import { FORMATTED_OPTIONS, TASK_STATUS } from "@/constant";
import { defaultProfile } from "@/constant/images";
import {
  cn,
  formatDate,
  formatDateAgo,
  initializeName,
  truncate,
} from "@/utils";
import TaskBudget from "./TaskBudget";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Clock, History, MapPin } from "lucide-react";

interface PosterInfoProps {
  task: ITask;
  handleOptionSelect: (action: MoreOptionItem) => void;
}

const PosterAvatar = ({
  image,
  name,
  className,
}: {
  image: string | null;
  name: string;
  className?: string;
}) => (
  <div className={cn("flex-shrink-0 text-center space-y-2", className)}>
    <div className="relative">
      <Image
        src={image ?? defaultProfile}
        alt={`${name}'s profile`}
        width={72}
        height={72}
        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-neutral-200"
      />
      {/* Online status indicator could go here if needed */}
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium text-text-muted">Posted by</p>
      <p className="text-sm font-medium text-text-primary">{name}</p>
    </div>
  </div>
);

const TaskDetails = ({ task }: { task: ITask }) => {
  const dueTime = FORMATTED_OPTIONS.find((el) => el.id == task?.time);

  const infoItems = [
    {
      icon: Calendar,
      label: "Due Date",
      value: formatDate(task.date),
    },
    {
      icon: Clock,
      label: "Time",
      value: `${dueTime?.name} (${dueTime?.description})`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: truncate(task.address, 25),
    },
    {
      icon: History,
      label: "Posted",
      value: formatDateAgo(task?.created_at),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-2">
        {task.name}
      </h1>
      <div className="grid grid-cols-1 gap-3">
        {infoItems.map(({ icon: Icon, label, value }, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-1 text-text-muted">
              <Icon className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-text-muted">{label}</p>
              <p className="text-sm text-text-primary">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PosterInfo: React.FC<PosterInfoProps> = ({
  task,
  handleOptionSelect,
}) => {
  const posterName = useMemo(
    () =>
      task.poster?.profile
        ? initializeName(task.poster.profile)
        : "Anonymous User",
    [task.poster?.profile]
  );

  return (
    <div className="flex gap-7 mb-6 sm:mb-12">
      {/* Avatar for large screen */}
      <PosterAvatar
        image={task?.poster_profile_image}
        name={posterName}
        className="hidden lg:inline-block"
      />

      {/* Main Info */}
      <div className="flex-1 space-y-5">
        {/* Status Chips */}
        <div className="flex gap-2">
          {Object.keys(TASK_STATUS).map((status) => (
            <Badge
              key={status}
              variant="outline"
              className={cn(
                "px-3 py-1.5 text-xs capitalize transition-colors",
                "bg-neutral-100 text-text-secondary border-neutral-200",
                task.status == status && "bg-light-primary-2 text-black"
              )}
            >
              {status}
            </Badge>
          ))}
        </div>

        {/* Name + Info + Budget */}
        <div className="flex justify-between gap-5 items-start">
          <div className="flex gap-5 items-start flex-col lg:flex-row">
            {/* Avatar for small screen */}
            <PosterAvatar
              image={task?.poster_profile_image}
              name={posterName}
              className="lg:hidden"
            />

            {/* Task details - visible based on screen size */}
            <div className="w-full hidden sm:block">
              <TaskDetails task={task} />
            </div>
          </div>
          <TaskBudget task={task} handleOptionSelect={handleOptionSelect} />
        </div>

        {/* Task details for small screens */}
        <div className="md:max-w-[250px] sm:hidden">
          <TaskDetails task={task} />
        </div>
      </div>
    </div>
  );
};

export default PosterInfo;

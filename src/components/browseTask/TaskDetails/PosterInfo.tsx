"use client";

import React from "react";
import { ROLE } from "@/constant";
import { defaultProfile } from "@/constant/images";
import {
  cn,
  convertDate,
  formatDateAgo,
  initializeName,
  truncate,
} from "@/utils";
import Icons from "@/components/Icons";
import TaskBudget from "./TaskBudget";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PosterInfoProps {
  task: ITask;
}

const STATUS_COLORS: Record<string, string> = {
  open: "bg-light-primary-2 text-black",
  assigned: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const PosterAvatar = ({
  image,
  name,
  className,
}: {
  image: string | null;
  name: string;
  className?: string;
}) => (
  <div className={cn("shrink-0 text-center", className)}>
    <Image
      src={image ?? defaultProfile}
      alt={ROLE.poster}
      width={60}
      height={60}
      className="w-[70px] h-[70px] sm:w-[60px] sm:h-[60px] mx-auto rounded-full object-cover"
    />
    <p className="text-black-2 text-xs font-semibold mt-2">Posted by</p>
    <p className="text-dark-grey-2 text-xs">{name}</p>
  </div>
);

const TaskDetails = ({ task }: { task: ITask }) => {
  const infoItems = [
    {
      icon: <Icons.distance width={20} height={20} />,
      label: "Location",
      value: truncate(task.address, 20),
    },
    {
      icon: <Icons.calendar width={18} height={18} />,
      label: "Due Date",
      value: convertDate(task.date, "MMM DD, YYYY"),
    },
    {
      icon: <Icons.avTimer />,
      label: "Posted",
      value: formatDateAgo(task.created_at),
    },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-black-2">{task.name}</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
        {infoItems.map(({ icon, label, value }, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="pt-0.5">{icon}</span>
            <div>
              <p className="text-black-2 text-xs font-semibold">{label}</p>
              <p className="text-dark-grey-2 text-xs">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PosterInfo: React.FC<PosterInfoProps> = ({ task }) => {
  const posterName = initializeName(task.poster?.profile);

  return (
    <div className="flex gap-7 mb-12">
      {/* Avatar for large screen */}
      <PosterAvatar
        image={task.poster_profile_image}
        name={posterName}
        className="hidden lg:inline-block"
      />

      {/* Main Info */}
      <div className="flex-1 space-y-5">
        {/* Status Chips */}
        <div className="flex gap-2">
          {Object.keys(STATUS_COLORS).map((status) => (
            <Badge
              key={status}
              variant="outline"
              className={cn(
                "text-xs px-[14px] py-[7px] capitalize",
                STATUS_COLORS[status],
                task.status !== status && "bg-light-grey text-black-2"
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
              image={task.poster_profile_image}
              name={posterName}
              className="lg:hidden"
            />

            {/* Task details - visible based on screen size */}
            <div className="max-w-[250px] hidden sm:inline-block">
              <TaskDetails task={task} />
            </div>
          </div>

          <TaskBudget task={task} />
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

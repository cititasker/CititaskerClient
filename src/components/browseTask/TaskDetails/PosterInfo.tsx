"use client";
import React from "react";
import Image from "next/image";
import { Chip } from "@mui/material";
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

interface PosterInfoProps {
  task: ITask;
  hasMadeOffer: boolean;
}

const PosterInfo: React.FC<PosterInfoProps> = ({ task, hasMadeOffer }) => {
  return (
    <div className="flex gap-7 mb-[48px]">
      <div className="shrink-0">
        <Image
          src={task.poster_profile_image ?? defaultProfile}
          alt={ROLE.poster}
          width={60}
          height={60}
          className="rounded-full object-cover shrink-0 w-[60px] h-[60px]"
        />
        <div className="text-center mt-2">
          <p className="text-black-2 text-xs font-semibold mb-1">Posted by</p>
          <p className="text-dark-grey-2 text-xs">
            {initializeName(task.poster?.profile)}
          </p>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex gap-3 mb-5">
          {["open", "assigned", "completed"].map((status) => (
            <Chip
              key={status}
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              className={cn(
                "text-xs h-[26px] font-normal",
                task.status === status ? "bg-light-primary-2" : "bg-light-grey"
              )}
            />
          ))}
        </div>

        <div className="flex justify-between gap-5">
          <div className="max-w-[250px]">
            <h1 className="text-2xl font-semibold text-black-2">{task.name}</h1>
            <div className="mt-5 flex flex-col gap-4">
              {[
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
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <p className="text-black-2 text-xs font-semibold mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-dark-grey-2 text-xs">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TaskBudget task={task} hasMadeOffer={hasMadeOffer} />
        </div>
      </div>
    </div>
  );
};

export default PosterInfo;

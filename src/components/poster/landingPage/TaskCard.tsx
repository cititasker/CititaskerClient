"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import Location from "@/../public/icons/location.svg?url";
import Database from "@/../public/icons/database.svg?url";
import { formatCurrency, truncate } from "@/utils/index";
import Link from "next/link";
import { MdBookmarkBorder } from "react-icons/md";
import StatusBadge from "@/components/reusables/StatusBadge";
import { ROUTES } from "@/constant";
import { PLACEHOLDER } from "@/constant/images";

interface IProps {
  data: ITask;
}
const TaskCard = ({ data }: IProps) => {
  return (
    <div className="inline-block overflow-hidden min-h-[8.5rem] min-w-[17.25rem] w-full">
      <div className="relative h-44 w-full rounded-20 overflow-hidden">
        <Link href={`/tasks/${data.id}`} className="block w-full h-full">
          <Image
            src={data.images?.[0] ?? PLACEHOLDER}
            alt=""
            width={200}
            height={176}
            className="h-full w-full object-cover hover:opacity-[0.8]"
          />
        </Link>

        <StatusBadge status="open" className="absolute top-3 left-3" />
        <div className="cursor-pointer w-7 h-7 rounded-full flex items-center justify-center absolute top-3 right-3 bg-[rgba(2,22,55,0.25)]">
          <MdBookmarkBorder className="text-white text-lg" />
        </div>
      </div>
      <Link href={`${ROUTES.BROWSE_TASK}/${data.id}`} className="mt-4 block">
        <div className="flex justify-between gap-2">
          <p className="text-base font-semibold leading-normal text-dark-secondary">
            {data.name}
          </p>

          <div className="flex items-center gap-1">
            <FaStar className="text-base text-yellow-state-color" />
            <span className="text-sm ">{4.5}</span>
            <span className="text-dark-grey-2 text-sm">({120})</span>
          </div>
        </div>
        <p className="text-sm my-4 font-normal leading-normal">
          {truncate(data.description, 70)}
        </p>
        <div className="flex items-center text-dark-grey-2 text-sm leading-normal mb-3">
          <Image src={Database} alt="" className="mr-2.5" />
          {formatCurrency({ value: data.budget })}
        </div>
        <div className="flex items-center text-dark-grey-2 text-sm leading-normal">
          <Image src={Location} alt="" className="mr-2.5" />{" "}
          {data.location_type}
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;

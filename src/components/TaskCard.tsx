"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { formatDate, truncate, formatCurrency } from "@/utils";
import { defaultProfile } from "@/constant/images";
import StatusChip from "./reusables/StatusChip";
import Icons from "./Icons";

interface IProps {
  item: ITask;
  path: string;
  isActive?: boolean;
}

const TaskCard = ({ item, path }: IProps) => {
  const params = useParams();
  const currentTaskId = params?.id;
  const searchParams = useSearchParams();

  const isActive = item.id === Number(currentTaskId);
  const status = searchParams.get("status");

  const href = useMemo(() => {
    const sp = new URLSearchParams();
    if (status) sp.set("status", status);
    return `${path}/${item.id}?${sp.toString()}`;
  }, [path, item.id, status]);

  return (
    <Link
      href={href}
      scroll={false}
      className={`block cursor-pointer p-4 rounded-[10px] lg:rounded-[25px] transition-shadow duration-200 ${
        isActive
          ? "bg-light-primary-1 border border-light-primary-2 shadow-sm"
          : "bg-white border border-transparent hover:shadow-md"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Header with avatar and status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col items-center">
          <Image
            src={item.poster_profile_image ?? defaultProfile}
            alt="Task poster"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover rounded-full mb-1"
          />
          <StatusChip status={item.status} isActive={isActive} />
        </div>
        {item.budget && (
          <p className="text-primary text-[20px] font-semibold">
            {formatCurrency({ value: item.budget, noFraction: true })}
          </p>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-base mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600">{truncate(item.description, 60)}</p>

      {/* Details */}
      <div className="mt-4 space-y-3 text-sm text-dark-grey-2">
        <div className="flex gap-2 items-center">
          <Icons.calendar className="shrink-0" />
          <span>On {formatDate(item.date, "D, MMMM YYYY")}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Icons.distance className="shrink-0" />
          <span>
            {item.location_type === "in_person" ? "Offline" : "Online"} –{" "}
            {truncate(item.address, 20)}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Icons.group className="shrink-0" />
          <span>
            {item.offer_count} Offer{item.offer_count !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;

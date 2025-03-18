"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Icons from "../Icons";
import { formatDate, truncate, formatCurrency } from "@/utils";
import { defaultProfile } from "@/constant/images";
import StatusChip from "../reusables/StatusChip";

interface IProps {
  item: ITask;
  path: string;
}

const TaskCard = ({ item, path }: IProps) => {
  const { id } = useParams();

  return (
    <Link
      href={`/${path}/${item.id}`}
      className={`paper cursor-pointer p-4 rounded-[10px] lg:rounded-[25px] ${
        item.id === Number(id)
          ? "bg-light-primary-1 border border-light-primary-2"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between w-full items-center">
        <div>
          <div className="w-12 h-12 grow-0 rounded-full mb-2">
            <Image
              src={item.poster_profile_image ?? defaultProfile}
              alt="avatar"
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
          <StatusChip status={item.status} />
        </div>
        {item.budget && (
          <div className="flex gap-4 items-center">
            <p className="text-primary text-[20px] font-semibold">
              {formatCurrency({ value: item.budget, noFraction: true })}
            </p>
          </div>
        )}
      </div>

      <p className="font-[600] text-base mt-4">{item.name}</p>
      <p className="font-[400] text-[12px] mt-1">
        {truncate(item.description, 50)}
      </p>

      <div className="flex gap-4 items-center mt-[22px]">
        <Icons.calendar className="shrink-0" />
        <p className="text-dark-grey-2 text-[14px] font-[400]">
          On {formatDate(item.date, "D, MMMM YYYY")}
        </p>
      </div>

      <div className="flex gap-4 items-center mt-[12px]">
        <Icons.distance className="shrink-0" />
        <p className="text-dark-grey-2 text-[14px] font-[400]">
          {`${
            item.location_type == "in_person" ? "Offline" : "Online"
          } ${truncate(item.address, 20)}`}
        </p>
      </div>

      <div className="flex gap-4 items-center mt-[12px]">
        <Icons.group className="shrink-0" />
        <p className="text-dark-grey-2 text-[14px] font-[400]">
          {item.offer_count} Offers
        </p>
      </div>
    </Link>
  );
};

export default TaskCard;

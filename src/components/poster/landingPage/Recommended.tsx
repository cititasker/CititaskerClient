"use client";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import TaskCard from "./TaskCard";
import Link from "next/link";
import { ROUTES } from "@/constant";
import { useGetAllTasks } from "@/services/tasks/tasks.hook";

const Recommended = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllTasks();
  const tasks = data?.pages.flatMap((page) => page.data?.data || []) || [];

  return (
    <div className="container mb-[3.75rem]">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl font-semibold leading-normal">
          Recommended for you
        </h2>
        <Link
          href={ROUTES.BROWSE_TASK}
          className="text-primary text-base flex items-center"
        >
          See All
          <HiOutlineChevronRight className="ml-1.5 text-primary text-lg" />
        </Link>
      </div>
      <div className="w-full overflow-x-auto flex gap-8 hide-scrollbar">
        {tasks.map((el, i) => (
          <TaskCard key={i} data={el} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;

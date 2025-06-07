"use client";
import React, { useEffect, useRef } from "react";
import TaskCard from "../TaskCard";
import { useGetAllTasks } from "@/services/tasks/tasks.hook";

export default function TaskList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllTasks();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const tasks = data?.pages.flatMap((page) => page.data?.data || []) || [];

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const loadingMessage = isLoading
    ? "Loading tasks..."
    : isFetchingNextPage
    ? "Loading more tasks..."
    : null;

  return (
    <div className="relative">
      {loadingMessage && (
        //   <div className="sticky top-0 z-10 bg-primary text-white text-sm h-9 w-9 flex items-center justify-center rounded-full text-center mx-auto mt-2 shadow">
        //   <LuLoaderCircle size={26} className="animate-spin" />
        // </div>
        <div className="sticky top-0 z-10 bg-primary text-white text-sm py-2 px-4 rounded-lg text-center w-fit mx-auto mt-2 shadow">
          {loadingMessage}
        </div>
      )}

      <div className="grid gap-3 pb-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} item={task} path="/browse-task" />
        ))}
        <div ref={observerRef} className="h-1" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import TaskCard from "../TaskCard";
import TaskCardSkeleton from "../skeletons/TaskCardSkeleton";
import { useGetAllTasks } from "@/services/tasks/tasks.hook";
import { LuLoaderCircle } from "react-icons/lu";
import FormButton from "../forms/FormButton";
import { ROUTES } from "@/constant";

export default function TaskList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllTasks();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const tasks = data?.pages.flatMap((page) => page.data?.data || []) || [];

  useEffect(() => {
    const el = observerRef.current;
    if (!el || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchNextPage(),
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => <TaskCardSkeleton key={i} />);

  const renderEmpty = () => (
    <div className="text-center text-primary px-4 py-10 bg-white rounded-lg">
      <p className="text-base mb-4">
        No tasks found. Be the first to post one!
      </p>
      <FormButton
        text="Post a task"
        size="lg"
        className="min-w-40 text-sm font-medium mx-auto"
        href={ROUTES.POST_TASK}
      />
    </div>
  );

  // const loadingMessage = isFetchingNextPage ? "Loading more tasks..." : null;

  return (
    <div className="relative pb-5">
      {isFetchingNextPage && (
        <div className="sticky top-0 z-10 bg-primary text-white text-sm h-9 w-9 flex items-center justify-center rounded-full text-center mx-auto mt-2 shadow">
          <LuLoaderCircle size={26} className="animate-spin" />
        </div>
        // <div className="sticky top-0 z-10 bg-primary text-white text-sm py-2 px-4 rounded-lg text-center w-fit mx-auto mt-2 shadow">
        //   {loadingMessage}
        // </div>
      )}
      {isLoading && renderSkeletons()}

      {!isLoading && tasks.length === 0 && renderEmpty()}

      <div className="grid gap-4">
        {!isLoading &&
          tasks.map((task) => (
            <TaskCard key={task.id} item={task} path="/browse-task" />
          ))}
      </div>

      {/* Observer target for infinite scroll */}
      <div ref={observerRef} className="h-1" />

      {/* Skeleton for fetching more */}
      {isFetchingNextPage && renderSkeletons()}
    </div>
  );
}

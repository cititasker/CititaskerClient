"use client";

import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hook";
import { useGetUserTasks } from "@/services/tasks/tasks.hook";
import { ROUTES } from "@/constant";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "../skeletons/TaskCardSkeleton";
import FormButton from "@/components/forms/FormButton";

const TaskList = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading, isPending } = useGetUserTasks({ status });

  const isLoadingTasks = isLoading || isPending;
  const tasks: ITask[] = data?.data?.data || [];

  const renderLoading = () => (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center text-primary px-4 py-10 bg-white rounded-lg h-full">
      <p className="mb-4 text-base">
        {status === "all"
          ? "You haven’t posted any tasks yet."
          : `You do not have any ${status} tasks.`}
      </p>
      <FormButton
        text="Post a task"
        className="min-h-[39px] min-w-40 text-sm font-medium mx-auto"
        href={ROUTES.POST_TASK}
      />
    </div>
  );

  const renderTasks = () => (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          item={task}
          path={`/${user.role}${ROUTES.MY_TASKS}`}
        />
      ))}
    </div>
  );

  return isLoadingTasks
    ? renderLoading()
    : tasks.length === 0
    ? renderEmptyState()
    : renderTasks();
};

export default TaskList;

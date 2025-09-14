import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LoadingState } from "../../browseTask/LoadingState";
import InfiniteTaskList from "./InfiniteTaskList";

const TaskMap = dynamic(
  () =>
    import("@/components/browseTask/TaskMap").then((mod) => ({
      default: mod.TaskMap,
    })),
  { ssr: false, loading: () => <LoadingState /> }
);

interface MyTaskContentProps {
  tasks: any[];
  isLoading: boolean;
  fetchNextPage: any;
  hasNextPage: any;
  isFetchingNextPage: any;
  path: string;
}

export function MyTaskContent({
  tasks,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  path,
}: MyTaskContentProps) {
  return (
    <div className="flex gap-6 h-full">
      {/* Mobile Task List */}
      <div className="w-full md:hidden h-full overflow-y-auto">
        <InfiniteTaskList
          tasks={tasks}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          path={path}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6 w-full h-full">
        {/* Map View */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex-1 h-full"
        >
          {isLoading ? <LoadingState /> : <TaskMap tasks={tasks} />}
        </motion.div>
      </div>
    </div>
  );
}

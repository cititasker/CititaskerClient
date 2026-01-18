import { TaskGrid } from "./TaskGrid";

interface TaskListProps {
  tasks: ITask[];
  path?: string;
}

export default function TaskCardList({
  tasks,
  path = "/tasks",
}: TaskListProps) {
  return (
    <div className="space-y-6">
      <TaskGrid tasks={tasks} path={path} />
    </div>
  );
}

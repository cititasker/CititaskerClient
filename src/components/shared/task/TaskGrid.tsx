import TaskCard from "./TaskCard";

interface TaskGridProps {
  tasks: ITask[];
  path: string;
}

export function TaskGrid({ tasks, path }: TaskGridProps) {
  return (
    <div className="grid gap-4 md:gap-6 px-1">
      {tasks.map((task) => (
        <TaskCard key={task.id} item={task} path={path} />
      ))}
    </div>
  );
}

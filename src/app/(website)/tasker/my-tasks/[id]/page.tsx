import TaskDetails from "@/components/browseTask/TaskDetails";
import { getSingleTask } from "@/services/task";
import { queryClient } from "@/providers/ServerProvider";
import { API_ROUTES } from "@/constant";
import { getUserTaskById } from "@/services/tasks/tasks.api";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const { data: task } = await getSingleTask(id);

  return {
    title: task.name,
    description: task.description,
    openGraph: {
      title: task.name,
      description: task.description,
      images: task.image,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: [API_ROUTES.GET_TASK_BY_ID, id],
    queryFn: () => getUserTaskById(id),
  });
  return <TaskDetails back="/tasker/my-tasks" />;
}

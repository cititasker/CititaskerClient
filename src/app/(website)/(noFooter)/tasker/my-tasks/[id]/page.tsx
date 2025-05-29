import TaskDetails from "@/components/browseTask/TaskDetails";
import { getSingleTaskQuery } from "@/queries/task";
import { getSingleTask } from "@/services/task";
import { queryClient } from "@/providers/ServerProvider";

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
  await queryClient.prefetchQuery(getSingleTaskQuery(id));
  return <TaskDetails />;
}

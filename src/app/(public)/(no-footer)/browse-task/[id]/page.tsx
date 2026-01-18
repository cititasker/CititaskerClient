// app/browse-task/[id]/page.tsx
import TaskDetails from "@/components/browseTask/TaskDetails";
import { API_ROUTES, ROUTES } from "@/constant";
import { getSingleTask } from "@/services/task";
import { getTaskById } from "@/services/tasks/tasks.api";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/constant/queryClient";

export async function generateMetadata({
  params,
}: PageProps<"/browse-task/[id]">): Promise<Metadata> {
  const id = (await params).id;
  const data = await getSingleTask(id);

  const task = data.data;

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

export default async function TaskDetailPage({
  params,
}: PageProps<"/browse-task/[id]">) {
  const { id } = await params;
  const queryClient = getQueryClient();
  const taskId = String(id);

  // Now prefetch
  await queryClient.prefetchQuery({
    queryKey: [API_ROUTES.TASKS, taskId],
    queryFn: () => getTaskById(taskId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TaskDetails back={ROUTES.BROWSE_TASK} />
    </HydrationBoundary>
  );
}

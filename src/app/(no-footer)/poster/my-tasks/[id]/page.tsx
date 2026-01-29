import TaskDetailsClient from "@/components/myTasks/TaskDetailsClient";
import { getQueryClient } from "@/constant/queryClient";
import { API_ROUTES } from "@/constant";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserTaskById } from "@/services/tasks/tasks.api";

export default async function TaskDetailsPage({
  params,
}: PageProps<"/poster/my-tasks/[id]">) {
  const { id } = await params;
  const queryClient = getQueryClient();

  // Now prefetch
  await queryClient.prefetchQuery({
    queryKey: [API_ROUTES.USER_TASKS, id],
    queryFn: () => getUserTaskById(id),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <TaskDetailsClient taskId={id} />
    </HydrationBoundary>
  );
}

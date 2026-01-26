import { BrowseTasklayout } from "@/components/layouts/BrowseTasklayout";
import { API_ROUTES } from "@/constant";
import { getQueryClient } from "@/constant/queryClient";
import { getAllTasks } from "@/services/tasks/tasks.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function BrowseTaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: getAllTasks,
    queryKey: [API_ROUTES.TASKS],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrowseTasklayout>{children}</BrowseTasklayout>
    </HydrationBoundary>
  );
}

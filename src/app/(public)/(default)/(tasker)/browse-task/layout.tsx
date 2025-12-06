import BrowseTasklayout from "@/components/layouts/BrowseTasklayout";
import { API_ROUTES } from "@/constant";
import { getQueryClient } from "@/constant/queryClient";
import { getAllTasks } from "@/services/tasks/tasks.api";

export default async function BrowseTaskRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryFn: getAllTasks,
    queryKey: [API_ROUTES.TASKS],
  });
  return <BrowseTasklayout>{children}</BrowseTasklayout>;
}

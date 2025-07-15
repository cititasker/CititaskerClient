import BrowseTasklayout from "@/components/layouts/BrowseTasklayout";
import { queryClient } from "@/providers/ServerProvider";
import { getAllTasksQuery } from "@/queries/task";

export default async function BrowseTaskRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await queryClient.prefetchQuery(getAllTasksQuery());
  return <BrowseTasklayout>{children}</BrowseTasklayout>;
}

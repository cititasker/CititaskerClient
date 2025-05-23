import { getUserTasks } from "@/actions";
import { queryClient } from "@/providers/ServerProvider";
import { USER_TASKS } from "@/queries/queryKeys";
import MapWrapper from "@/components/browseTask/MapWrapper";

export default async function MyTasksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const status =
    typeof searchParams.status === "string" ? searchParams.status : "all";

  await queryClient.prefetchQuery({
    queryKey: USER_TASKS(status),
    queryFn: () => getUserTasks({ status }),
  });

  return <MapWrapper />;
}

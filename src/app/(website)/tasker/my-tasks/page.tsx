import { getUserTasks } from "@/actions";
import MapWrapper from "@/components/myTasks";
import { API_ROUTES } from "@/constant";
import { getQueryClient } from "@/constant/queryClient";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function MyTasksPage(props: {
  searchParams: SearchParams;
}) {
  const queryClient = getQueryClient();
  const searchParams = await props.searchParams;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : "all";

  await queryClient.prefetchQuery({
    queryKey: [API_ROUTES.USER_TASKS, status],
    queryFn: () => getUserTasks({ status }),
  });

  return <MapWrapper />;
}

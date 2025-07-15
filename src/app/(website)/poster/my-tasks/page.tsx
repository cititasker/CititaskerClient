import { getUserTasks } from "@/actions";
import MapWrapper from "@/components/browseTask/MapWrapper";
import MyTasksLayout from "@/components/layouts/MyTaskLayout";
import { queryClient } from "@/providers/ServerProvider";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const filter = [
  { href: "all", name: "All Tasks" },
  { href: "open", name: "Open Tasks" },
  { href: "assigned", name: "Assigned Tasks" },
  { href: "completed", name: "Completed Tasks" },
  { href: "expired", name: "Expired Tasks" },
];

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;

  console.log(query);

  await queryClient.prefetchQuery({
    queryKey: ["tasks/user"],
    queryFn: getUserTasks,
  });

  return (
    <MyTasksLayout filter={filter}>
      <MapWrapper />
    </MyTasksLayout>
  );
}

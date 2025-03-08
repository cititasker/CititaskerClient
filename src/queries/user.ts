import { getUserApi } from "@/services/user";
import { queryOptions } from "@tanstack/react-query";
import { USERS } from "./queryKeys";

export const getUserQuery = ({ enabled }: { enabled: boolean }) => {
  return queryOptions({
    queryKey: [USERS],
    queryFn: getUserApi,
    enabled,
  });
};

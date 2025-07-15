import { queryOptions } from "@tanstack/react-query";
import { API_ROUTES } from "@/constant";
import { getUserApi } from "@/services/user/users.api";

export const getUserQuery = ({ enabled }: { enabled: boolean }) => {
  return queryOptions({
    queryKey: [API_ROUTES.GET_USER_DETAILS],
    queryFn: getUserApi,
    enabled,
  });
};

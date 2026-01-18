import { API_ROUTES } from "@/constant";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getFaq,
  getUserApi,
  getUserPorfolio,
  getUserProfileDetails,
  loginUser,
  switchRoles,
} from "./users.api";
import { loginSchemaType } from "@/schema/auth";

type GetUserResponse = { data: IUser };

export const useLogin = (
  opt?: UseMutationOptions<ILoginRes, Error, loginSchemaType>
) => {
  return useMutation({
    mutationFn: loginUser,
    ...opt,
  });
};

export const useGetUser = (
  options?: Omit<
    UseQueryOptions<GetUserResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<GetUserResponse, Error>({
    queryKey: [API_ROUTES.GET_USER_DETAILS],
    queryFn: getUserApi,
    staleTime: 10 * 60 * 1000, // 10 minutes - data stays fresh
    gcTime: 30 * 60 * 1000, // 30 minutes - cache lifetime
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 2, // Retry failed requests
    ...options,
  });
};

export const useGetUserProfile = (
  data: { id: any },
  options?: UseQueryOptions<UserProfileRes, any>
) => {
  return useQuery<UserProfileRes, any>({
    queryKey: [API_ROUTES.GET_PROFILE_DETAILS, data.id],
    queryFn: () => getUserProfileDetails(data.id),
    enabled: !!data.id,
    ...options,
  });
};

export const useGetPorfolio = (
  data: { id: any },
  options?: UseQueryOptions<UserPorfolioRes, Error>
) => {
  return useQuery<UserPorfolioRes, Error>({
    queryKey: [API_ROUTES.GET_PORTFOLIO, data.id],
    queryFn: () => getUserPorfolio(data.id),
    enabled: !!data.id,
    ...options,
  });
};

export const useGetFaq = (
  data: { id: any },
  options?: UseQueryOptions<UserFaqResponse, Error>
) => {
  return useQuery<UserFaqResponse, Error>({
    queryKey: [API_ROUTES.GET_FAQ, data.id],
    queryFn: () => getFaq(data.id),
    enabled: !!data.id,
    ...options,
  });
};

export const useSwitchRole = (
  opt?: UseMutationOptions<ILoginRes, Error, { role: TRole }>
) => {
  return useMutation({
    mutationFn: switchRoles,
    ...opt,
  });
};

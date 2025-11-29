import { API_ROUTES } from "@/constant";
import api from "../apiService";
import { AxiosError } from "axios";
import {
  DashbordStatsT,
  ExpenseAnalysisT,
  GetDashboardPayloadT,
  PosterAmountSpentAnalysisT,
  RecentTaskT,
} from "./dashboard.types";

export function getDashboardStats({
  role,
  time_range,
}: GetDashboardPayloadT): Promise<DashbordStatsT> {
  return api
    .get(API_ROUTES.DASHBOARD_STATS(role), {
      params: { time_range },
    })
    .then((data) => data.data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getRecentTasks({
  role,
  params = {},
}: {
  role: TRole;
  params?: any;
}): Promise<ApiResponse<RecentTaskT[]>> {
  return api
    .get(API_ROUTES.RECENT_TASKS(role), {
      params: params,
    })
    .then((data) => data.data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getTransactionAnalysis({
  role,
  params = {},
}: {
  role: TRole;
  params?: { time_range?: string };
}): Promise<ApiResponse<ExpenseAnalysisT>> {
  const endpoint =
    role === "poster"
      ? API_ROUTES.POSTER_EXPENSE_ANALYSIS
      : API_ROUTES.TASKET_EARNING_ANALYSIS;

  return api
    .get(endpoint, {
      params: {
        ...params,
        ...(params.time_range && { "time-range": params.time_range }),
      },
    })
    .then((data) => data.data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

export function getMonthlyFinancialSummary({
  role,
  params = {},
}: {
  role: TRole;
  params?: { time_range?: string };
}): Promise<PosterAmountSpentAnalysisT[]> {
  return api
    .get(API_ROUTES.AMOUNT_ANALYSIS(role), {
      params: {
        ...params,
        ...(params.time_range && { "time-range": params.time_range }),
      },
    })
    .then((data) => data.data.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
}

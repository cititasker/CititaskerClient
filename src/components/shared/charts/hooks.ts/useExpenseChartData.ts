import {
  ExpenseAnalysisT,
  PosterExpenseAnalysisT,
  TaskerExpenseAnalysisT,
} from "@/services/dashboard/dashboard.types";
import { useMemo } from "react";

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const POSTER_CHART_CONFIG = {
  completed_payment: {
    label: "Completed",
    color: "#236F8E", // primary_color
  },
  secured_payment: {
    label: "Secured",
    color: "#F2AF42", // orange
  },
};

const TASKER_CHART_CONFIG = {
  completed_earnings: {
    label: "Completed",
    color: "#236F8E", // primary_color
  },
  pending_earnings: {
    label: "Pending",
    color: "#F2AF42", // orange
  },
};

export const useExpenseChartData = (
  data: ExpenseAnalysisT | null | undefined | any,
  role: "poster" | "tasker"
): { chartData: ChartData[]; total: number } => {
  return useMemo(() => {
    if (!data) {
      return { chartData: [], total: 0 };
    }

    if (role === "poster") {
      const posterData = data as PosterExpenseAnalysisT;
      return {
        chartData: [
          {
            id: "completed_payment",
            label: POSTER_CHART_CONFIG.completed_payment.label,
            value: posterData.completed_payment || 0,
            color: POSTER_CHART_CONFIG.completed_payment.color,
          },
          {
            id: "secured_payment",
            label: POSTER_CHART_CONFIG.secured_payment.label,
            value: posterData.secured_payment || 0,
            color: POSTER_CHART_CONFIG.secured_payment.color,
          },
        ],
        total: posterData.total_expenses || 0,
      };
    }

    // role === "tasker"
    const taskerData = data as TaskerExpenseAnalysisT;
    return {
      chartData: [
        {
          id: "completed_earnings",
          label: TASKER_CHART_CONFIG.completed_earnings.label,
          value: taskerData.completed_earnings || 0,
          color: TASKER_CHART_CONFIG.completed_earnings.color,
        },
        {
          id: "pending_earnings",
          label: TASKER_CHART_CONFIG.pending_earnings.label,
          value: taskerData.pending_earnings || 0,
          color: TASKER_CHART_CONFIG.pending_earnings.color,
        },
      ],
      total: taskerData.total_earnings || 0,
    };
  }, [data, role]);
};

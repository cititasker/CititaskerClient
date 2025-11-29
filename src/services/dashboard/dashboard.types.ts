export type DashboardStatItem = {
  title: string;
  value: number;
  percentage: number;
  trend: "up" | "down";
};

type StatsT = {
  count: number;
  percentage: number;
};
export type DashbordStatsT = {
  assigned_task: StatsT;
  completed_task: StatsT;
  open_task: StatsT;
};

export type GetDashboardPayloadT = {
  role: TRole;
  time_range: string;
};

type PosterTasksT = {
  address: string;
  date: string;
  id: 65;
  name: string;
  state: string;
  status: TaskStatusT;
  tasker: {
    id: number;
    profile: IUser;
  };
  time: TaskTimeT;
};

type TaskerTasksT = {
  address: string;
  date: string;
  id: 65;
  name: string;
  state: string;
  status: TaskStatusT;
  poster: {
    id: number;
    profile: IUser;
  };
  time: TaskTimeT;
};

export type RecentTaskT = PosterTasksT | TaskerTasksT;

export type PosterExpenseAnalysisT = {
  completed_payment: number;
  secured_payment: number;
  total_expenses: number;
};

export type TaskerExpenseAnalysisT = {
  completed_earnings: number;
  pending_earnings: number;
  total_earnings: number;
};

export type ExpenseAnalysisT = PosterExpenseAnalysisT | TaskerExpenseAnalysisT;

export type PosterAmountSpentAnalysisT = {
  month: string;
  amount: number;
};

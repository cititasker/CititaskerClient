export const TASK_FILTERS = [
  { value: "all", label: "All Tasks", count: 0 },
  { value: "open", label: "Open Tasks", count: 0 },
  { value: "assigned", label: "Assigned Tasks", count: 0 },
  { value: "completed", label: "Completed Tasks", count: 0 },
  { value: "expired", label: "Expired Tasks", count: 0 },
] as const;

export type TaskStatus = (typeof TASK_FILTERS)[number]["value"];

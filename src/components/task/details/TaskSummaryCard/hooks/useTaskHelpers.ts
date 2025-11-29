import { formatDate } from "@/utils";

export function useTaskHelpers(task: ITask) {
  const canEdit = task.status === "open";
  const hasImages = task.images && task.images.length > 0;

  const getStatusBadge = () => {
    const statusConfig = {
      open: { label: "Open", variant: "default" as const },
      assigned: { label: "Assigned", variant: "secondary" as const },
      in_progress: { label: "In Progress", variant: "outline" as const },
      completed: { label: "Completed", variant: "outline" as const },
      cancelled: { label: "Cancelled", variant: "destructive" as const },
      draft: { label: "Draft", variant: "secondary" as const },
    };

    return (
      statusConfig[task.status as keyof typeof statusConfig] || {
        label: task.status.charAt(0).toUpperCase() + task.status.slice(1),
        variant: "default" as const,
      }
    );
  };

  const getLocationDisplay = () => {
    if (task.address) return task.address;
    if (task.location?.length) return task.location.join(", ");
    return task.location_type === "online"
      ? "Online"
      : "Location not specified";
  };

  const getTimeDisplay = () => {
    const timeMapping: Record<string, string> = {
      morning: "Morning (Before 10 AM)",
      mid_day: "Mid Day (10 AM - 2 PM)",
      afternoon: "Afternoon (2 PM - 6 PM)",
      evening: "Evening (After 6 PM)",
    };
    return task.time ? timeMapping[task.time] || task.time : null;
  };

  return {
    canEdit,
    hasImages,
    getStatusBadge,
    getLocationDisplay,
    getTimeDisplay,
    formattedDate: formatDate(task.date),
    createdAt: formatDate(task.created_at, "MMM DD"),
  };
}

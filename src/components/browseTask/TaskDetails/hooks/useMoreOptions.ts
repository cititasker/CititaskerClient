import { Bell, Calendar, X } from "lucide-react";
import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { TaskState } from "../types";

interface MoreOptionItem {
  name: string;
  text: string;
  customIcon: LucideIcon;
  type?: "default" | "destructive";
}

type OptionKey = "reschedule" | "add-to-alert" | "cancel-task";

const OPTION_CONFIGS: Record<OptionKey, MoreOptionItem> = {
  reschedule: {
    name: "reschedule",
    text: "Reschedule task",
    customIcon: Calendar,
  },
  "add-to-alert": {
    name: "add-to-alert",
    text: "Add task to alert",
    customIcon: Bell,
  },
  "cancel-task": {
    name: "cancel-task",
    text: "Cancel task",
    type: "destructive",
    customIcon: X,
  },
} as const;

export const useMoreOptions = (state: TaskState): MoreOptionItem[] => {
  return useMemo(() => {
    const options: MoreOptionItem[] = [];

    if (state.canReschedule && !state.hasCompletedTask) {
      options.push(OPTION_CONFIGS.reschedule);
    }

    if (state.hasMadeOffer) {
      options.push(OPTION_CONFIGS["add-to-alert"]);
    }

    if (state.canCompleteTask) {
      options.push(OPTION_CONFIGS["cancel-task"]);
    }

    return options;
  }, [
    state.canReschedule,
    state.hasCompletedTask,
    state.hasMadeOffer,
    state.canCompleteTask,
  ]);
};

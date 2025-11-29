import { Calendar } from "lucide-react";
import { useMemo } from "react";
import { TaskState } from "../types";

export const useMoreOptions = (state: TaskState) => {
  return useMemo(() => {
    const options = [];

    if (state.canReschedule && !state.hasCompletedTask) {
      options.push({
        name: "reschedule",
        text: "Reschedule task",
        icon: Calendar,
      });
    }

    if (state.hasMadeOffer) {
      options.push({
        name: "add-to-alert",
        text: "Add task to alert",
      });
    }

    return options.filter(Boolean);
  }, [state]);
};

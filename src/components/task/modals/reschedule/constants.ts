import { Step1FieldNames } from "./RescheduleReject";
import { rescheduleTaskSchemaType } from "./schema";

export type RescheduleStep = "create" | "request" | "counter" | "success";

export const rescheduleFormDefaults = {
  proposed_date: "",
  proposed_time: "",
  showTimeOfDay: true,
};

export const fieldNames: Step1FieldNames<rescheduleTaskSchemaType> = {
  date: "proposed_date",
  time: "proposed_time",
  showTimeOfDay: "showTimeOfDay",
};

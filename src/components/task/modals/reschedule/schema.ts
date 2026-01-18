import { z } from "zod";

export const rescheduleTaskSchema = z
  .object({
    proposed_date: z.string().min(1, "Date is required"),
    proposed_time: z.string().optional(),
    showTimeOfDay: z.boolean(),
  })
  .refine(
    (data) => {
      return (
        !data.showTimeOfDay ||
        (data.proposed_time && data.proposed_time.trim() !== "")
      );
    },
    {
      path: ["proposed_time"],
      message: "Time is required when selecting a time slot",
    }
  );

export type rescheduleTaskSchemaType = z.infer<typeof rescheduleTaskSchema>;

import { z } from "zod";

const MAX_IMAGE_COUNT = 3;

// Dispute Form Schema (for creating disputes - poster side)
export const disputeSchema = z
  .object({
    task_status: z.string().min(1, "Please select the task status"),
    reason_for_dispute: z
      .string()
      .min(1, "Please select your reason for the dispute"),
    your_request: z.string().min(1, "Please select your request"),
    refund_amount: z.string().optional(),
    details: z.string().min(10, "Please write details about the dispute"),
    documents: z
      .array(z.any())
      .max(MAX_IMAGE_COUNT, `You can upload up to ${MAX_IMAGE_COUNT} images`),
  })
  .superRefine((data, ctx) => {
    if (data.your_request !== "revision" && !data.refund_amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["refund_amount"],
        message: "Please enter the refund amount",
      });
    }
  });

export type DisputeSchemaType = z.infer<typeof disputeSchema>;

// Form Options
export const STATUS_OPTIONS = [
  { id: "started", name: "Started" },
  { id: "not_started", name: "Not Started" },
];

export const REQUEST_OPTIONS = [
  { id: "review", name: "Review" },
  { id: "partial_refund", name: "Partial refund" },
  { id: "full_refund", name: "Full refund" },
];

export const DISPUTE_REASON_NOT_STARTED = [
  {
    id: "tasker_requested_cancellation",
    name: "Taskers requested to cancel the task",
  },
  {
    id: "tasker_not_responding",
    name: "Tasker is not responding to messages",
  },
  {
    id: "schedule_conflict",
    name: "Conflict of schedule between you and the Tasker",
  },
  {
    id: "found_someone_else",
    name: "I found someone else outside CitiTasker to complete the task",
  },
  { id: "no_longer_needed", name: "I don't need the task done anymore" },
  { id: "tasker_no_show", name: "Tasker did not show up" },
  {
    id: "tasker_requesting_more_money",
    name: "Tasker is asking for more than the assigned task price",
  },
  {
    id: "insufficient_skills_or_tools",
    name: "Tasker doesn't have the skills/tools/materials needed to complete the task",
  },
  { id: "other", name: "Others" },
];

export const DISPUTE_REASON_STARTED = [
  { id: "poorly_done", name: "Task was not properly done" },
  {
    id: "task_not_completed",
    name: "Tasker failed to complete the assigned task",
  },
  {
    id: "schedule_conflict",
    name: "Conflict of schedule between you and the Tasker",
  },
  { id: "property_damage", name: "Tasker damaged your property" },
  {
    id: "tasker_requesting_more_money",
    name: "Tasker is asking for more than the assigned task price",
  },
  {
    id: "insufficient_skills_or_tools",
    name: "Tasker doesn't have the skills/tools/materials needed to complete the task",
  },
  {
    id: "scope_misalignment",
    name: "Misunderstanding/misalignment of the scope of the task",
  },
  { id: "other", name: "Others" },
];

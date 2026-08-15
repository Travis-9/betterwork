import { z } from "zod";

export const waitlistRoles = ["client", "freelancer"] as const;
export type WaitlistRole = (typeof waitlistRoles)[number];

export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  role: z.enum(waitlistRoles),
  projectSummary: z.string().trim().min(10).max(300),
  locale: z.enum(["nl", "en"]),
  company: z.string().trim().max(0).optional().default(""),
});

export type WaitlistSubmission = z.infer<typeof waitlistSchema>;

export type WaitlistApiResponse = {
  status: "created" | "duplicate" | "invalid" | "unavailable" | "error";
};

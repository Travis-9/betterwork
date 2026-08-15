import { describe, expect, it } from "vitest";
import { waitlistSchema } from "@/lib/waitlist";

const validSubmission = {
  email: " Person@Example.SR ",
  role: "client" as const,
  projectSummary: "I need a new website for my local business.",
  locale: "en" as const,
  company: "",
};

describe("waitlistSchema", () => {
  it("normalizes valid email addresses", () => {
    const result = waitlistSchema.parse(validSubmission);
    expect(result.email).toBe("person@example.sr");
  });

  it("rejects short project summaries", () => {
    const result = waitlistSchema.safeParse({
      ...validSubmission,
      projectSummary: "Website",
    });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot submissions", () => {
    const result = waitlistSchema.safeParse({
      ...validSubmission,
      company: "Spam Company",
    });
    expect(result.success).toBe(false);
  });
});

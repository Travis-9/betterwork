import { describe, expect, it } from "vitest";
import { getJobById, getRelatedJobs, jobs } from "@/lib/jobs";

describe("job data access", () => {
  it("resolves a job by its unique id and returns null for unknown ids", () => {
    expect(getJobById("ui-ux-designer")?.title).toBe("UI/UX Designer");
    expect(getJobById("missing-job")).toBeNull();
  });

  it("selects related jobs by overlapping tags without including the current record", () => {
    const selectedJob = jobs.find((job) => job.id === "ui-ux-designer");
    if (!selectedJob) throw new Error("Expected the UI/UX sample job to exist");
    const related = getRelatedJobs({ ...selectedJob, tags: ["React"] });
    expect(related.every((job) => job.id !== selectedJob.id)).toBe(true);
    expect(related.map((job) => job.id)).toContain("senior-frontend-developer");
  });
});
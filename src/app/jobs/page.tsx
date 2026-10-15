import type { Metadata } from "next";
import { JobsPage } from "@/components/jobs-page";

export const metadata: Metadata = {
  title: "Jobs | Betterwork",
  description: "Explore job opportunities across Suriname.",
};

export default function JobsRoute() {
  return <JobsPage locale="nl" />;
}
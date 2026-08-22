import type { Metadata } from "next";
import { FreelancersPage } from "@/components/freelancers-page";

export const metadata: Metadata = {
  title: "Freelancers",
  description: "Find skilled Surinamese freelancers for your next project.",
};

export default function FreelancersRoute() {
  return <FreelancersPage />;
}
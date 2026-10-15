import { notFound, redirect } from "next/navigation";
import { freelancers } from "@/lib/freelancers";

export default async function FreelancerPlaceholder({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!freelancers.some((freelancer) => freelancer.id === id)) notFound();
  redirect(`/nl/freelancers/${id}`);
}
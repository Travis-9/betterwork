import { notFound, redirect } from "next/navigation";
import { getJobById } from "@/lib/jobs";

export default async function LegacyJobDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getJobById(id)) notFound();
  redirect(`/nl/jobs/${id}`);
}
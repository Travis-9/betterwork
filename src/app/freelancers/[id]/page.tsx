import Link from "next/link";

export default async function FreelancerPlaceholder({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="freelancer-placeholder"><h1>Freelancer profile</h1><p>{id} profile details will be available soon.</p><Link href="/freelancers">Back to freelancers</Link></main>;
}
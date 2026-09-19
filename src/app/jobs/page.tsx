// import type { Metadata } from "next";
// import { JobsPage } from "@/components/jobs-page";

// export const metadata: Metadata = {
//   title: "Jobs",
//   description: "Find your next role in Suriname with ConnectSu.",
// };

// export default function JobsRoute() {
//   return <JobsPage />;
// }

import { redirect } from "next/navigation";

export default function JobsRoute() {
  redirect("/nl");
}
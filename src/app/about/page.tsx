import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "Over ConnectSu | Betterwork",
  description: "Leer meer over ConnectSu, het professionele netwerk en vacatureplatform gebouwd voor Suriname.",
};

export default function AboutRoute() {
  return <AboutPage />;
}

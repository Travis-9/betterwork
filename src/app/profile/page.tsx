import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile-page";

export const metadata: Metadata = {
  title: "Amba Pinas | Profile",
  description: "ConnectSu freelancer profile for Amba Pinas.",
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
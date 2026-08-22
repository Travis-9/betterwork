import type { Metadata } from "next";
import { SignupPage } from "@/components/signup-page";

export const metadata: Metadata = { title: "Sign Up", description: "Create your ConnectSu account." };

export default function SignupRoute() {
  return <SignupPage />;
}
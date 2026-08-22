import type { Metadata } from "next";
import { LoginPage } from "@/components/login-page";

export const metadata: Metadata = { title: "Log in", description: "Log in to your ConnectSu account." };

export default function LoginRoute() {
  return <LoginPage />;
}
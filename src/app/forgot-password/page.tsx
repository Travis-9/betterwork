import Link from "next/link";

export default function ForgotPasswordRoute() {
  return <main className="login-placeholder"><h1>Forgot password?</h1><p>Password recovery will be available soon.</p><Link href="/login">Back to log in</Link></main>;
}
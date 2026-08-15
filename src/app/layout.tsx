import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://betterwork.sr"),
  title: {
    default: "Betterwork | Lokaal talent, echte projecten",
    template: "%s | Betterwork",
  },
  description:
    "Betterwork brengt Surinaamse opdrachtgevers en freelancers samen in een lokale marktplaats.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-betterwork-locale") === "en" ? "en" : "nl";

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${fraunces.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}

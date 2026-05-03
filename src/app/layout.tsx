import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PwaRegister } from "@/components/pwa/PwaRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Giftables — bespoke gifting, softly delivered",
    template: "%s · Giftables",
  },
  description:
    "Build a custom gift package in guided steps with live pricing, premium packaging, and thoughtful recommendations.",
  applicationName: "Giftables",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Giftables",
    description: "Premium mobile-first gifting, built in your browser.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider>
          <PwaRegister />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

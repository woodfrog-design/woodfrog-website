import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { FooterSection } from "@/components/sections/footer-section";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { PageTransitionIndicator } from "@/components/PageTransitionIndicator";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WoodFrog",
    template: "%s | WoodFrog",
  },
  description: "A premium web experience.",
  icons: {
    icon: "/logos/woodfrog-logo2.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <Suspense fallback={null}>
            <PageTransitionIndicator />
          </Suspense>
          <Navbar />
          {children}
          <FooterSection />
        </SmoothScroll>
      </body>
    </html>
  );
}

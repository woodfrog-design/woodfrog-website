import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { PageTransitionIndicator } from "@/components/PageTransitionIndicator";
import { CookieConsent } from "@/components/CookieConsent";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
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
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
          <SmoothScroll>
            <Suspense fallback={null}>
              <PageTransitionIndicator />
            </Suspense>
            <AdminLayoutWrapper>
              {children}
            </AdminLayoutWrapper>
            <CookieConsent />
          </SmoothScroll>
      </body>
    </html>
  );
}

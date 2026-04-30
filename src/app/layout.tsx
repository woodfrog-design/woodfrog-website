import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { PageTransitionIndicator } from "@/components/PageTransitionIndicator";
import { CookieConsent } from "@/components/CookieConsent";
import { FirebaseAnalyticsProvider, GA_MEASUREMENT_ID } from "@/components/FirebaseAnalyticsProvider";
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
  metadataBase: new URL("https://woodfrog.tech"),
  title: {
    default: "Woodfrog",
    template: "%s | Woodfrog",
  },
  description: "Woodfrog is an innovative AI and Analytics firm in Pune, India, empowering businesses through data-driven insights and bespoke AI solutions.",
  icons: {
    icon: "/logos/woodfrog-logo2.svg",
  },
  openGraph: {
    title: "Woodfrog",
    description: "Empowering decisions through data. Innovative AI and Analytics solutions for modern businesses.",
    url: "https://woodfrog.tech",
    siteName: "Woodfrog",
    images: [
      {
        url: "/logos/woodfrog-logo2.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodfrog",
    description: "Empowering decisions through data. Innovative AI and Analytics solutions for modern businesses.",
    images: ["/logos/woodfrog-logo2.svg"],
  },
  verification: {
    google: "lDlKmLT9LZNVW0ZZUfhxnLeM792MlKvyutkCj6Q97Ro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ── Google Analytics 4 / Firebase Analytics ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: true
            });
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
          <SmoothScroll>
            <Suspense fallback={null}>
              <PageTransitionIndicator />
              <FirebaseAnalyticsProvider />
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

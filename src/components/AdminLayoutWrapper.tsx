'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/ui/navbar";
import dynamic from 'next/dynamic';

const FooterSection = dynamic(() => import("@/components/sections/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: false });

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <FooterSection />}
    </>
  );
}

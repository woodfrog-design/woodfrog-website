'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/ui/navbar";
import { FooterSection } from "@/components/sections/footer-section";

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

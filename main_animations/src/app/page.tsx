'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/animations');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        <p className="text-muted-foreground font-medium animate-pulse">Loading Woodfrog Foundry...</p>
      </div>
    </div>
  );
}

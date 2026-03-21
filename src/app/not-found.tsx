import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 text-center">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-brand-primary">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Page not found</h2>
        <p className="text-gray-400 text-lg md:text-xl">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Use the link below to head back to safety.
        </p>
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Back to Home
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

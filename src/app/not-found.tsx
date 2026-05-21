import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-primary text-white flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 max-w-md">
        <div className="font-display font-black text-9xl mb-6 leading-none text-on-tertiary-container">404</div>
        <h1 className="font-display font-bold text-3xl mb-3">Lost the beat</h1>
        <p className="text-white/70 mb-10 leading-relaxed">
          This page doesn't exist or it took the night off. Head back to the feed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-tertiary-fixed-dim text-on-tertiary-container label-caps px-8 py-3 rounded-full">BACK TO FEED</Link>
          <Link href="/search" className="border border-white/30 text-white label-caps px-8 py-3 rounded-full">SEARCH</Link>
        </div>
      </div>
    </main>
  );
}

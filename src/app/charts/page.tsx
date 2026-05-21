"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { charts } from "@/lib/data";

const trendBadges: Record<string, { bg: string; fg: string; icon: string }> = {
  stars: { bg: "#fa5c1b", fg: "#ffffff", icon: "★" },
  up: { bg: "#fff8f5", fg: "#00152e", icon: "↑" },
  flat: { bg: "#fff8f5", fg: "#00152e", icon: "→" },
};

export default function ChartsPage() {
  return (
    <main className="fixed inset-0 bg-primary overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-primary/60 to-transparent">
        <div className="flex justify-between items-center px-5 pt-5 pb-3">
          <Link href="/" className="text-white" aria-label="Back">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </Link>
          <h1 className="font-display font-bold text-xl text-white tracking-tight">Top 10 Charts</h1>
          <div className="w-6" />
        </div>
      </header>

      <div className="feed-snap absolute inset-0">
        {charts.map((entry) => (
          <section
            key={entry.rank}
            className="feed-slide relative h-screen w-full overflow-hidden text-white"
            style={{ background: entry.gradient }}
          >
            <div className="grain" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

            <div className="absolute top-24 left-5 z-20">
              <div
                className="px-3 py-2 inline-flex items-center gap-2 shadow-[4px_4px_0_rgba(0,0,0,0.4)]"
                style={{
                  background: trendBadges[entry.trend].bg,
                  color: trendBadges[entry.trend].fg,
                }}
              >
                <span className="label-caps text-[11px]">RANK #{entry.rank} THIS WEEK</span>
                <span className="text-sm">{trendBadges[entry.trend].icon}</span>
              </div>
            </div>

            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5 z-20">
              <Link
                href="/profile"
                className="w-12 h-12 rounded-full p-0.5 border-2 border-on-tertiary-container flex items-center justify-center font-bold text-sm"
                style={{ background: entry.artist.avatarBg, color: entry.artist.avatarFg }}
              >
                {entry.artist.initials}
              </Link>
              <button className="flex flex-col items-center text-white">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span className="label-caps text-[10px] mt-1">874K</span>
              </button>
            </div>

            <div className="absolute bottom-28 left-5 right-16 z-20">
              <div className="flex gap-2 mb-3">
                {entry.tags.map((t) => (
                  <span key={t} className="label-caps text-[10px] bg-primary/50 backdrop-blur-md px-2 py-1 rounded">{t}</span>
                ))}
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2 tracking-tight">{entry.title}</h2>
              <p className="text-sm opacity-85 mb-5 leading-snug">{entry.caption}</p>
              <button className="inline-flex items-center gap-3 bg-tertiary-fixed-dim text-on-tertiary-fixed-variant px-6 py-3 rounded-full label-caps text-[11px] shadow-[6px_6px_0_rgba(250,92,27,0.25)] active:scale-95 transition-transform">
                <svg className="w-5 h-5 fill-current animate-bounce" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                GIFT TO BOOST RANK
              </button>
            </div>
          </section>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}

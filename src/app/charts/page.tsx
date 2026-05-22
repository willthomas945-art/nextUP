"use client";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { charts, allGenres } from "@/lib/data";

const trendBadges: Record<string, { bg: string; fg: string; icon: string }> = {
  stars: { bg: "#fa5c1b", fg: "#ffffff", icon: "★" },
  up: { bg: "#fff8f5", fg: "#00152e", icon: "↑" },
  down: { bg: "#fff8f5", fg: "#ba1a1a", icon: "↓" },
  flat: { bg: "#fff8f5", fg: "#74777e", icon: "→" },
};

export default function ChartsPage() {
  const [view, setView] = useState<"feed" | "songs">("feed");
  const [genre, setGenre] = useState<string>("All");

  const filtered = useMemo(() => {
    if (genre === "All") return charts;
    return charts.filter((c) => c.tags.includes(genre.toUpperCase()));
  }, [genre]);

  return (
    <main className={`${view === "feed" ? "fixed inset-0 bg-primary overflow-hidden" : "min-h-screen bg-surface pb-32 animate-fade-in"}`}>
      <header className={`${view === "feed" ? "absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-primary/70 to-transparent" : "sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20"}`}>
        <div className={`flex items-center gap-3 px-5 py-4 max-w-md mx-auto ${view === "feed" ? "text-white" : "text-primary"}`}>
          <Link href="/" className={view === "feed" ? "text-white" : "text-primary"}><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl">Top 100</h1>
          <div className={`ml-auto flex gap-1 rounded-full p-0.5 ${view === "feed" ? "bg-white/15 backdrop-blur-md" : "bg-surface-container"}`}>
            <button onClick={() => setView("feed")} className={`label-caps text-[10px] px-3 py-1.5 rounded-full transition-all ${view === "feed" ? "bg-on-tertiary-container text-white" : "text-on-surface-variant"}`}>FEED</button>
            <button onClick={() => setView("songs")} className={`label-caps text-[10px] px-3 py-1.5 rounded-full transition-all ${view === "songs" ? "bg-primary text-white" : (view === "feed" ? "text-white/70" : "text-on-surface-variant")}`}>SONGS</button>
          </div>
        </div>
        {view === "songs" ? (
          <div className="max-w-md mx-auto px-5 pb-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <button onClick={() => setGenre("All")} className={`label-caps text-[9px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${genre === "All" ? "bg-on-tertiary-container text-white" : "bg-surface-container text-on-surface-variant"}`}>ALL</button>
            {allGenres.map((g) => (
              <button key={g} onClick={() => setGenre(g)} className={`label-caps text-[9px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${genre === g ? "bg-on-tertiary-container text-white" : "bg-surface-container text-on-surface-variant"}`}>{g.toUpperCase()}</button>
            ))}
          </div>
        ) : null}
      </header>

      {view === "feed" ? (
        <div className="feed-snap absolute inset-0">
          {filtered.slice(0, 50).map((c) => (
            <section key={c.rank} className="feed-slide relative h-screen w-full overflow-hidden text-white" style={{ background: c.gradient }}>
              <div className="grain" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
              <div className="absolute top-24 left-5">
                <div className="px-3 py-2 inline-flex items-center gap-2 shadow-[4px_4px_0_rgba(0,0,0,0.4)]" style={{ background: trendBadges[c.trend].bg, color: trendBadges[c.trend].fg }}>
                  <span className="label-caps text-[11px]">RANK #{c.rank} THIS WEEK</span><span>{trendBadges[c.trend].icon}</span>
                </div>
              </div>
              <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5 z-20">
                <Link href={`/artist/${c.artist.handle}`} className="w-12 h-12 rounded-full p-0.5 border-2 border-on-tertiary-container flex items-center justify-center font-bold text-sm" style={{ background: c.artist.avatarBg, color: c.artist.avatarFg }}>{c.artist.initials}</Link>
                <Link href="/boost" className="flex flex-col items-center gap-1"><span className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center"><svg className="w-6 h-6 text-on-tertiary-container fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span><span className="label-caps text-[9px]">BOOST</span></Link>
              </div>
              <div className="absolute bottom-28 left-5 right-16 z-20">
                <div className="flex gap-2 mb-3">{c.tags.map((t) => <span key={t} className="label-caps text-[10px] bg-primary/50 backdrop-blur-md px-2 py-1 rounded">{t}</span>)}</div>
                <Link href={`/artist/${c.artist.handle}`} className="block">
                  <h2 className="font-display font-bold text-3xl mb-1 tracking-tight">{c.title}</h2>
                  <p className="text-sm opacity-80 mb-3">@{c.artist.handle}</p>
                </Link>
                <p className="text-sm opacity-85 mb-5 leading-snug">{c.caption}</p>
                <Link href="/boost" className="inline-flex items-center gap-3 bg-tertiary-fixed-dim text-on-tertiary-fixed-variant px-6 py-3 rounded-full label-caps text-[11px] active:scale-95 transition-transform"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>GIFT TO BOOST RANK</Link>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto px-5 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-primary">Recorded tracks</h2>
              <p className="text-xs text-on-surface-variant">Top studio releases on streaming</p>
            </div>
            <a href="https://open.spotify.com" target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#1DB954] text-black label-caps text-[10px] px-3 py-1.5 rounded-full">♪ OPEN IN SPOTIFY</a>
          </div>
          {filtered.length === 0 ? <div className="text-center py-12"><p className="text-on-surface-variant">No tracks in this genre yet.</p></div> : null}
          <div className="divide-y divide-outline-variant/10">
            {filtered.map((c) => (
              <Link key={c.rank} href={`/artist/${c.artist.handle}`} className="flex items-center gap-3 py-3 hover:bg-surface-container-low transition-colors rounded-lg px-2">
                <span className="font-display font-bold text-xl w-8 text-tertiary-container">{c.rank}</span>
                <div className="w-12 h-12 rounded relative overflow-hidden" style={{ background: c.gradient }}>
                  <div className="grain" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/80"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-primary truncate">{c.title}</div>
                  <div className="label-caps text-[9px] text-on-surface-variant mt-0.5 flex items-center gap-1.5"><span>{c.artist.handle.toUpperCase()}</span><span>·</span><span>{c.tags[0]}</span></div>
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: trendBadges[c.trend].fg === "#fff8f5" ? "#00152e" : trendBadges[c.trend].fg }}>
                  <span>{trendBadges[c.trend].icon}</span>
                  {c.change > 0 && c.trend !== "stars" && c.trend !== "flat" ? <span className="label-caps text-[9px]">{c.change}</span> : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  );
}

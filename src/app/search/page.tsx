"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { artists } from "@/lib/data";

const trendingTags = [
  { tag: "#bedroomsoul", posts: "412K" },
  { tag: "#fingerpicking", posts: "287K" },
  { tag: "#vinylonly", posts: "164K" },
  { tag: "#lateshift", posts: "98K" },
  { tag: "#modularsynth", posts: "76K" },
  { tag: "#opencmic", posts: "52K" },
];

const trendingSounds = [
  { name: "Midnight Pulse", artist: "Luna Raye", uses: "12.4K", gradient: "from-tertiary-container to-on-tertiary-container" },
  { name: "Bridge Take 12", artist: "Silk & Static", uses: "3.7K", gradient: "from-primary-container to-primary" },
  { name: "Glitch in the Grid", artist: "Modernist", uses: "8.9K", gradient: "from-secondary to-tertiary" },
];

const featuredCreators = Object.values(artists);

export default function SearchPage() {
  const [query, setQuery] = useState("");
  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-3 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <div className="flex-1 flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full">
            <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Artists, sounds, tags…"
              className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant"
            />
            {query && <button onClick={() => setQuery("")} className="text-outline"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-lg text-primary">Trending tags</h2>
            <span className="label-caps text-[10px] text-on-tertiary-container">LIVE</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((t) => (
              <button key={t.tag} className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high transition-colors px-3 py-2 rounded-full">
                <span className="font-bold text-primary text-sm">{t.tag}</span>
                <span className="label-caps text-[9px] text-on-surface-variant">{t.posts}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-lg text-primary mb-3">Trending sounds</h2>
          <div className="space-y-2">
            {trendingSounds.map((s, i) => (
              <button key={s.name} className="w-full flex items-center gap-3 bg-surface-container-low hover:bg-surface-container p-3 rounded-xl transition-colors text-left">
                <span className={`w-12 h-12 rounded bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-primary text-sm truncate">{s.name}</div>
                  <div className="label-caps text-[9px] text-on-surface-variant mt-0.5">{s.artist.toUpperCase()} · {s.uses} USES</div>
                </div>
                <span className="label-caps text-[10px] text-on-tertiary-container">#{i + 1}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-lg text-primary mb-3">Creators to watch</h2>
          <div className="grid grid-cols-3 gap-3">
            {featuredCreators.map((a) => (
              <Link key={a.handle} href="/profile" className="flex flex-col items-center text-center">
                <span className="w-16 h-16 rounded-full flex items-center justify-center font-bold border-2 border-on-tertiary-container ring-offset-2 ring-2 ring-transparent" style={{ background: a.avatarBg, color: a.avatarFg }}>{a.initials}</span>
                <div className="font-bold text-primary text-sm mt-2 truncate w-full">@{a.handle}</div>
                <div className="label-caps text-[9px] text-on-surface-variant">{a.followers}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}

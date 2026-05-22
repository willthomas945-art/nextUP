"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { artists, posts, charts, allGenres } from "@/lib/data";

const trendingTags = [
  { tag: "#bedroomsoul", posts: "412K" },
  { tag: "#fingerpicking", posts: "287K" },
  { tag: "#vinylonly", posts: "164K" },
  { tag: "#lateshift", posts: "98K" },
  { tag: "#modularsynth", posts: "76K" },
  { tag: "#openmic", posts: "52K" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase().replace(/^@/, "");
  const results = useMemo(() => {
    if (!q) return null;
    const matchedArtists = Object.values(artists).filter((a) => a.handle.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.bio.toLowerCase().includes(q)).slice(0, 8);
    const matchedTracks = charts.filter((c) => c.title.toLowerCase().includes(q) || c.artist.handle.toLowerCase().includes(q)).slice(0, 10);
    const matchedTags = trendingTags.filter((t) => t.tag.replace("#","").includes(q));
    const matchedGenres = allGenres.filter((g) => g.toLowerCase().includes(q));
    return { artists: matchedArtists, tracks: matchedTracks, tags: matchedTags, genres: matchedGenres };
  }, [q]);

  return (
    <main className="min-h-screen bg-surface pb-32 animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-3 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <div className="flex-1 flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full focus-within:ring-2 ring-on-tertiary-container transition-all">
            <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Artists, songs, tags, genres..." className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant" />
            {query ? <button onClick={() => setQuery("")} className="text-outline"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button> : null}
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6 space-y-8">
        {results ? <Results results={results} /> : <Discover />}
      </div>
      <BottomNav />
    </main>
  );
}

function Results({ results }: { results: { artists: any[]; tracks: any[]; tags: any[]; genres: any[] } }) {
  const empty = results.artists.length === 0 && results.tracks.length === 0 && results.tags.length === 0 && results.genres.length === 0;
  if (empty) return <div className="text-center py-12"><h2 className="font-display font-bold text-xl text-primary mb-2">Nothing found</h2><p className="text-on-surface-variant text-sm">Try a different search.</p></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {results.artists.length > 0 ? (
        <section>
          <h2 className="font-display font-bold text-lg text-primary mb-3">Artists</h2>
          <div className="space-y-2">
            {results.artists.map((a) => (
              <Link key={a.handle} href={`/artist/${a.handle}`} className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container p-3 rounded-xl transition-colors">
                <span className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: a.avatarBg, color: a.avatarFg }}>{a.initials}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-primary flex items-center gap-1">@{a.handle}{a.verified ? <svg className="w-4 h-4 text-on-tertiary-container" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> : null}</div>
                  <div className="label-caps text-[9px] text-on-surface-variant mt-0.5">{a.followers} FOLLOWERS</div>
                </div>
                <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {results.tracks.length > 0 ? (
        <section>
          <h2 className="font-display font-bold text-lg text-primary mb-3">Tracks</h2>
          <div className="space-y-2">
            {results.tracks.map((c) => (
              <Link key={c.rank} href={`/artist/${c.artist.handle}`} className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container p-3 rounded-xl transition-colors">
                <span className="w-12 h-12 rounded bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center text-white"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-primary truncate">{c.title}</div>
                  <div className="label-caps text-[9px] text-on-surface-variant mt-0.5">{c.artist.handle.toUpperCase()} · RANK #{c.rank}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {(results.tags.length > 0 || results.genres.length > 0) ? (
        <section>
          <h2 className="font-display font-bold text-lg text-primary mb-3">Tags &amp; genres</h2>
          <div className="flex flex-wrap gap-2">
            {results.tags.map((t) => <span key={t.tag} className="bg-surface-container px-3 py-2 rounded-full font-bold text-primary text-sm">{t.tag}</span>)}
            {results.genres.map((g) => <Link key={g} href={`/?genre=${encodeURIComponent(g)}`} className="bg-tertiary-container text-on-tertiary-container px-3 py-2 rounded-full label-caps text-[10px]">{g.toUpperCase()}</Link>)}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Discover() {
  return (
    <>
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
          {charts.slice(0, 5).map((s, i) => (
            <Link key={s.rank} href={`/artist/${s.artist.handle}`} className="w-full flex items-center gap-3 bg-surface-container-low hover:bg-surface-container p-3 rounded-xl transition-colors">
              <span className="w-12 h-12 rounded bg-gradient-to-br from-tertiary-container to-on-tertiary-container flex items-center justify-center text-white"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg></span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-primary text-sm truncate">{s.title}</div>
                <div className="label-caps text-[9px] text-on-surface-variant mt-0.5">{s.artist.handle.toUpperCase()}</div>
              </div>
              <span className="label-caps text-[10px] text-on-tertiary-container">#{i + 1}</span>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display font-bold text-lg text-primary mb-3">Creators to watch</h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(artists).slice(0, 9).map((a) => (
            <Link key={a.handle} href={`/artist/${a.handle}`} className="flex flex-col items-center text-center">
              <span className="w-16 h-16 rounded-full flex items-center justify-center font-bold border-2 border-on-tertiary-container" style={{ background: a.avatarBg, color: a.avatarFg }}>{a.initials}</span>
              <div className="font-bold text-primary text-xs mt-2 truncate w-full">@{a.handle}</div>
              <div className="label-caps text-[8px] text-on-surface-variant">{a.followers}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

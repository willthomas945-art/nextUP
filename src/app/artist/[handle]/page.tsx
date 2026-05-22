"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { getArtist } from "@/lib/data";
import { useStore, formatCount } from "@/lib/store";

type Tab = "performances" | "tracks" | "shows";

export default function ArtistPage() {
  const params = useParams<{ handle: string }>();
  const handle = decodeURIComponent(params.handle || "");
  const artist = getArtist(handle);
  const { state, toggleFollow, hydrated } = useStore();
  const [tab, setTab] = useState<Tab>("performances");
  const [extraFollowers, setExtraFollowers] = useState(0);

  useEffect(() => { setExtraFollowers(0); }, [handle]);

  if (!artist) return notFound();
  const isFollowing = hydrated && state.followingHandles.includes(artist.handle);
  const baseFollowers = parseFollowerNum(artist.followers);
  const displayFollowers = formatCount(baseFollowers + extraFollowers);

  function onFollow() {
    setExtraFollowers((n) => (isFollowing ? n - 1 : n + 1));
    toggleFollow(artist!.handle);
  }

  return (
    <main className="min-h-screen bg-surface pb-32 relative animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">@{artist.handle}</h1>
          <Link href="/messages" className="ml-auto text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-4xl border-4 border-surface-container-highest ring-2 ring-on-tertiary-container ring-offset-4" style={{ background: `linear-gradient(135deg, ${artist.avatarBg}, #501500)`, color: artist.avatarFg }}>
              {artist.initials}
            </div>
            {artist.verified ? (
              <span className="absolute -bottom-1 -right-1 bg-on-tertiary-container text-white p-1.5 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </span>
            ) : null}
          </div>
          <h2 className="font-display font-bold text-3xl text-primary mt-4">{artist.name}</h2>
          <p className="text-on-surface-variant text-sm mt-2 max-w-xs leading-relaxed">{artist.bio}</p>

          <div className="flex gap-8 mt-6 mb-6">
            <div><div className="font-display font-bold text-xl text-primary transition-all">{displayFollowers}</div><div className="label-caps text-[9px] text-on-surface-variant mt-1">FOLLOWERS</div></div>
            <div><div className="font-display font-bold text-xl text-primary">{artist.gifts}</div><div className="label-caps text-[9px] text-on-surface-variant mt-1">GIFTS</div></div>
            <div><div className="font-display font-bold text-xl text-primary">{artist.posts}</div><div className="label-caps text-[9px] text-on-surface-variant mt-1">POSTS</div></div>
          </div>

          <div className="flex gap-2 mb-4">
            <button onClick={onFollow} className={`label-caps text-[11px] px-10 py-3 rounded-full transition-all duration-300 ${isFollowing ? "bg-surface-container-highest text-primary" : "bg-primary text-white"}`}>
              {isFollowing ? "FOLLOWING" : "FOLLOW"}
            </button>
            <Link href="/messages" className="label-caps text-[11px] px-4 py-3 rounded-full border border-outline-variant text-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            </Link>
            <Link href="/boost" className="label-caps text-[11px] px-4 py-3 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant">
              ✦ BOOST
            </Link>
          </div>

          {(artist.spotify || artist.youtube || artist.instagram) ? (
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {artist.spotify ? <a href={artist.spotify} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#1DB954] text-black label-caps text-[10px] px-3 py-1.5 rounded-full">♪ SPOTIFY</a> : null}
              {artist.youtube ? <a href={artist.youtube} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#FF0000] text-white label-caps text-[10px] px-3 py-1.5 rounded-full">▶ YOUTUBE</a> : null}
              {artist.instagram ? <a href={artist.instagram} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#E1306C] text-white label-caps text-[10px] px-3 py-1.5 rounded-full">◉ IG</a> : null}
            </div>
          ) : null}
        </div>

        {artist.upcoming && artist.upcoming.length > 0 ? (
          <div className="mt-8 mb-2">
            <h3 className="label-caps text-[10px] text-secondary mb-3">UPCOMING SHOWS</h3>
            <div className="space-y-2">
              {artist.upcoming.map((s, i) => (
                <Link key={i} href="/tour" className="block bg-tertiary-container text-white p-4 rounded-2xl active:scale-[0.98] transition-transform">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-lg truncate">{s.title}</div>
                      <div className="text-xs opacity-80 mt-0.5">{s.date} · {s.venue}</div>
                    </div>
                    <span className="bg-white text-tertiary-container label-caps px-3 py-1.5 rounded-lg text-[10px] shrink-0 ml-3">RESERVE</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex border-b border-outline-variant/20 mt-8 mb-6">
          {(["performances", "tracks", "shows"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`label-caps py-3 px-4 transition-all ${tab === t ? "text-primary border-b-2 border-on-tertiary-container" : "text-on-surface-variant"}`}>{t.toUpperCase()}</button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <Link key={i} href="/" className="aspect-square bg-gradient-to-br rounded-sm relative overflow-hidden flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ backgroundImage: `linear-gradient(135deg, ${["#122a47","#2d0800","#501500","#fa5c1b","#7c92b4","#645e50"][i % 6]}, ${["#fa5c1b","#122a47","#2d0800","#7c92b4","#501500","#ffb59c"][i % 6]})` }}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span className="absolute bottom-1 right-1.5 label-caps text-[8px] text-white/80">{formatCount(Math.floor(Math.random() * 800 + 100) * 1000)}</span>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

function parseFollowerNum(s: string): number {
  if (s.endsWith("M")) return Math.round(parseFloat(s) * 1000000);
  if (s.endsWith("K")) return Math.round(parseFloat(s) * 1000);
  return parseInt(s) || 0;
}

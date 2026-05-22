"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useStore, formatCount } from "@/lib/store";

type Tab = "performances" | "tracks" | "gallery";

export default function ProfilePage() {
  const { state, hydrated } = useStore();
  const [tab, setTab] = useState<Tab>("performances");

  if (!hydrated) return <div className="min-h-screen bg-surface" />;

  return (
    <main className="min-h-screen bg-surface pb-32 relative animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">@{state.handle}</h1>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/inbox" className="text-primary relative" aria-label="Activity">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-on-tertiary-container rounded-full border-2 border-surface"></span>
            </Link>
            <Link href="/messages" className="text-primary" aria-label="Messages">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </Link>
            <Link href="/settings" className="text-primary" aria-label="Settings">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/settings" className="relative">
            <div className="w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-4xl border-4 border-surface-container-highest ring-2 ring-on-tertiary-container ring-offset-4" style={{ background: `linear-gradient(135deg, ${state.avatarBg}, #501500)`, color: state.avatarFg }}>{state.initials}</div>
            {state.verified ? <span className="absolute -bottom-1 -right-1 bg-on-tertiary-container text-white p-1.5 rounded-full"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span> : null}
          </Link>
          <div className="flex items-center gap-2 mt-4">
            <h2 className="font-display font-bold text-3xl text-primary">{state.name}</h2>
            <Link href="/settings" className="text-on-surface-variant"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></Link>
          </div>
          <p className="text-on-surface-variant text-sm mt-2 max-w-xs leading-relaxed">{state.bio}</p>

          <div className="flex gap-8 mt-6 mb-6">
            <div><div className="font-display font-bold text-xl text-primary transition-all">{formatCount(state.followers)}</div><div className="label-caps text-[9px] text-on-surface-variant mt-1">FOLLOWERS</div></div>
            <Link href="/boost"><div className="font-display font-bold text-xl text-primary">{formatCount(state.gifts)}</div><div className="label-caps text-[9px] text-on-surface-variant mt-1">GIFTS</div></Link>
            <div><div className="font-display font-bold text-xl text-primary">{state.posts}</div><div className="label-caps text-[9px] text-on-surface-variant mt-1">POSTS</div></div>
          </div>

          <div className="flex gap-2 mb-4">
            <Link href="/settings" className="label-caps text-[11px] px-10 py-3 rounded-full bg-primary text-white">EDIT PROFILE</Link>
            <Link href="/share" className="label-caps text-[11px] px-4 py-3 rounded-full border border-outline-variant text-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </Link>
          </div>

          {(state.spotify || state.youtube || state.instagram) ? (
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {state.spotify ? <a href={state.spotify} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#1DB954] text-black label-caps text-[10px] px-3 py-1.5 rounded-full">♪ SPOTIFY</a> : null}
              {state.youtube ? <a href={state.youtube} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#FF0000] text-white label-caps text-[10px] px-3 py-1.5 rounded-full">▶ YOUTUBE</a> : null}
              {state.instagram ? <a href={state.instagram} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-[#E1306C] text-white label-caps text-[10px] px-3 py-1.5 rounded-full">◉ IG</a> : null}
            </div>
          ) : null}
        </div>

        {state.upcoming.length > 0 ? (
          <div className="mt-8 mb-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="label-caps text-[10px] text-secondary">UPCOMING SHOWS</h3>
              <Link href="/tour" className="label-caps text-[10px] text-on-tertiary-container">SEE ALL</Link>
            </div>
            <div className="space-y-2">
              {state.upcoming.slice(0, 3).map((s) => (
                <Link key={s.id} href="/tour" className="flex items-center gap-3 bg-tertiary-container text-white p-3 rounded-2xl active:scale-[0.99] transition-transform">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="label-caps text-[8px] opacity-70">{s.date.split(" ")[0].toUpperCase()}</span>
                    <span className="font-display font-bold text-lg leading-none">{s.date.split(" ")[1]?.replace(",", "") || s.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm truncate">{s.title}</div>
                    <div className="text-xs opacity-80 mt-0.5 truncate">{s.venue}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="label-caps text-[8px] opacity-70">FROM</div>
                    <div className="font-display font-bold">${s.currentBid}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex border-b border-outline-variant/20 mt-8 mb-6 -mx-5 px-5">
          {(["performances", "tracks", "gallery"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`label-caps py-3 px-4 transition-all ${tab === t ? "text-primary border-b-2 border-on-tertiary-container" : "text-on-surface-variant"}`}>{t.toUpperCase()}</button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <Link key={i} href="/" className="aspect-square relative overflow-hidden flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ backgroundImage: `linear-gradient(135deg, ${["#122a47","#2d0800","#501500","#fa5c1b","#7c92b4","#645e50"][i % 6]}, ${["#fa5c1b","#122a47","#2d0800","#7c92b4","#501500","#ffb59c"][i % 6]})` }}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span className="absolute bottom-1 right-1.5 label-caps text-[8px] text-white/80">{formatCount(Math.floor((i + 1) * 187234 % 900000) + 50000)}</span>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

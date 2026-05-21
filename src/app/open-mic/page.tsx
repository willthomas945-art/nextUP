"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { artists } from "@/lib/data";

const liveNow = [
  { artist: artists.lunaraye, title: "Late-night studio session", viewers: "4.2K", gradient: "linear-gradient(135deg, #2d0800, #501500, #fa5c1b)" },
  { artist: artists.nextgenjazz, title: "Live from the basement", viewers: "1.8K", gradient: "linear-gradient(135deg, #122a47, #00152e, #1f1b10)" },
  { artist: artists.silkandstatic, title: "Songwriting in real time", viewers: "642", gradient: "linear-gradient(135deg, #645e50, #2d0800)" },
];

export default function OpenMicPage() {
  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Open Mic</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <button className="w-full mb-8 bg-gradient-to-br from-tertiary-container to-on-tertiary-container text-white p-6 rounded-2xl shadow-[6px_6px_0_rgba(45,8,0,0.3)] active:scale-[0.98] transition-transform text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="label-caps text-[10px]">GO LIVE NOW</span>
          </div>
          <h2 className="font-display font-bold text-2xl">Broadcast your next set</h2>
          <p className="text-white/80 text-sm mt-1">Real-time gifts, real-time crowd. No edit button.</p>
        </button>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-primary">Live now</h3>
          <span className="label-caps text-[10px] text-on-surface-variant">{liveNow.length} artists</span>
        </div>

        <div className="space-y-4">
          {liveNow.map((stream, i) => (
            <Link key={i} href="/profile" className="block relative aspect-video rounded-2xl overflow-hidden group" style={{ background: stream.gradient }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-error text-white px-2 py-1 rounded">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="label-caps text-[9px]">LIVE</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span className="label-caps text-[9px]">{stream.viewers}</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 border-white" style={{ background: stream.artist.avatarBg, color: stream.artist.avatarFg }}>{stream.artist.initials}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">@{stream.artist.handle}</div>
                  <div className="text-xs text-white/80 truncate">{stream.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h3 className="font-display font-bold text-lg text-primary mt-10 mb-4">Scheduled</h3>
        <div className="space-y-3">
          <div className="bg-surface-container p-4 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
            <div className="flex-1">
              <div className="font-bold text-primary">Downtown Jazz Vibes</div>
              <div className="label-caps text-[10px] text-on-surface-variant mt-1">STARTS IN 2H 45M</div>
            </div>
            <button className="label-caps text-[10px] text-on-tertiary-container border border-on-tertiary-container px-3 py-1.5 rounded-full">REMIND</button>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

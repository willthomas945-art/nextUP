"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const friends = [
  { handle: "harmoniacjune", initials: "HJ", bg: "#ffdbcf", fg: "#2d0800" },
  { handle: "lateshift_ldn", initials: "LL", bg: "#eae2d0", fg: "#1f1b10" },
  { handle: "modularkid", initials: "MK", bg: "#fff8f5", fg: "#1e1b18" },
  { handle: "vinylsundays", initials: "VS", bg: "#b1c8ec", fg: "#00152e" },
  { handle: "tape_loops", initials: "TL", bg: "#ffb59c", fg: "#2d0800" },
  { handle: "wavefolder", initials: "WF", bg: "#fa5c1b", fg: "#fff" },
];

const externals = [
  { name: "Repost", icon: "↻", bg: "bg-on-tertiary-container", fg: "text-white" },
  { name: "Copy link", icon: "🔗", bg: "bg-surface-container", fg: "text-primary" },
  { name: "Instagram", icon: "◉", bg: "bg-surface-container", fg: "text-primary" },
  { name: "X", icon: "𝕏", bg: "bg-surface-container", fg: "text-primary" },
  { name: "Message", icon: "✉", bg: "bg-surface-container", fg: "text-primary" },
  { name: "More", icon: "⋯", bg: "bg-surface-container", fg: "text-primary" },
];

export default function SharePage() {
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  function toggle(handle: string) {
    setPicked(picked.includes(handle) ? picked.filter((h) => h !== handle) : [...picked, handle]);
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-surface flex flex-col items-center justify-center pb-32 px-8 text-center">
        <div className="w-20 h-20 bg-tertiary-fixed-dim rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-on-tertiary-container" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <h2 className="font-display font-bold text-2xl text-primary mb-2">Sent</h2>
        <p className="text-on-surface-variant mb-8">Sent to {picked.length} {picked.length === 1 ? "friend" : "friends"}.</p>
        <Link href="/" className="bg-primary text-white label-caps px-8 py-3 rounded-full">BACK TO FEED</Link>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Share</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <h2 className="label-caps text-[10px] text-secondary mb-3">QUICK ACTIONS</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {externals.map((e) => (
            <button key={e.name} className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform">
              <span className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${e.bg} ${e.fg}`}>{e.icon}</span>
              <span className="label-caps text-[9px] text-on-surface">{e.name.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <h2 className="label-caps text-[10px] text-secondary mb-3">SEND TO</h2>
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full mb-4">
          <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search friends…" className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant" />
        </div>

        <div className="space-y-1">
          {friends.map((f) => {
            const on = picked.includes(f.handle);
            return (
              <button key={f.handle} onClick={() => toggle(f.handle)} className="w-full flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-surface-container-low transition-colors text-left">
                <span className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: f.bg, color: f.fg }}>{f.initials}</span>
                <span className="flex-1 font-bold text-primary">@{f.handle}</span>
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${on ? "bg-on-tertiary-container border-on-tertiary-container" : "border-outline-variant"}`}>
                  {on && <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                </span>
              </button>
            );
          })}
        </div>

        {picked.length > 0 && (
          <div className="sticky bottom-24 mt-6 bg-primary text-white p-4 rounded-2xl shadow-2xl">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note…"
              className="w-full bg-white/10 placeholder:text-white/50 px-3 py-2 rounded-full outline-none text-sm mb-3"
            />
            <button onClick={() => setSent(true)} className="w-full bg-on-tertiary-container text-white label-caps py-3 rounded-full active:scale-95 transition-transform">
              SEND TO {picked.length} {picked.length === 1 ? "FRIEND" : "FRIENDS"}
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}

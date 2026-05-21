"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { artists } from "@/lib/data";

const artist = artists.lunaraye;
type Tab = "performances" | "tracks" | "gallery";

export default function ProfilePage() {
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState<Tab>("performances");

  return (
    <main className="min-h-screen bg-surface pb-32 relative">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">@{artist.handle}</h1>
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

      <div className="max-w-md mx-auto px-5 pt-8 relative">
        <div className="flex flex-col items-center text-center">
          <Link href="/settings" className="relative" aria-label="Edit avatar">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-4xl border-4 border-surface-container-highest ring-2 ring-on-tertiary-container ring-offset-4"
              style={{ background: `linear-gradient(135deg, ${artist.avatarBg}, #501500)`, color: artist.avatarFg }}
            >
              {artist.initials}
            </div>
            {artist.verified ? (
              <span className="absolute -bottom-1 -right-1 bg-on-tertiary-container text-white p-1.5 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </span>
            ) : null}
          </Link>
          <div className="flex items-center gap-2 mt-4">
            <h2 className="font-display font-bold text-3xl text-primary">{artist.name}</h2>
            <Link href="/settings" className="text-on-surface-variant" aria-label="Edit profile">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </Link>
          </div>
          <p className="text-on-surface-variant text-sm mt-2 max-w-xs leading-relaxed">{artist.bio}</p>

          <div className="flex gap-8 mt-6 mb-6">
            <Link href="/" className="text-center"><Stat value={artist.followers} label="FOLLOWERS" /></Link>
            <Link href="/boost" className="text-center"><Stat value={artist.gifts} label="GIFTS" /></Link>
            <Link href="/" className="text-center"><Stat value={artist.posts.toString()} label="POSTS" /></Link>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFollowing(!following)}
              className={`label-caps text-[11px] px-10 py-3 rounded-full transition-all ${following ? "bg-surface-container-highest text-primary" : "bg-primary text-white"}`}
            >
              {following ? "FOLLOWING" : "FOLLOW"}
            </button>
            <Link href="/messages" className="label-caps text-[11px] px-4 py-3 rounded-full border border-outline-variant text-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            </Link>
          </div>
        </div>

        <div className="flex border-b border-outline-variant/20 mt-10 mb-6 -mx-5 px-5">
          <TabBtn label="PERFORMANCES" active={tab === "performances"} onClick={() => setTab("performances")} />
          <TabBtn label="TRACKS" active={tab === "tracks"} onClick={() => setTab("tracks")} />
          <TabBtn label="GALLERY" active={tab === "gallery"} onClick={() => setTab("gallery")} />
        </div>

        {tab === "performances" ? <Performances /> : null}
        {tab === "tracks" ? <Tracks /> : null}
        {tab === "gallery" ? <Gallery /> : null}
      </div>

      <BottomNav />
    </main>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`label-caps py-3 px-4 transition-all ${active ? "text-primary border-b-2 border-on-tertiary-container" : "text-on-surface-variant"}`}>
      {label}
    </button>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-xl text-primary">{value}</div>
      <div className="label-caps text-[9px] text-on-surface-variant mt-1">{label}</div>
    </div>
  );
}

function Performances() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link href="/" className="col-span-2 aspect-[4/5] rounded-2xl relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #122a47, #501500)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="bg-on-tertiary-container px-2 py-1 label-caps text-[9px] mb-2 inline-block">LIVE RECORDING</span>
          <h4 className="font-display font-bold text-lg">The Electric Lounge Sessions</h4>
          <div className="flex items-center gap-3 mt-1 text-xs opacity-80">
            <span>4.2M views</span><span>•</span><span>120K likes</span>
          </div>
        </div>
      </Link>
      <Link href="/" className="aspect-square rounded-2xl bg-gradient-to-br from-secondary via-tertiary to-on-tertiary-fixed-variant flex items-center justify-center text-white/60 relative overflow-hidden">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"/></svg>
        <span className="absolute bottom-2 left-2 label-caps text-[9px] text-white">2.1M</span>
      </Link>
      <Link href="/" className="aspect-square rounded-2xl bg-gradient-to-br from-primary-fixed-dim via-primary to-primary-container flex items-center justify-center text-white/60 relative overflow-hidden">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2" fill="#fff8f5"/></svg>
        <span className="absolute bottom-2 left-2 label-caps text-[9px] text-white">876K</span>
      </Link>
      <Link href="/tour" className="col-span-2 bg-tertiary-container text-white p-5 rounded-2xl block">
        <div className="label-caps text-[10px] text-tertiary-fixed-dim mb-1">UPCOMING LIVE</div>
        <h4 className="font-display font-bold text-xl mb-3">Paris Underworld Tour</h4>
        <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          OCT 24, 2024
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-between items-end">
          <div>
            <div className="label-caps text-[9px] opacity-70">CURRENTLY BIDDING</div>
            <div className="font-display font-bold text-2xl">$142</div>
          </div>
          <span className="bg-white text-tertiary-container label-caps px-4 py-2 rounded-lg text-[10px]">RESERVE</span>
        </div>
      </Link>
    </div>
  );
}

const trackList = [
  { title: "Midnight Pulse", album: "Single", duration: "4:24", plays: "12.4M" },
  { title: "Neon Echoes", album: "EP — Frequencies", duration: "3:15", plays: "8.7M" },
  { title: "Velvet Static", album: "Album — Lunar", duration: "5:02", plays: "5.2M" },
  { title: "After Hours", album: "Single", duration: "3:48", plays: "3.1M" },
  { title: "Bedroom Lights", album: "EP — Frequencies", duration: "4:11", plays: "2.4M" },
];

function Tracks() {
  return (
    <div className="space-y-1">
      {trackList.map((t, i) => (
        <button key={t.title} className="w-full flex items-center gap-4 py-3 px-2 hover:bg-surface-container-low rounded-lg transition-colors text-left">
          <span className="font-display text-2xl text-tertiary-container w-8">{(i + 1).toString().padStart(2, "0")}</span>
          <div className="w-12 h-12 bg-gradient-to-br from-primary-container to-tertiary-container rounded flex items-center justify-center text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-primary truncate">{t.title}</div>
            <div className="label-caps text-[9px] text-on-surface-variant mt-0.5">{t.album.toUpperCase()} · {t.duration} · {t.plays}</div>
          </div>
          <svg className="w-5 h-5 text-on-surface-variant" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </button>
      ))}
    </div>
  );
}

const galleryGradients = [
  "from-tertiary-container to-on-tertiary-container",
  "from-primary to-tertiary",
  "from-secondary to-tertiary-fixed-dim",
  "from-primary-container to-tertiary-container",
  "from-on-tertiary-container to-tertiary",
  "from-primary to-primary-fixed-dim",
  "from-tertiary to-secondary",
  "from-tertiary-fixed-dim to-on-tertiary-container",
  "from-primary-container to-primary",
];

function Gallery() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {galleryGradients.map((g, i) => (
        <Link key={i} href="/" className={`aspect-square bg-gradient-to-br ${g} relative group overflow-hidden flex items-center justify-center text-white/40 hover:text-white transition-colors`}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </Link>
      ))}
    </div>
  );
}

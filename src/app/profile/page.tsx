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
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
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
            {artist.verified && (
              <span className="absolute -bottom-1 -right-1 bg-on-tertiary-container text-white p-1.5 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </span>
            )}
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
              className={`label-caps text-[11px] px-10 py-3 rounded-full transition-all ${
                following ? "bg-surface-container-highest text-primary" : "bg-primary text-white"
              }`}
            >
              {following ? "FOLLOWING" : "FOLLOW"}
            </button>
            <Link href="/messages" className="label-caps text-[11px] px-4 py-3 rounded-full border border-outline-variant text-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            </Link>
          </div>
        </div>

        <div className="flex border-b border-outline-variant/20 mt-10 mb-6 -mx-5 px-5">
          {(["performances", "tracks", "gallery"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`label-caps py-3 px-4 transition-all ${
                tab === t ? "text-primary border-b-2 border-on-tertiary-container" : "text-on-surface-variant"
              }`}
          
"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { posts, type Post } from "@/lib/data";

export default function FeedPage() {
  return (
    <main className="fixed inset-0 bg-primary overflow-hidden">
      <Header />
      <div className="feed-snap absolute inset-0">
        {posts.map((post) => (
          <FeedSlide key={post.id} post={post} />
        ))}
      </div>
      <BottomNav />
    </main>
  );
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-primary/60 to-transparent">
      <div className="flex justify-between items-center px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"/></svg>
          <h1 className="font-display font-bold text-xl tracking-tight">NextUP</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <span className="label-caps text-white border-b-2 border-on-tertiary-container pb-0.5">FOR YOU</span>
          <Link href="/following" className="label-caps text-white/60 hover:text-white">FOLLOWING</Link>
          <Link href="/open-mic" className="label-caps text-white/60 hover:text-white inline-flex items-center gap-1.5">
            <span className="relative flex w-2 h-2"><span className="animate-ping absolute inset-0 rounded-full bg-error opacity-75"></span><span className="relative rounded-full w-2 h-2 bg-error"></span></span>
            OPEN MIC
          </Link>
        </nav>
        <Link href="/search" className="text-white" aria-label="Search">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </Link>
      </div>
      <div className="flex md:hidden justify-center gap-6 pb-3">
        <span className="label-caps text-white border-b-2 border-on-tertiary-container pb-0.5">FOR YOU</span>
        <Link href="/following" className="label-caps text-white/60">FOLLOWING</Link>
        <Link href="/open-mic" className="label-caps text-white/60">OPEN MIC</Link>
      </div>
    </header>
  );
}

function FeedSlide({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(post.artist.handle === "LunaRaye");
  const lastTap = useRef(0);

  function handleTap(e: React.MouseEvent) {
    const now = Date.now();
    if (now - lastTap.current < 300 && now - lastTap.current > 0) {
      spawnHeart(e.clientX, e.clientY);
      if (!liked) setLiked(true);
    }
    lastTap.current = now;
  }

  return (
    <section
      className="feed-slide relative h-screen w-full overflow-hidden text-white"
      style={{ background: post.gradient }}
      onClick={handleTap}
    >
      <div className="grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
        <Link href="/boost" onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <span className="w-14 h-14 bg-tertiary-container rounded-full flex items-center justify-center shadow-lg border border-on-tertiary-container/30">
            <svg className="w-7 h-7 text-on-tertiary-container fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </span>
          <span className="label-caps text-[10px]">BOOST</span>
        </Link>
        <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <svg className={`w-8 h-8 transition-colors ${liked ? "fill-[#fa5c1b] stroke-[#fa5c1b]" : "stroke-white fill-none"}`} viewBox="0 0 24 24" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span className="label-caps text-[10px]">{post.likes}</span>
        </button>
        <Link href="/comments" onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          <span className="label-caps text-[10px]">{post.comments}</span>
        </Link>
        <Link href="/share" onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          <span className="label-caps text-[10px]">SHARE</span>
        </Link>
      </div>

      <div className="absolute left-5 bottom-32 max-w-[78%] z-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 mb-3">
          {post.tags.map((t) => (<span key={t} className="label-caps text-[10px] bg-primary/50 backdrop-blur-md px-2 py-1 rounded">{t}</span>))}
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Link href="/profile" className="block">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-primary-fixed-dim" style={{ background: post.artist.avatarBg, color: post.artist.avatarFg }}>{post.artist.initials}</span>
          </Link>
          <Link href="/profile" className="font-display text-lg font-bold">@{post.artist.handle}</Link>
          <button onClick={(e) => { e.stopPropagation(); setFollowing(!following); }} className={`label-caps text-[10px] px-3 py-1 rounded-full border transition-all ${following ? "bg-tertiary-container border-on-tertiary-container/50 text-on-tertiary-container" : "bg-white/10 backdrop-blur-md border-white/30 text-white"}`}>
            {following ? "FOLLOWING" : "FOLLOW"}
          </button>
        </div>
        <p className="text-[15px] leading-snug mb-4 opacity-95">{post.caption}</p>
        <button className="inline-flex items-center gap-2 bg-[#1DB954] text-black px-4 py-2 rounded-full shadow-xl active:scale-95 transition-transform">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          <span className="flex flex-col items-start leading-tight">
            <span className="label-caps text-[9px] opacity-80">NOW PLAYING</span>
            <span className="font-bold text-sm">{post.trackTitle}</span>
          </span>
        </button>
      </div>

      <div className="absolute bottom-24 left-0 right-0 h-[2px] bg-white/20 z-10">
        <div className="h-full bg-on-tertiary-container w-1/3 shadow-[0_0_8px_rgba(250,92,27,0.8)]" />
      </div>
    </section>
  );
}

function spawnHeart(x: number, y: number) {
  const heart = document.createElement("div");
  heart.className = "heart-pop";
  heart.style.cssText = `position:fixed;left:${x - 32}px;top:${y - 32}px;font-size:64px;color:#fa5c1b;z-index:100;pointer-events:none;`;
  heart.innerHTML = "&#9829;";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 600);
}

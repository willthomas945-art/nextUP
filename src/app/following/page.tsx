"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { posts } from "@/lib/data";

export default function FollowingPage() {
  const followed = posts.filter((p) => p.artist.handle === "LunaRaye");
  return (
    <main className="fixed inset-0 bg-primary overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-primary/60 to-transparent">
        <div className="flex justify-between items-center px-5 pt-5 pb-3">
          <Link href="/" className="text-white" aria-label="Back">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </Link>
          <h1 className="font-display font-bold text-xl text-white tracking-tight">Following</h1>
          <div className="w-6" />
        </div>
        <nav className="flex justify-center gap-6 pb-3">
          <Link href="/" className="label-caps text-white/60">FOR YOU</Link>
          <span className="label-caps text-white border-b-2 border-on-tertiary-container pb-0.5">FOLLOWING</span>
          <Link href="/open-mic" className="label-caps text-white/60">OPEN MIC</Link>
        </nav>
      </header>

      <div className="feed-snap absolute inset-0">
        {followed.length === 0 ? (
          <div className="h-screen flex items-center justify-center text-white text-center px-10">
            <div>
              <h2 className="font-display text-2xl font-bold mb-2">Nobody yet</h2>
              <p className="text-white/70 mb-6">Follow artists from the For You feed and they'll show up here.</p>
              <Link href="/" className="inline-block bg-on-tertiary-container text-white label-caps px-6 py-3 rounded-full">DISCOVER ARTISTS</Link>
            </div>
          </div>
        ) : followed.map((post) => (
          <section key={post.id} className="feed-slide relative h-screen w-full overflow-hidden text-white" style={{ background: post.gradient }}>
            <div className="grain" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            <div className="absolute left-5 bottom-32 max-w-[78%] z-20">
              <div className="flex gap-2 mb-3">{post.tags.map((t) => <span key={t} className="label-caps text-[10px] bg-primary/50 backdrop-blur-md px-2 py-1 rounded">{t}</span>)}</div>
              <div className="flex items-center gap-3 mb-3">
                <Link href="/profile">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-primary-fixed-dim" style={{ background: post.artist.avatarBg, color: post.artist.avatarFg }}>{post.artist.initials}</span>
                </Link>
                <Link href="/profile" className="font-display text-lg font-bold">@{post.artist.handle}</Link>
              </div>
              <p className="text-[15px] leading-snug">{post.caption}</p>
            </div>
          </section>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}

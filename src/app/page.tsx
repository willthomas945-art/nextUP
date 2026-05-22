"use client";
import { useRef, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { posts as allPosts, type Post } from "@/lib/data";
import { useStore, formatCount } from "@/lib/store";

const quickGifts = [
  { name: "Spark", price: 1, icon: "✦", color: "#ffb59c" },
  { name: "Wave", price: 5, icon: "≈", color: "#b1c8ec" },
  { name: "Pulse", price: 12, icon: "❤", color: "#fa5c1b" },
  { name: "Crown", price: 50, icon: "♛", color: "#ffdbcf" },
];

export default function FeedPage() {
  const [genreScope, setGenreScope] = useState<"my" | "all">("all");
  const { state } = useStore();

  const ordered = useMemo(() => {
    let pool = [...allPosts];
    if (genreScope === "my" && state.selectedGenres.length > 0) {
      pool = pool.filter((p) => state.selectedGenres.some((g) => g.toLowerCase() === p.genre.toLowerCase()));
    }
    return pool.sort((a, b) => {
      const aLiked = state.likedPostIds.includes(a.id) ? 1 : 0;
      const bLiked = state.likedPostIds.includes(b.id) ? 1 : 0;
      if (aLiked !== bLiked) return bLiked - aLiked;
      return b.likes - a.likes + ((a.id.charCodeAt(1) % 7) - (b.id.charCodeAt(1) % 7));
    });
  }, [genreScope, state.selectedGenres, state.likedPostIds]);

  return (
    <main className="fixed inset-0 bg-primary overflow-hidden">
      <Header genreScope={genreScope} setGenreScope={setGenreScope} hasMyGenres={state.selectedGenres.length > 0} />
      <div key={genreScope + state.selectedGenres.join()} className="feed-snap absolute inset-0 animate-fade-in">
        {ordered.length === 0 ? (
          <div className="h-screen flex items-center justify-center text-white text-center px-8">
            <div>
              <h2 className="font-display text-2xl font-bold mb-2">Nothing in "My genres" yet</h2>
              <p className="text-white/70 mb-6">Pick genres in onboarding or switch to "All genres".</p>
              <button onClick={() => setGenreScope("all")} className="bg-on-tertiary-container text-white label-caps px-6 py-3 rounded-full">SWITCH TO ALL</button>
            </div>
          </div>
        ) : ordered.map((post) => <FeedSlide key={post.id} post={post} />)}
      </div>
      <BottomNav />
    </main>
  );
}

function Header({ genreScope, setGenreScope, hasMyGenres }: { genreScope: "my" | "all"; setGenreScope: (s: "my" | "all") => void; hasMyGenres: boolean }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-primary/70 via-primary/30 to-transparent">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"/></svg>
          <h1 className="font-display font-bold text-lg tracking-tight">NextUP</h1>
        </div>
        <Link href="/search" className="text-white"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></Link>
      </div>
      <div className="flex justify-center gap-6 pb-2">
        <span className="label-caps text-white border-b-2 border-on-tertiary-container pb-0.5 text-[11px]">FOR YOU</span>
        <Link href="/following" className="label-caps text-white/60 text-[11px]">FOLLOWING</Link>
        <Link href="/open-mic" className="label-caps text-white/60 text-[11px] inline-flex items-center gap-1.5">
          <span className="relative flex w-1.5 h-1.5"><span className="animate-ping absolute inset-0 rounded-full bg-error opacity-75"></span><span className="relative rounded-full w-1.5 h-1.5 bg-error"></span></span>
          OPEN MIC
        </Link>
      </div>
      <div className="flex justify-center gap-1 pb-3">
        <button onClick={() => setGenreScope("all")} className={`label-caps text-[9px] px-3 py-1 rounded-full transition-all ${genreScope === "all" ? "bg-white/15 text-white backdrop-blur-md border border-white/20" : "text-white/50"}`}>ALL GENRES</button>
        {hasMyGenres ? <button onClick={() => setGenreScope("my")} className={`label-caps text-[9px] px-3 py-1 rounded-full transition-all ${genreScope === "my" ? "bg-white/15 text-white backdrop-blur-md border border-white/20" : "text-white/50"}`}>MY GENRES</button> : null}
      </div>
    </header>
  );
}

function FeedSlide({ post }: { post: Post }) {
  const { state, toggleFollow, toggleLike, update } = useStore();
  const liked = state.likedPostIds.includes(post.id);
  const following = state.followingHandles.includes(post.artist.handle);
  const lastTap = useRef(0);
  const [likeBoost, setLikeBoost] = useState(0);
  const [showBoost, setShowBoost] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  function handleTap(e: React.MouseEvent) {
    const now = Date.now();
    if (now - lastTap.current < 300 && now - lastTap.current > 0) {
      spawnHeart(e.clientX, e.clientY);
      if (!liked) { toggleLike(post.id); setLikeBoost((b) => b + 1); }
    }
    lastTap.current = now;
  }

  function sendGift(g: typeof quickGifts[number]) {
    if (state.credits < g.price) { setShowBoost(false); return; }
    update({ credits: state.credits - g.price });
    const rect = sectionRef.current?.getBoundingClientRect();
    spawnGiftBurst(g.icon, g.color, rect);
    setShowBoost(false);
  }

  const likeCount = post.likes + likeBoost + (liked && likeBoost === 0 ? 1 : 0);

  return (
    <section ref={sectionRef} className="feed-slide relative h-screen w-full overflow-hidden text-white" style={{ background: post.gradient }} onClick={handleTap}>
      <div className="grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-20">
        <button onClick={(e) => { e.stopPropagation(); setShowBoost(true); }} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <span className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center shadow-lg border border-on-tertiary-container/30"><svg className="w-6 h-6 text-on-tertiary-container fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
          <span className="label-caps text-[9px]">BOOST</span>
        </button>
        <button onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }} className="flex flex-col items-center gap-0.5 active:scale-90 transition-transform">
          <svg className={`w-7 h-7 transition-all ${liked ? "fill-[#fa5c1b] stroke-[#fa5c1b] scale-110" : "stroke-white fill-none"}`} viewBox="0 0 24 24" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span className="label-caps text-[9px]">{formatCount(likeCount)}</span>
        </button>
        <Link href="/comments" onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-0.5 active:scale-90 transition-transform">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          <span className="label-caps text-[9px]">{formatCount(post.comments)}</span>
        </Link>
        <Link href="/share" onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-0.5 active:scale-90 transition-transform">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          <span className="label-caps text-[9px]">SHARE</span>
        </Link>
      </div>

      <div className="absolute left-5 bottom-24 max-w-[78%] z-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 mb-3">{post.tags.map((t) => <span key={t} className="label-caps text-[10px] bg-primary/50 backdrop-blur-md px-2 py-1 rounded">{t}</span>)}</div>
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/artist/${post.artist.handle}`} className="block"><span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-primary-fixed-dim" style={{ background: post.artist.avatarBg, color: post.artist.avatarFg }}>{post.artist.initials}</span></Link>
          <Link href={`/artist/${post.artist.handle}`} className="font-display text-lg font-bold">@{post.artist.handle}</Link>
          <button onClick={(e) => { e.stopPropagation(); toggleFollow(post.artist.handle); }} className={`label-caps text-[10px] px-3 py-1 rounded-full border transition-all ${following ? "bg-tertiary-container border-on-tertiary-container/50 text-on-tertiary-container" : "bg-white/10 backdrop-blur-md border-white/30 text-white"}`}>{following ? "FOLLOWING" : "FOLLOW"}</button>
        </div>
        <p className="text-[15px] leading-snug mb-3 opacity-95">{post.caption}</p>
        <div className="flex gap-2">
          {post.artist.spotify ? <a href={post.artist.spotify} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 bg-[#1DB954] text-black px-3 py-1.5 rounded-full active:scale-95"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg><span className="label-caps text-[9px]">SPOTIFY</span></a> : null}
          {post.artist.youtube ? <a href={post.artist.youtube} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-3 py-1.5 rounded-full active:scale-95"><span className="label-caps text-[9px]">▶ YOUTUBE</span></a> : null}
        </div>
      </div>

      <div className="absolute bottom-20 left-0 right-0 h-[2px] bg-white/20 z-10">
        <div className="h-full bg-on-tertiary-container w-1/3 shadow-[0_0_8px_rgba(250,92,27,0.8)]" />
      </div>

      {showBoost ? (
        <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-md flex items-end animate-fade-in" onClick={(e) => { e.stopPropagation(); setShowBoost(false); }}>
          <div className="w-full bg-surface text-on-surface rounded-t-3xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-display font-bold text-xl text-primary">Send a gift</div>
                <div className="text-xs text-on-surface-variant">to @{post.artist.handle}</div>
              </div>
              <div className="flex items-center gap-2 bg-tertiary-fixed px-3 py-1.5 rounded-full">
                <span className="text-on-tertiary-fixed-variant text-lg">✦</span>
                <span className="font-bold text-primary text-sm">{state.credits}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {quickGifts.map((g) => (
                <button key={g.name} onClick={() => sendGift(g)} disabled={state.credits < g.price} className="aspect-square rounded-xl flex flex-col items-center justify-center text-white active:scale-95 transition-transform disabled:opacity-40" style={{ background: `linear-gradient(135deg, ${g.color}, #501500)` }}>
                  <span className="text-2xl">{g.icon}</span>
                  <span className="label-caps text-[9px]">{g.name}</span>
                  <span className="text-[10px] opacity-80 mt-0.5">✦ {g.price}</span>
                </button>
              ))}
            </div>
            <Link href="/boost" onClick={() => setShowBoost(false)} className="block w-full text-center label-caps text-[10px] text-on-tertiary-container py-2">SEE ALL GIFTS · GET MORE CREDITS →</Link>
          </div>
        </div>
      ) : null}
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

function spawnGiftBurst(icon: string, color: string, rect?: DOMRect) {
  const cx = rect ? rect.left + rect.width * 0.7 : window.innerWidth * 0.7;
  const cy = rect ? rect.top + rect.height * 0.7 : window.innerHeight * 0.7;
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("div");
    el.textContent = icon;
    const dx = (Math.random() - 0.5) * 380;
    const dy = -200 - Math.random() * 400;
    const rot = (Math.random() - 0.5) * 720;
    el.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;font-size:${24 + Math.random() * 28}px;color:${color};z-index:200;pointer-events:none;transition:transform 1.3s cubic-bezier(0.2,0.7,0.3,1),opacity 1.3s;will-change:transform,opacity;text-shadow:0 0 12px ${color};`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${0.6 + Math.random()})`;
      el.style.opacity = "0";
    });
    setTimeout(() => el.remove(), 1400);
  }
  // Center pulse
  const pulse = document.createElement("div");
  pulse.textContent = icon;
  pulse.style.cssText = `position:fixed;left:50%;top:40%;transform:translate(-50%,-50%) scale(0);font-size:140px;color:${color};z-index:201;pointer-events:none;text-shadow:0 0 40px ${color},0 0 80px ${color};transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1),opacity 0.6s;`;
  document.body.appendChild(pulse);
  requestAnimationFrame(() => { pulse.style.transform = "translate(-50%,-50%) scale(1)"; });
  setTimeout(() => { pulse.style.opacity = "0"; pulse.style.transform = "translate(-50%,-50%) scale(1.6)"; }, 500);
  setTimeout(() => pulse.remove(), 1200);
}

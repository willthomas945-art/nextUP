"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

type Comment = { id: string; handle: string; initials: string; bg: string; fg: string; text: string; time: string; likes: number; isArtist?: boolean };

const seed: Comment[] = [
  { id: "c1", handle: "harmoniacjune", initials: "HJ", bg: "#ffdbcf", fg: "#2d0800", text: "the loop at 0:42 is unreal", time: "2h", likes: 124 },
  { id: "c2", handle: "NextGenJazz", initials: "NG", bg: "#ffb59c", fg: "#2d0800", text: "♥ this means a lot — rolling more like this through the weekend", time: "2h", likes: 312, isArtist: true },
  { id: "c3", handle: "vinylsundays", initials: "VS", bg: "#b1c8ec", fg: "#00152e", text: "what mic preamp is that? sounds like a vintage Neve", time: "1h", likes: 47 },
  { id: "c4", handle: "lateshift_ldn", initials: "LL", bg: "#eae2d0", fg: "#1f1b10", text: "saved. need this on the commute tomorrow", time: "45m", likes: 18 },
  { id: "c5", handle: "modularkid", initials: "MK", bg: "#fff8f5", fg: "#1e1b18", text: "would kill to know your patch", time: "12m", likes: 6 },
];

export default function CommentsPage() {
  const [comments, setComments] = useState(seed);
  const [text, setText] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  function post() {
    if (!text.trim()) return;
    setComments([{ id: Date.now().toString(), handle: "you", initials: "YO", bg: "#fa5c1b", fg: "#fff", text, time: "now", likes: 0 }, ...comments]);
    setText("");
  }

  return (
    <main className="min-h-screen bg-surface pb-32 flex flex-col">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">{comments.length} comments</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto w-full px-5 pt-4 flex-1">
        <div className="bg-surface-container-low rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-br from-primary-container to-tertiary-container text-white">NG</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-primary text-sm">@NextGenJazz</div>
            <div className="text-xs text-on-surface-variant truncate">Midnight Sessions: reimagining bebop…</div>
          </div>
          <Link href="/" className="label-caps text-[10px] text-on-tertiary-container">VIEW</Link>
        </div>

        <div className="space-y-5">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Link href="/profile" className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0" style={{ background: c.bg, color: c.fg }}>{c.initials}</Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link href="/profile" className="font-bold text-primary text-sm truncate">@{c.handle}</Link>
                  {c.isArtist && <span className="label-caps text-[8px] bg-on-tertiary-container text-white px-1.5 py-0.5 rounded">ARTIST</span>}
                  <span className="text-xs text-on-surface-variant">{c.time}</span>
                </div>
                <p className="text-[15px] text-on-surface leading-snug">{c.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setLiked({ ...liked, [c.id]: !liked[c.id] })}
                    className="flex items-center gap-1 text-on-surface-variant"
                  >
                    <svg className={`w-4 h-4 ${liked[c.id] ? "fill-on-tertiary-container stroke-on-tertiary-container" : "fill-none stroke-current"}`} viewBox="0 0 24 24" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span className="text-xs">{c.likes + (liked[c.id] ? 1 : 0)}</span>
                  </button>
                  <button className="text-xs label-caps text-on-surface-variant">REPLY</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-20 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/20 px-5 py-3">
        <div className="max-w-md mx-auto flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") post(); }}
            placeholder="Add a comment…"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant"
          />
          <button onClick={post} disabled={!text.trim()} className="label-caps text-[10px] text-on-tertiary-container disabled:text-outline">POST</button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

type Tab = "all" | "mentions" | "follows" | "gifts";

type Event = {
  type: "like" | "follow" | "comment" | "gift" | "mention";
  handle: string;
  initials: string;
  bg: string;
  fg: string;
  text: string;
  preview?: string;
  time: string;
  giftIcon?: string;
};

const events: Event[] = [
  { type: "gift", handle: "harmoniacjune", initials: "HJ", bg: "#ffdbcf", fg: "#2d0800", text: "sent you a Crown", giftIcon: "♛", time: "3m" },
  { type: "follow", handle: "modularkid", initials: "MK", bg: "#eae2d0", fg: "#1f1b10", text: "started following you", time: "12m" },
  { type: "like", handle: "lateshift_ldn", initials: "LL", bg: "#ffb59c", fg: "#2d0800", text: "and 124 others liked your post", preview: "Bridge Take 12", time: "1h" },
  { type: "comment", handle: "vinylsundays", initials: "VS", bg: "#b1c8ec", fg: "#00152e", text: "commented on Midnight Resonance", preview: "what mic preamp is that?", time: "2h" },
  { type: "gift", handle: "tape_loops", initials: "TL", bg: "#fa5c1b", fg: "#fff", text: "sent you a Pulse", giftIcon: "❤", time: "3h" },
  { type: "mention", handle: "wavefolder", initials: "WF", bg: "#7c92b4", fg: "#fff", text: "mentioned you in a comment", preview: "@LunaRaye taught me this one", time: "5h" },
  { type: "follow", handle: "ghostfreq", initials: "GF", bg: "#cec6b5", fg: "#1f1b10", text: "started following you", time: "1d" },
  { type: "like", handle: "stillsound", initials: "SS", bg: "#ffdbcf", fg: "#2d0800", text: "liked your post", preview: "The Electric Lounge Sessions", time: "1d" },
  { type: "gift", handle: "neon_park", initials: "NP", bg: "#b1c8ec", fg: "#00152e", text: "sent you 5 Sparks", giftIcon: "✦", time: "2d" },
];

const tabFilter: Record<Tab, (e: Event) => boolean> = {
  all: () => true,
  mentions: (e) => e.type === "comment" || e.type === "mention",
  follows: (e) => e.type === "follow",
  gifts: (e) => e.type === "gift",
};

export default function InboxPage() {
  const [tab, setTab] = useState<Tab>("all");
  const filtered = events.filter(tabFilter[tab]);

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Activity</h1>
          <Link href="/messages" className="ml-auto text-primary relative">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-on-tertiary-container rounded-full border-2 border-surface"></span>
          </Link>
        </div>
        <div className="flex justify-around border-t border-outline-variant/10 max-w-md mx-auto">
          {(["all", "mentions", "follows", "gifts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`label-caps text-[10px] py-3 px-2 transition-colors ${
                tab === t ? "text-on-tertiary-container border-b-2 border-on-tertiary-container" : "text-on-surface-variant"
              }`}
            >{t.toUpperCase()}</button>
          ))}
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-2">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-display font-bold text-xl text-primary mb-2">Quiet here</h2>
            <p className="text-on-surface-variant">No activity in this tab yet.</p>
          </div>
        ) : (
          <div>
            {filtered.map((e, i) => (
              <Link key={i} href={e.type === "follow" ? "/profile" : e.type === "gift" ? "/boost" : "/comments"} className="flex items-start gap-3 py-3 px-2 hover:bg-surface-container-low rounded-lg transition-colors">
                <div className="relative shrink-0">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: e.bg, color: e.fg }}>{e.initials}</span>
                  <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${eventBadge(e.type)}`}>
                    {eventGlyph(e.type, e.giftIcon)}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-on-surface leading-snug">
                    <span className="font-bold">@{e.handle}</span> <span className="text-on-surface-variant">{e.text}</span>
                    <span className="text-on-surface-variant"> · {e.time}</span>
                  </p>
                  {e.preview && <p className="text-xs text-on-surface-variant mt-1 truncate italic">{e.preview}</p>}
                </div>
                {e.type === "follow" && (
                  <button onClick={(ev) => ev.preventDefault()} className="label-caps text-[10px] bg-primary text-white px-3 py-1.5 rounded-full shrink-0">FOLLOW</button>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}

function eventBadge(type: Event["type"]) {
  switch (type) {
    case "like": return "bg-error text-white";
    case "follow": return "bg-on-tertiary-container text-white";
    case "comment": return "bg-primary text-white";
    case "gift": return "bg-tertiary-fixed-dim text-on-tertiary-container";
    case "mention": return "bg-primary-fixed-dim text-on-primary-fixed";
  }
}

function eventGlyph(type: Event["type"], giftIcon?: string) {
  switch (type) {
    case "like": return "♥";
    case "follow": return "+";
    case "comment": return "✱";
    case "gift": return giftIcon ?? "✦";
    case "mention": return "@";
  }
}

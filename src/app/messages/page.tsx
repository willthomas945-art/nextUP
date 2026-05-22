"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const threads = [
  { handle: "NextGenJazz", initials: "NG", bg: "#ffb59c", fg: "#2d0800", last: "love the take on Midnight Sun ♥", time: "2m", unread: 2 },
  { handle: "harmoniacjune", initials: "HJ", bg: "#ffdbcf", fg: "#2d0800", last: "you free for a session next thurs?", time: "1h", unread: 0 },
  { handle: "vinylsundays", initials: "VS", bg: "#b1c8ec", fg: "#00152e", last: "sent you the masters", time: "3h", unread: 0 },
  { handle: "modularkid", initials: "MK", bg: "#eae2d0", fg: "#1f1b10", last: "yo, patch attached", time: "yesterday", unread: 1 },
  { handle: "lateshift_ldn", initials: "LL", bg: "#fff8f5", fg: "#1e1b18", last: "🎸🎸🎸", time: "2d", unread: 0 },
];

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-surface pb-32 animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/profile" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Messages</h1>
          <button className="ml-auto text-primary" aria-label="New message"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-4">
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full mb-4 focus-within:ring-2 ring-on-tertiary-container">
          <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search messages" className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant" />
        </div>

        <div className="divide-y divide-outline-variant/10">
          {threads.map((t) => (
            <Link key={t.handle} href={`/messages/${t.handle}`} className="w-full flex items-center gap-3 py-3 px-2 hover:bg-surface-container-low transition-colors rounded-lg">
              <span className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style={{ background: t.bg, color: t.fg }}>{t.initials}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary truncate">@{t.handle}</span>
                  <span className="text-xs text-on-surface-variant shrink-0 ml-2">{t.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className={`text-sm truncate ${t.unread > 0 ? "text-primary font-medium" : "text-on-surface-variant"}`}>{t.last}</span>
                  {t.unread > 0 ? <span className="ml-2 bg-on-tertiary-container text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">{t.unread}</span> : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

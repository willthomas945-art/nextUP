"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

const friends = [
  { handle: "harmoniacjune", initials: "HJ", bg: "#ffdbcf", fg: "#2d0800" },
  { handle: "lateshift_ldn", initials: "LL", bg: "#eae2d0", fg: "#1f1b10" },
  { handle: "modularkid", initials: "MK", bg: "#fff8f5", fg: "#1e1b18" },
  { handle: "vinylsundays", initials: "VS", bg: "#b1c8ec", fg: "#00152e" },
  { handle: "tape_loops", initials: "TL", bg: "#ffb59c", fg: "#2d0800" },
  { handle: "wavefolder", initials: "WF", bg: "#fa5c1b", fg: "#fff" },
];

type ExtAction = "repost" | "copy" | "instagram" | "twitter" | "message" | "more";

export default function SharePage() {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 1800); }

  function handleExternal(a: ExtAction) {
    if (a === "repost") { showToast("Reposted to your profile ✓"); setTimeout(() => router.push("/profile"), 800); return; }
    if (a === "copy") { try { navigator.clipboard.writeText("https://nextup.fm/p/p1"); } catch {} showToast("Link copied to clipboard ✓"); return; }
    if (a === "instagram") { window.open("https://www.instagram.com", "_blank"); return; }
    if (a === "twitter") { window.open("https://twitter.com/intent/tweet?text=Check%20this%20out%20on%20NextUP", "_blank"); return; }
    if (a === "message") { router.push("/messages"); return; }
    if (a === "more") { if (navigator.share) navigator.share({ title: "NextUP", url: "https://nextup.fm/p/p1" }); else showToast("More options coming"); return; }
  }

  function toggle(h: string) { setPicked((p) => p.includes(h) ? p.filter((x) => x !== h) : [...p, h]); }

  function sendToFriends() {
    if (picked.length === 0) return;
    setSent(`Sent to ${picked.length} ${picked.length === 1 ? "friend" : "friends"}`);
    setTimeout(() => router.push("/messages"), 1200);
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-surface flex flex-col items-center justify-center pb-32 px-8 text-center animate-pop">
        <div className="w-20 h-20 bg-tertiary-fixed-dim rounded-full flex items-center justify-center mb-6"><svg className="w-12 h-12 text-on-tertiary-container" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
        <h2 className="font-display font-bold text-2xl text-primary mb-2">Sent</h2>
        <p className="text-on-surface-variant mb-8">{sent}.</p>
        <Link href="/messages" className="bg-primary text-white label-caps px-8 py-3 rounded-full">OPEN MESSAGES</Link>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pb-32 animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Share</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <h2 className="label-caps text-[10px] text-secondary mb-3">QUICK ACTIONS</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <ExtBtn label="Repost" onClick={() => handleExternal("repost")} bg="bg-on-tertiary-container" fg="text-white" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>} />
          <ExtBtn label="Copy link" onClick={() => handleExternal("copy")} icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>} />
          <ExtBtn label="Message" onClick={() => handleExternal("message")} icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>} />
          <ExtBtn label="Instagram" onClick={() => handleExternal("instagram")} bg="bg-[#E1306C]" fg="text-white" icon={<span className="text-base">◉</span>} />
          <ExtBtn label="X" onClick={() => handleExternal("twitter")} bg="bg-black" fg="text-white" icon={<span className="font-bold">𝕏</span>} />
          <ExtBtn label="More" onClick={() => handleExternal("more")} icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>} />
        </div>

        <h2 className="label-caps text-[10px] text-secondary mb-3">SEND TO</h2>
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full mb-4">
          <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search friends..." className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant" />
        </div>

        <div className="space-y-1">
          {friends.map((f) => {
            const on = picked.includes(f.handle);
            return (
              <button key={f.handle} onClick={() => toggle(f.handle)} className="w-full flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-surface-container-low transition-colors text-left">
                <Link href={`/artist/${f.handle}`} onClick={(e) => e.stopPropagation()} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: f.bg, color: f.fg }}>{f.initials}</Link>
                <span className="flex-1 font-bold text-primary">@{f.handle}</span>
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${on ? "bg-on-tertiary-container border-on-tertiary-container" : "border-outline-variant"}`}>
                  {on ? <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> : null}
                </span>
              </button>
            );
          })}
        </div>

        {picked.length > 0 ? (
          <div className="sticky bottom-24 mt-6 bg-primary text-white p-4 rounded-2xl shadow-2xl animate-slide-up">
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note..." className="w-full bg-white/10 placeholder:text-white/50 px-3 py-2 rounded-full outline-none text-sm mb-3" />
            <button onClick={sendToFriends} className="w-full bg-on-tertiary-container text-white label-caps py-3 rounded-full active:scale-95 transition-transform">SEND TO {picked.length} {picked.length === 1 ? "FRIEND" : "FRIENDS"}</button>
          </div>
        ) : null}
      </div>

      {toast ? <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-3 rounded-full label-caps text-[11px] z-50 animate-pop">{toast}</div> : null}
      <BottomNav />
    </main>
  );
}

function ExtBtn({ label, onClick, icon, bg = "bg-surface-container", fg = "text-primary" }: { label: string; onClick: () => void; icon: React.ReactNode; bg?: string; fg?: string }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform">
      <span className={`w-14 h-14 rounded-full flex items-center justify-center ${bg} ${fg}`}>{icon}</span>
      <span className="label-caps text-[9px] text-on-surface">{label.toUpperCase()}</span>
    </button>
  );
}

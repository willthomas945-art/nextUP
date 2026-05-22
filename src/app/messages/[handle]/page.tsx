"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getArtist } from "@/lib/data";

type Msg = { id: string; from: "me" | "them"; text: string; time: string };

const seed: Record<string, Msg[]> = {
  NextGenJazz: [
    { id: "m1", from: "them", text: "love the take on Midnight Sun ♥", time: "2m" },
    { id: "m2", from: "them", text: "you using the new patch?", time: "2m" },
    { id: "m3", from: "me", text: "yeah, dialed it in last night. send me yours?", time: "1m" },
    { id: "m4", from: "them", text: "incoming. session this weekend?", time: "30s" },
  ],
  harmoniacjune: [
    { id: "m1", from: "them", text: "you free for a session next thurs?", time: "1h" },
  ],
  vinylsundays: [
    { id: "m1", from: "me", text: "got the masters?", time: "4h" },
    { id: "m2", from: "them", text: "sent you the masters", time: "3h" },
  ],
};

export default function ChatPage() {
  const params = useParams<{ handle: string }>();
  const handle = decodeURIComponent(params.handle || "");
  const artist = getArtist(handle);
  const [messages, setMessages] = useState<Msg[]>(seed[handle] || [{ id: "m1", from: "them", text: "hey!", time: "now" }]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

  function send() {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now().toString(), from: "me", text, time: "now" }]);
    setText("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now().toString() + "r", from: "them", text: replies[Math.floor(Math.random() * replies.length)], time: "now" }]);
    }, 900);
  }

  const bg = artist?.avatarBg || "#ffdbcf";
  const fg = artist?.avatarFg || "#2d0800";
  const initials = artist?.initials || handle.slice(0, 2).toUpperCase();

  return (
    <main className="fixed inset-0 bg-surface flex flex-col animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-3 max-w-md mx-auto">
          <Link href="/messages" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <Link href={`/artist/${handle}`} className="flex items-center gap-3 flex-1">
            <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: bg, color: fg }}>{initials}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-primary">@{handle}</div>
              <div className="text-[10px] text-on-tertiary-container">Active now</div>
            </div>
          </Link>
          <button className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 max-w-md mx-auto w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-lg" style={{ background: bg, color: fg }}>{initials}</div>
          <div className="font-display font-bold text-primary">@{handle}</div>
          <Link href={`/artist/${handle}`} className="label-caps text-[10px] text-on-tertiary-container">VIEW PROFILE</Link>
        </div>
        <div className="space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-slide-up`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[15px] leading-snug ${m.from === "me" ? "bg-primary text-white rounded-br-md" : "bg-surface-container text-on-surface rounded-bl-md"}`}>{m.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-outline-variant/20 bg-surface px-5 py-3 pb-safe">
        <div className="max-w-md mx-auto flex items-center gap-2 bg-surface-container px-3 py-2 rounded-full">
          <button className="text-on-surface-variant"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></button>
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} placeholder={`Message @${handle}`} className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-on-surface-variant" />
          <button onClick={send} disabled={!text.trim()} className="bg-on-tertiary-container text-white p-2 rounded-full disabled:opacity-40 active:scale-90 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </main>
  );
}

const replies = ["nice ♥", "yes! send it", "love that", "sounds rad", "let's do it", "100%", "tomorrow?", "this is fire"];

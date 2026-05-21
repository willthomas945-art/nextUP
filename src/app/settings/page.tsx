"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { artists } from "@/lib/data";

export default function SettingsPage() {
  const a = artists.lunaraye;
  const [name, setName] = useState(a.name);
  const [handle, setHandle] = useState(a.handle);
  const [bio, setBio] = useState(a.bio);

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/profile" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Edit profile</h1>
          <Link href="/profile" className="ml-auto label-caps text-[10px] text-on-tertiary-container">SAVE</Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-4xl"
            style={{ background: `linear-gradient(135deg, ${a.avatarBg}, #501500)`, color: a.avatarFg }}
          >
            {a.initials}
          </div>
          <button className="label-caps text-[10px] text-on-tertiary-container mt-4">CHANGE PHOTO</button>
        </div>

        <div className="space-y-5">
          <Field label="DISPLAY NAME" value={name} onChange={setName} />
          <Field label="HANDLE" value={handle} onChange={setHandle} prefix="@" />
          <div>
            <label className="label-caps text-[10px] text-secondary mb-2 block">BIO</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="w-full border border-outline-variant/40 p-3 rounded-lg outline-none focus:border-primary text-[15px] bg-white" />
            <div className="text-right text-xs text-on-surface-variant mt-1">{bio.length}/160</div>
          </div>

          <div className="border-t border-outline-variant/20 pt-5 space-y-4">
            <h2 className="label-caps text-[10px] text-secondary">LINKED ACCOUNTS</h2>
            <ServiceRow name="Spotify" color="#1DB954" connected={true} />
            <ServiceRow name="Instagram" color="#E1306C" connected={true} />
            <ServiceRow name="YouTube" color="#FF0000" connected={false} />
            <ServiceRow name="SoundCloud" color="#FF7700" connected={false} />
          </div>

          <div className="border-t border-outline-variant/20 pt-5 space-y-2">
            <h2 className="label-caps text-[10px] text-secondary mb-2">ACCOUNT</h2>
            <Row label="Privacy" />
            <Row label="Notifications" />
            <Row label="Two-factor auth" />
            <Row label="Block list" />
            <Link href="/auth" className="w-full text-left py-3 label-caps text-[12px] text-error block">LOG OUT</Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

function Field({ label, value, onChange, prefix }: { label: string; value: string; onChange: (v: string) => void; prefix?: string }) {
  return (
    <div>
      <label className="label-caps text-[10px] text-secondary mb-2 block">{label}</label>
      <div className="flex items-center border border-outline-variant/40 rounded-lg bg-white focus-within:border-primary">
        {prefix ? <span className="pl-3 text-on-surface-variant">{prefix}</span> : null}
        <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent p-3 outline-none text-[15px]" />
      </div>
    </div>
  );
}

function ServiceRow({ name, color, connected }: { name: string; color: string; connected: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: color }}>{name[0]}</span>
        <span className="font-bold text-primary">{name}</span>
      </div>
      <button className={`label-caps text-[10px] px-4 py-1.5 rounded-full ${connected ? "bg-surface-container-highest text-on-surface-variant" : "bg-primary text-white"}`}>
        {connected ? "CONNECTED" : "CONNECT"}
      </button>
    </div>
  );
}

function Row({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center justify-between py-3 active:bg-surface-container-low rounded-lg px-2 transition-colors">
      <span className="text-on-surface">{label}</span>
      <svg className="w-5 h-5 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  );
}

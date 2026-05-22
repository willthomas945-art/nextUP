"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { useStore, isHandleTaken } from "@/lib/store";

export default function SettingsPage() {
  const { state, update, hydrated } = useStore();
  const router = useRouter();
  const [name, setName] = useState(state.name);
  const [handle, setHandle] = useState(state.handle);
  const [bio, setBio] = useState(state.bio);
  const [spotify, setSpotify] = useState(state.spotify || "");
  const [youtube, setYoutube] = useState(state.youtube || "");
  const [instagram, setInstagram] = useState(state.instagram || "");
  const [handleErr, setHandleErr] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) { setName(state.name); setHandle(state.handle); setBio(state.bio); setSpotify(state.spotify || ""); setYoutube(state.youtube || ""); setInstagram(state.instagram || ""); }
  }, [hydrated, state.name, state.handle, state.bio, state.spotify, state.youtube, state.instagram]);

  function onHandleChange(v: string) {
    const clean = v.replace(/[^a-zA-Z0-9_.]/g, "").slice(0, 24);
    setHandle(clean);
    if (clean !== state.handle && isHandleTaken(clean)) setHandleErr("That username is taken");
    else if (clean.length < 3) setHandleErr("At least 3 characters");
    else setHandleErr("");
  }

  function save() {
    if (handleErr) return;
    const initials = (name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase() || "??";
    update({ name, handle, bio, initials, spotify: spotify || undefined, youtube: youtube || undefined, instagram: instagram || undefined });
    setSaved(true);
    setTimeout(() => router.push("/profile"), 600);
  }

  return (
    <main className="min-h-screen bg-surface pb-32 animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/profile" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Edit profile</h1>
          <button onClick={save} disabled={!!handleErr} className="ml-auto label-caps text-[10px] text-on-tertiary-container disabled:opacity-40">{saved ? "SAVED ✓" : "SAVE"}</button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-4xl" style={{ background: `linear-gradient(135deg, ${state.avatarBg}, #501500)`, color: state.avatarFg }}>{state.initials}</div>
          <button className="label-caps text-[10px] text-on-tertiary-container mt-4">CHANGE PHOTO</button>
        </div>

        <div className="space-y-5">
          <Field label="DISPLAY NAME" value={name} onChange={setName} />
          <div>
            <label className="label-caps text-[10px] text-secondary mb-2 block">HANDLE</label>
            <div className={`flex items-center border rounded-lg bg-white transition-colors ${handleErr ? "border-error" : "border-outline-variant/40 focus-within:border-primary"}`}>
              <span className="pl-3 text-on-surface-variant">@</span>
              <input value={handle} onChange={(e) => onHandleChange(e.target.value)} className="flex-1 bg-transparent p-3 outline-none text-[15px]" />
            </div>
            {handleErr ? <div className="text-error text-xs mt-1">{handleErr}</div> : <div className="text-on-surface-variant text-xs mt-1">nextup.fm/@{handle}</div>}
          </div>
          <div>
            <label className="label-caps text-[10px] text-secondary mb-2 block">BIO</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 160))} rows={4} className="w-full border border-outline-variant/40 p-3 rounded-lg outline-none focus:border-primary text-[15px] bg-white" />
            <div className="text-right text-xs text-on-surface-variant mt-1">{bio.length}/160</div>
          </div>

          <div className="border-t border-outline-variant/20 pt-5 space-y-3">
            <h2 className="label-caps text-[10px] text-secondary">STREAMING LINKS</h2>
            <Field label="SPOTIFY URL" value={spotify} onChange={setSpotify} prefix="♪" />
            <Field label="YOUTUBE URL" value={youtube} onChange={setYoutube} prefix="▶" />
            <Field label="INSTAGRAM URL" value={instagram} onChange={setInstagram} prefix="◉" />
          </div>

          <div className="border-t border-outline-variant/20 pt-5 space-y-2">
            <h2 className="label-caps text-[10px] text-secondary mb-2">ACCOUNT</h2>
            <Row label="Privacy" />
            <Row label="Notifications" />
            <Row label="Two-factor auth" />
            <Row label="Block list" />
            <Link href="/auth" className="w-full text-left py-3 label-caps text-[12px] text-error block">LOG OUT</Link>
          </div>

          <button onClick={save} disabled={!!handleErr} className="w-full bg-primary text-white label-caps py-4 rounded-full active:scale-[0.98] transition-transform mt-2 disabled:opacity-40">
            {saved ? "SAVED ✓" : "SAVE CHANGES"}
          </button>
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
      <div className="flex items-center border border-outline-variant/40 rounded-lg bg-white focus-within:border-primary transition-colors">
        {prefix ? <span className="pl-3 text-on-surface-variant">{prefix}</span> : null}
        <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent p-3 outline-none text-[15px]" />
      </div>
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

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, isHandleTaken } from "@/lib/store";

type Mode = "signup" | "login";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signup");
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [handleErr, setHandleErr] = useState("");
  const router = useRouter();
  const { update } = useStore();

  function onHandleChange(v: string) {
    const clean = v.replace(/[^a-zA-Z0-9_.]/g, "").slice(0, 24);
    setHandle(clean);
    if (clean && isHandleTaken(clean)) setHandleErr("That username is taken");
    else if (clean && clean.length < 3) setHandleErr("At least 3 characters");
    else setHandleErr("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (handleErr) return;
    if (mode === "signup") {
      if (!handle) { setHandleErr("Pick a username"); return; }
      const initials = (name.match(/\b\w/g) || [handle[0]]).slice(0, 2).join("").toUpperCase();
      update({ name: name || handle, handle, initials, followers: 0, gifts: 0, posts: 0, verified: false });
      router.push("/onboarding");
    } else router.push("/");
  }

  return (
    <main className="min-h-screen bg-background text-on-background flex flex-col md:flex-row">
      <section className="hidden md:flex flex-1 relative overflow-hidden items-center justify-center p-16" style={{ background: "linear-gradient(135deg, #00152e 0%, #122a47 50%, #501500 120%)" }}>
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 max-w-lg text-white">
          <h1 className="font-display font-black text-6xl mb-6 leading-tight">Discover the sound of what's next.</h1>
          <p className="text-lg text-primary-fixed-dim opacity-90 leading-relaxed">A curated discovery platform for independent artists. Originals only. Authenticity over algorithms.</p>
          <div className="mt-12 flex items-center gap-4"><div className="w-12 h-[2px] bg-on-tertiary-container" /><span className="label-caps text-[11px] text-on-tertiary-container">ESTABLISHED MMXXIV</span></div>
        </div>
      </section>

      <section className="flex-1 flex flex-col bg-surface-container-low md:bg-surface items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"/></svg>
              <h2 className="font-display font-bold text-2xl text-primary">NextUP</h2>
            </div>
            <p className="font-display font-bold text-3xl md:text-4xl text-on-surface leading-tight">{mode === "signup" ? "Join the pulse of independent music." : "Welcome back."}</p>
          </div>

          <nav className="flex border-b border-outline/10">
            <button onClick={() => setMode("signup")} className={`pb-4 px-6 label-caps text-[11px] border-b-2 transition-all ${mode === "signup" ? "border-on-tertiary-container text-on-tertiary-container" : "border-transparent text-on-surface-variant"}`}>SIGN UP</button>
            <button onClick={() => setMode("login")} className={`pb-4 px-6 label-caps text-[11px] border-b-2 transition-all ${mode === "login" ? "border-on-tertiary-container text-on-tertiary-container" : "border-transparent text-on-surface-variant"}`}>LOG IN</button>
          </nav>

          <div className="space-y-3">
            <SocialButton onClick={() => router.push(mode === "signup" ? "/onboarding" : "/")} label="Continue with Spotify" color="#1DB954" letter="♪" />
            <SocialButton onClick={() => router.push(mode === "signup" ? "/onboarding" : "/")} label="Continue with Apple" color="#000" letter="" />
            <SocialButton onClick={() => router.push(mode === "signup" ? "/onboarding" : "/")} label="Continue with Google" color="#4285F4" letter="G" />
          </div>

          <div className="relative flex items-center py-2"><div className="flex-grow border-t border-outline/10" /><span className="mx-4 label-caps text-[10px] text-on-surface-variant">OR EMAIL</span><div className="flex-grow border-t border-outline/10" /></div>

          <form onSubmit={submit} className="space-y-5">
            <Field label="EMAIL" placeholder="hello@nextup.fm" />
            {mode === "signup" ? <>
              <Field label="DISPLAY NAME" placeholder="Your name" value={name} onChange={setName} />
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant ml-1 block">CHOOSE USERNAME</label>
                <div className={`flex items-center border-b transition-colors ${handleErr ? "border-error" : "border-outline/30 focus-within:border-on-tertiary-container"}`}>
                  <span className="text-on-surface-variant">@</span>
                  <input value={handle} onChange={(e) => onHandleChange(e.target.value)} placeholder="artist_alias" className="flex-1 bg-transparent py-3 px-1 outline-none text-[16px] placeholder:text-outline/60" />
                  {handle && !handleErr ? <span className="text-on-tertiary-container text-sm pr-1">✓</span> : null}
                </div>
                {handleErr ? <div className="text-error text-xs mt-1">{handleErr}</div> : handle ? <div className="text-on-surface-variant text-xs mt-1">nextup.fm/@{handle}</div> : null}
              </div>
            </> : null}
            <Field label="PASSWORD" placeholder="••••••••" type="password" />
            {mode === "login" ? <div className="flex justify-end"><button type="button" className="label-caps text-[10px] text-on-tertiary-container">FORGOT PASSWORD?</button></div> : null}
            <button type="submit" disabled={!!handleErr} className="w-full h-14 bg-primary text-background label-caps text-[11px] rounded-full hover:bg-on-tertiary-container active:scale-[0.98] transition-all disabled:opacity-40">{mode === "signup" ? "CREATE ACCOUNT" : "LOG IN"}</button>
          </form>

          <p className="text-center text-[13px] text-on-surface-variant px-4">By continuing, you agree to NextUP's <a href="#" className="underline hover:text-on-tertiary-container">Terms</a> and <a href="#" className="underline hover:text-on-tertiary-container">Privacy Policy</a>.</p>
          <div className="text-center"><Link href="/" className="label-caps text-[10px] text-on-surface-variant">SKIP — BROWSE AS GUEST</Link></div>
        </div>
      </section>
    </main>
  );
}

function SocialButton({ label, color, letter, onClick }: { label: string; color: string; letter: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center gap-3 w-full h-12 border border-outline/20 rounded-full hover:bg-surface-container-high transition-colors">
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: color }}>{letter}</span>
      <span className="label-caps text-[11px] text-on-surface">{label}</span>
    </button>
  );
}

function Field({ label, placeholder, type = "text", value, onChange }: { label: string; placeholder: string; type?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="label-caps text-[10px] text-on-surface-variant ml-1 block">{label}</label>
      <div className="flex items-center border-b border-outline/30 focus-within:border-on-tertiary-container transition-colors">
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} className="flex-1 bg-transparent py-3 px-1 outline-none text-[16px] placeholder:text-outline/60" />
      </div>
    </div>
  );
}

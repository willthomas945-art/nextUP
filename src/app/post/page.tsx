"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "camera" | "picker" | "details" | "success";
type Duration = "15s" | "60s" | "10min";

export default function PostPage() {
  const [step, setStep] = useState<Step>("camera");
  const router = useRouter();
  if (step === "camera") return <CameraView onCaptured={() => setStep("details")} onPickRoll={() => setStep("picker")} />;
  if (step === "picker") return <CameraRoll onPick={() => setStep("details")} onBack={() => setStep("camera")} />;
  if (step === "details") return <DetailsView onBack={() => setStep("camera")} onPost={() => setStep("success")} />;
  return <SuccessView onDone={() => router.push("/")} />;
}

function CameraView({ onCaptured, onPickRoll }: { onCaptured: () => void; onPickRoll: () => void }) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [facing, setFacing] = useState<"back" | "front">("front");
  const [flash, setFlash] = useState(false);
  const [duration, setDuration] = useState<Duration>("60s");

  const maxSec = duration === "15s" ? 15 : duration === "60s" ? 60 : 600;

  useEffect(() => {
    if (!recording) { setElapsed(0); return; }
    const id = setInterval(() => setElapsed((e) => {
      if (e + 1 >= maxSec) { setRecording(false); onCaptured(); return 0; }
      return e + 1;
    }), 1000);
    return () => clearInterval(id);
  }, [recording, maxSec, onCaptured]);

  function stopAndContinue() {
    if (elapsed < 1) return;
    setRecording(false);
    onCaptured();
  }

  const progress = Math.min(elapsed / maxSec, 1);

  return (
    <main className="fixed inset-0 bg-black overflow-hidden text-white animate-fade-in">
      <div className="absolute inset-0" style={{ background: facing === "front" ? "radial-gradient(circle at 50% 30%, #501500, #1f1b10 70%, #000)" : "radial-gradient(circle at 50% 70%, #122a47, #00152e 70%, #000)" }} />
      <div className="grain" />

      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-5 pb-3">
        <Link href="/" className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></Link>
        <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full label-caps text-[10px]">ORIGINALS ONLY</div>
        <button onClick={() => setFlash(!flash)} className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center ${flash ? "bg-tertiary-fixed-dim text-on-tertiary-container" : "bg-black/30"}`}><svg className="w-5 h-5" viewBox="0 0 24 24" fill={flash ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></button>
      </header>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5">
        <button onClick={() => setFacing(facing === "front" ? "back" : "front")} className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-xs label-caps">1×</button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/></svg></button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></button>
      </div>

      {recording ? <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-error px-3 py-1 rounded-full flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse" /><span className="label-caps text-[11px]">REC · {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")} / {duration.toUpperCase()}</span></div> : null}

      <div className="absolute bottom-40 left-0 right-0 flex justify-center gap-4">
        {(["15s", "60s", "10min"] as Duration[]).map((m) => (
          <button key={m} onClick={() => !recording && setDuration(m)} disabled={recording} className={`label-caps text-[11px] transition-all px-3 py-1 ${duration === m ? "text-white border-b-2 border-on-tertiary-container pb-1.5" : "text-white/50"} ${recording ? "opacity-40 cursor-not-allowed" : ""}`}>{m.toUpperCase()}</button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-6 z-30 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-end justify-between">
          <button onClick={onPickRoll} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-xl border-2 border-white/60 bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center"><svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
            <span className="label-caps text-[9px]">CAMERA ROLL</span>
          </button>

          <button onClick={() => recording ? stopAndContinue() : setRecording(true)} className="relative active:scale-95">
            {recording ? <svg className="absolute -inset-2 -m-2 w-24 h-24 -rotate-90 pointer-events-none" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4"/><circle cx="50" cy="50" r="46" fill="none" stroke="#fa5c1b" strokeWidth="4" strokeDasharray={`${progress * 289} 289`} strokeLinecap="round" /></svg> : null}
            <span className={`absolute inset-0 rounded-full ${recording ? "border-0" : "border-4 border-white"} -m-2`} />
            <span className={`block transition-all ${recording ? "w-10 h-10 rounded-lg bg-error" : "w-20 h-20 rounded-full bg-error"}`} />
          </button>

          <button className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-xl glass flex items-center justify-center"><svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>
            <span className="label-caps text-[9px]">SOUNDS</span>
          </button>
        </div>
      </div>
    </main>
  );
}

function CameraRoll({ onPick, onBack }: { onPick: () => void; onBack: () => void }) {
  const cells = Array.from({ length: 27 });
  return (
    <main className="min-h-screen bg-black text-white animate-fade-in">
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <button onClick={onBack} className="text-white"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
          <h1 className="font-display font-bold text-xl">All videos</h1>
          <button className="ml-auto label-caps text-[10px] text-white/60">ALBUMS</button>
        </div>
        <div className="px-5 pb-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["RECENTS", "VIDEOS ONLY", "FAVORITES", "SCREEN REC"].map((tag, i) => (
            <button key={tag} className={`label-caps text-[9px] px-3 py-1.5 rounded-full whitespace-nowrap ${i === 0 ? "bg-white text-black" : "bg-white/10 text-white/70"}`}>{tag}</button>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-3 gap-0.5 max-w-md mx-auto pb-32">
        {cells.map((_, i) => {
          const grads = ["from-tertiary-container to-on-tertiary-container","from-primary to-tertiary","from-secondary to-tertiary-fixed-dim","from-primary-container to-tertiary-container","from-on-tertiary-container to-tertiary","from-primary to-primary-fixed-dim","from-tertiary to-secondary","from-tertiary-fixed-dim to-on-tertiary-container","from-primary-container to-primary"];
          return (
            <button key={i} onClick={onPick} className={`aspect-square bg-gradient-to-br ${grads[i % grads.length]} relative active:opacity-70 transition-opacity`}>
              <span className="absolute top-1 right-1.5 label-caps text-[8px] bg-black/50 text-white px-1 rounded">{Math.floor(15 + (i * 7) % 50)}s</span>
              <span className="absolute bottom-1 right-1.5 text-white/80"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
            </button>
          );
        })}
      </div>
    </main>
  );
}

function DetailsView({ onBack, onPost }: { onBack: () => void; onPost: () => void }) {
  return (
    <main className="min-h-screen bg-surface pb-32 animate-slide-up">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <button onClick={onBack} className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
          <h1 className="font-display font-bold text-xl text-primary">Finalize post</h1>
        </div>
      </header>
      <div className="max-w-md mx-auto px-5 pt-6">
        <div className="flex gap-4 mb-6">
          <div className="w-24 h-32 rounded-lg bg-gradient-to-br from-primary-container to-tertiary-container flex items-center justify-center shrink-0"><svg className="w-8 h-8 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
          <div className="flex-1">
            <div className="label-caps text-[10px] text-secondary mb-2">CAPTION</div>
            <textarea rows={5} placeholder="Tell your story..." className="w-full border border-outline-variant/40 p-3 rounded-lg outline-none focus:border-primary text-[15px] bg-white" />
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="label-caps text-[10px] text-secondary mb-2 block">GENRE</label>
            <select className="w-full border border-outline-variant/40 p-3 rounded-lg outline-none focus:border-primary text-[15px] bg-white"><option>Select a genre</option><option>Jazz</option><option>Neo-Soul</option><option>Indie</option><option>Folk</option><option>Electronic</option><option>Lo-Fi</option><option>Ambient</option><option>Hip Hop</option><option>Rock</option></select>
          </div>
          <div>
            <label className="label-caps text-[10px] text-secondary mb-2 block">TAGS</label>
            <input type="text" placeholder="#live #acoustic" className="w-full border border-outline-variant/40 p-3 rounded-lg outline-none focus:border-primary text-[15px] bg-white" />
          </div>
          <button onClick={onPost} className="w-full bg-primary text-white label-caps py-4 rounded-full active:scale-[0.98] transition-transform mt-4">POST NOW</button>
          <button onClick={onBack} className="w-full label-caps text-on-surface-variant py-3">BACK</button>
        </div>
      </div>
    </main>
  );
}

function SuccessView({ onDone }: { onDone: () => void }) {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-8 text-center animate-pop">
      <div className="w-20 h-20 mx-auto mb-6 bg-tertiary-fixed-dim rounded-full flex items-center justify-center"><svg className="w-12 h-12 text-on-tertiary-container" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
      <h2 className="font-display font-bold text-3xl text-primary mb-2">You're live</h2>
      <p className="text-on-surface-variant mb-8 max-w-xs">Your post is now in the feed for everyone matching your genre.</p>
      <button onClick={onDone} className="bg-primary text-white label-caps px-8 py-3 rounded-full active:scale-95 transition-transform">SEE IT ON THE FEED</button>
    </main>
  );
}

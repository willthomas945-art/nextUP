"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "camera" | "details" | "success";

export default function PostPage() {
  const [step, setStep] = useState<Step>("camera");
  const router = useRouter();

  if (step === "camera") return <CameraView onCaptured={() => setStep("details")} />;
  if (step === "details") return <DetailsView onBack={() => setStep("camera")} onPost={() => setStep("success")} />;
  return <SuccessView onDone={() => router.push("/")} />;
}

function CameraView({ onCaptured }: { onCaptured: () => void }) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [facing, setFacing] = useState<"back" | "front">("front");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!recording) { setElapsed(0); return; }
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  function pickFromRoll() { onCaptured(); }
  function stopAndContinue() {
    if (elapsed < 1) return;
    setRecording(false);
    onCaptured();
  }

  return (
    <main className="fixed inset-0 bg-black overflow-hidden text-white">
      {/* Viewfinder (gradient placeholder for the actual camera feed) */}
      <div className="absolute inset-0" style={{ background: facing === "front"
        ? "radial-gradient(circle at 50% 30%, #501500, #1f1b10 70%, #000)"
        : "radial-gradient(circle at 50% 70%, #122a47, #00152e 70%, #000)" }} />
      <div className="grain" />

      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-5 pb-3">
        <Link href="/" className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center" aria-label="Close">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </Link>
        <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full label-caps text-[10px]">ORIGINALS ONLY</div>
        <button onClick={() => setFlash(!flash)} className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center ${flash ? "bg-tertiary-fixed-dim text-on-tertiary-container" : "bg-black/30"}`} aria-label="Flash">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill={flash ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </button>
      </header>

      {/* Side controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5">
        <button onClick={() => setFacing(facing === "front" ? "back" : "front")} className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform" aria-label="Flip camera">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
        </button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-xs label-caps">1×</button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center" aria-label="Filters">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/></svg>
        </button>
        <button className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center" aria-label="Timer">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </button>
      </div>

      {/* Duration tab */}
      {recording && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-error px-3 py-1 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="label-caps text-[11px]">REC · {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")}</span>
        </div>
      )}

      {/* Duration mode tabs */}
      <div className="absolute bottom-44 left-0 right-0 flex justify-center gap-6">
        {["15s", "60s", "10min", "PHOTO"].map((m, i) => (
          <button key={m} className={`label-caps text-[11px] ${i === 0 ? "text-white border-b-2 border-on-tertiary-container pb-1" : "text-white/60"}`}>{m}</button>
        ))}
      </div>

      {/* Bottom control rail */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-6 z-30 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-end justify-between">
          {/* Camera roll thumb */}
          <button onClick={pickFromRoll} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-xl border-2 border-white/60 bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center overflow-hidden">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <span className="label-caps text-[9px]">CAMERA ROLL</span>
          </button>

          {/* Record button */}
          <button
            onClick={() => recording ? stopAndContinue() : setRecording(true)}
            className="relative active:scale-95 transition-transform"
            aria-label={recording ? "Stop" : "Record"}
          >
            <span className={`absolute inset-0 rounded-full ${recording ? "border-4 border-error" : "border-4 border-white"} -m-2`} />
            <span className={`block transition-all ${recording ? "w-10 h-10 rounded-lg bg-error" : "w-20 h-20 rounded-full bg-error"}`} />
          </button>

          {/* Sound picker */}
          <button className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
            <div className="w-14
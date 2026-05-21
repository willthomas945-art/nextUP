"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Genre = {
  name: string;
  desc?: string;
  icon: string;
  size: "small" | "medium" | "large" | "tall";
  bg: string;
  accent?: boolean;
};

const genres: Genre[] = [
  { name: "Jazz", desc: "Spontaneous, soulful, strictly analog. For late nights and high fidelity.", icon: "♪", size: "large", bg: "bg-surface-container", accent: true },
  { name: "Neo-Soul", desc: "SMOOTH & VELVET", icon: "♥", size: "medium", bg: "bg-surface-container-high" },
  { name: "Indie", icon: "≈", size: "small", bg: "bg-secondary-container" },
  { name: "Folk", icon: "🜨", size: "small", bg: "bg-surface-container-low" },
  { name: "Electronic", icon: "▣", size: "medium", bg: "bg-primary-container" },
  { name: "Lo-Fi", icon: "◐", size: "small", bg: "bg-surface-container-highest" },
  { name: "Ambient", icon: "◌", size: "medium", bg: "bg-surface-container" },
  { name: "Hip Hop", desc: "Lyrical prowess meets technical beats.", icon: "▪", size: "large", bg: "bg-surface-variant" },
  { name: "Psych Rock", icon: "✺", size: "medium", bg: "bg-tertiary-fixed" },
  { name: "Rock", icon: "⚡", size: "medium", bg: "bg-surface-container-high" },
  { name: "Country", icon: "✦", size: "small", bg: "bg-secondary-container" },
  { name: "Alternative", desc: "Diverse, eclectic, experimental.", icon: "◆", size: "large", bg: "bg-surface-variant" },
  { name: "Grunge", icon: "☠", size: "small", bg: "bg-surface-container-highest" },
];

const sizes: Record<Genre["size"], string> = {
  small: "md:col-span-3",
  medium: "md:col-span-4",
  large: "md:col-span-5",
  tall: "md:row-span-2",
};

export default function OnboardingPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const router = useRouter();

  function toggle(name: string) {
    setPicked(picked.includes(name) ? picked.filter((g) => g !== name) : [...picked, name]);
  }

  return (
    <main className="min-h-screen bg-surface text-on-surface relative pb-32 overflow-x-hidden">
      <div className="grain fixed" />

      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-primary">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"/></svg>
            <h1 className="font-display font-bold text-xl tracking-tight">NextUP</h1>
          </div>
          <button onClick={() => router.push("/")} className="label-caps text-[10px] text-on-surface-variant">SKIP</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 md:px-16 pt-10 pb-12">
        <div className="max-w-2xl mb-10 md:mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mb-4 leading-tight tracking-tight">Pick Your Pulse</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            What kind of room are we in today? Pick the frequencies that define your current vibe — we'll tune your feed around them.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 md:auto-rows-[200px]">
          {genres.map((g) => {
            const on = picked.includes(g.name);
            return (
              <button
                key={g.name}
                onClick={() => toggle(g.name)}
                className={`relative p-5 md:p-7 rounded-tl-sm rounded-tr-2xl rounded-bl-lg rounded-br-3xl border transition-all duration-300 ease-out text-left flex flex-col justify-between active:scale-[0.98] ${
                  on
                    ? "bg-tertiary-container border-on-tertiary-container text-on-tertiary-container shadow-[6px_6px_0_#2d0800]"
                    : `${g.bg} border-outline/10 hover:-translate-y-1`
                } ${sizes[g.size]}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-2xl md:text-3xl ${on ? "text-on-tertiary-container" : "text-primary"}`}>{g.icon}</span>
                  {g.accent && !on && <span className="label-caps text-[9px] bg-primary-container text-on-primary-container px-2 py-1 rounded-full">ORGANIC</span>}
                </div>
                <div>
                  <h3 className={`font-display font-bold text-xl md:text-2xl ${on ? "text-on-tertiary-container" : "text-primary"}`}>{g.name}</h3>
                  {g.desc && (
                    <p className={`text-sm mt-1 ${on ? "text-on-tertiary-container/70" : "text-on-surface-variant"}`}>{g.desc}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md transition-all duration-500 ${picked.length > 0 ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0 pointer-events-none"} z-50`}>
        <div className="bg-primary text-white p-3 pl-6 rounded-full shadow-2xl flex justify-between items-center">
          <span className="label-caps text-[11px]">{picked.length} SELECTED</span>
          <button onClick={() => router.push("/")} className="bg-tertiary-container text-on-tertiary-container px-6 py-3 rounded-full label-caps text-[11px] active:scale-95 transition-transform">
            GENERATE PULSE
          </button>
        </div>
      </div>
    </main>
  );
}

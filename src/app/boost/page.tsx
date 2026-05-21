"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const gifts = [
  { name: "Spark", price: 1, icon: "✦", gradient: "from-tertiary-fixed to-tertiary-fixed-dim", desc: "A quick nod of appreciation" },
  { name: "Wave", price: 5, icon: "≈", gradient: "from-primary-fixed-dim to-primary-fixed", desc: "Lift their post higher" },
  { name: "Pulse", price: 12, icon: "❤", gradient: "from-tertiary-container to-on-tertiary-container", desc: "Visible boost on the leaderboard" },
  { name: "Crown", price: 50, icon: "♛", gradient: "from-on-tertiary-container to-tertiary-container", desc: "Spotlight on the For You feed" },
  { name: "Comet", price: 100, icon: "☄", gradient: "from-primary to-primary-container", desc: "Featured artist for 24h" },
  { name: "Constellation", price: 500, icon: "✺", gradient: "from-tertiary to-on-tertiary-container", desc: "Top of the Charts boost" },
];

const packs = [
  { credits: 50, price: "$4.99" },
  { credits: 120, price: "$9.99", badge: "+20% bonus" },
  { credits: 350, price: "$24.99", badge: "Best value" },
  { credits: 1000, price: "$59.99", badge: "Pro pack" },
];

export default function BoostPage() {
  const [balance, setBalance] = useState(42);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Boost</h1>
          <div className="ml-auto flex items-center gap-2 bg-tertiary-fixed px-3 py-1.5 rounded-full">
            <span className="text-on-tertiary-fixed-variant text-lg">✦</span>
            <span className="font-bold text-primary text-sm">{balance}</span>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          Send a gift to the artist. Every gift raises their post on the feed and goes 80% to the artist, 20% to the platform.
        </p>

        <h2 className="font-display font-bold text-lg text-primary mb-3">Send a gift</h2>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {gifts.map((g, i) => (
            <button
              key={g.name}
              onClick={() => setSelected(i)}
              className={`aspect-[3/4] p-3 rounded-xl bg-gradient-to-br ${g.gradient} text-white flex flex-col items-center justify-between transition-all ${
                selected === i ? "ring-2 ring-offset-2 ring-on-tertiary-container scale-[1.02]" : "active:scale-95"
              }`}
            >
              <span className="text-3xl">{g.icon}</span>
              <div className="text-center">
                <div className="font-bold text-sm">{g.name}</div>
                <div className="label-caps text-[9px] opacity-80 mt-1">✦ {g.price}</div>
              </div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="bg-primary text-white p-4 rounded-2xl mb-8 flex items-center gap-3">
            <span className="text-2xl">{gifts[selected].icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold">{gifts[selected].name} · ✦ {gifts[selected].price}</div>
              <div className="text-xs text-white/70 truncate">{gifts[selected].desc}</div>
            </div>
            <button
              onClick={() => { setBalance(balance - gifts[selected].price); setSelected(null); }}
              disabled={balance < gifts[selected].price}
              className="bg-tertiary-fixed-dim text-on-tertiary-fixed-variant label-caps px-4 py-2 rounded-full disabled:opacity-40"
            >SEND</button>
          </div>
        )}

        <h2 className="font-display font-bold text-lg text-primary mb-3">Get more credits</h2>
        <div className="space-y-2">
          {packs.map((p, i) => (
            <button key={i} className="w-full bg-surface-container hover:bg-surface-container-high transition-colors p-4 rounded-xl flex items-center gap-4">
              <span className="w-12 h-12 bg-gradient-to-br from-tertiary-container to-on-tertiary-container text-white rounded-lg flex items-center justify-center font-bold text-lg">✦</span>
              <div className="flex-1 text-left">
                <div className="font-bold text-primary">{p.credits.toLocaleString()} credits</div>
                {p.badge && <div className="label-caps text-[9px] text-on-tertiary-container mt-1">{p.badge}</div>}
              </div>
              <span className="font-display font-bold text-primary">{p.price}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-on-surface-variant mt-6 text-center">
          Payments processed through Apple/Google. Subject to platform fees. <Link href="#" className="underline">Terms</Link>
        </p>
      </div>
      <BottomNav />
    </main>
  );
}

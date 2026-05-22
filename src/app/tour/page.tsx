"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useStore } from "@/lib/store";

const tiers = [
  { id: "ga", label: "General admission", price: 35, perks: ["Standing room", "Open bar 1hr"], left: 42 },
  { id: "seat", label: "Reserved seat", price: 65, perks: ["Numbered seat", "Open bar 1hr", "Merch voucher"], left: 18 },
  { id: "vip", label: "VIP + meet & greet", price: 140, perks: ["Front row", "Open bar all night", "Signed vinyl", "Post-show meet"], left: 4 },
];

export default function TourPage() {
  const [picked, setPicked] = useState<string>("ga");
  const [confirmed, setConfirmed] = useState(false);
  const { state } = useStore();
  const isTopFan = state.followingHandles.includes("LunaRaye");
  const tier = tiers.find((t) => t.id === picked)!;
  const discount = isTopFan ? Math.round(tier.price * 0.15) : 0;
  const total = tier.price - discount;

  if (confirmed) {
    return (
      <main className="min-h-screen bg-surface flex flex-col items-center justify-center pb-32 px-8 text-center animate-pop">
        <div className="w-20 h-20 bg-tertiary-fixed-dim rounded-full flex items-center justify-center mb-6"><svg className="w-12 h-12 text-on-tertiary-container" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
        <h2 className="font-display font-bold text-2xl text-primary mb-2">You're in</h2>
        <p className="text-on-surface-variant mb-2 max-w-xs">{tier.label} secured for Paris Underworld Tour.</p>
        <p className="font-display font-bold text-3xl text-primary mb-8">${total}</p>
        <Link href="/profile" className="bg-primary text-white label-caps px-8 py-3 rounded-full">BACK TO PROFILE</Link>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pb-32 animate-fade-in">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/profile" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Get tickets</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <div className="bg-gradient-to-br from-tertiary-container to-on-tertiary-container text-white p-6 rounded-2xl mb-6 relative overflow-hidden">
          <div className="grain" />
          <div className="label-caps text-[10px] opacity-70 mb-2">UPCOMING LIVE</div>
          <h2 className="font-display font-bold text-2xl mb-1">Paris Underworld Tour</h2>
          <div className="text-sm opacity-90 mb-4">Luna Raye · OCT 24, 2024 · La Cigale, Paris</div>
          {isTopFan ? (
            <div className="bg-tertiary-fixed-dim text-on-tertiary-fixed-variant px-3 py-1.5 rounded-full label-caps text-[10px] inline-block">★ TOP FAN — 15% OFF</div>
          ) : (
            <Link href="/artist/LunaRaye" className="bg-white/15 backdrop-blur-md text-white px-3 py-1.5 rounded-full label-caps text-[10px] inline-block">FOLLOW LUNA FOR 15% OFF</Link>
          )}
        </div>

        <h3 className="font-display font-bold text-lg text-primary mb-3">Pick your ticket</h3>
        <div className="space-y-3 mb-6">
          {tiers.map((t) => {
            const on = picked === t.id;
            const tierDiscount = isTopFan ? Math.round(t.price * 0.15) : 0;
            return (
              <button key={t.id} onClick={() => setPicked(t.id)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${on ? "border-on-tertiary-container bg-tertiary-fixed/30 shadow-[4px_4px_0_rgba(250,92,27,0.15)]" : "border-outline-variant/30 bg-surface-container-low"}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-display font-bold text-lg text-primary">{t.label}</div>
                    <div className="label-caps text-[9px] text-on-surface-variant mt-0.5">{t.left} LEFT</div>
                  </div>
                  <div className="text-right">
                    {tierDiscount > 0 ? <div className="text-xs text-on-surface-variant line-through">${t.price}</div> : null}
                    <div className="font-display font-bold text-2xl text-primary">${t.price - tierDiscount}</div>
                  </div>
                </div>
                <ul className="space-y-1">
                  {t.perks.map((p) => <li key={p} className="text-sm text-on-surface-variant flex items-center gap-2"><span className="text-on-tertiary-container">✓</span>{p}</li>)}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="bg-surface-container-low p-4 rounded-2xl mb-6">
          <div className="flex justify-between text-sm text-on-surface-variant mb-1"><span>{tier.label}</span><span>${tier.price}</span></div>
          {discount > 0 ? <div className="flex justify-between text-sm text-on-tertiary-container mb-1"><span>Top Fan discount (15%)</span><span>−${discount}</span></div> : null}
          <div className="border-t border-outline-variant/20 mt-2 pt-2 flex justify-between"><span className="font-display font-bold text-primary">Total</span><span className="font-display font-bold text-2xl text-primary">${total}</span></div>
        </div>

        <button onClick={() => setConfirmed(true)} className="w-full bg-primary text-white label-caps py-4 rounded-full active:scale-[0.98] transition-transform">BUY NOW · ${total}</button>
        <p className="text-xs text-on-surface-variant mt-3 text-center">Tickets are non-refundable. Transferable to another wallet.</p>
      </div>
      <BottomNav />
    </main>
  );
}

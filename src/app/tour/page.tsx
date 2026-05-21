"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const bids = [
  { handle: "harmoniacjune", initials: "HJ", bg: "#ffdbcf", fg: "#2d0800", amount: 142 },
  { handle: "vinylsundays", initials: "VS", bg: "#b1c8ec", fg: "#00152e", amount: 138 },
  { handle: "modularkid", initials: "MK", bg: "#eae2d0", fg: "#1f1b10", amount: 120 },
  { handle: "lateshift_ldn", initials: "LL", bg: "#ffb59c", fg: "#2d0800", amount: 115 },
];

export default function TourPage() {
  const [amount, setAmount] = useState(150);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <main className="min-h-screen bg-surface flex flex-col items-center justify-center pb-32 px-8 text-center">
        <div className="w-20 h-20 bg-tertiary-fixed-dim rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-on-tertiary-container" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <h2 className="font-display font-bold text-2xl text-primary mb-2">You're top bidder</h2>
        <p className="text-on-surface-variant mb-8">Bid of ${amount} placed. You'll get a notification if someone outbids you.</p>
        <Link href="/profile" className="bg-primary text-white label-caps px-8 py-3 rounded-full">BACK TO PROFILE</Link>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-md mx-auto">
          <Link href="/profile" className="text-primary"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></Link>
          <h1 className="font-display font-bold text-xl text-primary">Reserve seat</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pt-6">
        <div className="bg-gradient-to-br from-tertiary-container to-on-tertiary-container text-white p-6 rounded-2xl mb-6 relative overflow-hidden">
          <div className="grain" />
          <div className="label-caps text-[10px] opacity-70 mb-2">UPCOMING LIVE</div>
          <h2 className="font-display font-bold text-2xl mb-1">Paris Underworld Tour</h2>
          <div className="text-sm opacity-90 mb-4">Luna Raye · OCT 24, 2024 · La Cigale, Paris</div>
          <div className="flex gap-4 text-sm">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">120 seats</span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">48 reserved</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-lg text-primary mb-3">Place a bid</h3>
        <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
          Pay-what-it's-worth ticketing. The top 120 bidders get in. Minimum bid $25.
        </p>
        <div className="bg-surface-container p-6 rounded-2xl mb-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-display font-bold text-5xl text-primary">${amount}</span>
            <span className="label-caps text-[10px] text-on-surface-variant">USD</span>
          </div>
          <input
            type="range"
            min="25"
            max="500"
            step="5"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-on-tertiary-container"
          />
          <div className="flex justify-between text-xs text-on-surface-variant mt-2">
            <span>$25</span><span>$500</span>
          </div>
        </div>

        <button onClick={() => setConfirmed(true)} className="w-full bg-primary text-white label-caps py-4 rounded-full active:scale-[0.98] transition-transform mb-8">
          PLACE BID OF ${amount}
        </button>

        <h3 className="font-display font-bold text-lg text-primary mb-3">Top bids</h3>
        <div className="space-y-2">
          {bids.map((b, i) => (
            <div key={b.handle} className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl">
              <span className="font-display text-on-tertiary-container w-6">{i + 1}</span>
              <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: b.bg, color: b.fg }}>{b.initials}</span>
              <span className="flex-1 font-bold text-primary">@{b.handle}</span>
              <span className="font-display font-bold text-primary">${b.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

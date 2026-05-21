"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: HomeIcon, match: (p: string) => p === "/" },
  { href: "/charts", label: "Charts", icon: ChartIcon, match: (p: string) => p.startsWith("/charts") },
  { href: "/post", label: "Post", icon: PlusIcon, match: (p: string) => p.startsWith("/post"), primary: true },
  { href: "/profile", label: "Profile", icon: UserIcon, match: (p: string) => p.startsWith("/profile") },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/20 rounded-t-3xl shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 py-2">
        {items.map((item) => {
          const active = item.match(pathname);
          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="-mt-4">
                <span className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <item.icon className="w-7 h-7" />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-all ${
                active
                  ? "bg-primary-container text-on-primary-container rounded-full px-5 py-2"
                  : "text-on-surface-variant hover:text-primary p-2"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="label-caps text-[9px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

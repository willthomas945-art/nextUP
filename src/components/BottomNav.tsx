"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; icon: React.ComponentType<{ className?: string }>; match: (p: string) => boolean; primary?: boolean };

const items: Item[] = [
  { href: "/", label: "Home", icon: HomeIcon, match: (p) => p === "/" },
  { href: "/charts", label: "Charts", icon: ChartIcon, match: (p) => p.startsWith("/charts") },
  { href: "/post", label: "Post", icon: PlusIcon, match: (p) => p.startsWith("/post"), primary: true },
  { href: "/inbox", label: "Inbox", icon: BellIcon, match: (p) => p.startsWith("/inbox") },
  { href: "/profile", label: "Profile", icon: UserIcon, match: (p) => p.startsWith("/profile") || p.startsWith("/artist") },
];

export default function BottomNav() {
  const pathname = usePathname();
  const onDark = pathname === "/" || pathname.startsWith("/charts") || pathname.startsWith("/following") || pathname.startsWith("/post");

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 ${onDark ? "bg-black/40 backdrop-blur-xl" : "bg-surface/95 backdrop-blur-lg border-t border-outline-variant/20"} pb-safe`}>
      <div className="max-w-md mx-auto flex justify-around items-center px-3 pt-1.5 pb-2">
        {items.map((item) => {
          const active = item.match(pathname);
          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="-mt-3 active:scale-90 transition-transform">
                <span className="w-12 h-12 bg-on-tertiary-container text-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <item.icon className="w-6 h-6" />
                </span>
              </Link>
            );
          }
          const Icon = item.icon;
          const color = onDark ? (active ? "text-white" : "text-white/55") : (active ? "text-primary" : "text-on-surface-variant");
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center px-2 py-1 ${color}`}>
              <Icon className={`w-5 h-5 ${active ? "scale-110" : ""} transition-transform`} />
              <span className="label-caps text-[8px] mt-0.5">{item.label.toUpperCase()}</span>
              {item.href === "/inbox" ? <span className="absolute mt-1 ml-4 w-2 h-2 bg-on-tertiary-container rounded-full ring-2 ring-black/30"></span> : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function ChartIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function PlusIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function BellIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
}
function UserIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

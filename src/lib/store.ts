"use client";
import { useEffect, useState, useCallback } from "react";

const KEY = "nextup_store_v1";

export type Show = {
  id: string;
  title: string;
  venue: string;
  date: string;
  currentBid: number;
};

export type UserState = {
  name: string;
  handle: string;
  bio: string;
  initials: string;
  avatarBg: string;
  avatarFg: string;
  followers: number;
  gifts: number;
  posts: number;
  verified: boolean;
  upcoming: Show[];
  followingHandles: string[];
  likedPostIds: string[];
  selectedGenres: string[];
  credits: number;
  spotify?: string;
  youtube?: string;
  instagram?: string;
};

const DEFAULT: UserState = {
  name: "Luna Raye",
  handle: "LunaRaye",
  bio: "Electronic soul from the heart of London. Crafting analog sounds for a digital world. New single 'Midnight Pulse' out now.",
  initials: "LR",
  avatarBg: "#ffdbcf",
  avatarFg: "#00152e",
  followers: 1240000,
  gifts: 45000,
  posts: 128,
  verified: true,
  upcoming: [
    { id: "sh1", title: "Paris Underworld Tour", venue: "La Cigale, Paris", date: "Oct 24, 2024", currentBid: 142 },
    { id: "sh2", title: "Acoustic in the Dark", venue: "Cafe Oto, London", date: "Nov 8, 2024", currentBid: 65 },
    { id: "sh3", title: "Late Night Studio Stream", venue: "Online", date: "Nov 15, 2024", currentBid: 12 },
  ],
  followingHandles: ["NextGenJazz"],
  likedPostIds: [],
  selectedGenres: ["Neo-Soul", "Jazz", "Lo-Fi"],
  credits: 42,
  spotify: "https://open.spotify.com",
  youtube: "https://youtube.com",
  instagram: "https://instagram.com",
};

function read(): UserState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch { return DEFAULT; }
}

function write(s: UserState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("nextup-store-change"));
}

export function useStore() {
  const [state, setState] = useState<UserState>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
    const onChange = () => setState(read());
    window.addEventListener("nextup-store-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("nextup-store-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = useCallback((patch: Partial<UserState>) => {
    setState((prev) => { const next = { ...prev, ...patch }; write(next); return next; });
  }, []);

  const toggleFollow = useCallback((handle: string) => {
    setState((prev) => {
      const isFollowing = prev.followingHandles.includes(handle);
      const next = {
        ...prev,
        followingHandles: isFollowing ? prev.followingHandles.filter((h) => h !== handle) : [...prev.followingHandles, handle],
      };
      write(next);
      return next;
    });
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setState((prev) => {
      const liked = prev.likedPostIds.includes(postId);
      const next = {
        ...prev,
        likedPostIds: liked ? prev.likedPostIds.filter((p) => p !== postId) : [...prev.likedPostIds, postId],
      };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => { write(DEFAULT); setState(DEFAULT); }, []);

  return { state, hydrated, update, toggleFollow, toggleLike, reset };
}

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  return n.toString();
}

const TAKEN_HANDLES = new Set([
  "lunaraye","nextgenjazz","silkandstatic","modularkid","harmoniacjune","lateshift_ldn",
  "vinylsundays","tape_loops","wavefolder","ghostfreq","neon_park","stillsound",
  "admin","nextup","support","test","music","official",
]);

export function isHandleTaken(handle: string): boolean {
  return TAKEN_HANDLES.has(handle.toLowerCase().replace(/^@/, ""));
}

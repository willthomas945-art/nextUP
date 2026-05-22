export type Artist = {
  handle: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarFg: string;
  verified: boolean;
  bio: string;
  followers: string;
  gifts: string;
  posts: number;
  spotify?: string;
  youtube?: string;
  instagram?: string;
  upcoming?: { title: string; date: string; venue: string }[];
};

export type Post = {
  id: string;
  artist: Artist;
  caption: string;
  tags: string[];
  genre: string;
  likes: number;
  comments: number;
  gradient: string;
  trackTitle: string;
};

const ARTIST_SEED: Array<Partial<Artist> & { handle: string; initials: string }> = [
  { handle: "LunaRaye", name: "Luna Raye", initials: "LR", avatarBg: "#ffdbcf", avatarFg: "#00152e", verified: true, bio: "Electronic soul from London.", spotify: "https://open.spotify.com", youtube: "https://youtube.com", instagram: "https://instagram.com" },
  { handle: "NextGenJazz", name: "NextGen Jazz", initials: "NG", avatarBg: "#ffb59c", avatarFg: "#2d0800", verified: false, bio: "Bebop with modular synths. Brooklyn collective.", spotify: "https://open.spotify.com" },
  { handle: "SilkAndStatic", name: "Silk & Static", initials: "SA", avatarBg: "#b1c8ec", avatarFg: "#00152e", verified: false, bio: "Bedroom indie out of Manchester.", spotify: "https://open.spotify.com", youtube: "https://youtube.com" },
  { handle: "harmoniacjune", initials: "HJ", avatarBg: "#ffdbcf", avatarFg: "#2d0800" },
  { handle: "modularkid", initials: "MK", avatarBg: "#eae2d0", avatarFg: "#1f1b10" },
  { handle: "vinylsundays", initials: "VS", avatarBg: "#b1c8ec", avatarFg: "#00152e" },
  { handle: "lateshift_ldn", initials: "LL", avatarBg: "#fff8f5", avatarFg: "#1e1b18" },
  { handle: "tape_loops", initials: "TL", avatarBg: "#ffb59c", avatarFg: "#2d0800" },
  { handle: "wavefolder", initials: "WF", avatarBg: "#7c92b4", avatarFg: "#ffffff" },
  { handle: "ghostfreq", initials: "GF", avatarBg: "#cec6b5", avatarFg: "#1f1b10" },
  { handle: "neon_park", initials: "NP", avatarBg: "#fa5c1b", avatarFg: "#ffffff" },
  { handle: "stillsound", initials: "SS", avatarBg: "#ffdbcf", avatarFg: "#2d0800" },
  { handle: "patternlab", initials: "PL", avatarBg: "#d4e3ff", avatarFg: "#00152e" },
  { handle: "amber_keys", initials: "AK", avatarBg: "#ffb59c", avatarFg: "#2d0800" },
  { handle: "cloudbox", initials: "CB", avatarBg: "#b1c8ec", avatarFg: "#00152e" },
  { handle: "saltlick", initials: "SL", avatarBg: "#eae2d0", avatarFg: "#1f1b10" },
  { handle: "kareem.h", initials: "KH", avatarBg: "#fa5c1b", avatarFg: "#ffffff" },
  { handle: "midniteFM", initials: "MF", avatarBg: "#7c92b4", avatarFg: "#ffffff" },
  { handle: "junipertape", initials: "JT", avatarBg: "#ffdbcf", avatarFg: "#2d0800" },
  { handle: "obsidian_soft", initials: "OS", avatarBg: "#2d0800", avatarFg: "#ffb59c" },
];

const GENRES = ["Jazz","Neo-Soul","Indie","Folk","Electronic","Lo-Fi","Ambient","Hip Hop","Psych Rock","Rock","Country","Alternative"];

function expandArtist(seed: Partial<Artist> & { handle: string; initials: string }, i: number): Artist {
  const followers = [1240000, 84200, 12400, 7800, 4300, 2100, 980, 540][i % 8] || (5000 - i * 30);
  return {
    handle: seed.handle,
    name: seed.name ?? seed.handle.charAt(0).toUpperCase() + seed.handle.slice(1).replace(/_/g, " "),
    initials: seed.initials,
    avatarBg: seed.avatarBg || "#ffdbcf",
    avatarFg: seed.avatarFg || "#2d0800",
    verified: seed.verified ?? i < 4,
    bio: seed.bio ?? `${GENRES[i % GENRES.length]} artist. Original tracks only.`,
    followers: formatCount(followers),
    gifts: formatCount(Math.floor(followers / 27)),
    posts: 20 + ((i * 7) % 180),
    spotify: seed.spotify,
    youtube: seed.youtube,
    instagram: seed.instagram,
    upcoming: i % 5 === 0 ? [{ title: "Late Sets " + (i + 1), date: "Nov " + (5 + i) + ", 2024", venue: "Various" }] : undefined,
  };
}

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  return n.toString();
}

export const artists: Record<string, Artist> = Object.fromEntries(
  ARTIST_SEED.map((s, i) => [s.handle.toLowerCase(), expandArtist(s, i)])
);

export function getArtist(handle: string): Artist | null {
  return artists[handle.toLowerCase().replace(/^@/, "")] || null;
}

const GRADIENTS = [
  "linear-gradient(135deg, #122a47 0%, #00152e 40%, #501500 100%)",
  "linear-gradient(135deg, #2d0800 0%, #501500 50%, #fa5c1b 120%)",
  "linear-gradient(135deg, #1f1b10 0%, #122a47 70%, #7c92b4 130%)",
  "linear-gradient(135deg, #645e50 0%, #2d0800 60%, #501500 100%)",
  "linear-gradient(135deg, #00152e 0%, #4a5f7f 100%)",
  "linear-gradient(135deg, #501500, #ffb59c)",
  "linear-gradient(135deg, #122a47, #fa5c1b)",
];

const CAPTIONS = [
  "Late-night session. Original. Headphones recommended.",
  "Three days on this bridge. Finally clicked.",
  "Practising every morning. This is take 4.",
  "Just a Rhodes and a 4-track. No edits.",
  "First time playing this live. Be gentle.",
  "Stripped-back take through a Neve mic pre.",
  "Modular patch from scratch. Took 6 hours.",
  "Recorded between flights. Out next week.",
  "Demo only. Please don't bootleg.",
  "Loop layered live in one pass.",
];

const TRACK_TITLES = [
  "Midnight Resonance","Velvet Echo","Neon Pulse","Glitch in the Grid","Basement Tapes",
  "Electric Soul","Urban Jungle","Fading Signal","Retrograde","Synth Dreams",
  "Bridge Take 12","Bedroom Lights","After Hours","Cobalt Drift","Lunar Phase",
];

export const posts: Post[] = ARTIST_SEED.slice(0, 8).map((s, i) => ({
  id: "p" + (i + 1),
  artist: artists[s.handle.toLowerCase()],
  caption: CAPTIONS[i % CAPTIONS.length],
  tags: [GENRES[i % GENRES.length].toUpperCase(), i % 3 === 0 ? "LIVE" : "ORIGINAL"],
  genre: GENRES[i % GENRES.length],
  likes: 12400 - i * 1100,
  comments: 482 - i * 40,
  gradient: GRADIENTS[i % GRADIENTS.length],
  trackTitle: TRACK_TITLES[i % TRACK_TITLES.length],
}));

const CHART_TITLES = [
  "Lunar Echoes","Synth Waves","Neon Pulse","Cobalt Drift","Velvet Static","Bedroom Lights",
  "After Hours","Bridge Take 12","Midnight Pulse","Frequencies","Glass Walls","Late Light",
  "Inkwell","Holiday in the Dark","Old Camera","Salt Air","Paper Cut","Lighthouse Tape",
  "Junipertide","Soft Rain","Riverbed","Quiet Riot","Cassette Sky","Static & Silk",
];

export type ChartEntry = {
  rank: number;
  title: string;
  artist: Artist;
  caption: string;
  tags: string[];
  gradient: string;
  trend: "stars" | "up" | "down" | "flat";
  change: number;
};

export const charts: ChartEntry[] = Array.from({ length: 100 }, (_, i) => {
  const seed = ARTIST_SEED[i % ARTIST_SEED.length];
  return {
    rank: i + 1,
    title: CHART_TITLES[i % CHART_TITLES.length] + (i >= CHART_TITLES.length ? " · " + (Math.floor(i / CHART_TITLES.length) + 1) : ""),
    artist: artists[seed.handle.toLowerCase()],
    caption: CAPTIONS[i % CAPTIONS.length],
    tags: [GENRES[i % GENRES.length].toUpperCase()],
    gradient: GRADIENTS[i % GRADIENTS.length],
    trend: i === 0 ? "stars" : (i % 4 === 0 ? "up" : i % 5 === 0 ? "down" : "flat"),
    change: (i * 31) % 13,
  };
});

export const allGenres = GENRES;

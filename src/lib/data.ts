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
};

export type Post = {
  id: string;
  artist: Artist;
  caption: string;
  tags: string[];
  likes: string;
  comments: string;
  gradient: string;
  trackTitle: string;
};

export const artists: Record<string, Artist> = {
  nextgenjazz: {
    handle: "NextGenJazz",
    name: "NextGen Jazz",
    initials: "NG",
    avatarBg: "#ffb59c",
    avatarFg: "#2d0800",
    verified: false,
    bio: "Reimagining bebop for the modular synth era. Brooklyn collective, three rotating members, one Rhodes piano.",
    followers: "84.2K",
    gifts: "12K",
    posts: 47,
  },
  lunaraye: {
    handle: "LunaRaye",
    name: "Luna Raye",
    initials: "LR",
    avatarBg: "#ffdbcf",
    avatarFg: "#00152e",
    verified: true,
    bio: "Electronic soul from the heart of London. Crafting analog sounds for a digital world. New single 'Midnight Pulse' out now.",
    followers: "1.2M",
    gifts: "45K",
    posts: 128,
  },
  silkandstatic: {
    handle: "SilkAndStatic",
    name: "Silk & Static",
    initials: "SA",
    avatarBg: "#b1c8ec",
    avatarFg: "#00152e",
    verified: false,
    bio: "Two guitars and a Tascam four-track. Bedroom indie out of Manchester.",
    followers: "12.4K",
    gifts: "3.1K",
    posts: 62,
  },
};

export const posts: Post[] = [
  {
    id: "p1",
    artist: artists.nextgenjazz,
    caption: "Midnight Sessions: reimagining bebop with modular synths. #JazzFusion #LiveLoop",
    tags: ["JAZZ", "LIVE"],
    likes: "12.4K",
    comments: "482",
    gradient: "linear-gradient(135deg, #122a47 0%, #00152e 40%, #501500 100%)",
    trackTitle: "Midnight Resonance",
  },
  {
    id: "p2",
    artist: artists.lunaraye,
    caption: "Stripped-back take on 'Midnight Pulse' — one-take through a Neve mic pre. #NeoSoul",
    tags: ["NEO-SOUL"],
    likes: "8.1K",
    comments: "214",
    gradient: "linear-gradient(135deg, #2d0800 0%, #501500 50%, #fa5c1b 120%)",
    trackTitle: "Midnight Pulse",
  },
  {
    id: "p3",
    artist: artists.silkandstatic,
    caption: "First take after three months rebuilding the bridge. Headphones on. #IndieRock",
    tags: ["INDIE", "OPEN MIC"],
    likes: "3.7K",
    comments: "94",
    gradient: "linear-gradient(135deg, #1f1b10 0%, #122a47 70%, #7c92b4 130%)",
    trackTitle: "Bridge Take 12",
  },
];

export const charts = [
  {
    rank: 1,
    title: "Lunar Echoes",
    artist: artists.lunaraye,
    caption: "Performing 'Midnight Sun' at the Echo Chambers. Held #1 for 3 consecutive weeks.",
    tags: ["NEO-SOUL", "LIVE"],
    gradient: "linear-gradient(135deg, #2d0800 0%, #501500 50%, #fa5c1b 120%)",
    trend: "stars",
  },
  {
    rank: 2,
    title: "Synth Waves",
    artist: artists.nextgenjazz,
    caption: "Climbing fast from #5 last week. 'Retro-Future' is taking the community by storm.",
    tags: ["ELECTRONIC"],
    gradient: "linear-gradient(135deg, #122a47 0%, #00152e 40%, #1f1b10 100%)",
    trend: "up",
  },
  {
    rank: 3,
    title: "Neon Pulse",
    artist: artists.silkandstatic,
    caption: "Late-night session on rotation in jazz clubs across Brooklyn.",
    tags: ["JAZZ"],
    gradient: "linear-gradient(135deg, #645e50 0%, #2d0800 60%, #501500 100%)",
    trend: "flat",
  },
];

// Updated with // vornato comments for easy editing
// All editable text, links, images, and video sources now marked with // vornato

<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
=======
import React, { useEffect, useMemo, useState } from "react";
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
import { motion, useScroll, useTransform } from "framer-motion";

// --- Minimal UI components (kept in-file so the project works standalone) ---
export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = "", ...props }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-100 ${className}`} {...props} />
);
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary" }> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-0";
  const styles = variant === "secondary"
    ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:ring-zinc-600"
    : "bg-white text-black hover:bg-zinc-200 focus:ring-white";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
};

// ==================== CONFIG you can change ====================
// vornato: Your photo URL
<<<<<<< HEAD
const PHOTO_URL = `${import.meta.env.BASE_URL}Mainc.png`;

// vornato: Small YouTube avatar (compact & crisp)
const YT_AVATAR_URL =
  "https://yt3.googleusercontent.com/ytc/AIdro_kf3xJ6bywZg1fV9tYBQuFrMhlQmycMOk5MYPxwLQ=s800-c-k-c0x00ffffff-no-rj"; // vornato
=======
const PHOTO_URL = "https://placehold.co/640x800/png?text=Levani+Photo"; // vornato
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)

// vornato: Quick contact chips (top on mobile)
const quickLinks = [
  { label: "Email", href: "mailto:levaniesitashvili1999@gmail.com" }, // vornato
  { label: "+995 595 55 14 05", href: "tel:+995595551405" }, // vornato
  { label: "YouTube: VorNato", href: "https://youtube.com/@vornatoofficial" }, // vornato
  { label: "Behance: vornato", href: "https://www.behance.net/vornato" }, // vornato
<<<<<<< HEAD
  { label: "Fiverr", href: "https://www.fiverr.com/sellers/vornatoofficial" }, // vornato
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~012da965c61594d259" }, // vornato
];

// ==== Data types ====
type PortfolioItem = {
  title: string;
  tag?: string;
  poster?: string;      // vornato: thumbnail/poster url (YouTube or local)
  href?: string;        // vornato: Behance/External link
  provider?: "youtube" | "html5"; // vornato: player type
  embedId?: string;     // vornato: for YouTube
  src?: string;         // vornato: for html5 videos
  orientation?: "vertical" | "horizontal"; // vertical=1080x1920, horizontal=1920x1080
};

// ========== Portfolio items (YouTube where requested) ==========

// Casino (3 Shorts + 1 standard)
const casinoItems: PortfolioItem[] = [
  { title: "Casino Short 1", tag: "Casino", provider: "youtube", embedId: "upR7VahYFns", poster: "https://img.youtube.com/vi/upR7VahYFns/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Casino Short 2", tag: "Casino", provider: "youtube", embedId: "gcNzXB7Suz4", poster: "https://img.youtube.com/vi/gcNzXB7Suz4/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Casino Short 3", tag: "Casino", provider: "youtube", embedId: "5x4v_d2RvFc", poster: "https://img.youtube.com/vi/5x4v_d2RvFc/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Casino Promo",   tag: "Casino", provider: "youtube", embedId: "12I1ZI218g0", poster: "https://img.youtube.com/vi/12I1ZI218g0/maxresdefault.jpg", orientation: "horizontal" }, // vornato
];

// Sports (6 Shorts)
const sportsItems: PortfolioItem[] = [
  { title: "Sports Short 1", tag: "Sports", provider: "youtube", embedId: "E6GFqu2ttew", poster: "https://img.youtube.com/vi/E6GFqu2ttew/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Sports Short 2", tag: "Sports", provider: "youtube", embedId: "rrS3HWgNbYY", poster: "https://img.youtube.com/vi/rrS3HWgNbYY/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Sports Short 3", tag: "Sports", provider: "youtube", embedId: "sKgoTYIXh64", poster: "https://img.youtube.com/vi/sKgoTYIXh64/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Sports Short 4", tag: "Sports", provider: "youtube", embedId: "hpGqE-6rxsA", poster: "https://img.youtube.com/vi/hpGqE-6rxsA/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Sports Short 5", tag: "Sports", provider: "youtube", embedId: "bT4JhehsXEU", poster: "https://img.youtube.com/vi/bT4JhehsXEU/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Sports Short 6", tag: "Sports", provider: "youtube", embedId: "kxHJrAXDAN0", poster: "https://img.youtube.com/vi/kxHJrAXDAN0/maxresdefault.jpg", orientation: "vertical" }, // vornato
];

// Events & Clubs (3 Shorts)
const eventsItems: PortfolioItem[] = [
  { title: "Event Short 1", tag: "Events", provider: "youtube", embedId: "NBENHBn7lnw", poster: "https://img.youtube.com/vi/NBENHBn7lnw/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Event Short 2", tag: "Events", provider: "youtube", embedId: "FRnkFAiz48w", poster: "https://img.youtube.com/vi/FRnkFAiz48w/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Event Short 3", tag: "Events", provider: "youtube", embedId: "K5wcGhLh-Cs", poster: "https://img.youtube.com/vi/K5wcGhLh-Cs/maxresdefault.jpg", orientation: "vertical" }, // vornato
];

// SLOTS (8 YouTube videos)
const slotsItems: PortfolioItem[] = [
  { title: "Slots Video 1", tag: "Slots", provider: "youtube", embedId: "9k06t0JCjX4", poster: "https://img.youtube.com/vi/9k06t0JCjX4/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 2", tag: "Slots", provider: "youtube", embedId: "63VB0YRhYw0", poster: "https://img.youtube.com/vi/63VB0YRhYw0/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 3", tag: "Slots", provider: "youtube", embedId: "oR1DuHQEv98", poster: "https://img.youtube.com/vi/oR1DuHQEv98/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 4", tag: "Slots", provider: "youtube", embedId: "X1SvZQoOvek", poster: "https://img.youtube.com/vi/X1SvZQoOvek/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 5", tag: "Slots", provider: "youtube", embedId: "YzbS-s_5rk4", poster: "https://img.youtube.com/vi/YzbS-s_5rk4/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 6", tag: "Slots", provider: "youtube", embedId: "jz4hxRYBxC0", poster: "https://img.youtube.com/vi/jz4hxRYBxC0/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 7", tag: "Slots", provider: "youtube", embedId: "xB8Oivu_7H0", poster: "https://img.youtube.com/vi/xB8Oivu_7H0/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "Slots Video 8", tag: "Slots", provider: "youtube", embedId: "aWNJ_rZ7SBU", poster: "https://img.youtube.com/vi/aWNJ_rZ7SBU/maxresdefault.jpg", orientation: "horizontal" }, // vornato
];

// YouTube (3 main)
const youtubeItems: PortfolioItem[] = [
  { title: "YouTube #1", tag: "YouTube", provider: "youtube", embedId: "T4mBnh8uf24", poster: "https://img.youtube.com/vi/T4mBnh8uf24/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "YouTube #2", tag: "YouTube", provider: "youtube", embedId: "VidlLQRZBm0", poster: "https://img.youtube.com/vi/VidlLQRZBm0/maxresdefault.jpg", orientation: "horizontal" }, // vornato
  { title: "YouTube #3", tag: "YouTube", provider: "youtube", embedId: "hGEj_6f-lP8", poster: "https://img.youtube.com/vi/hGEj_6f-lP8/maxresdefault.jpg", orientation: "horizontal" }, // vornato
];

// Fiverr (single big card → Behance)
const fiverrCover = `${import.meta.env.BASE_URL}fiverr.png`;

// Fantasy (3 Shorts)
const fantasyItems: PortfolioItem[] = [
  { title: "Fantasy Short 1", tag: "Fantasy", provider: "youtube", embedId: "7HlNY5BPZk0", poster: "https://img.youtube.com/vi/7HlNY5BPZk0/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Fantasy Short 2", tag: "Fantasy", provider: "youtube", embedId: "sVsOgIr5mws", poster: "https://img.youtube.com/vi/sVsOgIr5mws/maxresdefault.jpg", orientation: "vertical" }, // vornato
  { title: "Fantasy Short 3", tag: "Fantasy", provider: "youtube", embedId: "wqPAeIhHqgg", poster: "https://img.youtube.com/vi/wqPAeIhHqgg/maxresdefault.jpg", orientation: "vertical" }, // vornato
];

// vornato: Toggle or re-order sections here (Events between Sports and Slots)
const sectionOrder = ["hero","casino","sports","events","slots","youtube","fiverr","fantasy","experience","contact"] as const; // vornato
=======
  { label: "Fiverr", href: "https://www.fiverr.com/" }, // vornato
  { label: "Upwork", href: "https://www.upwork.com/" }, // vornato
];

// vornato: Portfolio items per section (9:16 for casino/sports/fantasy, 16:9 for youtube/fiverr)
const casinoItems = [
  { title: "Casino motion videos (Aviator/Mines/Slots)", tag: "Casino", thumb: "https://placehold.co/600x1067/jpg?text=Casino+Motion+9x16", href: "https://www.behance.net/gallery/206051599/Casino-motion-videos-for-Aviator-Mines-Slots", orientation: "vertical" }, // vornato
  { title: "Casino Logo Animation (Elements 3D)", tag: "Casino", thumb: "https://placehold.co/600x1067/jpg?text=Logo+Animation+9x16", href: "https://www.behance.net/gallery/203888677/Casino-Logo-Animation-%28-Elements-3D-%29", orientation: "vertical" }, // vornato
];
const sportsItems = [
  { title: "Sport Poster Designs", tag: "Sports", thumb: "https://placehold.co/600x1067/jpg?text=Sports+9x16", href: "https://www.behance.net/gallery/172080181/Sport-Poster-Designs-%28Football-Basketball-etc%29", orientation: "vertical" }, // vornato
  { title: "Cinematic Trailer Videos For Sport", tag: "Sports", thumb: "https://placehold.co/600x1067/jpg?text=Cinematic+9x16", href: "https://www.behance.net/gallery/157824179/Cinematic-Trailer-Videos-For-Sport", orientation: "vertical" }, // vornato
  { title: "Cricket Lottery Promos", tag: "Sports", thumb: "https://placehold.co/600x1067/jpg?text=Cricket+9x16", href: "https://www.behance.net/gallery/166143603/Thrilling-Summer-Cricket-Lottery-Videos", orientation: "vertical" }, // vornato
];
const slotsItems = [
  { title: "Slot Games Portfolio", tag: "Slots", thumb: "https://placehold.co/600x1067/jpg?text=Slots+9x16", href: "https://www.behance.net/gallery/151894049/Slot-Games-Portfolio", orientation: "vertical" }, // vornato
];
const youtubeItems = [
  // vornato: Replace embedId with your actual video IDs
  { title: "Channel Intro", tag: "YouTube", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg", provider: "youtube", embedId: "dQw4w9WgXcQ", orientation: "horizontal" }, // vornato
  { title: "Edit Breakdown", tag: "YouTube", thumb: "https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg", provider: "youtube", embedId: "oHg5SJYRHA0", orientation: "horizontal" }, // vornato
];
const fiverrItems = [
  { title: "Unboxing video samples (Fiverr)", tag: "Fiverr", thumb: "https://placehold.co/800x450/jpg?text=Unboxing+Samples", href: "https://www.behance.net/gallery/143654417/Unboxing-video-samples-for-Fiverr", orientation: "horizontal" }, // vornato
];
const fantasyItems = [
  { title: "Fantasy Game Teaser", tag: "Fantasy", thumb: "https://placehold.co/600x1067/jpg?text=Fantasy+9x16", href: "#", orientation: "vertical" }, // vornato
  { title: "Mythic Arena Trailer", tag: "Fantasy", thumb: "https://placehold.co/600x1067/jpg?text=Arena+9x16", href: "#", orientation: "vertical" }, // vornato
];

// vornato: Toggle or re-order sections here
const sectionOrder = ["hero","casino","sports","slots","youtube","fiverr","fantasy","experience","contact"] as const; // vornato
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)

// ==================== Helper Components ====================
const Section: React.FC<{ id: string; title: string; subtitle?: string; badge?: string; children: React.ReactNode }> = ({ id, title, subtitle, badge, children }) => (
  <section id={id} className="relative snap-start min-h-screen flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
    <div className="w-full">
      <div className="mb-10 flex items-end justify-between">
        <div>
          {badge && (<Badge className="mb-3 rounded-2xl px-3 py-1 text-xs">{badge}</Badge>)}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{title}</h2>
          {subtitle && (<p className="mt-2 text-zinc-300 max-w-2xl leading-relaxed">{subtitle}</p>)}
        </div>
        <a href="#top" className="hidden md:inline-flex items-center text-zinc-400 hover:text-white text-sm">Back to top</a>
      </div>
      {children}
    </div>
  </section>
);

<<<<<<< HEAD
// Poster image helper
const Poster: React.FC<{ item: PortfolioItem }> = ({ item }) => (
  <img
    src={item.poster}
    alt={item.title}
    className={`w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100 ${item.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"}`}
  />
);

// Grid
const PortfolioGrid: React.FC<{ items: PortfolioItem[]; onSelect?: (item: PortfolioItem) => void }> = ({ items, onSelect }) => (
=======
const PortfolioGrid: React.FC<{ items: any[]; onSelect?: (item: any) => void }> = ({ items, onSelect }) => (
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((it, i) => (
      <button
        key={i}
        onClick={() => (onSelect ? onSelect(it) : window.open(it.href || "#", "_blank"))}
        className="group relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 hover:ring-zinc-600 transition text-left"
      >
<<<<<<< HEAD
        <Poster item={it} />
=======
        <img
          src={it.thumb}
          alt={it.title}
          className={`w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100 ${it.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"}`}
        />
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 p-4">
          <div className="flex items-center gap-2 text-zinc-200">
            {it.tag && <Badge className="rounded-full bg-zinc-800/80">{it.tag}</Badge>}
            <span className="font-semibold">{it.title}</span>
          </div>
        </div>
      </button>
    ))}
  </div>
);

<<<<<<< HEAD
/** ---------- Dynamic Background (gears + shapes that react to scroll) ---------- */
// vornato: tweak these if you want the gears faster/slower by default
const BASE_GEAR_DURATIONS = [36, 28, 22]; // seconds for gear 1/2/3 when idle

function useScrollSpeed() {
  // Returns a factor between ~0.12 (idle) and ~1.0 (fast scroll)
  const [speed, setSpeed] = useState(0.12);
  const last = useRef({ y: 0, t: performance.now() });
  const decayRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const dy = Math.abs(y - last.current.y);
      const dt = Math.max(16, t - last.current.t);
      last.current = { y, t };
      // Normalize: ~dy per ms → scale
      const instant = Math.min(1, (dy / dt) / 2); // adjust divisor for sensitivity
      setSpeed((prev) => Math.max(instant, prev)); // spike up quickly

      if (decayRef.current) cancelAnimationFrame(decayRef.current);
      const decay = () => {
        setSpeed((prev) => {
          const next = prev * 0.92 + 0.012; // smooth exponential decay to ~0.12
          return next < 0.12 ? 0.12 : next;
        });
        decayRef.current = requestAnimationFrame(decay);
      };
      decayRef.current = requestAnimationFrame(decay);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (decayRef.current) cancelAnimationFrame(decayRef.current);
    };
  }, []);

  return speed;
}

const GearSVG: React.FC<{ size: number; teeth?: number; stroke?: string }> = ({ size, teeth = 8, stroke = "rgba(153,153,255,0.55)" }) => {
  const r = size / 2;
  const inner = r * 0.45;
  const outer = r * 0.9;
  const center = r;
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rad = i % 2 === 0 ? outer : inner;
    pts.push(`${center + Math.cos(a) * rad},${center + Math.sin(a) * rad}`);
  }
  const path = `M ${pts[0]} L ${pts.slice(1).join(" ")} Z`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d={path} stroke={stroke} strokeWidth={2} fill="rgba(0,0,0,0.25)" />
      <circle cx={center} cy={center} r={inner * 0.52} stroke={stroke} strokeWidth={2} fill="rgba(153,153,255,0.07)" />
    </svg>
  );
};

const BackgroundMotion: React.FC = () => {
  const speed = useScrollSpeed();
  const { scrollYProgress } = useScroll();
  const driftX = useTransform(scrollYProgress, [0, 1], ["0vw", "-12vw"]);
  const driftY = useTransform(scrollYProgress, [0, 1], ["0vh", "8vh"]);
  const dur = BASE_GEAR_DURATIONS.map((base) => base / (0.4 + speed));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 20% 30%, rgba(153,153,255,0.30), transparent 60%), radial-gradient(1200px 900px at 80% 70%, rgba(0,255,198,0.22), transparent 60%), #0B0B13",
          backgroundSize: "220% 220%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 40%", "0% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -top-52 -left-48 h-[60vmax] w-[60vmax] rounded-full bg-gradient-to-br from-[#9FA2FF]/25 to-[#00FFC6]/15 blur-3xl"
        style={{ x: driftX, y: driftY }}
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 60 / (0.4 + speed), repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-60 -right-52 h-[55vmax] w-[55vmax] rounded-full bg-gradient-to-tr from-[#00FFC6]/22 to-[#9FA2FF]/14 blur-3xl"
        style={{ x: useTransform(driftX, (v) => (typeof v === "string" ? v : 0)), y: useTransform(driftY, (v) => (typeof v === "string" ? v : 0)) }}
        animate={{ rotate: -360, scale: [1.03, 0.98, 1.03] }}
        transition={{ duration: 48 / (0.4 + speed), repeat: Infinity, ease: "linear" }}
      />

      <motion.div className="absolute left-[8vw] top-[14vh] opacity-90">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: dur[0], repeat: Infinity, ease: "linear" }}>
          <GearSVG size={240} teeth={12} />
        </motion.div>
      </motion.div>
      <motion.div className="absolute right-[10vw] top-[22vh] opacity-85">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: dur[1], repeat: Infinity, ease: "linear" }}>
          <GearSVG size={180} teeth={10} />
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-[18vw] bottom-[12vh] opacity-80">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: dur[2], repeat: Infinity, ease: "linear" }}>
          <GearSVG size={140} teeth={8} />
        </motion.div>
      </motion.div>

      <motion.div className="absolute right-[10vw] top-[22vh]" style={{ translateX: -24, translateY: 84 }}>
        <div className="w-44 h-[2px] bg-white/15" />
      </motion.div>

      {[...Array(12)].map((_, i) => (
        // Outer wrapper: speed-reactive spin
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${6 + (i * 8) % 86}%`,
            left: `${(i * 11) % 92}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: (18 + i * 1.2) / (0.4 + speed), repeat: Infinity, ease: "linear" }}
        >
          {/* Inner: slow wander for parallax */}
          <motion.div
            className="border border-white/14 rounded-xl"
            style={{ width: 70 + (i % 4) * 28, height: 70 + ((i + 2) % 4) * 28 }}
            animate={{ x: [0, (i % 2 ? 70 : -70), 0], y: [0, (i % 2 ? -50 : 50), 0] }}
            transition={{ duration: 12 + i * 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
      {[...Array(6)].map((_, i) => (
        // Outer rotating ring (speed-reactive)
        <motion.div
          key={`ring-${i}`}
          className="absolute"
          style={{ top: `${15 + i * 12}%`, left: `${20 + (i * 9) % 60}%` }}
          animate={{ rotate: 360 }}
          transition={{ duration: (22 + i) / (0.4 + speed), repeat: Infinity, ease: "linear" }}
        >
          {/* Inner pulsing disc */}
          <motion.div
            animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="rounded-full" style={{ width: 140 - i * 12, height: 140 - i * 12, boxShadow: "0 0 0 2px rgba(255,255,255,0.10) inset" }} />
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "10px 10px" }}
        animate={{ opacity: [0.03, 0.07, 0.04, 0.05], x: [0, -20, 10, 0], y: [0, 12, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

/** ---------- Edge arrows (keep near edges of the hero photo) ---------- */
const EdgeArrows: React.FC = () => (
  <motion.div
    className="pointer-events-none absolute inset-0"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
  >
    {[
      { top: "8%", left: "50%", transform: "translate(-50%, 0) rotate(0deg)" },
      { top: "50%", left: "92%", transform: "translate(0, -50%) rotate(90deg)" },
      { top: "92%", left: "50%", transform: "translate(-50%, -100%) rotate(180deg)" },
      { top: "50%", left: "8%", transform: "translate(-100%, -50%) rotate(-90deg)" },
    ].map((pos, i) => (
      <div key={i} className="absolute text-white/80 drop-shadow" style={pos as any}>
        <div className="flex gap-1 text-xl">
          <span>➤</span>
          <span>➤</span>
          <span>➤</span>
        </div>
      </div>
    ))}
  </motion.div>
);

/** ---------- Flying badge (toggle: moving <-> dropped) ---------- */
const FlyingBadge: React.FC<{
  sectionOrder: string[];
  dropped?: boolean;
  onToggle?: () => void;
}> = ({ sectionOrder, dropped = false, onToggle }) => {
  const leftX = "-44vw";   // vornato
  const rightX = "44vw";   // vornato

  const steps = Math.max(1, sectionOrder.length - 1);

  const input: number[] = [];
  const xVals: (string | number)[] = [];
  const rotVals: number[] = [];
  const scaleVals: number[] = [];

  for (let i = 0; i < steps; i++) {
    const goingLeftToRight = i % 2 === 0;

    const tStart = i / steps;
    const tQ1   = tStart + 0.25 / steps;
    const tMid  = tStart + 0.50 / steps;
    const tQ3   = tStart + 0.75 / steps;
    const tEnd  = (i + 1) / steps;

    const startEdge = goingLeftToRight ? leftX : rightX;
    const q1        = goingLeftToRight ? "-22vw" : "22vw";
    const center    = "0vw";
    const q3        = goingLeftToRight ? "22vw" : "-22vw";
    const endEdge   = goingLeftToRight ? rightX : leftX;

    const r0  = 180 * i;
    const r45 = r0 + 45;
    const r90 = r0 + 90;
    const r135= r0 + 135;
    const r180= r0 + 180;

    const s0  = 0.90;
    const s1  = 1.12;
    const s2  = 0.98;
    const s3  = 1.12;
    const s4  = 0.90;

    input.push(tStart, tQ1, tMid, tQ3, tEnd);
    xVals.push(startEdge, q1, center, q3, endEdge);
    rotVals.push(r0, r45, r90, r135, r180);
    scaleVals.push(s0, s1, s2, s3, s4);
  }

  if (steps === 1 && input.length === 0) {
    input.push(0, 1);
    xVals.push(leftX, rightX);
    rotVals.push(0, 180);
    scaleVals.push(0.9, 0.9);
  }

  const { scrollYProgress } = useScroll();
  const x      = useTransform(scrollYProgress, input, xVals as any);
  const rotate = useTransform(scrollYProgress, input, rotVals);
  const scale  = useTransform(scrollYProgress, input, scaleVals);

  const labels: Record<string, React.ReactNode> = {
    hero: <span className="text-[#9999FF]">Ae</span>, // vornato
    casino: <span>🎲</span>,
    sports: <span>🏆</span>,
    events: <span>🎉</span>,
    slots: <span>✨</span>,
    youtube: <span>▶️</span>,
    fiverr: <span>💼</span>,
    fantasy: <span>🎮</span>,
    experience: <span>🎬</span>,
    contact: <span>✉️</span>,
  };

  const [currentIdx, setCurrentIdx] = React.useState(0);
=======
// Flying badge that travels far-left ↔ far-right in an arc and swaps icons per section
const FlyingBadge: React.FC<{ sectionOrder: string[] }> = ({ sectionOrder }) => {
  const leftX = "-45vw";   // vornato: change distance from left edge
  const rightX = "45vw";   // vornato: change distance from right edge
  const arcY = 12;         // vornato: arc height in % (increase for more dramatic swoop)

  const steps = Math.max(1, sectionOrder.length - 1);
  const input: number[] = [];
  const xVals: (string | number)[] = [];
  const yVals: (string | number)[] = [];
  const rotVals: number[] = [];

  for (let i = 0; i < sectionOrder.length; i++) {
    const tStart = i / steps;
    input.push(tStart);
    xVals.push(i % 2 === 0 ? leftX : rightX);
    yVals.push("0%");
    rotVals.push(180 * i);
    if (i < steps) {
      const tMid = (i + 0.5) / steps;
      input.push(tMid);
      xVals.push("0vw");
      yVals.push(`${i % 2 === 0 ? -arcY : arcY}%`);
      rotVals.push(180 * i + 90);
    }
  }

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, input, xVals as any);
  const y = useTransform(scrollYProgress, input, yVals as any);
  const rotate = useTransform(scrollYProgress, input, rotVals);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const labels: Record<string, React.ReactNode> = {
    hero: <span className="text-[#9999FF]">Ae</span>, // vornato (icon on HERO)
    casino: <span>🎲</span>, // vornato (Casino)
    sports: <span>🏆</span>, // vornato (Sports)
    slots: <span>✨</span>, // vornato (Slots)
    youtube: <span>▶️</span>, // vornato (YouTube)
    fiverr: <span>💼</span>, // vornato (Fiverr)
    fantasy: <span>🎮</span>, // vornato (Fantasy)
    experience: <span>🎬</span>, // vornato (Experience)
    contact: <span>✉️</span>, // vornato (Contact)
  };

  const [currentIdx, setCurrentIdx] = useState(0);
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      const idx = Math.round(window.scrollY / h);
      setCurrentIdx(Math.min(sectionOrder.length - 1, Math.max(0, idx)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionOrder.length]);

  const currentKey = sectionOrder[currentIdx] || "hero";

<<<<<<< HEAD
  // Positioning depending on state
  const containerClass = dropped
    ? "fixed left-1/2 bottom-6 z-30 -translate-x-1/2"
    : "fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2";

  return (
    <div className={containerClass}>
      <motion.button
        type="button"
        aria-label={dropped ? "Resume floating" : "Drop badge"}
        title={dropped ? "Click to resume floating" : "Click to drop here"}
        onClick={onToggle}
        className="pointer-events-auto focus:outline-none"
        // When dropped: hold still with a tiny idle pulse. When floating: follow transforms.
        style={dropped ? undefined : { x }}
        animate={dropped ? { y: 0, rotate: 0, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          // Rotate/scale only when not dropped
          style={dropped ? undefined : { rotate, scale }}
          className="relative h-36 w-36 rounded-3xl bg-black/90 shadow-2xl ring-2 ring-[#9999FF]/30 flex items-center justify-center backdrop-blur"
          whileTap={{ scale: 0.96 }}
        >
          <div className="select-none text-2xl font-black tracking-widest mix-blend-screen text-white">
            {labels[currentKey]}
          </div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
        </motion.div>
      </motion.button>
    </div>
  );
};

// vornato: SVG placeholder (kept for safety)
function posterPlaceholder({ label, orientation = "horizontal" }: { label: string; orientation?: "vertical" | "horizontal" }) {
  const w = orientation === "vertical" ? 1080 : 1920;
  const h = orientation === "vertical" ? 1920 : 1080;
  const bg = encodeURIComponent("#0E0E18");
  const fg = encodeURIComponent("#9999FF");
  const text = encodeURIComponent(label);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${fg}' stop-opacity='0.15'/><stop offset='100%' stop-color='${fg}' stop-opacity='0.02'/></linearGradient></defs>
    <rect width='100%' height='100%' fill='${bg}'/><rect width='100%' height='100%' fill='url(#g)'/>
    <g fill='white' opacity='0.85' font-family='Inter,system-ui,Helvetica,Arial' font-size='56' text-anchor='middle'><text x='50%' y='50%'>${text}</text></g>
  </svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

export default function LevaniPortfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  // NEW: state to control the badge toggle
  const [badgeDropped, setBadgeDropped] = useState(false);
=======
  return (
    <motion.div className="pointer-events-none fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" style={{ x, y }}>
      <motion.div style={{ rotate, scale }} className="relative h-36 w-36 rounded-3xl bg-black/90 shadow-2xl ring-2 ring-[#9999FF]/30 flex items-center justify-center backdrop-blur">
        <div className="select-none text-2xl font-black tracking-widest mix-blend-screen text-white">
          {labels[currentKey]}
        </div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
      </motion.div>
    </motion.div>
  );
};

export default function LevaniPortfolio() {
  const [selected, setSelected] = useState<any | null>(null);
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)

  // --- Runtime tests (cheap sanity checks) ---
  useEffect(() => {
    console.assert(typeof (motion as any) !== "undefined", "framer-motion 'motion' should be defined");
    const expected = sectionOrder.length;
<<<<<<< HEAD
    console.assert(expected === 10, `Expected 10 waypoints, found ${expected}`);
    console.assert(Array.isArray(casinoItems) && casinoItems.length > 0, "casinoItems should be defined with items");
    console.assert(Array.isArray(sportsItems) && sportsItems.length > 0, "sportsItems should be defined with items");
    console.assert(Array.isArray(eventsItems) && eventsItems.length > 0, "eventsItems should be defined with items");
    console.assert(Array.isArray(slotsItems) && slotsItems.length > 0, "slotsItems should be defined with items");
    console.assert(Array.isArray(youtubeItems) && youtubeItems.length > 0, "youtubeItems should be defined with items");
    console.assert(Array.isArray(fantasyItems) && fantasyItems.length > 0, "fantasyItems should be defined with items");
  }, []);

  // --- Simple mailto form handler (no server needed) ---
  const onContactSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const contact = (fd.get("contact") as string) || "";
    const message = (fd.get("message") as string) || "";
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Website"}`); // vornato
    const body = encodeURIComponent(`Contact: ${contact}\n\n${message}`);
    window.location.href = `mailto:levaniesitashvili1999@gmail.com?subject=${subject}&body=${body}`; // vornato
  };

  return (
    <main id="top" className="relative z-10 min-h-screen w-full text-white snap-y snap-mandatory">
      {/* Background (modern motion scene) */}
      <BackgroundMotion />
=======
    console.assert(expected === 9, `Expected 9 waypoints, found ${expected}`);
    const vOk = (o?: string) => !o || o === "vertical" || o === "horizontal";
    console.assert(vOk("vertical") && vOk("horizontal"), "Orientation enum should be vertical|horizontal");
  }, []);

  return (
    <main id="top" className="min-h-screen w-full bg-gradient-to-b from-[#0B0B13] via-[#0E0E18] to-[#0B0B13] text-white snap-y snap-mandatory">
      {/* Background (minimal animated blobs) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute -top-40 -left-40 h-[60vmax] w-[60vmax] rounded-full bg-gradient-to-br from-violet-700/10 to-cyan-500/10 blur-3xl" animate={{ x: [0, 50, -30, 0], y: [0, -20, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-40 -right-40 h-[50vmax] w-[50vmax] rounded-full bg-gradient-to-tr from-cyan-400/10 to-emerald-500/10 blur-3xl" animate={{ x: [0, -40, 20, 0], y: [0, 30, -30, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "12px 12px" }} animate={{ opacity: [0.02, 0.06, 0.03] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      </div>
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-900/70 border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-wide">Levani Esitashvili</a> {/* vornato */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#casino" className="hover:text-white">Casino</a>
            <a href="#sports" className="hover:text-white">Sports</a>
<<<<<<< HEAD
            <a href="#events" className="hover:text-white">Events & Clubs</a> {/* vornato */}
=======
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
            <a href="#slots" className="hover:text-white">Slots</a>
            <a href="#youtube" className="hover:text-white">YouTube</a>
            <a href="#fiverr" className="hover:text-white">Fiverr</a>
            <a href="#fantasy" className="hover:text-white">Fantasy</a>
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="#contact" className="md:hidden inline-flex items-center gap-2 text-sm text-zinc-200">Contact</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative snap-start min-h-screen flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="mb-6 flex md:hidden gap-2 overflow-x-auto">
          {quickLinks.map((q, i) => (
            <a key={i} href={q.href} className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-2 text-xs ring-1 ring-zinc-800">{q.label}</a>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
<<<<<<< HEAD
          {/* Photo card with "Click it" + edge arrows */}
          <div className="relative">
            <a
              href="https://youtu.be/pPaX34rLRHY" // vornato
              target="_blank"
              rel="noreferrer"
              className="block relative overflow-hidden rounded-3xl ring-1 ring-zinc-800 group"
              aria-label="Open intro video"
            >
              <img src={PHOTO_URL} alt="Levani portrait" className="w-full object-cover" /> {/* vornato */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
              <EdgeArrows />
              <motion.div
                className="absolute left-4 top-4 z-10"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="rounded-full bg-black/70 text-white text-xs px-3 py-1 ring-1 ring-white/20 shadow-lg">Click it</span> {/* vornato */}
              </motion.div>
            </a>
=======
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-zinc-800">
              <img src={PHOTO_URL} alt="Levani portrait" className="w-full object-cover" />
              {/* vornato: replace PHOTO_URL above */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
            </div>
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
            <div className="mt-4 flex flex-wrap gap-2">
              {["Senior Video Editor", "After Effects / Premiere Pro", "Casino • Sports • Slots", "Social Cutdowns"].map((chip) => (
                <Badge key={chip} className="rounded-full bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800">{chip}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Video Editor & After Effects Specialist</h1> {/* vornato */}
<<<<<<< HEAD
            <p className="mt-4 text-zinc-300 leading-relaxed max-w-xl">
              I’m a senior video editor from Tbilisi who loves tech and innovative products. I craft sleek, platform-native promos for casino, sports, slots, and fantasy. Capturing and editing video to its final form is my thing.
            </p> {/* vornato */}
=======
            <p className="mt-4 text-zinc-300 leading-relaxed max-w-xl">I’m a senior video editor from Tbilisi who loves tech and innovative products. I craft sleek, platform-native promos for casino, sports, slots, and fantasy. Capturing and editing video to its final form is my thing.</p> {/* vornato */}
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#casino"><Button className="rounded-2xl">View Work</Button></a> {/* vornato */}
              <a href="#contact"><Button variant="secondary" className="rounded-2xl">Hire Me</Button></a> {/* vornato */}
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Moving/Droppable section icon */}
      <FlyingBadge
        sectionOrder={[...sectionOrder]}
        dropped={badgeDropped}
        onToggle={() => setBadgeDropped((v) => !v)}
      />
=======
      {/* Flying badge */}
      <FlyingBadge sectionOrder={[...sectionOrder]} />
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)

      {/* SECTIONS */}
      <Section id="casino" title="Casino" subtitle="Trailers, promos, bumpers and motion graphics for casino brands." badge="Portfolio"> {/* vornato */}
        <PortfolioGrid items={casinoItems} onSelect={setSelected} />
      </Section>

      <Section id="sports" title="Sports" subtitle="Odds reels, hype edits, and event highlights."> {/* vornato */}
        <PortfolioGrid items={sportsItems} onSelect={setSelected} />
<<<<<<< HEAD
        {/* Sports Posters callout (Behance) */}
        <div className="mt-6">
          <a
            href="https://www.behance.net/gallery/172080181/Sport-Poster-Designs-%28Football-Basketball-etc%29" // vornato
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm ring-1 ring-zinc-800 hover:ring-zinc-600 transition"
          >
            <span>See Sports Posters on Behance</span> <span>↗</span>
          </a>
        </div>
      </Section>

      <Section id="events" title="Events & Clubs" subtitle="Recaps, aftermovies, and club promos (vertical 9:16)." badge="New"> {/* vornato */}
        <PortfolioGrid items={eventsItems} onSelect={setSelected} />
=======
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
      </Section>

      <Section id="slots" title="Slots" subtitle="Feature teases and character-driven cutdowns for popular slot IPs."> {/* vornato */}
        <PortfolioGrid items={slotsItems} onSelect={setSelected} />
      </Section>

<<<<<<< HEAD
      {/* YouTube — compact profile image header */}
      <Section id="youtube" title="YouTube" subtitle="Latest edits and uploads from the VorNato channel." badge="Channel"> {/* vornato */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-500/70 shadow-lg">
            <img src={YT_AVATAR_URL} alt="VorNato YouTube avatar" className="w-full h-full object-cover" /> {/* vornato */}
          </div>
          <div className="flex items-center gap-3">
            <a href="https://youtube.com/@vornatoofficial" target="_blank" rel="noreferrer">
              <Button className="rounded-2xl">YouTube Channel</Button> {/* vornato */}
            </a>
          </div>
        </div>
        <PortfolioGrid items={youtubeItems} onSelect={setSelected} />
      </Section>

      {/* Fiverr — single big card */}
      <Section id="fiverr" title="Fiverr Work" subtitle="Hand-picked client pieces and repeat-order edits."> {/* vornato */}
        <div className="grid grid-cols-1 gap-6">
          <a
            href="https://www.behance.net/gallery/143654417/Unboxing-video-samples-for-Fiverr" // vornato
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 hover:ring-zinc-600 transition"
          >
            <img src={fiverrCover} alt="Fiverr portfolio" className="w-full object-cover aspect-video rounded-lg" /> {/* vornato */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <div className="flex items-center gap-2 text-zinc-200">
                <Badge className="rounded-full bg-zinc-800/80">Fiverr</Badge>
                <span className="font-semibold">Unboxing video samples (Fiverr)</span>
              </div>
            </div>
          </a>
        </div>
=======
      <Section id="youtube" title="YouTube" subtitle="Latest edits and uploads from the VorNato channel." badge="Channel"> {/* vornato */}
        <PortfolioGrid items={youtubeItems} onSelect={setSelected} />
      </Section>

      <Section id="fiverr" title="Fiverr Work" subtitle="Hand-picked client pieces and repeat-order edits."> {/* vornato */}
        <PortfolioGrid items={fiverrItems} onSelect={setSelected} />
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
      </Section>

      <Section id="fantasy" title="Fantasy Games" subtitle="Stylized teasers and promo assets for fantasy titles."> {/* vornato */}
        <PortfolioGrid items={fantasyItems} onSelect={setSelected} />
      </Section>

      <Section id="experience" title="Experience" subtitle="A quick look at my background and tools." badge="About"> {/* vornato */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">Roles</h3> {/* vornato */}
              <ul className="space-y-2 text-zinc-300">
                <li>Senior Motion/Video Editor — BluePlanet Software Solutions</li> {/* vornato */}
                <li>Freelance Video Editor — Fiverr & Upwork (ongoing)</li> {/* vornato */}
<<<<<<< HEAD
                <li>Content Creator — YouTube (Vornato)</li> {/* vornato */}
=======
                <li>Content Creator — YouTube (VorNato)</li> {/* vornato */}
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
              </ul>
            </div>
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">Education</h3> {/* vornato */}
              <ul className="space-y-2 text-zinc-300">
                <li>Business & Technology University — B.Sc. in Information Technology</li> {/* vornato */}
                <li>Udemy — Videography Course (shooting fundamentals & editing workflows)</li> {/* vornato */}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">Software & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Blender", "Cinema 4D"].map((s) => (
                  <Badge key={s} className="rounded-full bg-zinc-800 text-zinc-200">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Georgian", "English", "Russian"].map((l) => (
                  <Badge key={l} className="rounded-full bg-zinc-800 text-zinc-200">{l}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" title="Contact" subtitle="Let’s build something bold."> {/* vornato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <div className="flex items-center gap-3 text-zinc-200">✉️ levaniesitashvili1999@gmail.com</div> {/* vornato */}
          </div>
<<<<<<< HEAD

          {/* YouTube channel card (optional extra) */}
          <a
            href="https://youtube.com/@vornatoofficial" // vornato
            target="_blank"
            rel="noreferrer"
            className="md:col-span-2 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800 hover:ring-zinc-600 transition flex flex-col items-start gap-4"
          >
            <img
              src={`${import.meta.env.BASE_URL}youtube-cover.jpg`}
              alt="YouTube channel cover"
              className="w-full aspect-[16/6] object-cover rounded-xl"
            />
            <Button className="rounded-2xl">YouTube Channel</Button>
          </a>

          {/* Contact form that opens mail client */}
          <div className="md:col-span-3 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onContactSubmit}>
              <input name="name" placeholder="Your name" className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none" /> {/* vornato */}
              <input name="contact" placeholder="Email or Telegram" className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none" /> {/* vornato */}
              <textarea name="message" placeholder="Project details" className="sm:col-span-2 rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none min-h-[120px]" /> {/* vornato */}
              <Button className="sm:col-span-2 rounded-2xl" type="submit">Send</Button> {/* vornato */}
            </form>
            <p className="mt-3 text-xs text-zinc-400">Submitting opens your email client with the details pre-filled. For instant chat, DM me on YouTube or email directly.</p>
=======
          <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <div className="flex items-center gap-3 text-zinc-200">📞 +995 595 55 14 05</div> {/* vornato */}
          </div>
          <a href="https://www.behance.net/vornato" target="_blank" rel="noreferrer" className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800"> {/* vornato */}
            <div className="flex items-center gap-3 text-zinc-200">Behance /vornato</div>
          </a>
          <a href="https://youtube.com/@vornatoofficial" target="_blank" rel="noreferrer" className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800"> {/* vornato */}
            <div className="flex items-center gap-3 text-zinc-200">YouTube /@vornatoofficial</div>
          </a>
          <div className="md:col-span-2 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            {/* vornato: wire a real form handler or emailjs here if needed */}
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your name" className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none" /> {/* vornato */}
              <input placeholder="Email or Telegram" className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none" /> {/* vornato */}
              <textarea placeholder="Project details" className="sm:col-span-2 rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none min-h-[120px]" /> {/* vornato */}
              <Button className="sm:col-span-2 rounded-2xl" type="submit">Send</Button> {/* vornato */}
            </form>
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
          </div>
        </div>
      </Section>

      <footer className="border-t border-zinc-800/70 px-4 sm:px-6 lg:px-8 py-10 text-center text-zinc-500 text-sm">© {new Date().getFullYear()} Levani Esitashvili — Portfolio</footer> {/* vornato */}

      {/* Lightbox Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute -top-10 right-0 text-zinc-300 hover:text-white" onClick={() => setSelected(null)}>Close</button>
            {selected.provider === "youtube" && selected.embedId ? (
              <div className="w-full aspect-video">
<<<<<<< HEAD
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selected.embedId}`}
                  title={selected.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : selected.provider === "html5" && selected.src ? (
              <video className={`${selected.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"} w-full rounded-xl`} src={selected.src} controls playsInline />
=======
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selected.embedId}`} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
            ) : (
              <div className={`${selected.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"} w-full bg-zinc-900 rounded-xl ring-1 ring-zinc-800 flex items-center justify-center text-zinc-400`}>
                <a href={selected.href || "#"} target="_blank" rel="noreferrer" className="underline">Open project</a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

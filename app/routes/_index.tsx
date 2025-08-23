import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const PHOTO_URL = `${import.meta.env.BASE_URL}Mainc.png`;
const YT_AVATAR_URL = `${import.meta.env.BASE_URL}profile.jpg`;
const YT_COVER_URL = `${import.meta.env.BASE_URL}youtube-cover.png`;

const quickLinks = [
  { label: "Email", href: "mailto:levaniesitashvili1999@gmail.com" },
  { label: "+995 595 55 14 05", href: "tel:+995595551405" },
  { label: "YouTube: VorNato", href: "https://youtube.com/@vornatoofficial" },
  { label: "Behance: vornato", href: "https://www.behance.net/vornato" },
  { label: "Fiverr", href: "https://www.fiverr.com/sellers/vornatoofficial" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~012da965c61594d259" },
];

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/levani.esitashvili.1", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg" },
  { name: "Instagram", href: "https://www.instagram.com/levani_esita/", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg" },
  { name: "Behance", href: "https://www.behance.net/vornato", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/behance.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/levani-esitashvili/", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg" },
  { name: "Fiverr", href: "https://www.fiverr.com/s/xXoPYLZ", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/fiverr.svg" },
];

type PortfolioItem = {
  title: string;
  tag?: string;
  poster?: string;
  href?: string;
  provider?: "youtube" | "html5";
  embedId?: string;
  src?: string;
  orientation?: "vertical" | "horizontal";
};

const casinoItems: PortfolioItem[] = [
  { title: "Casino Short 1", tag: "Casino", provider: "youtube", embedId: "upR7VahYFns", poster: "https://img.youtube.com/vi/upR7VahYFns/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Short 2", tag: "Casino", provider: "youtube", embedId: "gcNzXB7Suz4", poster: "https://img.youtube.com/vi/gcNzXB7Suz4/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Short 3", tag: "Casino", provider: "youtube", embedId: "5x4v_d2RvFc", poster: "https://img.youtube.com/vi/5x4v_d2RvFc/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Promo", tag: "Casino", provider: "youtube", embedId: "12I1ZI218g0", poster: "https://img.youtube.com/vi/12I1ZI218g0/maxresdefault.jpg", orientation: "horizontal" },
];

const sportsItems: PortfolioItem[] = [
  { title: "Sports Short 1", tag: "Sports", provider: "youtube", embedId: "E6GFqu2ttew", poster: "https://img.youtube.com/vi/E6GFqu2ttew/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 2", tag: "Sports", provider: "youtube", embedId: "rrS3HWgNbYY", poster: "https://img.youtube.com/vi/rrS3HWgNbYY/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 3", tag: "Sports", provider: "youtube", embedId: "sKgoTYIXh64", poster: "https://img.youtube.com/vi/sKgoTYIXh64/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 4", tag: "Sports", provider: "youtube", embedId: "hpGqE-6rxsA", poster: "https://img.youtube.com/vi/hpGqE-6rxsA/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 5", tag: "Sports", provider: "youtube", embedId: "bT4JhehsXEU", poster: "https://img.youtube.com/vi/bT4JhehsXEU/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 6", tag: "Sports", provider: "youtube", embedId: "kxHJrAXDAN0", poster: "https://img.youtube.com/vi/kxHJrAXDAN0/maxresdefault.jpg", orientation: "vertical" },
];

const eventsItems: PortfolioItem[] = [
  { title: "Event Short 1", tag: "Events", provider: "youtube", embedId: "NBENHBn7lnw", poster: "https://img.youtube.com/vi/NBENHBn7lnw/maxresdefault.jpg", orientation: "vertical" },
  { title: "Event Short 2", tag: "Events", provider: "youtube", embedId: "FRnkFAiz48w", poster: "https://img.youtube.com/vi/FRnkFAiz48w/maxresdefault.jpg", orientation: "vertical" },
  { title: "Event Short 3", tag: "Events", provider: "youtube", embedId: "K5wcGhLh-Cs", poster: "https://img.youtube.com/vi/K5wcGhLh-Cs/maxresdefault.jpg", orientation: "vertical" },
];

const slotsItems: PortfolioItem[] = [
  { title: "Slots Video 1", tag: "Slots", provider: "youtube", embedId: "9k06t0JCjX4", poster: "https://img.youtube.com/vi/9k06t0JCjX4/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 2", tag: "Slots", provider: "youtube", embedId: "63VB0YRhYw0", poster: "https://img.youtube.com/vi/63VB0YRhYw0/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 3", tag: "Slots", provider: "youtube", embedId: "oR1DuHQEv98", poster: "https://img.youtube.com/vi/oR1DuHQEv98/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 4", tag: "Slots", provider: "youtube", embedId: "X1SvZQoOvek", poster: "https://img.youtube.com/vi/X1SvZQoOvek/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 5", tag: "Slots", provider: "youtube", embedId: "YzbS-s_5rk4", poster: "https://img.youtube.com/vi/YzbS-s_5rk4/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 6", tag: "Slots", provider: "youtube", embedId: "jz4hxRYBxC0", poster: "https://img.youtube.com/vi/jz4hxRYBxC0/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 7", tag: "Slots", provider: "youtube", embedId: "xB8Oivu_7H0", poster: "https://img.youtube.com/vi/xB8Oivu_7H0/maxresdefault.jpg", orientation: "horizontal" },
  { title: "Slots Video 8", tag: "Slots", provider: "youtube", embedId: "aWNJ_rZ7SBU", poster: "https://img.youtube.com/vi/aWNJ_rZ7SBU/maxresdefault.jpg", orientation: "horizontal" },
];

const youtubeItems: PortfolioItem[] = [
  { title: "YouTube #1", tag: "YouTube", provider: "youtube", embedId: "T4mBnh8uf24", poster: "https://img.youtube.com/vi/T4mBnh8uf24/maxresdefault.jpg", orientation: "horizontal" },
  { title: "YouTube #2", tag: "YouTube", provider: "youtube", embedId: "VidlLQRZBm0", poster: "https://img.youtube.com/vi/VidlLQRZBm0/maxresdefault.jpg", orientation: "horizontal" },
  { title: "YouTube #3", tag: "YouTube", provider: "youtube", embedId: "hGEj_6f-lP8", poster: "https://img.youtube.com/vi/hGEj_6f-lP8/maxresdefault.jpg", orientation: "horizontal" },
];

const fiverrCover = `${import.meta.env.BASE_URL}fiverr.png`;

const fantasyItems: PortfolioItem[] = [
  { title: "Fantasy Short 1", tag: "Fantasy", provider: "youtube", embedId: "7HlNY5BPZk0", poster: "https://img.youtube.com/vi/7HlNY5BPZk0/maxresdefault.jpg", orientation: "vertical" },
  { title: "Fantasy Short 2", tag: "Fantasy", provider: "youtube", embedId: "sVsOgIr5mws", poster: "https://img.youtube.com/vi/sVsOgIr5mws/maxresdefault.jpg", orientation: "vertical" },
  { title: "Fantasy Short 3", tag: "Fantasy", provider: "youtube", embedId: "wqPAeIhHqgg", poster: "https://img.youtube.com/vi/wqPAeIhHqgg/maxresdefault.jpg", orientation: "vertical" },
];

const sectionOrder = ["hero","casino","sports","events","slots","youtube","fiverr","fantasy","experience","contact"] as const;

const Section: React.FC<{ id: string; title: string; subtitle?: string; badge?: string; children: React.ReactNode }> = ({ id, title, subtitle, badge, children }) => (
  <section
    id={id}
    className="relative snap-start min-h-[88vh] md:min-h-[92vh] lg:min-h-screen flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 scroll-mt-20"
  >
    <div className="w-full">
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          {badge && (<Badge className="mb-3 rounded-2xl px-3 py-1 text-xs">{badge}</Badge>)}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">{title}</h2>
          {subtitle && (<p className="mt-2 text-zinc-300 max-w-2xl leading-relaxed">{subtitle}</p>)}
        </div>
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "top")}
          className="md:inline-flex items-center text-zinc-400 hover:text-white text-sm"
        >
          Back to top
        </a>
      </div>
      {children}
    </div>
  </section>
);

const Poster: React.FC<{ item: PortfolioItem }> = ({ item }) => (
  <img
    src={item.poster}
    alt={item.title}
    className={`w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100 ${item.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"} rounded-2xl`}
  />
);

const PortfolioGrid: React.FC<{ items: PortfolioItem[]; onSelect?: (item: PortfolioItem) => void }> = ({ items, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {items.map((it, i) => (
      <button
        key={i}
        onClick={() => (onSelect ? onSelect(it) : window.open(it.href || "#", "_blank"))}
        className="group relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 hover:ring-zinc-600 transition text-left"
      >
        <Poster item={it} />
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

const BASE_GEAR_DURATIONS = [36, 28, 22];

function useScrollSpeed() {
  const [speed, setSpeed] = React.useState(0.12);
  const last = React.useRef({ y: 0, t: performance.now() });
  const decayTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const dy = Math.abs(y - last.current.y);
      const dt = Math.max(16, t - last.current.t);
      last.current = { y, t };
      const instant = Math.min(1, (dy / dt) / 2);
      setSpeed((s) => Math.max(instant, s));
      if (decayTimer.current == null) {
        decayTimer.current = window.setInterval(() => {
          setSpeed((s) => {
            const next = s * 0.85 + 0.018;
            if (next <= 0.121) {
              if (decayTimer.current) {
                clearInterval(decayTimer.current);
                decayTimer.current = null;
              }
              return 0.12;
            }
            return next;
          });
        }, 120);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (decayTimer.current) {
        clearInterval(decayTimer.current);
        decayTimer.current = null;
      }
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
          <motion.div
            className="border border-white/14 rounded-xl"
            style={{ width: 70 + (i % 4) * 28, height: 70 + ((i + 2) % 4) * 28 }}
            animate={{ x: [0, (i % 2 ? 70 : -70), 0], y: [0, (i % 2 ? -50 : 50), 0] }}
            transition={{ duration: 12 + i * 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute"
          style={{ top: `${15 + i * 12}%`, left: `${20 + (i * 9) % 60}%` }}
          animate={{ rotate: 360 }}
          transition={{ duration: (22 + i) / (0.4 + speed), repeat: Infinity, ease: "linear" }}
        >
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

const FlyingBadge: React.FC<{
  sectionOrder: string[];
  dropped?: boolean;
  onToggle?: () => void;
}> = ({ sectionOrder, dropped = false, onToggle }) => {
  const leftX = "-44vw";
  const rightX = "44vw";
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
    hero: <span className="text-[#9999FF]">Ae</span>,
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
        style={dropped ? undefined : { x }}
        animate={dropped ? { y: 0, rotate: 0, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          style={dropped ? undefined : { rotate, scale }}
          className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl bg-black/90 shadow-2xl ring-2 ring-[#9999FF]/30 flex items-center justify-center backdrop-blur"
          whileTap={{ scale: 0.96 }}
        >
          <div className="select-none text-xl sm:text-2xl font-black tracking-widest mix-blend-screen text-white">
            {labels[currentKey]}
          </div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
        </motion.div>
      </motion.button>
    </div>
  );
};

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

function handleNavClick(e: React.MouseEvent<HTMLElement>, targetId: string) {
  e.preventDefault();
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function LevaniPortfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [badgeDropped, setBadgeDropped] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    return () => { html.style.scrollBehavior = prev; };
  }, []);

  useEffect(() => {
    console.assert(typeof (motion as any) !== "undefined", "framer-motion 'motion' should be defined");
    const expected = sectionOrder.length;
    console.assert(expected === 10, `Expected 10 waypoints, found ${expected}`);
    console.assert(Array.isArray(casinoItems) && casinoItems.length > 0, "casinoItems should be defined with items");
    console.assert(Array.isArray(sportsItems) && sportsItems.length > 0, "sportsItems should be defined with items");
    console.assert(Array.isArray(eventsItems) && eventsItems.length > 0, "eventsItems should be defined with items");
    console.assert(Array.isArray(slotsItems) && slotsItems.length > 0, "slotsItems should be defined with items");
    console.assert(Array.isArray(youtubeItems) && youtubeItems.length > 0, "youtubeItems should be defined with items");
    console.assert(Array.isArray(fantasyItems) && fantasyItems.length > 0, "fantasyItems should be defined with items");
  }, []);

  const onContactSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const contact = (fd.get("contact") as string) || "";
    const message = (fd.get("message") as string) || "";
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Website"}`);
    const body = encodeURIComponent(`Contact: ${contact}\n\n${message}`);
    window.location.href = `mailto:levaniesitashvili1999@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main id="top" className="relative z-10 min-h-screen w-full text-white snap-y snap-proximity bg-[#0B0B13]">
      <BackgroundMotion />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-900/70 border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <a href="#top" onClick={(e) => handleNavClick(e, "top")} className="flex items-center gap-2 font-bold tracking-wide">Levani Esitashvili</a>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-zinc-300">
            <a href="#casino" onClick={(e) => handleNavClick(e, "casino")} className="hover:text-white">Casino</a>
            <a href="#sports" onClick={(e) => handleNavClick(e, "sports")} className="hover:text-white">Sports</a>
            <a href="#events" onClick={(e) => handleNavClick(e, "events")} className="hover:text-white">Events & Clubs</a>
            <a href="#slots" onClick={(e) => handleNavClick(e, "slots")} className="hover:text-white">Slots</a>
            <a href="#youtube" onClick={(e) => handleNavClick(e, "youtube")} className="hover:text-white">YouTube</a>
            <a href="#fiverr" onClick={(e) => handleNavClick(e, "fiverr")} className="hover:text-white">Fiverr</a>
            <a href="#fantasy" onClick={(e) => handleNavClick(e, "fantasy")} className="hover:text-white">Fantasy</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, "experience")} className="hover:text-white">Experience</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-white">Contact</a>
          </nav>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="md:hidden inline-flex items-center gap-2 text-sm text-zinc-200">Contact</a>
        </div>
      </header>

      <section className="relative snap-start min-h-[88vh] md:min-h-[92vh] lg:min-h-screen flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pb-16 lg:pb-20 scroll-mt-20" id="hero">
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 px-3 py-2 ring-1 ring-zinc-800 hover:ring-zinc-600 text-xs sm:text-sm transition"
              aria-label={s.name}
              title={s.name}
            >
              <img
                src={s.icon}
                alt={`${s.name} icon`}
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ filter: "invert(1) brightness(1.2)" }}
              />
              <span className="text-zinc-100">{s.name}</span>
            </a>
          ))}
        </div>

        <div className="mb-6 flex md:hidden gap-2 overflow-x-auto">
          {quickLinks.map((q, i) => (
            <a key={i} href={q.href} className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-2 text-xs ring-1 ring-zinc-800">{q.label}</a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center w-full">
          <div className="relative">
            <a
              href="https://youtu.be/pPaX34rLRHY"
              target="_blank"
              rel="noreferrer"
              className="block relative overflow-hidden rounded-3xl ring-1 ring-zinc-800 group"
              aria-label="Open intro video"
            >
              <img src={PHOTO_URL} alt="Levani portrait" className="w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
              <EdgeArrows />
              <motion.div
                className="absolute left-4 top-4 z-10"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="rounded-full bg-black/70 text-white text-xs px-3 py-1 ring-1 ring-white/20 shadow-lg">Click it</span>
              </motion.div>
            </a>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Senior Video Editor", "After Effects / Premiere Pro", "Casino • Sports • Slots", "Social Cutdowns"].map((chip) => (
                <Badge key={chip} className="rounded-full bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800">{chip}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">Video Editor & After Effects Specialist</h1>
            <p className="mt-4 text-zinc-300 leading-relaxed max-w-xl">
              I’m a senior video editor from Tbilisi who loves tech and innovative products. I craft sleek, platform-native promos for casino, sports, slots, and fantasy. Capturing and editing video to its final form is my thing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#casino" onClick={(e) => handleNavClick(e, "casino")}><Button className="rounded-2xl">View Work</Button></a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}><Button variant="secondary" className="rounded-2xl">Hire Me</Button></a>
            </div>
          </div>
        </div>
      </section>

      <FlyingBadge
        sectionOrder={[...sectionOrder]}
        dropped={badgeDropped}
        onToggle={() => setBadgeDropped((v) => !v)}
      />

      <Section id="casino" title="Casino" subtitle="Trailers, promos, bumpers and motion graphics for casino brands." badge="Portfolio">
        <PortfolioGrid items={casinoItems} onSelect={setSelected} />
      </Section>

      <Section id="sports" title="Sports" subtitle="Odds reels, hype edits, and event highlights.">
        <PortfolioGrid items={sportsItems} onSelect={setSelected} />
        <div className="mt-6">
          <a
            href="https://www.behance.net/gallery/172080181/Sport-Poster-Designs-%28Football-Basketball-etc%29"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm ring-1 ring-zinc-800 hover:ring-zinc-600 transition"
          >
            <span>See Sports Posters on Behance</span> <span>↗</span>
          </a>
        </div>
      </Section>

      <Section id="events" title="Events & Clubs" subtitle="Recaps, aftermovies, and club promos (vertical 9:16)." badge="New">
        <PortfolioGrid items={eventsItems} onSelect={setSelected} />
      </Section>

      <Section id="slots" title="Slots" subtitle="Feature teases and character-driven cutdowns for popular slot IPs.">
        <PortfolioGrid items={slotsItems} onSelect={setSelected} />
      </Section>

      <Section id="youtube" title="YouTube" subtitle="Latest edits and uploads from the VorNato channel." badge="Channel">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-500/70 shadow-lg">
            <img src={YT_AVATAR_URL} alt="VorNato YouTube avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-3">
            <a href="https://youtube.com/@vornatoofficial" target="_blank" rel="noreferrer">
              <Button className="rounded-2xl">YouTube Channel</Button>
            </a>
          </div>
        </div>
        <PortfolioGrid items={youtubeItems} onSelect={setSelected} />
      </Section>

      <Section id="fiverr" title="Fiverr Work" subtitle="Hand-picked client pieces and repeat-order edits.">
        <div className="grid grid-cols-1 gap-6">
          <a
            href="https://www.behance.net/gallery/143654417/Unboxing-video-samples-for-Fiverr"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 hover:ring-zinc-600 transition"
          >
            <img src={fiverrCover} alt="Fiverr portfolio" className="w-full object-cover aspect-video rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <div className="flex items-center gap-2 text-zinc-200">
                <Badge className="rounded-full bg-zinc-800/80">Fiverr</Badge>
                <span className="font-semibold">Unboxing video samples (Fiverr)</span>
              </div>
            </div>
          </a>
        </div>
      </Section>

      <Section id="fantasy" title="Fantasy Games" subtitle="Stylized teasers and promo assets for fantasy titles.">
        <PortfolioGrid items={fantasyItems} onSelect={setSelected} />
      </Section>

      <Section id="experience" title="Experience" subtitle="A quick look at my background and tools." badge="About">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">Roles</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>Senior Motion/Video Editor — BluePlanet Software Solutions</li>
                <li>Freelance Video Editor — Fiverr & Upwork (ongoing)</li>
                <li>Content Creator — YouTube (Vornato)</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">Education</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>Business & Technology University — B.Sc. in Information Technology</li>
                <li>Udemy — Videography Course (shooting fundamentals & editing workflows)</li>
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

      <Section id="contact" title="Contact" subtitle="Let’s build something bold.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <a
              href="mailto:levaniesitashvili1999@gmail.com"
              className="flex items-center gap-3 text-zinc-200 hover:underline"
            >
              ✉️ levaniesitashvili1999@gmail.com
            </a>
          </div>

          <a
            href="https://youtube.com/@vornatoofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-2 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800 hover:ring-zinc-600 transition flex flex-col items-start gap-4"
          >
            <img
              src={YT_COVER_URL}
              alt="YouTube channel cover"
              className="w-full aspect-[16/6] object-cover rounded-xl"
              loading="lazy"
            />
            <Button className="rounded-2xl">YouTube Channel</Button>
          </a>

          <div className="md:col-span-3 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onContactSubmit}>
              <input
                name="name"
                placeholder="Your name"
                className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none"
              />
              <input
                name="contact"
                placeholder="Email or Telegram"
                className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none"
              />
              <textarea
                name="message"
                placeholder="Project details"
                className="sm:col-span-2 rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none min-h-[120px]"
              />
              <Button className="sm:col-span-2 rounded-2xl" type="submit">Send</Button>
            </form>
            <p className="mt-3 text-xs text-zinc-400">
              Submitting opens your email client with the details pre-filled. For instant chat, DM me on YouTube or email directly.
            </p>
          </div>
        </div>
      </Section>

      <footer className="border-t border-zinc-800/70 px-4 sm:px-6 lg:px-8 py-10 text-center text-zinc-500 text-sm">© {new Date().getFullYear()} Levani Esitashvili — Portfolio</footer>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute -top-10 right-0 text-zinc-300 hover:text-white" onClick={() => setSelected(null)}>Close</button>
            {selected.provider === "youtube" && selected.embedId ? (
              <div className="w-full aspect-video">
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

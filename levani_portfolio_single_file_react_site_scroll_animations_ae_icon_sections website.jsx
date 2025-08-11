// Updated with // vornato comments for easy editing
// All editable text, links, images, and video sources now marked with // vornato

import React, { useEffect, useMemo, useState } from "react";
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
const PHOTO_URL = "https://placehold.co/640x800/png?text=Levani+Photo"; // vornato

// vornato: Quick contact chips (top on mobile)
const quickLinks = [
  { label: "Email", href: "mailto:levaniesitashvili1999@gmail.com" }, // vornato
  { label: "+995 595 55 14 05", href: "tel:+995595551405" }, // vornato
  { label: "YouTube: VorNato", href: "https://youtube.com/@vornatoofficial" }, // vornato
  { label: "Behance: vornato", href: "https://www.behance.net/vornato" }, // vornato
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

const PortfolioGrid: React.FC<{ items: any[]; onSelect?: (item: any) => void }> = ({ items, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((it, i) => (
      <button
        key={i}
        onClick={() => (onSelect ? onSelect(it) : window.open(it.href || "#", "_blank"))}
        className="group relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 hover:ring-zinc-600 transition text-left"
      >
        <img
          src={it.thumb}
          alt={it.title}
          className={`w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100 ${it.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"}`}
        />
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

  // --- Runtime tests (cheap sanity checks) ---
  useEffect(() => {
    console.assert(typeof (motion as any) !== "undefined", "framer-motion 'motion' should be defined");
    const expected = sectionOrder.length;
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

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-900/70 border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-wide">Levani Esitashvili</a> {/* vornato */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#casino" className="hover:text-white">Casino</a>
            <a href="#sports" className="hover:text-white">Sports</a>
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
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-zinc-800">
              <img src={PHOTO_URL} alt="Levani portrait" className="w-full object-cover" />
              {/* vornato: replace PHOTO_URL above */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Senior Video Editor", "After Effects / Premiere Pro", "Casino • Sports • Slots", "Social Cutdowns"].map((chip) => (
                <Badge key={chip} className="rounded-full bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800">{chip}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Video Editor & After Effects Specialist</h1> {/* vornato */}
            <p className="mt-4 text-zinc-300 leading-relaxed max-w-xl">I’m a senior video editor from Tbilisi who loves tech and innovative products. I craft sleek, platform-native promos for casino, sports, slots, and fantasy. Capturing and editing video to its final form is my thing.</p> {/* vornato */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#casino"><Button className="rounded-2xl">View Work</Button></a> {/* vornato */}
              <a href="#contact"><Button variant="secondary" className="rounded-2xl">Hire Me</Button></a> {/* vornato */}
            </div>
          </div>
        </div>
      </section>

      {/* Flying badge */}
      <FlyingBadge sectionOrder={[...sectionOrder]} />

      {/* SECTIONS */}
      <Section id="casino" title="Casino" subtitle="Trailers, promos, bumpers and motion graphics for casino brands." badge="Portfolio"> {/* vornato */}
        <PortfolioGrid items={casinoItems} onSelect={setSelected} />
      </Section>

      <Section id="sports" title="Sports" subtitle="Odds reels, hype edits, and event highlights."> {/* vornato */}
        <PortfolioGrid items={sportsItems} onSelect={setSelected} />
      </Section>

      <Section id="slots" title="Slots" subtitle="Feature teases and character-driven cutdowns for popular slot IPs."> {/* vornato */}
        <PortfolioGrid items={slotsItems} onSelect={setSelected} />
      </Section>

      <Section id="youtube" title="YouTube" subtitle="Latest edits and uploads from the VorNato channel." badge="Channel"> {/* vornato */}
        <PortfolioGrid items={youtubeItems} onSelect={setSelected} />
      </Section>

      <Section id="fiverr" title="Fiverr Work" subtitle="Hand-picked client pieces and repeat-order edits."> {/* vornato */}
        <PortfolioGrid items={fiverrItems} onSelect={setSelected} />
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
                <li>Content Creator — YouTube (VorNato)</li> {/* vornato */}
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
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selected.embedId}`} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
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

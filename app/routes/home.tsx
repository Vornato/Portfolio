import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = "", ...props }) => (
  <span className={`ui-badge inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-100 ${className}`} {...props} />
);
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary" }> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "ui-button inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-0";
  const styles =
    variant === "secondary"
      ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:ring-zinc-600"
      : "bg-white text-black hover:bg-zinc-200 focus:ring-white";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
};

const PHOTO_URL = `${import.meta.env.BASE_URL}Mainc.png`;
const YT_AVATAR_URL = `${import.meta.env.BASE_URL}profile.jpg`;
const YT_COVER_URL = `${import.meta.env.BASE_URL}youtube-cover.png`;
const MOTION_PRESET_URL = `${import.meta.env.BASE_URL}motion-preset.mp4`;
const DESKTOP_VIDEO_QUERY = "(min-width: 768px)";

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

type Language = "en" | "ka";
const LANG_STORAGE_KEY = "portfolio_lang";

const ui = {
  en: {
    home: "Home",
    backToTop: "Back to top",
    nav: {
      casino: "Casino",
      sports: "Sports",
      arqi: "Archi",
      events: "Events & Clubs",
      slots: "Slots",
      youtube: "YouTube",
      fiverr: "Fiverr",
      fantasy: "Fantasy",
      experience: "Experience",
      contact: "Contact",
    },
    labels: {
      openIntroVideo: "Open intro video",
      clickIt: "Click it",
      viewWork: "View Work",
      hireMe: "Hire Me",
      call: "Call",
      seeSportsPosters: "See Sports Posters on Behance",
      fiverrCard: "Unboxing video samples (Fiverr)",
      youtubeCoverAlt: "YouTube channel cover",
      send: "Send",
      close: "Close",
      openProject: "Open project",
      email: "Email",
      youtubeChannel: "YouTube Channel",
      carouselPlay: "Click to play",
      carouselOpenPrefix: "Open",
    },
    toasts: {
      needContact: "Please include your contact and a short note.",
      sent: "Thanks! Message sent successfully.",
      couldNotSend: "Could not send via form. Opening email draft...",
      openingMail: "Opening your email app with a draft...",
      copied: "Copied message to clipboard. Paste into your email app.",
      openedGmail: "Opened Gmail compose in a new tab.",
    },
    hero: {
      chips: ["Senior Video Editor", "After Effects / Premiere Pro", "Casino / Sports / Slots", "Social Cutdowns"],
      title: "Video Editor & After Effects Specialist",
      subtitle:
        "I'm a senior video editor from Tbilisi who loves tech and innovative products. I craft sleek, platform-native promos for casino, sports, slots, and fantasy. Capturing and editing video to its final form is my thing.",
    },
    sections: {
      casino: { title: "Casino", subtitle: "Trailers, promos, bumpers and motion graphics for casino brands.", badge: "Portfolio" },
      sports: { title: "Sports", subtitle: "Odds reels, hype edits, and event highlights.", badge: "" },
      arqi: { title: "Archi", subtitle: "Promos and edits for Archi (vertical 9:16).", badge: "New" },
      events: { title: "Events & Clubs", subtitle: "Recaps, aftermovies, and club promos (vertical 9:16).", badge: "New" },
      slots: { title: "Slots", subtitle: "Feature teases and character-driven cutdowns for popular slot IPs.", badge: "" },
      youtube: { title: "YouTube", subtitle: "Latest edits and uploads from the VorNato channel.", badge: "Channel" },
      fiverr: { title: "Fiverr Work", subtitle: "Hand-picked client pieces and repeat-order edits.", badge: "" },
      fantasy: { title: "Fantasy Games", subtitle: "Stylized teasers and promo assets for fantasy titles.", badge: "" },
      experience: { title: "Experience", subtitle: "A quick look at my background and tools.", badge: "About" },
      contact: { title: "Contact", subtitle: "Let's build something bold.", badge: "" },
    },
    proof: {
      stats: [
        { value: "8+", label: "Years editing" },
        { value: "200+", label: "Campaigns delivered" },
        { value: "Top Rated", label: "Fiverr freelancer" },
        { value: "28k+", label: "YouTube audience" },
      ],
    },
    experience: {
      profileTitle: "Profile",
      profileText:
        "Creative, performance-driven Senior Video Editor & Motion Designer (8+ years) crafting cinematic promos and brand stories. Expert with Adobe Creative Suite and 3D tools (Blender, Cinema 4D). Currently leading visual projects at Nova Tech Creative Solutions.",
      rolesTitle: "Roles",
      roles: [
        {
          title: "Archi Development — Motion Designer (Current)",
          detail: "Designing and animating motion assets for current brand and product campaigns.",
        },
        {
          title: "Nova Tech Creative Solutions — Video Editor / Team Leader (2021–2026)",
          detail: "Led 200+ Amazon-compliant campaigns; streamlined post-production, improving turnaround by ~30%.",
        },
        {
          title: "Freelancer (Fiverr, Upwork) — Senior Video Editor / Motion Designer (2017–2023)",
          detail: "50+ international clients across e-commerce, gaming, and entertainment; consistent 5-star feedback.",
        },
        {
          title: "Vornato YouTube — Content Creator & Editor (2015–2021)",
          detail: "Grew to 28k+ subscribers and 1M+ total views through cinematic, story-driven edits.",
        },
      ],
      educationTitle: "Education",
      education: ["Business & Technology University — BSc in Information Technologies", "Udemy — Videography Course Certificate"],
      skillsTitle: "Software & Skills",
      skills: ["After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Blender", "Cinema 4D", "Color Grading", "Motion Design", "3D Visualization"],
      achievementsTitle: "Achievements",
      achievements: [
        "Edited and delivered 200+ promotional/cinematic brand videos.",
        "Top Rated freelancer on Fiverr with consistent 5-star feedback.",
        "Produced Amazon-certified ad content surpassing 1M total views.",
        "Led multi-editor projects, improving workflow speed and consistency.",
      ],
      languagesTitle: "Languages",
      languages: ["Georgian — Native", "English — Full Professional", "Russian — Professional Working"],
    },
    contact: {
      nameLabel: "Name",
      contactLabel: "Email or Telegram",
      messageLabel: "Project details",
      namePlaceholder: "Your name",
      contactPlaceholder: "Email or Telegram",
      messagePlaceholder: "Project details",
      note: "Submitting opens your email client with the details pre-filled. For instant chat, DM me on YouTube or email directly.",
    },
  },
  ka: {
    home: "მთავარი",
    backToTop: "ზემოთ დაბრუნება",
    nav: {
      casino: "კაზინო",
      sports: "სპორტი",
      arqi: "არქი",
      events: "ივენთები და კლუბები",
      slots: "სლოტები",
      youtube: "იუთუბი",
      fiverr: "ფაივერი",
      fantasy: "ფენტეზი",
      experience: "გამოცდილება",
      contact: "კონტაქტი",
    },
    labels: {
      openIntroVideo: "ინტრო ვიდეოს გახსნა",
      clickIt: "დააჭირე",
      viewWork: "ნამუშევრების ნახვა",
      hireMe: "დამიქირავეთ",
      call: "დარეკვა",
      seeSportsPosters: "სპორტული პოსტერები Behance-ზე",
      fiverrCard: "Unboxing ვიდეოს ნიმუშები (Fiverr)",
      youtubeCoverAlt: "YouTube არხის ქავერი",
      send: "გაგზავნა",
      close: "დახურვა",
      openProject: "პროექტის გახსნა",
      email: "ელფოსტა",
      youtubeChannel: "YouTube არხი",
      carouselPlay: "დასაკრავად დააჭირეთ",
      carouselOpenPrefix: "გახსენი",
    },
    toasts: {
      needContact: "გთხოვთ მიუთითოთ კონტაქტი და მოკლე აღწერა.",
      sent: "გმადლობთ! შეტყობინება წარმატებით გაიგზავნა.",
      couldNotSend: "ფორმით გაგზავნა ვერ მოხერხდა. ვხსნი ელფოსტის დრაფტს...",
      openingMail: "ვხსნი თქვენს ელფოსტას დრაფტით...",
      copied: "ტექსტი დაკოპირდა. ჩასვით თქვენს ელფოსტაში.",
      openedGmail: "Gmail compose გაიხსნა ახალ ფანჯარაში.",
    },
    hero: {
      chips: ["სენიორ ვიდეო რედაქტორი", "After Effects / Premiere Pro", "კაზინო / სპორტი / სლოტები", "სოციალური cutdown-ები"],
      title: "ვიდეო რედაქტორი და After Effects სპეციალისტი",
      subtitle:
        "მე ვარ თბილისიდან სენიორ ვიდეო რედაქტორი, ვისაც უყვარს ტექნოლოგია და ინოვაციური პროდუქტები. ვქმნი პლატფორმისთვის მორგებულ პრომოებს კაზინოს, სპორტის, სლოტებისა და ფენტეზის მიმართულებებით. ვიდეოს გადაღება და საბოლოო ფორმამდე მიყვანა ჩემი საქმეა.",
    },
    sections: {
      casino: { title: "კაზინო", subtitle: "კაზინო ბრენდებისთვის ტრეილერები, პრომოები, ბამპერები და motion გრაფიკა.", badge: "პორტფოლიო" },
      sports: { title: "სპორტი", subtitle: "კოეფიციენტების რილები, hype-მონტაჟები და ღონისძიებების ჰაილაითები.", badge: "" },
      arqi: { title: "არქი", subtitle: "არქისთვის პრომოები და მონტაჟები (ვერტიკალური 9:16).", badge: "ახალი" },
      events: { title: "ივენთები და კლუბები", subtitle: "რექეფები, aftermovie-ები და კლუბური პრომოები (ვერტიკალური 9:16).", badge: "ახალი" },
      slots: { title: "სლოტები", subtitle: "პოპულარული სლოტ IP-ებისთვის ფუნქციების თიზერები და პერსონაჟზე დაფუძნებული cutdown-ები.", badge: "" },
      youtube: { title: "იუთუბი", subtitle: "VorNato არხის უახლესი ვიდეოები და მონტაჟები.", badge: "არხი" },
      fiverr: { title: "Fiverr ნამუშევრები", subtitle: "კლიენტებისთვის შექმნილი გამორჩეული ვიდეოები და განმეორებითი შეკვეთები.", badge: "" },
      fantasy: { title: "ფენტეზი თამაშები", subtitle: "სტილიზებული თიზერები და პრომო მასალა ფენტეზი პროექტებისთვის.", badge: "" },
      experience: { title: "გამოცდილება", subtitle: "ჩემი გამოცდილებისა და ინსტრუმენტების მოკლე მიმოხილვა.", badge: "შესახებ" },
      contact: { title: "კონტაქტი", subtitle: "მოდი, ერთად შევქმნათ რაღაც გამორჩეული.", badge: "" },
    },
    proof: {
      stats: [
        { value: "8+", label: "წელი მონტაჟში" },
        { value: "200+", label: "ჩაბარებული კამპანია" },
        { value: "Top Rated", label: "Fiverr ფრილანსერი" },
        { value: "28k+", label: "YouTube აუდიტორია" },
      ],
    },
    experience: {
      profileTitle: "პროფილი",
      profileText:
        "შედეგზე ორიენტირებული Senior Video Editor & Motion Designer (8+ წელი). ვქმნი კინემატოგრაფიულ პრომოებსა და ბრენდულ ისტორიებს. ვმუშაობ Adobe Creative Suite-ით და 3D ინსტრუმენტებით (Blender, Cinema 4D). ამჟამად ვხელმძღვანელობ ვიზუალურ პროექტებს Nova Tech Creative Solutions-ში.",
      rolesTitle: "როლები",
      roles: [
        {
          title: "Archi Development — Motion Designer (ამჟამად)",
          detail: "ვქმნი და ვანიმირებ motion მასალებს მიმდინარე ბრენდული და პროდუქტის კამპანიებისთვის.",
        },
        {
          title: "Nova Tech Creative Solutions — Video Editor / Team Leader (2021–2026)",
          detail: "ვუხელმძღვანელე 200+ Amazon-compliant კამპანიას და პოსტპროდაქშენის პროცესის ოპტიმიზაციით დრო დაახლოებით 30%-ით შევამცირე.",
        },
        {
          title: "Freelancer (Fiverr, Upwork) — Senior Video Editor / Motion Designer (2017–2023)",
          detail: "50+ საერთაშორისო კლიენტი e-commerce, gaming და entertainment მიმართულებებით; სტაბილური 5-ვარსკვლავიანი შეფასებები.",
        },
        {
          title: "Vornato YouTube — Content Creator & Editor (2015–2021)",
          detail: "არხი გავზარდე 28k+ გამომწერამდე და 1M+ ნახვამდე კინემატოგრაფიული, სთორიზე დაფუძნებული მონტაჟებით.",
        },
      ],
      educationTitle: "განათლება",
      education: ["Business & Technology University — BSc ინფორმაციულ ტექნოლოგიებში", "Udemy — Videography Course Certificate"],
      skillsTitle: "პროგრამები და უნარები",
      skills: ["After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Blender", "Cinema 4D", "Color Grading", "Motion Design", "3D Visualization"],
      achievementsTitle: "მიღწევები",
      achievements: [
        "200+ პრომო/კინემატოგრაფიული ბრენდული ვიდეოს მონტაჟი და მიწოდება.",
        "Top Rated სტატუსი Fiverr-ზე და სტაბილური 5-ვარსკვლავიანი შეფასებები.",
        "Amazon-certified სარეკლამო კონტენტი 1M+ საერთო ნახვით.",
        "მრავალრედაქტორული პროექტების მართვა და სამუშაო პროცესის დაჩქარება.",
      ],
      languagesTitle: "ენები",
      languages: ["ქართული — მშობლიური", "ინგლისური — პროფესიული", "რუსული — სამუშაო დონე"],
    },
    contact: {
      nameLabel: "სახელი",
      contactLabel: "ელფოსტა ან Telegram",
      messageLabel: "პროექტის დეტალები",
      namePlaceholder: "თქვენი სახელი",
      contactPlaceholder: "ელფოსტა ან Telegram",
      messagePlaceholder: "პროექტის დეტალები",
      note: "გაგზავნისას გაიხსნება თქვენი ელფოსტა წინასწარ შევსებული ინფორმაციით. სწრაფი კომუნიკაციისთვის მომწერეთ YouTube-ზე ან ელფოსტაზე.",
    },
  },
} as const;

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

// New: Archi items (YouTube Shorts)
const arqiItems: PortfolioItem[] = [
  { title: "Archi Short 1", tag: "Archi", provider: "youtube", embedId: "ezDfjyzhPRM", poster: "https://img.youtube.com/vi/ezDfjyzhPRM/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 2", tag: "Archi", provider: "youtube", embedId: "Leif5tfR-vA", poster: "https://img.youtube.com/vi/Leif5tfR-vA/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 3", tag: "Archi", provider: "youtube", embedId: "DAG_iJAvdtE", poster: "https://img.youtube.com/vi/DAG_iJAvdtE/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 4", tag: "Archi", provider: "youtube", embedId: "ashI2x3fJcI", poster: "https://img.youtube.com/vi/ashI2x3fJcI/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 5", tag: "Archi", provider: "youtube", embedId: "8PAjRGUR_nk", poster: "https://img.youtube.com/vi/8PAjRGUR_nk/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 6", tag: "Archi", provider: "youtube", embedId: "X2THCukSVrE", poster: "https://img.youtube.com/vi/X2THCukSVrE/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 7", tag: "Archi", provider: "youtube", embedId: "1tndiCtNBb4", poster: "https://img.youtube.com/vi/1tndiCtNBb4/maxresdefault.jpg", orientation: "vertical" },
  { title: "Archi Short 8", tag: "Archi", provider: "youtube", embedId: "zzFGu8wbxL8", poster: "https://img.youtube.com/vi/zzFGu8wbxL8/maxresdefault.jpg", orientation: "vertical" },
];

const casinoItems: PortfolioItem[] = [
  // 1 → 2 → 3 → 4 → 5 → 6 (requested order)
  { title: "Casino Short (Shorts)", tag: "Casino", provider: "youtube", embedId: "OUtLS5hc-mw", poster: "https://img.youtube.com/vi/OUtLS5hc-mw/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Short (Shorts)", tag: "Casino", provider: "youtube", embedId: "KoYBF8pH-1o", poster: "https://img.youtube.com/vi/KoYBF8pH-1o/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Short 3", tag: "Casino", provider: "youtube", embedId: "5x4v_d2RvFc", poster: "https://img.youtube.com/vi/5x4v_d2RvFc/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Short 2", tag: "Casino", provider: "youtube", embedId: "gcNzXB7Suz4", poster: "https://img.youtube.com/vi/gcNzXB7Suz4/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Short 1", tag: "Casino", provider: "youtube", embedId: "upR7VahYFns", poster: "https://img.youtube.com/vi/upR7VahYFns/maxresdefault.jpg", orientation: "vertical" },
  { title: "Casino Promo", tag: "Casino", provider: "youtube", embedId: "12I1ZI218g0", poster: "https://img.youtube.com/vi/12I1ZI218g0/maxresdefault.jpg", orientation: "horizontal" },
];

const sportsItems: PortfolioItem[] = [
  { title: "Sports Short 1", tag: "Sports", provider: "youtube", embedId: "E6GFqu2ttew", poster: "https://img.youtube.com/vi/E6GFqu2ttew/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 2", tag: "Sports", provider: "youtube", embedId: "rrS3HWgNbYY", poster: "https://img.youtube.com/vi/rrS3HWgNbYY/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 3", tag: "Sports", provider: "youtube", embedId: "sKgoTYIXh64", poster: "https://img.youtube.com/vi/sKgoTYIXh64/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 4", tag: "Sports", provider: "youtube", embedId: "hpGqE-6rxsA", poster: "https://img.youtube.com/vi/hpGqE-6rxsA/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 5", tag: "Sports", provider: "youtube", embedId: "bT4JhehsXEU", poster: "https://img.youtube.com/vi/bT4JhehsXEU/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short 6", tag: "Sports", provider: "youtube", embedId: "kxHJrAXDAN0", poster: "https://img.youtube.com/vi/kxHJrAXDAN0/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short (Shorts)", tag: "Sports", provider: "youtube", embedId: "HhxDVWDt9Tg", poster: "https://img.youtube.com/vi/HhxDVWDt9Tg/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short (Shorts)", tag: "Sports", provider: "youtube", embedId: "bZzFqJvyZgo", poster: "https://img.youtube.com/vi/bZzFqJvyZgo/maxresdefault.jpg", orientation: "vertical" },
  { title: "Sports Short (Shorts)", tag: "Sports", provider: "youtube", embedId: "WZRLDQU1dqM", poster: "https://img.youtube.com/vi/WZRLDQU1dqM/maxresdefault.jpg", orientation: "vertical" },
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

const normalizeCarouselItems = (items: PortfolioItem[], minCount = 6): PortfolioItem[] => {
  if (items.length >= minCount || items.length === 0) return items;
  const repeats = Math.ceil(minCount / items.length);
  return Array.from({ length: repeats * items.length }, (_, idx) => items[idx % items.length]);
};

const eventsCarouselItems = normalizeCarouselItems(eventsItems);
const youtubeCarouselItems = normalizeCarouselItems(youtubeItems);
const fantasyCarouselItems = normalizeCarouselItems(fantasyItems);

const sectionOrder = ["hero", "casino", "sports", "arqi", "events", "slots", "youtube", "fiverr", "fantasy", "experience", "contact"] as const;

function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = React.useState(initial);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, [query]);

  return matches;
}

const Section: React.FC<{ id: string; title: string; subtitle?: string; badge?: string; backToTopLabel?: string; children: React.ReactNode }> = ({
  id,
  title,
  subtitle,
  badge,
  backToTopLabel = "Back to top",
  children,
}) => (
  <section
    id={id}
    className="relative snap-start mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 scroll-mt-20"
  >
    <div className="w-full">
      <div className="mb-4 sm:mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          {badge && <Badge className="mb-3 rounded-2xl px-3 py-1 text-xs">{badge}</Badge>}
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="section-subtitle mt-2 text-zinc-300 max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
        <a href="#top" onClick={(e) => handleNavClick(e, "top")} className="hidden md:inline-flex items-center text-zinc-400 hover:text-white text-sm">
          {backToTopLabel}
        </a>
      </div>
      {children}
    </div>
  </section>
);

const Poster: React.FC<{ item: PortfolioItem; className?: string }> = ({ item, className = "" }) => {
  const src = item.poster || posterPlaceholder({ label: item.title, orientation: item.orientation });
  return (
    <img
      src={src}
      alt={item.title}
      className={`h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100 ${className}`}
    />
  );
};

const CAROUSEL_AUTOPLAY_MS = 2600;
const PortfolioGrid: React.FC<{ items: PortfolioItem[]; onSelect?: (item: PortfolioItem) => void; playHint?: string; openLabel?: string }> = ({
  items,
  onSelect,
  playHint = "Click to play",
  openLabel = "Open",
}) => {
  const itemCount = items.length;
  if (!itemCount) return null;
  const canSlide = itemCount > 1;

  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const sliderClassBase = `category-swiper-${uid}`;
  const paginationClass = `${sliderClassBase}-pagination`;
  const prevClass = `${sliderClassBase}-prev`;
  const nextClass = `${sliderClassBase}-next`;
  const swiperRef = React.useRef<SwiperInstance | null>(null);

  const openItem = (item: PortfolioItem) => {
    if (onSelect) {
      onSelect(item);
      return;
    }
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleSwiperReady = (swiper: SwiperInstance) => {
    swiperRef.current = swiper;
    if (swiper.autoplay) {
      swiper.autoplay.start();
    }
  };

  const handleSwiperClick = (swiper: SwiperInstance, event?: MouseEvent | PointerEvent | TouchEvent) => {
    const target = event?.target as HTMLElement | null;
    if (target?.closest(".swiper-button-prev, .swiper-button-next, .swiper-pagination, .swiper-pagination-bullet")) {
      return;
    }

    if (!swiper.clickedSlide) return;
    const clickedEl = swiper.clickedSlide as HTMLElement;
    const sliderEl = swiper.el as HTMLElement;
    const clickedRect = clickedEl.getBoundingClientRect();
    const sliderRect = sliderEl.getBoundingClientRect();
    const clickedCenterX = clickedRect.left + clickedRect.width / 2;
    const sliderCenterX = sliderRect.left + sliderRect.width / 2;
    const isLeftSide = clickedCenterX < sliderCenterX - 2;
    const isRightSide = clickedCenterX > sliderCenterX + 2;

    if (canSlide && isLeftSide) {
      swiper.slidePrev();
      return;
    }
    if (canSlide && isRightSide) {
      swiper.slideNext();
      return;
    }

    const safeIndex = ((swiper.realIndex % itemCount) + itemCount) % itemCount;
    const item = items[safeIndex];
    if (item) {
      openItem(item);
    }
  };

  const handlePrevButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canSlide) return;
    swiperRef.current?.slidePrev();
  };

  const handleNextButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canSlide) return;
    swiperRef.current?.slideNext();
  };

  return (
    <div className="category-slider-shell mx-auto w-full max-w-[1240px]" role="region" aria-roledescription="carousel" aria-label="Video carousel">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination, A11y]}
        className="category-slider"
        loop={canSlide}
        grabCursor={canSlide}
        centeredSlides
        slidesPerView={"auto"}
        speed={900}
        watchOverflow
        effect="coverflow"
        coverflowEffect={{
          rotate: 28,
          stretch: 0,
          depth: 220,
          modifier: 1.1,
          slideShadows: true,
        }}
        autoplay={
          canSlide
            ? {
                delay: CAROUSEL_AUTOPLAY_MS,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        a11y={{ enabled: true, scrollOnFocus: false }}
        pagination={canSlide ? { el: `.${paginationClass}`, clickable: true } : false}
        onSwiper={handleSwiperReady}
        onClick={handleSwiperClick}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={`${item.embedId || item.href || item.title}-${idx}`} className={item.orientation === "vertical" ? "is-vertical" : "is-horizontal"}>
            <button type="button" className="category-slide-inner group" aria-label={`${openLabel} ${item.title}`}>
              <div className="category-slide-media">
                <Poster item={item} className={item.orientation === "vertical" ? "object-contain bg-black/70" : ""} />
              </div>
              <div className="category-slide-caption">
                {item.tag && <span className="category-slide-chip">{item.tag}</span>}
                <h3>{item.title}</h3>
                <p>{playHint}</p>
              </div>
              <span className="category-slide-play" aria-hidden="true" />
            </button>
          </SwiperSlide>
        ))}

        {canSlide && (
          <>
            <button
              type="button"
              className={`swiper-button-prev ${prevClass}`}
              aria-label="Previous video"
              onClick={handlePrevButtonClick}
            />
            <button
              type="button"
              className={`swiper-button-next ${nextClass}`}
              aria-label="Next video"
              onClick={handleNextButtonClick}
            />
            <div className={`swiper-pagination ${paginationClass}`} />
          </>
        )}
      </Swiper>
    </div>
  );
};

const ScrollVideoBackground: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const progressRef = React.useRef<HTMLDivElement | null>(null);
  const layerRef = React.useRef<HTMLDivElement | null>(null);
  const shouldRenderVideo = useMediaQuery(DESKTOP_VIDEO_QUERY);

  React.useEffect(() => {
    const scrollProgress = progressRef.current;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const getScrollRatio = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return clamp(window.scrollY / maxScroll, 0, 1);
    };
    const updateScrollProgress = () => {
      if (scrollProgress) {
        scrollProgress.style.width = `${Math.round(getScrollRatio() * 10000) / 100}%`;
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  React.useEffect(() => {
    if (!shouldRenderVideo) return;
    const bgVideo = videoRef.current;
    const layer = layerRef.current;
    if (!bgVideo) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const lerp = (current: number, target: number, factor: number) => current + (target - current) * factor;
    const getScrollRatio = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return clamp(window.scrollY / maxScroll, 0, 1);
    };

    let targetScrollRatio = getScrollRatio();
    let videoReady = false;
    let videoDuration = 0;
    let smoothVideoTime = 0;
    let lastVideoCommitMs = 0;
    let rafId = 0;

    const updateTargetScrollRatio = () => {
      targetScrollRatio = getScrollRatio();
    };

    const initializeVideo = () => {
      const nativeWidth = bgVideo.videoWidth || 1920;
      const nativeHeight = bgVideo.videoHeight || 1080;
      if (layer) {
        layer.style.setProperty("--video-native-width", `${nativeWidth}`);
        layer.style.setProperty("--video-native-height", `${nativeHeight}`);
      }

      videoDuration = Number.isFinite(bgVideo.duration) ? bgVideo.duration : 0;
      videoReady = videoDuration > 0;
      smoothVideoTime = targetScrollRatio * videoDuration;
      lastVideoCommitMs = 0;
      if (videoReady) {
        bgVideo.currentTime = smoothVideoTime;
      }
    };

    const handlePlay = () => {
      bgVideo.pause();
    };

    bgVideo.pause();
    bgVideo.loop = false;
    bgVideo.removeAttribute("autoplay");

    if (bgVideo.readyState >= 1) {
      initializeVideo();
    } else {
      bgVideo.addEventListener("loadedmetadata", initializeVideo, { once: true });
    }

    bgVideo.addEventListener("play", handlePlay);
    updateTargetScrollRatio();
    window.addEventListener("scroll", updateTargetScrollRatio, { passive: true });
    window.addEventListener("resize", updateTargetScrollRatio);

    const animateMotion = (now: number) => {
      if (videoReady) {
        const targetVideoTime = targetScrollRatio * videoDuration;

        if (prefersReducedMotion) {
          smoothVideoTime = targetVideoTime;
        } else {
          smoothVideoTime = lerp(smoothVideoTime, targetVideoTime, 0.28);
          if (Math.abs(targetVideoTime - smoothVideoTime) < 0.0015) {
            smoothVideoTime = targetVideoTime;
          }
        }

        const delta = Math.abs(bgVideo.currentTime - smoothVideoTime);
        const commitInterval = prefersReducedMotion ? 1000 / 24 : 1000 / 42;
        const readyToCommit = now - lastVideoCommitMs >= commitInterval;
        const forceCommit = delta > 0.11;

        if ((readyToCommit || forceCommit) && !bgVideo.seeking && delta > 0.008) {
          bgVideo.currentTime = smoothVideoTime;
          lastVideoCommitMs = now;
        }
      }

      rafId = window.requestAnimationFrame(animateMotion);
    };

    rafId = window.requestAnimationFrame(animateMotion);

    return () => {
      window.removeEventListener("scroll", updateTargetScrollRatio);
      window.removeEventListener("resize", updateTargetScrollRatio);
      bgVideo.removeEventListener("play", handlePlay);
      bgVideo.removeEventListener("loadedmetadata", initializeVideo);
      window.cancelAnimationFrame(rafId);
    };
  }, [shouldRenderVideo]);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div className="mobile-ambient-bg" aria-hidden="true" />
      {shouldRenderVideo && (
        <div ref={layerRef} className="video-bg" aria-hidden="true">
          <video ref={videoRef} className="video-bg-media" muted playsInline preload="metadata">
            <source src={MOTION_PRESET_URL} type="video/mp4" />
          </video>
          <div className="video-bg-overlay" />
        </div>
      )}
    </>
  );
};

const EdgeArrowsClean: React.FC = () => (
  <motion.div aria-hidden="true" className="edge-arrows-clean pointer-events-none absolute inset-0" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
    {[
      { top: "8%", left: "50%", transform: "translate(-50%, 0) rotate(0deg)" },
      { top: "50%", left: "92%", transform: "translate(0, -50%) rotate(90deg)" },
      { top: "92%", left: "50%", transform: "translate(-50%, -100%) rotate(180deg)" },
      { top: "50%", left: "8%", transform: "translate(-100%, -50%) rotate(-90deg)" },
    ].map((pos, i) => (
      <div key={i} className="absolute text-white/80 drop-shadow" style={pos as any}>
        <div className="flex gap-1 text-xl"><span>&gt;&gt;&gt;</span><span>&gt;&gt;&gt;</span><span>&gt;&gt;&gt;</span></div>
      </div>
    ))}
  </motion.div>
);

const FlyingBadge: React.FC<{
  sectionOrder: string[];
  dropped?: boolean;
  onToggle?: () => void;
}> = ({ sectionOrder, dropped = false, onToggle }) => {
  const topY = "-44vh";
  const bottomY = "44vh";
  const steps = Math.max(1, sectionOrder.length - 1);

  const input: number[] = [];
  const yVals: (string | number)[] = [];
  const rotVals: number[] = [];
  const scaleVals: number[] = [];

  for (let i = 0; i < steps; i++) {
    const goingLeftToRight = i % 2 === 0;

    const tStart = i / steps;
    const tQ1 = tStart + 0.25 / steps;
    const tMid = tStart + 0.5 / steps;
    const tQ3 = tStart + 0.75 / steps;
    const tEnd = (i + 1) / steps;

    const startEdge = goingLeftToRight ? topY : bottomY;
    const q1 = goingLeftToRight ? "-22vh" : "22vh";
    const center = "0vh";
    const q3 = goingLeftToRight ? "22vh" : "-22vh";
    const endEdge = goingLeftToRight ? bottomY : topY;

    const r0 = 180 * i;
    const r45 = r0 + 45;
    const r90 = r0 + 90;
    const r135 = r0 + 135;
    const r180 = r0 + 180;

    const s0 = 0.92;
    const s1 = 1.14;
    const s2 = 1.0;
    const s3 = 1.14;
    const s4 = 0.92;

    input.push(tStart, tQ1, tMid, tQ3, tEnd);
    yVals.push(startEdge, q1, center, q3, endEdge);
    rotVals.push(r0, r45, r90, r135, r180);
    scaleVals.push(s0, s1, s2, s3, s4);
  }

  if (steps === 1 && input.length === 0) {
    input.push(0, 1);
    yVals.push(topY, bottomY);
    rotVals.push(0, 180);
    scaleVals.push(1, 1);
  }

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, input, yVals as any);
  const rotate = useTransform(scrollYProgress, input, rotVals);
  const scale = useTransform(scrollYProgress, input, scaleVals);

  const emojiBySection: Record<string, string[]> = {
  hero: ["AE", "🎬", "🎯", "🪄", "🌀"],
  casino: ["🎰", "🎲", "🃏", "💰"],
  sports: ["🏆", "⚽", "🏀", "🏈", "🥊"],
  events: ["🎉", "🎤", "🎞️", "🎪"],
  slots: ["🎰", "💎", "🍀", "7️⃣"],
  youtube: ["▶️", "🎥", "📺", "🔔"],
  fiverr: ["💼", "💚", "⚙️", "🤝"],
  fantasy: ["🐉", "🧙‍♂️", "🗡️", "🏰", "🎯"],
  experience: ["🧠", "🛠️", "📈", "🗂️"],
  contact: ["✉️", "📨", "📞", "💬", "📮"],
};
  const [emojiCycle, setEmojiCycle] = React.useState<Record<string, number>>({});
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
  const emojiList = emojiBySection[currentKey] || ["✨"];
  const currentEmojiIdx = emojiCycle[currentKey] ?? 0;
  const currentEmoji = emojiList[currentEmojiIdx % emojiList.length];

  React.useEffect(() => {
    const list = emojiBySection[currentKey] || ["✨"];
    setEmojiCycle((prev) => ({
      ...prev,
      [currentKey]: ((prev[currentKey] ?? -1) + 1) % list.length,
    }));
  }, [currentKey]);
  const containerClass = dropped
    ? "floating-badge fixed left-[100px] bottom-6 z-30"
    : "floating-badge fixed left-[100px] top-1/2 z-30 -translate-y-1/2";

  // BIGGER BADGE + ICON
  return (
    <div className={containerClass} style={dropped ? undefined : { top: "calc(50% + 40px)" }}>
      <motion.button
        type="button"
        aria-label={dropped ? "Resume floating" : "Drop badge"}
        title={dropped ? "Click to resume floating" : "Click to drop here"}
        onClick={onToggle}
        className="pointer-events-auto focus:outline-none"
        style={dropped ? undefined : { y }}
        animate={dropped ? { y: 0, rotate: 0, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          style={dropped ? undefined : { rotate, scale }}
          className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-black/90 shadow-2xl ring-2 ring-[#9999FF]/35 flex items-center justify-center backdrop-blur"
          whileTap={{ scale: 0.96 }}
        >
          <div className="select-none text-5xl sm:text-6xl font-black tracking-widest mix-blend-screen text-white">
            <span role="img" aria-label={currentKey}>{currentEmoji}</span>
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
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved === "ka" ? "ka" : "en";
  });
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [badgeDropped, setBadgeDropped] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastKind, setToastKind] = useState<"success" | "error" | "info">("info");
  const t = ui[language];
  const navItems: Array<{ id: (typeof sectionOrder)[number]; label: string }> = [
    { id: "casino", label: t.nav.casino },
    { id: "sports", label: t.nav.sports },
    { id: "arqi", label: t.nav.arqi },
    { id: "events", label: t.nav.events },
    { id: "slots", label: t.nav.slots },
    { id: "youtube", label: t.nav.youtube },
    { id: "fiverr", label: t.nav.fiverr },
    { id: "fantasy", label: t.nav.fantasy },
    { id: "experience", label: t.nav.experience },
    { id: "contact", label: t.nav.contact },
  ];
  const gridLabels = { playHint: t.labels.carouselPlay, openLabel: t.labels.carouselOpenPrefix };

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANG_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    console.assert(typeof (motion as any) !== "undefined", "framer-motion 'motion' should be defined");
    const expected = sectionOrder.length;
    console.assert(expected === 11, `Expected 11 waypoints, found ${expected}`);
    console.assert(Array.isArray(casinoItems) && casinoItems.length > 0, "casinoItems should be defined with items");
    console.assert(Array.isArray(sportsItems) && sportsItems.length > 0, "sportsItems should be defined with items");
    console.assert(Array.isArray(eventsItems) && eventsItems.length > 0, "eventsItems should be defined with items");
    console.assert(Array.isArray(slotsItems) && slotsItems.length > 0, "slotsItems should be defined with items");
    console.assert(Array.isArray(youtubeItems) && youtubeItems.length > 0, "youtubeItems should be defined with items");
    console.assert(Array.isArray(fantasyItems) && fantasyItems.length > 0, "fantasyItems should be defined with items");
  }, []);

  const onContactSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const contact = (fd.get("contact") as string) || "";
    const message = (fd.get("message") as string) || "";
    if (!contact && !message) {
      setToast(t.toasts.needContact);
      setToastKind("error");
      window.setTimeout(() => setToast(null), 3000);
      return;
    }
    const endpoint = (import.meta as any).env?.VITE_CONTACT_ENDPOINT as string | undefined;
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ source: "portfolio", page: window.location.href, name, contact, message }),
        });
        if (res.ok) {
          setToast(t.toasts.sent);
          setToastKind("success");
          (e.currentTarget as HTMLFormElement).reset();
          window.setTimeout(() => setToast(null), 3000);
          return;
        }
      } catch {}
    }
    const subject = encodeURIComponent(
      language === "ka" ? `პორტფოლიოს მოთხოვნა: ${name || "ვებსაიტი"}` : `Portfolio inquiry from ${name || "Website"}`
    );
    const body = encodeURIComponent(`${t.labels.email}: ${contact}\n\n${message}`);
    if (endpoint) {
      setToast(t.toasts.couldNotSend);
      setToastKind("error");
    } else {
      setToast(t.toasts.openingMail);
      setToastKind("info");
    }

    const to = "levaniesitashvili1999@gmail.com";
    try {
      const mailHref = `mailto:${to}?subject=${subject}&body=${body}`;
      const a = document.createElement("a");
      a.href = mailHref;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      const focusedAtClick = document.hasFocus();
      setTimeout(async () => {
        if (document.hasFocus() && focusedAtClick) {
          const gmail = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
          const w = window.open(gmail, "_blank", "noopener,noreferrer");
          if (!w) {
            try {
              await navigator.clipboard.writeText(`To: ${to}\nSubject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`);
              setToast(t.toasts.copied);
              setToastKind("error");
            } catch {}
          } else {
            setToast(t.toasts.openedGmail);
            setToastKind("info");
          }
          setTimeout(() => setToast(null), 3500);
        } else {
          setTimeout(() => setToast(null), 3000);
        }
      }, 900);
    } catch {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <main id="top" className="relative z-10 min-h-screen w-full text-white snap-y snap-proximity bg-transparent">
      <ScrollVideoBackground />

      {toast && (
        <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-xl px-4 py-2 text-sm shadow-lg ring-1 ${toastKind === "error" ? "bg-red-600/90 ring-red-300/40" : toastKind === "success" ? "bg-emerald-600/90 ring-emerald-300/40" : "bg-zinc-800/90 ring-zinc-300/40"}`}>
          {toast}
        </div>
      )}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-900/70 border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <div className="flex items-center gap-3">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "top")}
              className="rounded-lg bg-zinc-800/80 hover:bg-zinc-700 px-3 py-1 text-sm text-zinc-100 ring-1 ring-zinc-700"
            >
              {t.home}
            </a>
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "top")}
              className="font-extrabold tracking-wide text-sm sm:text-base text-white"
            >
              Levani Esitashvili
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="top-nav-links hidden md:flex items-center gap-1 lg:gap-2 text-sm text-zinc-300">
              {navItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className="px-2 py-1 rounded-lg text-zinc-300/90 hover:text-white hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="lang-switch inline-flex items-center rounded-full bg-zinc-900/90 ring-1 ring-zinc-700 p-1">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full text-xs sm:text-sm transition ${
                  language === "en" ? "bg-zinc-100 text-zinc-900" : "text-zinc-200 hover:bg-zinc-800"
                }`}
                aria-pressed={language === "en"}
                aria-label="Switch language to English"
              >
                🇺🇸 EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ka")}
                className={`px-2.5 py-1 rounded-full text-xs sm:text-sm transition ${
                  language === "ka" ? "bg-zinc-100 text-zinc-900" : "text-zinc-200 hover:bg-zinc-800"
                }`}
                aria-pressed={language === "ka"}
                aria-label="Switch language to Georgian"
              >
                🇬🇪 KA
              </button>
            </div>

            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="md:hidden inline-flex items-center gap-2 text-sm text-zinc-200">
              {t.nav.contact}
            </a>
          </div>
        </div>
      </header>

      <nav className="mobile-section-nav md:hidden" aria-label="Portfolio sections">
        <div className="mobile-section-nav-scroll">
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)} className="mobile-section-link">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ===== HERO re-layout: image on left, social card under image, title on right ===== */}
      <section
        className="relative snap-start mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pb-10 lg:pb-12 scroll-mt-20"
        id="hero"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* LEFT */}
          <div className="relative">
            <a
              href="https://youtu.be/pPaX34rLRHY"
              target="_blank"
              rel="noreferrer"
              className="hero-portrait-card block relative overflow-hidden rounded-3xl ring-1 ring-zinc-800/80 group bg-zinc-900/40"
              aria-label={t.labels.openIntroVideo}
            >
              <img src={PHOTO_URL} alt="Levani portrait" className="hero-portrait-image w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#9999FF]/10 via-transparent to-[#00FFC6]/10" />
              <EdgeArrowsClean />
              <motion.div
                className="absolute left-4 top-4 z-10"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="rounded-full bg-black/70 text-white text-xs px-3 py-1 ring-1 ring-white/20 shadow-lg">{t.labels.clickIt}</span>
              </motion.div>
            </a>

            {/* Social buttons in a rounded card under the image */}
            <div className="mt-5 rounded-2xl bg-zinc-900/80 ring-1 ring-zinc-800 p-3 sm:p-4 w-full">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-950/70 hover:bg-zinc-800 px-3 py-2 ring-1 ring-zinc-800 hover:ring-zinc-600 text-xs sm:text-sm transition"
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
            </div>

            {/* Chips row like in your sketch, under socials */}
            <div className="hero-chip-list mt-4 flex flex-wrap gap-2">
              {t.hero.chips.map((chip) => (
                <Badge key={chip} className="rounded-full bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800">
                  {chip}
                </Badge>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h1
              className={`font-extrabold leading-tight ${
                language === "ka" ? "hero-title text-3xl sm:text-4xl md:text-5xl" : "hero-title text-4xl sm:text-5xl md:text-6xl"
              }`}
            >
              {t.hero.title}
            </h1>
            <p className={`hero-subtitle mt-4 text-zinc-300 leading-relaxed max-w-xl ${language === "ka" ? "text-base md:text-[1.04rem]" : ""}`}>
              {t.hero.subtitle}
            </p>
            <div className="hero-proof-grid" aria-label="Career highlights">
              {t.proof.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="hero-proof-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-action-row mt-6 flex flex-wrap items-center gap-3">
              <a href="#casino" onClick={(e) => handleNavClick(e, "casino")}>
                <Button
                  className={`rounded-2xl px-6 py-3 md:px-8 md:py-4 font-semibold bg-gradient-to-r from-[#9FA2FF] to-[#00FFC6] text-black/90 hover:from-[#B4B6FF] hover:to-[#2EFFD8] shadow-lg shadow-[#00FFC6]/20 ${
                    language === "ka" ? "text-sm md:text-base" : "text-base md:text-lg"
                  }`}
                >
                  {t.labels.viewWork}
                </Button>
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                <Button
                  variant="secondary"
                  className={`rounded-2xl px-6 py-3 md:px-8 md:py-4 font-semibold bg-zinc-900 text-white ring-1 ring-zinc-700 hover:ring-zinc-500 shadow-lg/40 ${
                    language === "ka" ? "text-sm md:text-base" : "text-base md:text-lg"
                  }`}
                >
                  {t.labels.hireMe}
                </Button>
              </a>
              <a href="tel:+995595551405" className="hero-call-pill inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 ring-1 ring-white/15 text-white/90 hover:bg-black/60 hover:ring-white/25 transition">
                <span className="text-xs uppercase tracking-widest text-white/60">{t.labels.call}</span>
                <span className="font-semibold">+995 595 55 14 05</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FlyingBadge sectionOrder={[...sectionOrder]} dropped={badgeDropped} onToggle={() => setBadgeDropped((v) => !v)} />

      {/* ==== REST OF YOUR PAGE UNCHANGED ==== */}
      <Section id="casino" title={t.sections.casino.title} subtitle={t.sections.casino.subtitle} badge={t.sections.casino.badge} backToTopLabel={t.backToTop}>
        <PortfolioGrid items={casinoItems} onSelect={setSelected} {...gridLabels} />
      </Section>

      <Section id="sports" title={t.sections.sports.title} subtitle={t.sections.sports.subtitle} backToTopLabel={t.backToTop}>
        <PortfolioGrid items={sportsItems} onSelect={setSelected} {...gridLabels} />
        <div className="mt-6">
          <a
            href="https://www.behance.net/gallery/172080181/Sport-Poster-Designs-%28Football-Basketball-etc%29"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm ring-1 ring-zinc-800 hover:ring-zinc-600 transition"
          >
            <span>{t.labels.seeSportsPosters}</span> <span>&rarr;</span>
          </a>
        </div>
      </Section>

      <Section id="arqi" title={t.sections.arqi.title} subtitle={t.sections.arqi.subtitle} badge={t.sections.arqi.badge} backToTopLabel={t.backToTop}>
        <PortfolioGrid items={arqiItems} onSelect={setSelected} {...gridLabels} />
      </Section>

      <Section id="events" title={t.sections.events.title} subtitle={t.sections.events.subtitle} badge={t.sections.events.badge} backToTopLabel={t.backToTop}>
        <PortfolioGrid items={eventsCarouselItems} onSelect={setSelected} {...gridLabels} />
      </Section>

      <Section id="slots" title={t.sections.slots.title} subtitle={t.sections.slots.subtitle} backToTopLabel={t.backToTop}>
        <PortfolioGrid items={slotsItems} onSelect={setSelected} {...gridLabels} />
      </Section>

      <Section id="youtube" title={t.sections.youtube.title} subtitle={t.sections.youtube.subtitle} badge={t.sections.youtube.badge} backToTopLabel={t.backToTop}>
        <div className="mb-8 flex items-center gap-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-red-500/70 shadow-lg">
            <img src={YT_AVATAR_URL} alt="VorNato YouTube avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <PortfolioGrid items={youtubeCarouselItems} onSelect={setSelected} {...gridLabels} />
      </Section>

      <Section id="fiverr" title={t.sections.fiverr.title} subtitle={t.sections.fiverr.subtitle} backToTopLabel={t.backToTop}>
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
                <span className="font-semibold">{t.labels.fiverrCard}</span>
              </div>
            </div>
          </a>
        </div>
      </Section>

      <Section id="fantasy" title={t.sections.fantasy.title} subtitle={t.sections.fantasy.subtitle} backToTopLabel={t.backToTop}>
        <PortfolioGrid items={fantasyCarouselItems} onSelect={setSelected} {...gridLabels} />
      </Section>

      <Section id="experience" title={t.sections.experience.title} subtitle={t.sections.experience.subtitle} badge={t.sections.experience.badge} backToTopLabel={t.backToTop}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile summary */}
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">{t.experience.profileTitle}</h3>
              <p className="text-zinc-300">
                {t.experience.profileText}
              </p>
            </div>

            {/* Roles */}
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">{t.experience.rolesTitle}</h3>
              <ul className="space-y-2 text-zinc-300">
                {t.experience.roles.map((role) => (
                  <li key={role.title}>
                    {role.title}
                    {role.detail && <span className="block text-zinc-400 text-sm">{role.detail}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">{t.experience.educationTitle}</h3>
              <ul className="space-y-2 text-zinc-300">
                {t.experience.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {/* Skills */}
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">{t.experience.skillsTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {t.experience.skills.map((s) => (
                  <Badge key={s} className="rounded-full bg-zinc-800 text-zinc-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">{t.experience.achievementsTitle}</h3>
              <ul className="space-y-2 text-zinc-300 list-disc pl-5">
                {t.experience.achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
              <h3 className="font-semibold mb-2">{t.experience.languagesTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {t.experience.languages.map((l) => (
                  <Badge key={l} className="rounded-full bg-zinc-800 text-zinc-200">
                    {l}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" title={t.sections.contact.title} subtitle={t.sections.contact.subtitle} backToTopLabel={t.backToTop}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-zinc-400">{t.labels.email}</div>
              <a href="mailto:levaniesitashvili1999@gmail.com" className="text-zinc-200 hover:underline">levaniesitashvili1999@gmail.com</a>
            </div>
          </div>

          <a
            href="https://youtube.com/@vornatoofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-2 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800 hover:ring-zinc-600 transition flex flex-col items-start gap-4"
          >
            <img src={YT_COVER_URL} alt={t.labels.youtubeCoverAlt} className="w-full aspect-[16/6] object-cover rounded-xl" loading="lazy" />
            <Button className="rounded-2xl">{t.labels.youtubeChannel}</Button>
          </a>

          <div className="md:col-span-3 rounded-2xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onContactSubmit}>
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  {t.contact.nameLabel}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder={t.contact.namePlaceholder}
                  className="w-full rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none"
                />
              </div>
              <div>
                <label htmlFor="contact-contact" className="sr-only">
                  {t.contact.contactLabel}
                </label>
                <input
                  id="contact-contact"
                  name="contact"
                  autoComplete="email"
                  placeholder={t.contact.contactPlaceholder}
                  className="w-full rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="sr-only">
                  {t.contact.messageLabel}
                </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={t.contact.messagePlaceholder}
                className="w-full rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800 focus:ring-zinc-600 outline-none min-h-[120px]"
              />
              </div>
              <Button className="sm:col-span-2 rounded-2xl" type="submit">
                {t.labels.send}
              </Button>
            </form>
            <p className="mt-3 text-xs text-zinc-400">
              {t.contact.note}
            </p>
          </div>
        </div>
      </Section>

      <footer className="border-t border-zinc-800/70 px-4 sm:px-6 lg:px-8 py-10 text-center text-zinc-500 text-sm">
        (c) {new Date().getFullYear()} Levani Esitashvili - Portfolio
      </footer>
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute -top-10 right-0 text-zinc-300 hover:text-white" onClick={() => setSelected(null)}>
              {t.labels.close}
            </button>
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
              <video
                className={`${selected.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"} w-full rounded-xl`}
                src={selected.src}
                controls
                playsInline
              />
            ) : (
              <div
                className={`${
                  selected.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"
                } w-full bg-zinc-900 rounded-xl ring-1 ring-zinc-800 flex items-center justify-center text-zinc-400`}
              >
                <a href={selected.href || "#"} target="_blank" rel="noreferrer" className="underline">
                  {t.labels.openProject}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}













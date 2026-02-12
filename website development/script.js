const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");
const filterBar = document.getElementById("filterBar");
const workCards = Array.from(document.querySelectorAll(".work-card"));
const year = document.getElementById("year");
const cursorGlow = document.getElementById("cursorGlow");
const scrollProgress = document.getElementById("scrollProgress");
const bgVideo = document.getElementById("bgVideo");
const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
const spotlightCards = Array.from(document.querySelectorAll(".spotlight"));
const ambientA = document.querySelector(".ambient-a");
const ambientB = document.querySelector(".ambient-b");
const magneticItems = Array.from(document.querySelectorAll(".magnetic"));

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!nav.contains(target) && !menuToggle.contains(target)) {
      nav.classList.remove("open");
    }
  });
}

if (filterBar) {
  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;

    const filter = button.dataset.filter || "all";
    filterBar.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    workCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const isMatch = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !isMatch);
    });
  });
}

const revealTargets = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

function formatValue(value) {
  if (value >= 1000000) return `${Math.round(value / 100000) / 10}M+`;
  if (value >= 1000) return `${Math.round(value / 100) / 10}K+`;
  if (value === 5) return "5.0";
  return `${Math.round(value)}+`;
}

function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  if (!target) return;

  let start = 0;
  const duration = 1200;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    start = target * eased;

    if (el.classList.contains("metric-value")) {
      el.textContent = formatValue(start);
    } else {
      el.textContent = `${Math.round(start)}+`;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll("[data-target]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(current, target, factor) {
  return current + (target - current) * factor;
}

function getScrollRatio() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return clamp(window.scrollY / maxScroll, 0, 1);
}

let targetScrollRatio = getScrollRatio();
function updateScrollProgress() {
  targetScrollRatio = getScrollRatio();
  if (scrollProgress) {
    scrollProgress.style.width = `${Math.round(targetScrollRatio * 10000) / 100}%`;
  }
}

updateScrollProgress();

const pointerState = {
  currentX: window.innerWidth * 0.5,
  currentY: window.innerHeight * 0.5,
  targetX: window.innerWidth * 0.5,
  targetY: window.innerHeight * 0.5,
};

if (canHover) {
  window.addEventListener(
    "pointermove",
    (event) => {
      pointerState.targetX = event.clientX;
      pointerState.targetY = event.clientY;
    },
    { passive: true }
  );
}

const magneticState = new WeakMap();
if (canHover) {
  magneticItems.forEach((item) => {
    magneticState.set(item, {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    });

    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const state = magneticState.get(item);
      if (!state) return;
      state.targetX = x * 0.08;
      state.targetY = y * 0.08;
    });

    item.addEventListener("pointerleave", () => {
      const state = magneticState.get(item);
      if (!state) return;
      state.targetX = 0;
      state.targetY = 0;
    });
  });
}

if (canHover) {
  tiltCards.forEach((card) => {
    const strength = Number(card.dataset.tiltStrength || 9);

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * strength;
      const rx = (0.5 - py) * strength;

      card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

spotlightCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

let videoReady = false;
let videoDuration = 0;
let smoothVideoTime = 0;
let lastVideoCommitMs = 0;

if (bgVideo) {
  bgVideo.pause();
  bgVideo.loop = false;
  bgVideo.removeAttribute("autoplay");

  const initializeVideo = () => {
    videoDuration = Number.isFinite(bgVideo.duration) ? bgVideo.duration : 0;
    videoReady = videoDuration > 0;
    smoothVideoTime = targetScrollRatio * videoDuration;
    lastVideoCommitMs = 0;
    if (videoReady) {
      bgVideo.currentTime = smoothVideoTime;
    }
  };

  if (bgVideo.readyState >= 1) {
    initializeVideo();
  } else {
    bgVideo.addEventListener("loadedmetadata", initializeVideo, { once: true });
  }

  bgVideo.addEventListener("play", () => {
    bgVideo.pause();
  });
}

window.addEventListener(
  "scroll",
  () => {
    updateScrollProgress();
  },
  { passive: true }
);

window.addEventListener("resize", () => {
  updateScrollProgress();
});

function animateMotion(now) {
  if (canHover) {
    const pointerEase = prefersReducedMotion ? 1 : 0.14;
    pointerState.currentX = lerp(pointerState.currentX, pointerState.targetX, pointerEase);
    pointerState.currentY = lerp(pointerState.currentY, pointerState.targetY, pointerEase);

    if (cursorGlow) {
      cursorGlow.style.left = `${pointerState.currentX.toFixed(2)}px`;
      cursorGlow.style.top = `${pointerState.currentY.toFixed(2)}px`;
    }

    if (!prefersReducedMotion && (ambientA || ambientB)) {
      const offsetX = (pointerState.currentX / window.innerWidth - 0.5) * 20;
      const offsetY = (pointerState.currentY / window.innerHeight - 0.5) * 20;

      if (ambientA) {
        ambientA.style.setProperty("--px", `${(offsetX * -0.6).toFixed(2)}px`);
        ambientA.style.setProperty("--py", `${(offsetY * -0.6).toFixed(2)}px`);
      }

      if (ambientB) {
        ambientB.style.setProperty("--px", `${(offsetX * 0.7).toFixed(2)}px`);
        ambientB.style.setProperty("--py", `${(offsetY * 0.7).toFixed(2)}px`);
      }
    }
  }

  if (canHover && magneticItems.length > 0) {
    magneticItems.forEach((item) => {
      const state = magneticState.get(item);
      if (!state) return;

      const magneticEase = prefersReducedMotion ? 1 : 0.2;
      state.currentX = lerp(state.currentX, state.targetX, magneticEase);
      state.currentY = lerp(state.currentY, state.targetY, magneticEase);
      item.style.transform = `translate(${state.currentX.toFixed(2)}px, ${state.currentY.toFixed(2)}px)`;
    });
  }

  if (bgVideo && videoReady) {
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

  window.requestAnimationFrame(animateMotion);
}

window.requestAnimationFrame(animateMotion);

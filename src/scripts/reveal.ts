// src/scripts/reveal.ts
// Scroll-reveal for elements with class="reveal". Respects prefers-reduced-motion
// by skipping the animation and showing content immediately.

document.documentElement.setAttribute("data-reveal-ready", "");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const els = document.querySelectorAll<HTMLElement>(".reveal");

if (prefersReduced || !("IntersectionObserver" in window)) {
  els.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => observer.observe(el));
}

export {};

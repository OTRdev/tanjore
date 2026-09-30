// src/scripts/jump-nav.ts
// Highlights the active category link in the menu page's sticky jump-nav
// as the visitor scrolls past each menu section.

const links = document.querySelectorAll<HTMLAnchorElement>(".menu-jump-link");
const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-section]"));

if (links.length && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

export {};

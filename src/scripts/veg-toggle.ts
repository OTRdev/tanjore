// "Vegetarian only" filter for the menu page. Hides non-veg rows (and any section left
// with no visible rows) rather than removing them, so the toggle is instantly reversible.

const toggle = document.getElementById("veg-toggle") as HTMLInputElement | null;
const rows = document.querySelectorAll<HTMLElement>(".menu-item-row[data-veg]");
const sections = document.querySelectorAll<HTMLElement>("[data-menu-section]");
const jumpLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu-jump-link"));

if (toggle) {
  toggle.addEventListener("change", () => {
    const vegOnly = toggle.checked;
    rows.forEach((row) => {
      row.classList.toggle("is-hidden", vegOnly && row.getAttribute("data-veg") !== "true");
    });
    sections.forEach((section) => {
      const hasVisible = section.querySelector(".menu-item-row:not(.is-hidden)") !== null;
      section.classList.toggle("is-hidden", !hasVisible);
      jumpLinks
        .find((l) => l.getAttribute("href") === "#" + section.id)
        ?.classList.toggle("is-hidden", !hasVisible);
    });
  });
}

export {};

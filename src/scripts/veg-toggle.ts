// Menu filters: "Vegetarian only" and "Gluten free only" (they combine). Hides non-matching rows,
// any group heading or section left with no visible rows, and the matching jump-nav link.
// Nothing is removed, so the toggles are instantly reversible.

const vegToggle = document.getElementById("veg-toggle") as HTMLInputElement | null;
const gfToggle = document.getElementById("gf-toggle") as HTMLInputElement | null;
const rows = document.querySelectorAll<HTMLElement>(".menu-item-row[data-veg]");
const sections = document.querySelectorAll<HTMLElement>("[data-menu-section]");
const jumpLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu-jump-link"));

function applyFilters() {
  const vegOnly = !!vegToggle?.checked;
  const gfOnly = !!gfToggle?.checked;
  rows.forEach((row) => {
    const hide =
      (vegOnly && row.getAttribute("data-veg") !== "true") ||
      (gfOnly && row.getAttribute("data-gf") !== "true");
    row.classList.toggle("is-hidden", hide);
  });
  // A group heading stays only if a visible item row follows it before the next heading.
  document.querySelectorAll<HTMLElement>(".menu-group").forEach((group) => {
    let visible = false;
    for (let el = group.nextElementSibling; el && !el.classList.contains("menu-group"); el = el.nextElementSibling) {
      if (el.classList.contains("menu-item-row") && !el.classList.contains("is-hidden")) visible = true;
    }
    group.classList.toggle("is-hidden", !visible);
  });
  sections.forEach((section) => {
    const hasVisible = section.querySelector(".menu-item-row:not(.is-hidden)") !== null;
    section.classList.toggle("is-hidden", !hasVisible);
    jumpLinks
      .find((l) => l.getAttribute("href") === "#" + section.id)
      ?.classList.toggle("is-hidden", !hasVisible);
  });
}

vegToggle?.addEventListener("change", applyFilters);
gfToggle?.addEventListener("change", applyFilters);

export {};

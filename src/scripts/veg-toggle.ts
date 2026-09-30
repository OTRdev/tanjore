// "Vegetarian only" filter for the menu page. Hides non-veg rows, any group heading or section
// left with no visible rows, and the matching jump-nav link. Nothing is removed, so the toggle
// is instantly reversible.

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
  });
}

export {};

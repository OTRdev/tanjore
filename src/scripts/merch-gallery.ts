// Click a thumbnail on the Merch page to switch the product's main photo.
document.querySelectorAll<HTMLElement>("[data-merch-card]").forEach((card) => {
  const slides = Array.from(card.querySelectorAll<HTMLElement>("[data-slide]"));
  const thumbs = Array.from(card.querySelectorAll<HTMLButtonElement>("[data-thumb]"));
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.thumb);
      slides.forEach((s, i) => (s.hidden = i !== index));
      thumbs.forEach((t, i) => t.setAttribute("aria-pressed", String(i === index)));
    });
  });
});

export {};

import { menu, combos, thalis, priceOf } from "./menu";
import { site } from "./site";

const offer = (price?: number) =>
  price === undefined ? undefined : { "@type": "Offer", price: price.toFixed(2), priceCurrency: "CAD" };

/** schema.org diets, only for flags the owner has confirmed. */
const dietOf = (item: { veg?: boolean; vegan?: boolean; glutenFree?: boolean }) => {
  const d = [
    item.veg && "https://schema.org/VegetarianDiet",
    item.vegan && "https://schema.org/VeganDiet",
    item.glutenFree && "https://schema.org/GlutenFreeDiet",
  ].filter(Boolean);
  return d.length ? { suitableForDiet: d } : {};
};

/** schema.org Menu built from menu.ts, for the /menu page's JSON-LD. */
export function menuJsonLd() {
  const sections = menu.map((section) => ({
    "@type": "MenuSection",
    name: section.title,
    ...(section.subtitle && { description: section.subtitle }),
    hasMenuItem: section.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      ...(item.description && { description: item.description }),
      ...dietOf(item),
      offers: offer(priceOf(section, item)),
    })),
  }));

  sections.push({
    "@type": "MenuSection",
    name: "Combos & Thalis",
    hasMenuItem: [
      ...combos.map((c) => ({ "@type": "MenuItem", name: c.name, description: c.includes.join(", "), offers: offer(c.price) })),
      ...thalis.items.map((t) => ({
        "@type": "MenuItem",
        name: t.name,
        description: `${t.description} ${thalis.note} Served ${thalis.hours}.`,
        ...(t.veg && { suitableForDiet: "https://schema.org/VegetarianDiet" }),
        offers: offer(t.price),
      })),
    ],
  } as (typeof sections)[number]);

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} Menu`,
    url: `${site.url}/menu`,
    inLanguage: "en-CA",
    hasMenuSection: sections,
  };
}

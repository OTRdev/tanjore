# Tanjore Indian Cuisine

Official website for Tanjore Indian Cuisine, Belleville, Ontario: **https://www.tanjore.ca**

Static site built with [Astro](https://astro.build). No database or server needed.
Hosted on GitHub Pages and deployed automatically by GitHub Actions.

## Everyday edits

| To change | Edit |
| --- | --- |
| Dish names, descriptions, prices, combos, thalis | `src/data/menu.ts` |
| Hours, phone, address, order link, social links | `src/data/site.ts` |
| Photos | Replace files in `src/assets/` (same filename) |

The menu page, home page and Google structured data all read from these files, so
one edit updates everything. Push to `main` and the site redeploys.

## Local development

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # outputs to dist/
node scripts/verify-dist.mjs   # sanity-checks the built site (links, SEO, JSON-LD, scripts)
```

## Project layout

```
src/
  data/         site.ts, menu.ts, menuSchema.ts (menu -> schema.org JSON-LD)
  layouts/      Base.astro (head, SEO tags, Restaurant JSON-LD, skip link)
  components/   Header, Footer, Hero, DishCard, MenuSection, HoursBadge, GalleryStrip
  pages/        index, menu, about, contact, 404
  scripts/      small vanilla-TS scripts (mobile nav, hours badge, veg filter, reveal)
  styles/       global.css (design tokens + styles), fonts.css (self-hosted fonts)
  assets/       images (auto-optimized to WebP at build), fonts
public/         favicon, icons, og-image, robots.txt, CNAME
scripts/        make-icons.mjs (regenerate icons/og image), verify-dist.mjs
```

## Deployment (GitHub Pages)

1. Repo Settings, Pages, Source: **GitHub Actions** (one-time).
2. Custom domain: `www.tanjore.ca` (the `public/CNAME` file sets this). DNS for `www`
   must point to GitHub Pages, and the apex `tanjore.ca` should redirect to `www`.
3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes.

## Notes

- Scripts must be loaded with `<script>import "../scripts/x.ts";</script>` so Astro bundles
  them. A `<script type="module" src="...ts">` tag is not processed and will 404 in production.
- To regenerate favicons and the social preview image: `node scripts/make-icons.mjs`.

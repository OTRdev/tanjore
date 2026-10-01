# Tanjore Indian Cuisine website

Static Astro site for a family-run North Indian restaurant in Belleville, Ontario. Live at https://www.tanjore.ca
(GitHub Pages, deployed by GitHub Actions on every push to `main`). No database, no server.

## Commands
- `pnpm install` / `pnpm dev` (local preview) / `pnpm build` (outputs `dist/`)
- `pnpm exec astro check` (type check, must be 0 errors)
- `node scripts/verify-dist.mjs` (checks the built site: links, SEO tags, canonicals, JSON-LD, scripts load)
- `node scripts/menu-diff.mjs [ref]` (what changed in the menu vs a git ref; default `origin/main`)
- `node scripts/make-icons.mjs` (regenerates favicons and the social preview image)

## Where things live
- `src/data/site.ts`: name, phone, address, hours, order link, social links, tagline. One source of truth.
- `src/data/menu.ts`: the whole menu (names, descriptions, prices, dietary flags, combos, thalis).
- `src/data/menuSchema.ts`: builds the Google structured data from the menu. Do not hand-edit.
- `src/pages/`, `src/components/`, `src/styles/global.css`, `src/scripts/` (small vanilla scripts), `src/assets/` (images).

## Rules (these come from the owner: follow them every time)
1. **Never change a price unless the owner asked for that exact change.** After any menu edit, run
   `node scripts/menu-diff.mjs` and show the result. A section with a flat `price` (vegetarian, meat) changes every dish in it.
2. **Never guess dietary or allergen info.** `veg`, `vegan`, `glutenFree`, `glutenTraces` are set only when the owner confirmed
   them. A missing flag means "not confirmed", not "no". Gluten-free dishes use the owner's rule; fried starters, breads,
   combos and thalis are not marked.
3. **Only use photos the owner confirmed are theirs.** No stock, web or other-restaurant images in this public repo.
4. **Don't invent brand claims.** Stay within the owner's story: Rakesh and Neeru Kumar, from MP India (1989), Scarborough
   head chef 10+ years, Tanjore Catering & Sweets 2004, larger dine-in 2017, now Belleville. Same chef, same recipes, 20+ years.
5. Hours are Tuesday to Sunday 12 PM to 7 PM, closed Mondays. Lunch thalis 12 to 3 PM. Currency is CAD.
6. Keep quality high: accessibility 100, SEO 100, fast pages (whole site about 1.3 MB). Check with the built site, not guesses.

## Deploying
`main` is protected (needs a review) and the owner can bypass it. Work on a branch, run the checks, open a PR with
`gh pr create`, merge with `gh pr merge <n> --merge --admin`, wait for the "Deploy to GitHub Pages" run, then confirm
the live site. The `ship` skill does exactly this. Hosting facts: Pages source = GitHub Actions, custom domain
`www.tanjore.ca`, DNS at GoDaddy (www CNAME -> otrdev.github.io).

## Gotchas (Windows)
- Files use CRLF: multi-line find/replace scripts can miss. Prefer the Edit tool for multi-line changes.
- Backslashes in regexes get stripped when passed through shell heredocs: write those edits with the Edit tool.
- Scripts in pages/components must be `<script>import "../scripts/x.ts";</script>` (not `<script src="...ts">`, which 404s in production).
- `python` is not installed; use Node.

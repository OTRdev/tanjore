---
name: update-menu
description: Change the restaurant menu safely (prices, dishes, descriptions, dietary flags, combos, thalis). Use when the owner says to update, add, remove, rename or reprice a dish, or to mark something vegan, vegetarian or gluten free. Guarantees only the intended prices change.
---

# Update the menu

All menu content lives in `src/data/menu.ts`. Follow these steps in order.

1. **Restate the change** in one short list ("Butter Chicken stays $14; Palak Paneer $12 -> $13; add X at $Y"). If a price or
   dietary claim is missing or ambiguous, ask the owner before editing. Do not infer prices.
2. **Edit `src/data/menu.ts` only** (use the Edit tool; the file has CRLF line endings).
   - Per-item price: `price: N`. Sections with a flat price (`vegetarian` = $12, `meat` = $14) take their price from the section:
     adding a dish there gives it that price, and changing the section `price` reprices every dish in it. Say so when it applies.
   - Flags `veg`, `vegan`, `glutenFree`, `glutenTraces`, `spice`, `dry` are set ONLY when the owner has confirmed them.
     Never add `glutenFree` or `vegan` on a guess; when unsure, leave it off and tell the owner what is unconfirmed.
   - Removing a dish: delete it (or comment it out with a note if it is coming back, as done for Channa Kulcha).
3. **Prove what changed:** run `node scripts/menu-diff.mjs` and paste the result for the owner. Check it against step 1.
   Any unexpected price change means stop and fix. "PRICES CHANGED" is expected only for the prices the owner asked for.
4. **Verify the site builds:** `pnpm exec astro check`, `pnpm build`, `node scripts/verify-dist.mjs` must all pass.
5. **If any price changed, get the owner's explicit confirmation** of the diff before shipping.
6. **Ship it** with the `ship` skill. After it deploys, confirm the live menu page shows the new values:
   `curl -s https://www.tanjore.ca/menu | grep -c "<dish name>"` and spot-check the price.

Notes: the menu page, the Google structured data, the "Each $X" headings and the vegetarian and gluten-free filters all
update from `menu.ts` automatically. Do not hand-edit any generated output.

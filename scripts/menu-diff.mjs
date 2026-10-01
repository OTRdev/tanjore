// Compares src/data/menu.ts in the working tree against another git ref and reports what changed.
// Usage: node scripts/menu-diff.mjs [baseRef]      (default baseRef: origin/main)
// Use it before every menu change ships: it proves which prices moved and which dietary flags changed.
import { execSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const base = process.argv[2] ?? "origin/main";
const dir = mkdtempSync(join(tmpdir(), "menu-diff-"));
const baseFile = join(dir, "base-menu.ts");
writeFileSync(baseFile, execSync(`git show ${base}:src/data/menu.ts`, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));

const A = await import(pathToFileURL(baseFile).href);
const B = await import(pathToFileURL(join(process.cwd(), "src/data/menu.ts")).href);

const key = (n) => n.toLowerCase().replace(/\(\s*\d+\s*pc\s*\)/g, "").replace(/\b(or|beef|lamb|chicken|biryani)\b/g, "").replace(/[^a-z]/g, "");
const flat = (m) =>
  m.menu.flatMap((s) =>
    s.items.map((i) => ({
      section: s.id,
      name: i.name,
      key: key(i.name),
      price: m.priceOf(s, i),
      flags: ["veg", "vegan", "glutenFree", "glutenTraces", "dry", "spice"].filter((f) => i[f]).map((f) => (f === "spice" ? `spice:${i.spice}` : f)).sort().join(","),
    })),
  );

const oldItems = flat(A), newItems = flat(B);
const used = new Set();
const out = { price: [], flags: [], added: [], removed: [], renamed: [] };

for (const n of newItems) {
  const o = oldItems.find((x) => !used.has(x) && x.section === n.section && (x.name === n.name || x.key === n.key)) ?? oldItems.find((x) => !used.has(x) && (x.name === n.name || x.key === n.key));
  if (!o) { out.added.push(`${n.name} (${n.section}) ${n.price === undefined ? "NO PRICE" : "$" + n.price}`); continue; }
  used.add(o);
  if (o.name !== n.name) out.renamed.push(`${o.name} -> ${n.name}`);
  if (o.price !== n.price) out.price.push(`${n.name}: $${o.price} -> $${n.price}`);
  if (o.flags !== n.flags) out.flags.push(`${n.name}: [${o.flags || "none"}] -> [${n.flags || "none"}]`);
}
for (const o of oldItems) if (!used.has(o)) out.removed.push(`${o.name} (${o.section}) was $${o.price}`);

const money = (list) => list.map((c) => `${c.name}=$${c.price}`).join(", ");
const comboNow = money(B.combos), comboWas = money(A.combos);
const thaliNow = money(B.thalis.items), thaliWas = money(A.thalis.items);
const flatNow = B.menu.filter((s) => s.price !== undefined).map((s) => `${s.id}=$${s.price}`).join(", ");
const flatWas = A.menu.filter((s) => s.price !== undefined).map((s) => `${s.id}=$${s.price}`).join(", ");

const show = (title, list) => { console.log(`\n${title}: ${list.length}`); list.forEach((l) => console.log("  - " + l)); };
console.log(`Menu diff: working tree vs ${base}  (${oldItems.length} -> ${newItems.length} items)`);
show("PRICE CHANGES", out.price);
show("DIETARY / SPICE FLAG CHANGES", out.flags);
show("NEW ITEMS", out.added);
show("REMOVED ITEMS", out.removed);
show("RENAMED", out.renamed);
const extra = [];
if (comboNow !== comboWas) extra.push(`combos: ${comboWas} -> ${comboNow}`);
if (thaliNow !== thaliWas) extra.push(`thalis: ${thaliWas} -> ${thaliNow}`);
if (flatNow !== flatWas) extra.push(`flat section prices: ${flatWas} -> ${flatNow}`);
show("COMBO / THALI / FLAT-SECTION PRICE CHANGES", extra);
console.log(out.price.length + extra.length === 0 ? "\nOK: no prices changed." : "\nPRICES CHANGED: confirm each one with the owner before shipping.");

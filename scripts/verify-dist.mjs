// Sanity checks on the built site. Run after `pnpm build`: node scripts/verify-dist.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const pages = readdirSync(dist).filter((f) => f.endsWith(".html"));
let problems = 0;
const bad = (page, msg) => { problems++; console.log(`  FAIL [${page}] ${msg}`); };

for (const page of pages) {
  const html = readFileSync(join(dist, page), "utf8");
  const is404 = page === "404.html";
  const count = (re) => (html.match(re) || []).length;

  if (!/<title>[^<]{10,}<\/title>/.test(html)) bad(page, "missing/short <title>");
  if (!is404 && !/<meta name="description" content="[^"]{50,}/.test(html)) bad(page, "missing/short meta description");
  if (!/<link rel="canonical"/.test(html)) bad(page, "no canonical");
  if (!/og:image/.test(html)) bad(page, "no og:image");
  if (count(/<h1[\s>]/g) !== 1) bad(page, `expected 1 <h1>, found ${count(/<h1[\s>]/g)}`);
  if (count(/<main[\s>]/g) !== 1) bad(page, "expected exactly 1 <main>");
  if (is404 && !/noindex/.test(html)) bad(page, "404 should be noindex");
  if (!is404 && /noindex/.test(html)) bad(page, "page is noindex!");
  if (/lang="en-CA"/.test(html) === false) bad(page, "html lang missing");
  if (/<img(?![^>]*\balt=)[^>]*>/.test(html)) bad(page, "<img> without alt");
  if (/alt=""/.test(html)) bad(page, "empty alt on an img");

  // JSON-LD must parse
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { bad(page, "invalid JSON-LD"); }
  }
  // Internal links & assets must exist
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const p = m[1];
    if (p.startsWith("//")) continue;
    const candidates = [join(dist, p), join(dist, p + ".html"), join(dist, p, "index.html")];
    if (p === "/") continue;
    if (!candidates.some(existsSync)) bad(page, `broken internal reference ${p}`);
  }
  // Relative or unbundled .ts/.js references are always wrong in the built output
  if (/(?:src|href)="[^"]*\.ts"/.test(html)) bad(page, "unprocessed .ts reference (script won't load)");
  for (const m of html.matchAll(/(?:href|src)="(\.\.?\/[^"#?]*)/g)) bad(page, `relative reference ${m[1]}`);
  // Leaked placeholders / template junk
  for (const junk of ["undefined", "[object Object]", "NaN", 'href="#"', "TODO", "lorem"]) {
    if (html.includes(junk)) bad(page, `contains "${junk}"`);
  }
}

const menu = readFileSync(join(dist, "menu.html"), "utf8");
for (const needle of ["Butter Chicken", "$14.00", "Palace Naan", "$5.00", "Vegetable Thali", "$8.00", "Combo 2", "$40.00", "Boneless Goat"])
  if (!menu.includes(needle)) bad("menu.html", `missing "${needle}"`);

const sm = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
for (const u of ["/", "/menu", "/about", "/contact"]) {
  if (!sm.includes(`https://www.tanjore.ca${u === "/" ? "/" : u}<`)) bad("sitemap", `missing ${u}`);
}
if (sm.includes("404")) bad("sitemap", "includes 404");
if (readFileSync(join(dist, "CNAME"), "utf8").trim() !== "www.tanjore.ca") bad("CNAME", "wrong domain");

console.log(problems ? `\n${problems} problem(s)` : `OK: ${pages.length} pages verified`);
process.exit(problems ? 1 : 0);

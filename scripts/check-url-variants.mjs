// Checks that common variants of our URLs (trailing slash, capital letters, .html, old hash routes) end up on the
// right page, using the exact redirect script that is built into dist/404.html. Run after `pnpm build`.
import { readFileSync } from "node:fs";

const html = readFileSync("dist/404.html", "utf8");
const m = html.match(/<script>(document\.documentElement\.classList\.add\("js"\)[\s\S]*?)<\/script>/);
if (!m) { console.log("FAIL: redirect script not found in dist/404.html"); process.exit(1); }
const src = m[1];

// [path, search, hash, expected final path+search]
const cases = [
  ["/", "", "", "/"], ["/menu", "", "", "/menu"], ["/menu/", "", "", "/menu"], ["/Menu", "", "", "/menu"],
  ["/MENU/", "", "", "/menu"], ["/menu.html", "", "", "/menu"], ["/about/", "", "", "/about"], ["/About", "", "", "/about"],
  ["/contact/", "", "", "/contact"], ["/index.html", "", "", "/"], ["/gallery", "", "", "/"], ["/gallery/", "", "", "/"],
  ["/home", "", "", "/"], ["/menu/", "?utm_source=google", "", "/menu?utm_source=google"],
  ["/xyz", "", "", "/xyz"], ["/xyz/", "", "", "/xyz"], ["/", "", "#/menu", "/menu"], ["/", "", "#/About", "/about"],
];

const run = (pathname, search, hash) => {
  let dest = null;
  const location = { pathname, search, hash, replace: (u) => { dest = u; } };
  const document = { documentElement: { classList: { add() {} }, hasAttribute: () => true } };
  new Function("location", "document", "setTimeout", src)(location, document, () => {});
  return dest;
};

let bad = 0;
for (const [path, search, hash, want] of cases) {
  const dest = run(path, search, hash);
  const final = dest ?? path + search;
  let ok = final === want;
  if (dest) { // the second hop must not redirect again (no loops)
    const u = new URL(dest, "https://example.com");
    if (run(u.pathname, u.search, u.hash) !== null) ok = false;
  }
  if (!ok) { bad++; console.log(`FAIL ${path + search + hash} -> ${final} (want ${want})`); }
}
console.log(bad ? `${bad} URL variant(s) wrong` : `OK: all ${cases.length} URL variants land on the right page, no loops`);
process.exit(bad ? 1 : 0);

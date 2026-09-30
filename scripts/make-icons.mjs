// Regenerates favicons, PWA icons and the social preview image from the logo + a hero photo.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const logo = "src/assets/brand/logo.png";
const hero = "src/assets/photos/butter-chicken-biryani-naan.jpg";
const cream = { r: 255, g: 246, b: 233, alpha: 1 };

// Turban mark only (reads at tiny sizes)
const mark = await sharp(logo).extract({ left: 540, top: 0, width: 520, height: 600 }).toBuffer();
const full = await sharp(logo).trim().toBuffer();

const tile = (buf, size, pad) =>
  sharp(buf)
    .resize(size - pad * 2, size - pad * 2, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: cream });

await tile(full, 192, 14).png().toFile("public/logo192.png");
await tile(full, 512, 40).png().toFile("public/logo512.png");
await tile(full, 180, 14).png().toFile("public/apple-touch-icon.png");
const png32 = await tile(mark, 32, 2).png().toBuffer();
const png48 = await tile(mark, 48, 3).png().toBuffer();
await tile(mark, 32, 2).png().toFile("public/icon-32.png");

// ICO container with PNG payloads (16 not needed; 32 + 48)
const imgs = [png32, png48], sizes = [32, 48];
const head = Buffer.alloc(6 + 16 * imgs.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
let off = head.length;
imgs.forEach((b, i) => {
  const o = 6 + 16 * i;
  head[o] = sizes[i]; head[o + 1] = sizes[i]; head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6);
  head.writeUInt32LE(b.length, o + 8); head.writeUInt32LE(off, o + 12); off += b.length;
});
writeFileSync("public/favicon.ico", Buffer.concat([head, ...imgs]));

// Open Graph image 1200x630: photo on the right, cream logo panel on the left
const W = 1200, H = 630, panelW = 520;
const photo = await sharp(hero).resize(W - panelW + 60, H, { fit: "cover", position: "centre" }).toBuffer();
const logoBig = await sharp(full).resize(400, 400, { fit: "inside" }).toBuffer();
await sharp({ create: { width: W, height: H, channels: 4, background: cream } })
  .composite([
    { input: photo, left: panelW - 60, top: 0 },
    { input: Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#fff6e9"/><stop offset="1" stop-color="#fff6e9" stop-opacity="0"/></linearGradient></defs><rect x="${panelW - 60}" width="140" height="${H}" fill="url(#g)"/></svg>`), left: 0, top: 0 },
    { input: logoBig, left: Math.round((panelW - 400) / 2) - 10, top: Math.round((H - 400 * 0.91) / 2) - 20 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/og-image.jpg");
console.log("icons done");

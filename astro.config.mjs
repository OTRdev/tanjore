import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import merch from "./src/data/merch.json" with { type: "json" };

export default defineConfig({
  site: "https://www.tanjore.ca",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  // The Merch page stays out of the sitemap while src/data/merch.json has status "hidden".
  integrations: [sitemap({ filter: (page) => merch.status !== "hidden" || !page.includes("/merch") })],
});

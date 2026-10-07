import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// تنظیمات اصلی: خروجی استاتیک، sitemap خودکار و prefetch سبک (فقط با hover/focus)
export default defineConfig({
  site: "https://khanifarweb.ir",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  build: { inlineStylesheets: "auto" },
});

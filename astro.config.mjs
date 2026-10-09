import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { existsSync, readdirSync } from "node:fs";

// آیا مجموعه محتوا حداقل یک فایل .md (غیر از قالب‌های _*.md) دارد؟
const hasContent = (dir) =>
  existsSync(`./src/content/${dir}`) &&
  readdirSync(`./src/content/${dir}`, { recursive: true }).some((f) => {
    const name = String(f).split(/[\\/]/).pop();
    return name.endsWith(".md") && !name.startsWith("_");
  });
const emptyPages = ["portfolio", "blog"].filter((d) => !hasContent(d)).map((d) => `/${d}/`);

// تنظیمات اصلی: خروجی استاتیک، sitemap خودکار و prefetch سبک (فقط با hover/focus)
export default defineConfig({
  site: "https://khanifarweb.ir",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !emptyPages.some((p) => new URL(page).pathname === p) })],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  build: { inlineStylesheets: "auto" },
});

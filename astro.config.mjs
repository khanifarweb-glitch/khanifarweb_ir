import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { existsSync, readdirSync, readFileSync } from "node:fs";

// آیا مجموعه محتوا حداقل یک فایل .md (غیر از قالب‌های _*.md) دارد؟
const hasContent = (dir) =>
  existsSync(`./src/content/${dir}`) &&
  readdirSync(`./src/content/${dir}`, { recursive: true }).some((f) => {
    const name = String(f).split(/[\\/]/).pop();
    if (!name.endsWith(".md") || name.startsWith("_")) return false;
    const text = readFileSync(`./src/content/${dir}/${f}`, "utf8");
    return !/^draft:\s*true\s*$/m.test(text.split(/^---\s*$/m)[1] ?? ""); // پیش‌نویس‌ها حساب نمی‌شوند
  });
const emptyPages = ["portfolio", "blog"].filter((d) => !hasContent(d)).flatMap((d) => [`/${d}/`, `/en/${d}/`]);

// تنظیمات اصلی: خروجی استاتیک، sitemap خودکار و prefetch سبک (فقط با hover/focus)
export default defineConfig({
  site: "https://khanifarweb.ir",
  output: "static",
  trailingSlash: "always",
  // چندزبانه: فارسی بدون پیشوند (/)، انگلیسی با پیشوند (/en/)
  i18n: { defaultLocale: "fa", locales: ["fa", "en"], routing: { prefixDefaultLocale: false } },
  integrations: [
    sitemap({
      filter: (page) => !emptyPages.some((p) => new URL(page).pathname === p),
      // hreflang در نقشه سایت
      i18n: { defaultLocale: "fa", locales: { fa: "fa-IR", en: "en-US" } },
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  build: { inlineStylesheets: "auto" },
});

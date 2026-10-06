import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// تنظیمات اصلی پروژه: خروجی کاملاً استاتیک برای سرعت و دیپلوی رایگان
export default defineConfig({
  site: "https://khanifarweb.ir",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
});

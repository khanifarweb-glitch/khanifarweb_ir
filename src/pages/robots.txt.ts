import type { APIRoute } from "astro";

// دامنه از تنظیمات astro.config خوانده می‌شود (hardcode نیست)
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

import { getCollection } from "astro:content";
import { site } from "../data/site";

/** آیا حداقل یک آیتم منتشرشده (غیر draft) در مجموعه وجود دارد؟ */
export async function hasEntries(name: "portfolio" | "blog"): Promise<boolean> {
  const list =
    name === "portfolio"
      ? await getCollection("portfolio", (e) => !e.data.draft)
      : await getCollection("blog", (e) => !e.data.draft);
  return list.length > 0;
}

/** منوی اصلی؛ نمونه‌کارها و مقالات فقط وقتی محتوا دارند نمایش داده می‌شوند (بدون صفحه خالی). */
export async function visibleNav() {
  const [hasWork, hasPosts] = await Promise.all([hasEntries("portfolio"), hasEntries("blog")]);
  return site.nav.filter((i) => (i.href !== "/portfolio/" || hasWork) && (i.href !== "/blog/" || hasPosts));
}

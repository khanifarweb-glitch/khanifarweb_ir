import { getCollection } from "astro:content";
import { siteFor } from "../data/site";
import type { Lang } from "../i18n/ui";

/** آیا حداقل یک آیتم منتشرشده (غیر draft) در مجموعه وجود دارد؟ */
export async function hasEntries(name: "portfolio" | "blog"): Promise<boolean> {
  const list =
    name === "portfolio"
      ? await getCollection("portfolio", (e) => !e.data.draft)
      : await getCollection("blog", (e) => !e.data.draft);
  return list.length > 0;
}

/** منوی اصلی؛ نمونه‌کارها و مقالات فقط وقتی محتوا دارند نمایش داده می‌شوند (بدون صفحه خالی). */
export async function visibleNav(lang: Lang = "fa") {
  const [hasWork, hasPosts] = await Promise.all([hasEntries("portfolio"), hasEntries("blog")]);
  return siteFor(lang).nav.filter((i) => (i.key !== "portfolio" || hasWork) && (i.key !== "blog" || hasPosts));
}

type Project = Awaited<ReturnType<typeof getCollection<"portfolio">>>[number];

/** متن‌های نمونه‌کار به زبان صفحه؛ اگر ترجمه نداشته باشد، فارسی برمی‌گردد. */
export function projectText(p: Project, lang: Lang) {
  const d = p.data;
  const en = lang === "en" ? d.en : undefined;
  return {
    title: en?.title ?? d.title,
    type: en?.type ?? d.type,
    services: en?.services ?? d.services,
    summary: en?.summary ?? d.summary,
    imageAlt: en?.imageAlt ?? d.imageAlt,
    body: en?.body, // فقط انگلیسی؛ متن فارسی داخل خود فایل Markdown است
  };
}

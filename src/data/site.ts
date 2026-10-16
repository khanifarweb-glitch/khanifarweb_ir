/**
 * اطلاعات ثابت سایت. نام، شعار و راه‌های ارتباطی فقط از همین‌جا خوانده می‌شوند.
 * مقادیر خالی ("") هنوز توسط صاحب سایت تکمیل نشده‌اند؛ مقدار ساختگی نگذارید.
 */
import { languages, localePath, ui, type Lang } from "../i18n/ui";

type Contact = { phone: string; email: string; whatsapp: string; telegram: string };
const defaultContact: Contact = { phone: "", email: "", whatsapp: "", telegram: "" };

// فایل اختیاری: src/data/contact.local.ts با «export default { phone: "...", ... }»
const localFiles = import.meta.glob<{ default: Partial<Contact> }>("./contact.local.ts", { eager: true });
const localContact: Partial<Contact> = Object.values(localFiles)[0]?.default ?? {};


// بخش مشترک بین همه زبان‌ها
const base = {
  name: "KhanifarWeb",
  nameFa: "خنیفروب",
  url: "https://khanifarweb.ir",
  ogImage: "/og-default.png", // TODO: تصویر ۱۲۰۰×۶۳۰ را در public قرار دهید

  // اطلاعات تماس از فایل اختیاری src/data/contact.local.ts خوانده می‌شود (آن فایل هرگز در ZIP نیست و بازنویسی نمی‌شود)
  contact: { ...defaultContact, ...localContact },

  // کد تأیید مالکیت اینماد؛ در متای همه صفحه‌ها قرار می‌گیرد
  verification: { enamad: "22269538" },
};

// منوی اصلی؛ مقالات فعلاً فقط فارسی‌اند (در منوی انگلیسی نیستند)
const navItems = [
  { key: "design", href: "/design/" },
  { key: "support", href: "/website-support/" },
  { key: "ai", href: "/ai/" },
  { key: "portfolio", href: "/portfolio/" },
  { key: "blog", href: "/blog/" },
  { key: "about", href: "/about/" },
] as const;

/** اطلاعات سایت برای یک زبان (متن‌ها از src/i18n/ui.ts می‌آیند). CTA اصلی سایت فقط یکی است. */
export function siteFor(lang: Lang) {
  const t = ui[lang].site;
  return {
    ...base,
    owner: t.owner,
    slogan: t.slogan,
    seoTagline: t.seoTagline,
    description: t.description,
    locale: languages[lang].locale,
    primaryCta: { label: t.cta, href: localePath(lang, "/contact/") },
    nav: navItems
      .filter((i) => lang === "fa" || i.key !== "blog")
      .map((i) => ({ key: i.key, label: t.nav[i.key], href: localePath(lang, i.href) })),
  };
}

// نسخه فارسی (پیش‌فرض)؛ برای کدهایی که زبان ندارند
export const site = siteFor("fa");

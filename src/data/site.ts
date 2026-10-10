/**
 * اطلاعات ثابت سایت. نام، شعار و راه‌های ارتباطی فقط از همین‌جا خوانده می‌شوند.
 * مقادیر خالی ("") هنوز توسط صاحب سایت تکمیل نشده‌اند؛ مقدار ساختگی نگذارید.
 */
type Contact = { phone: string; email: string; whatsapp: string; telegram: string };
const defaultContact: Contact = { phone: "", email: "", whatsapp: "", telegram: "" };

// فایل اختیاری: src/data/contact.local.ts با «export default { phone: "...", ... }»
const localFiles = import.meta.glob<{ default: Partial<Contact> }>("./contact.local.ts", { eager: true });
const localContact: Partial<Contact> = Object.values(localFiles)[0]?.default ?? {};

export const site = {
  name: "KhanifarWeb",
  nameFa: "خنیفروب",
  owner: "احمد خنیفر",
  url: "https://khanifarweb.ir",
  slogan: "هرجا مشتری هست، شما هم دیده می‌شوید",
  seoTagline: "طراحی سایت، پشتیبانی سایت و خدمات هوش مصنوعی", // برای عنوان صفحه اصلی
  description:
    "طراحی سایت، پشتیبانی سایت و خدمات هوش مصنوعی برای کسب‌وکارهایی که می‌خواهند حرفه‌ای‌تر دیده شوند.",
  ogImage: "/og-default.png", // TODO: تصویر ۱۲۰۰×۶۳۰ را در public قرار دهید
  locale: "fa_IR",

  // اطلاعات تماس از فایل اختیاری src/data/contact.local.ts خوانده می‌شود (آن فایل هرگز در ZIP نیست و بازنویسی نمی‌شود)
  contact: { ...defaultContact, ...localContact },

  // CTA اصلی سایت فقط یکی است
  // کد تأیید مالکیت اینماد؛ در متای همه صفحه‌ها قرار می‌گیرد
  verification: { enamad: "22269538" },

  primaryCta: { label: "درخواست مشاوره", href: "/contact/" },

  nav: [
    { label: "طراحی سایت", href: "/design/" },
    { label: "پشتیبانی سایت", href: "/website-support/" },
    { label: "هوش مصنوعی", href: "/ai/" },
    { label: "نمونه‌کارها", href: "/portfolio/" },
    { label: "مقالات", href: "/blog/" },
    { label: "درباره من", href: "/about/" },
  ],
};

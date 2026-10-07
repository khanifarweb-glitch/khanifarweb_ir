/**
 * اطلاعات ثابت سایت. نام، شعار و راه‌های ارتباطی فقط از همین‌جا خوانده می‌شوند.
 * مقادیر خالی ("") هنوز توسط صاحب سایت تکمیل نشده‌اند؛ مقدار ساختگی نگذارید.
 */
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

  // TODO: مقادیر واقعی را وارد کنید
  contact: {
    phone: "",
    email: "",
    whatsapp: "", // مثال: https://wa.me/98912...
    telegram: "", // مثال: https://t.me/username
  },

  // CTA اصلی سایت فقط یکی است
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

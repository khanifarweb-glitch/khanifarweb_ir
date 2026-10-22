/**
 * ترجمه‌ها و توابع کمکی چندزبانه.
 * - فارسی (پیش‌فرض، بدون پیشوند): /     انگلیسی: /en/
 * - همه متن‌های رابط کاربری این‌جا هستند؛ ساختار en باید دقیقاً مثل fa باشد (TypeScript بررسی می‌کند).
 * - برای افزودن زبان جدید: یک بلوک جدید به `ui` و یک ردیف به `languages` اضافه کنید.
 */

export const languages = {
  fa: { label: "فارسی", dir: "rtl", locale: "fa_IR", tag: "fa-IR" },
  en: { label: "English", dir: "ltr", locale: "en_US", tag: "en-US" },
} as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "fa";

/** زبان صفحه از روی آدرس: مسیرهای /en/... انگلیسی‌اند، بقیه فارسی. */
export const getLang = (url: URL): Lang => (url.pathname.split("/")[1] === "en" ? "en" : "fa");

/** حذف پیشوند زبان: /en/about/ → /about/ */
export const stripLang = (path: string): string => path.replace(/^\/en(?=\/|$)/, "") || "/";

/** افزودن پیشوند زبان به مسیر داخلی (فارسی بدون پیشوند می‌ماند). */
export const localePath = (lang: Lang, path: string): string =>
  lang === defaultLang || /^(https?:|mailto:|tel:|#)/.test(path) ? path : path === "/" ? "/en/" : `/en${path}`;

// مسیرهایی که نسخه انگلیسی دارند (مقالات فعلاً فقط فارسی‌اند)
const translated = ["/design/", "/website-support/", "/ai/", "/portfolio/", "/about/", "/contact/"];
const hasTranslation = (path: string) => path === "/" || translated.some((p) => path.startsWith(p));

/** معادل صفحه فعلی در زبان دیگر؛ اگر ترجمه ندارد، صفحه اصلی زبان دیگر. */
export function alternateOf(url: URL) {
  const current = getLang(url);
  const other: Lang = current === "fa" ? "en" : "fa";
  const base = stripLang(url.pathname);
  const exact = hasTranslation(base);
  return { current, other, exact, href: localePath(other, exact ? base : "/") };
}

/** جایگذاری {name} در متن‌ها */
export const fmt = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const fa = {
  site: {
    owner: "احمد خنیفر",
    slogan: "هرجا مشتری هست، شما هم دیده می‌شوید",
    seoTagline: "طراحی سایت، پشتیبانی سایت و خدمات هوش مصنوعی",
    description: "طراحی سایت، پشتیبانی سایت و خدمات هوش مصنوعی برای کسب‌وکارهایی که می‌خواهند حرفه‌ای‌تر دیده شوند.",
    cta: "درخواست مشاوره",
    nav: { design: "طراحی سایت", support: "پشتیبانی سایت", ai: "هوش مصنوعی", portfolio: "نمونه‌کارها", blog: "مقالات", about: "درباره من" },
    jobTitle: "طراح و توسعه‌دهنده وب",
    country: "ایران",
    serviceTypes: ["طراحی سایت", "پشتیبانی سایت", "خدمات و آموزش هوش مصنوعی"],
  },
  common: {
    skip: "پرش به محتوای اصلی",
    home: "خانه",
    menu: "منو",
    mainNav: "منوی اصلی",
    homeAria: "صفحه اصلی",
    breadcrumb: "مسیر صفحه",
    listSep: "، ",
  },
  footer: { quick: "دسترسی سریع", quickAria: "پیوندهای سریع", contact: "ارتباط", whatsapp: "واتساپ", telegram: "تلگرام" },
  hero: {
    portfolio: "مشاهده نمونه‌کارها",
    services: "مشاهده خدمات",
    ownerRole: "طراح و توسعه‌دهنده وب؛ مستقیم با خودم صحبت می‌کنید",
    points: ["ارتباط مستقیم با طراح", "طراحی واکنش‌گرا و سریع", "پشتیبانی بعد از تحویل"],
  },
  heroVisual: {
    label: "کسب‌وکار شما چه کاری می‌کند؟",
    sample: "آموزشگاه زبان",
    badge: "سایت شما",
    url: "yourbusiness.ir",
    titleTpl: "نام کسب‌وکار شما | {q}",
    desc: "خدمات، نمونه‌کار و راه تماس، همان چیزی که مشتری دنبالش است.",
    chip: "مشتری جدید",
  },
  services: {
    eyebrow: "خدمات",
    title: "کدام وضعیت شبیه شماست؟",
    intro: "هر خدمت برای یک نیاز مشخص است؛ همان را انتخاب کنید.",
    items: [
      { icon: "design", for: "اگر هنوز سایت ندارید", title: "طراحی سایت", text: "سایت‌های شخصی، خدماتی و فروشگاهی سریع، واکنش‌گرا و مناسب کسب‌وکار.", cta: "طراحی سایت", href: "/design/" },
      { icon: "support", for: "اگر سایت دارید اما مشکل دارد", title: "پشتیبانی سایت", text: "رفع مشکلات، بروزرسانی، توسعه، بهینه‌سازی و نگهداری سایت.", cta: "درخواست پشتیبانی", href: "/website-support/" },
      { icon: "ai", for: "اگر می‌خواهید کارها سریع‌تر شود", title: "هوش مصنوعی", text: "خدمات، آموزش و مشاوره برای استفاده کاربردی از هوش مصنوعی.", cta: "خدمات هوش مصنوعی", href: "/ai/" },
    ] as { icon: "design" | "support" | "ai"; for: string; title: string; text: string; cta: string; href: string }[],
  },
  portfolioPreview: { title: "نمونه‌کارها", all: "مشاهده همه نمونه‌کارها" },
  meet: {
    eyebrow: "آشنایی",
    title: "سلام، من {name} هستم",
    text: "طراح و توسعه‌دهنده وب. سایت می‌سازم، از سایت‌های موجود پشتیبانی می‌کنم و به کسب‌وکارها کمک می‌کنم از هوش مصنوعی در کارهای روزمره استفاده کنند. با من مستقیم صحبت می‌کنید، نه با واسطه.",
    more: "بیشتر درباره من",
  },
  why: {
    eyebrow: "مزیت‌ها",
    title: "چرا KhanifarWeb؟",
    reasons: [
      "طراحی متناسب با نیاز واقعی کسب‌وکار",
      "تمرکز روی تجربه کاربر",
      "طراحی واکنش‌گرا برای همه دستگاه‌ها",
      "توجه به سرعت و سئو",
      "امکان پشتیبانی و توسعه بعد از تحویل",
      "استفاده کاربردی از ابزارهای هوش مصنوعی",
      "ارتباط مستقیم با طراح",
    ],
  },
  process: {
    eyebrow: "فرآیند همکاری",
    title: "همکاری چطور پیش می‌رود؟",
    intro: "فرآیند ساده و شفاف است؛ از همان گفتگوی اول می‌دانید قدم بعدی چیست.",
    steps: [
      { title: "گفتگو", text: "نیاز کسب‌وکار شما بررسی می‌شود." },
      { title: "پیشنهاد", text: "راهکار و ساختار مناسب پیشنهاد می‌شود." },
      { title: "طراحی و اجرا", text: "سایت ساخته و آماده انتشار می‌شود." },
      { title: "پشتیبانی", text: "پس از راه‌اندازی، امکان توسعه و پشتیبانی وجود دارد." },
    ],
  },
  aiBlock: {
    eyebrow: "هوش مصنوعی",
    title: "هوش مصنوعی برای کار روزمره",
    intro: "بدون وعده‌های بزرگ؛ فقط استفاده کاربردی که در کارتان صرفه‌جویی ایجاد کند.",
    items: [
      { title: "خدمات AI", text: "استفاده از هوش مصنوعی برای حل مسائل واقعی کسب‌وکار." },
      { title: "آموزش AI", text: "آموزش ساده و کاربردی ابزارهای هوش مصنوعی." },
      { title: "مشاوره AI", text: "بررسی فرآیندهای کاری و پیشنهاد روش‌های استفاده از AI برای افزایش سرعت و بهره‌وری." },
    ],
    cta: "خدمات هوش مصنوعی",
  },
  finalCta: { title: "بیایید درباره سایتتان حرف بزنیم", text: "یک پیام کوتاه بنویسید؛ خودم بررسی می‌کنم چه راهی برای کسب‌وکار شما مناسب‌تر است." },
  about: {
    title: "درباره من",
    description: "{owner}، طراح و توسعه‌دهنده وب. طراحی سایت، پشتیبانی سایت و خدمات و آموزش هوش مصنوعی.",
    heading: "من {owner} هستم",
    lead: "طراح و توسعه‌دهنده وب؛ کمک می‌کنم کسب‌وکارها در اینترنت بهتر دیده شوند.",
    h1: "چه کاری انجام می‌دهم؟",
    p1: "سایت طراحی و اجرا می‌کنم، از سایت‌های موجود پشتیبانی و آن‌ها را توسعه می‌دهم و خدمات و آموزش هوش مصنوعی ارائه می‌کنم.",
    h2: "با چه ابزارهایی؟",
    p2: "با HTML، CSS، JavaScript و Astro کار می‌کنم و سایت‌ها را سریع، واکنش‌گرا و مناسب سئو می‌سازم.",
    h3: "چه کمکی می‌توانم بکنم؟",
    list: ["ساخت سایتی که مشتری را به تماس نزدیک‌تر کند", "رفع مشکل و توسعه سایتی که الان دارید", "استفاده کاربردی از هوش مصنوعی در کارهای روزمره"],
    portfolio: "مشاهده نمونه‌کارها",
    design: "خدمات طراحی سایت",
  },
  contact: {
    title: "درخواست مشاوره",
    description: "برای طراحی سایت، پشتیبانی سایت یا خدمات هوش مصنوعی درخواست مشاوره بدهید. نیازتان را کوتاه بنویسید.",
    lead: "نیازتان را کوتاه بنویسید تا با هم بررسی کنیم چه راهی مناسب‌تر است.",
    direct: "ترجیح می‌دهید مستقیم صحبت کنیم؟",
  },
  contactLinks: {
    phone: "تماس تلفنی",
    whatsapp: "واتساپ",
    whatsappValue: "پیام در واتساپ",
    telegram: "تلگرام",
    telegramValue: "پیام در تلگرام",
    email: "ایمیل",
  },
  form: {
    name: "نام",
    phone: "شماره تماس",
    phoneTitle: "شماره تماس را با ارقام وارد کنید",
    phonePlaceholder: "09123456789",
    service: "نوع خدمت",
    design: "طراحی سایت",
    support: "پشتیبانی سایت",
    ai: "هوش مصنوعی",
    other: "سایر",
    message: "توضیح کوتاه",
    optional: "(اختیاری)",
    honeypot: "وب‌سایت",
    submit: "ارسال درخواست مشاوره",
    noscript: "برای ارسال فرم به جاوااسکریپت نیاز است؛ از راه‌های ارتباط مستقیم استفاده کنید.",
    sending: "در حال ارسال...",
    ok: "درخواست شما ارسال شد. به‌زودی با شما تماس می‌گیرم.",
    err404: "سرویس فرم هنوز فعال نیست.",
    errDefault: "ارسال انجام نشد. لطفاً دوباره تلاش کنید.",
    errCode: "کد",
    errNetwork: "ارتباط با سرور برقرار نشد. لطفاً از راه‌های ارتباط مستقیم استفاده کنید.",
  },
  portfolio: {
    title: "نمونه‌کارها",
    description: "نمونه‌کارهای طراحی و توسعه سایت توسط KhanifarWeb.",
    lead: "کیفیت مهم‌تر از تعداد است؛ فقط پروژه‌های واقعی اینجا نمایش داده می‌شوند.",
    empty: "نمونه‌کارها به‌زودی در این بخش منتشر می‌شوند. اگر پروژه‌ای در ذهن دارید، همین حالا درباره‌اش گفتگو کنیم.",
    type: "نوع سایت",
    services: "خدمات انجام‌شده",
    view: "مشاهده پروژه",
  },
  servicePage: {
    boxTitle: "آماده شروع هستید؟",
    boxText: "نیازتان را کوتاه بنویسید تا با هم بررسی کنیم.",
    others: "خدمات دیگر",
    portfolio: "نمونه‌کارها",
  },
};

type UI = typeof fa;

const en: UI = {
  site: {
    owner: "Ahmad Khanifar",
    slogan: "Wherever your customers are, you get seen",
    seoTagline: "Website design, website support and AI services",
    description: "Website design, website support and AI services for businesses that want to look more professional.",
    cta: "Request a consultation",
    nav: { design: "Website design", support: "Website support", ai: "AI", portfolio: "Portfolio", blog: "Articles", about: "About me" },
    jobTitle: "Web designer and developer",
    country: "Iran",
    serviceTypes: ["Website design", "Website support", "AI services and training"],
  },
  common: {
    skip: "Skip to main content",
    home: "Home",
    menu: "Menu",
    mainNav: "Main menu",
    homeAria: "Home page",
    breadcrumb: "Breadcrumb",
    listSep: ", ",
  },
  footer: { quick: "Quick links", quickAria: "Quick links", contact: "Contact", whatsapp: "WhatsApp", telegram: "Telegram" },
  hero: {
    portfolio: "View portfolio",
    services: "View services",
    ownerRole: "Web designer and developer; you talk to me directly",
    points: ["Direct contact with your designer", "Fast, responsive design", "Support after delivery"],
  },
  heroVisual: {
    label: "What does your business do?",
    sample: "Language school",
    badge: "Your site",
    url: "yourbusiness.com",
    titleTpl: "Your business name | {q}",
    desc: "Services, portfolio and a way to get in touch, exactly what the customer is looking for.",
    chip: "New customer",
  },
  services: {
    eyebrow: "Services",
    title: "Which situation sounds like yours?",
    intro: "Each service is for a specific need; pick the one that fits.",
    items: [
      { icon: "design", for: "If you don't have a website yet", title: "Website design", text: "Fast, responsive personal, service and online-store websites built for your business.", cta: "Website design", href: "/design/" },
      { icon: "support", for: "If you have a website but it has problems", title: "Website support", text: "Fixes, updates, new features, optimization and ongoing maintenance for your site.", cta: "Request support", href: "/website-support/" },
      { icon: "ai", for: "If you want to get work done faster", title: "Artificial intelligence", text: "Services, training and consulting for practical use of AI.", cta: "AI services", href: "/ai/" },
    ],
  },
  portfolioPreview: { title: "Portfolio", all: "View all projects" },
  meet: {
    eyebrow: "Meet me",
    title: "Hi, I'm {name}",
    text: "Web designer and developer. I build websites, support existing ones, and help businesses use AI in their everyday work. You talk to me directly, not through a middleman.",
    more: "More about me",
  },
  why: {
    eyebrow: "Why us",
    title: "Why KhanifarWeb?",
    reasons: [
      "Design based on your business's real needs",
      "A focus on user experience",
      "Responsive design for every device",
      "Attention to speed and SEO",
      "Support and development after delivery",
      "Practical use of AI tools",
      "Direct contact with your designer",
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "How does a project go?",
    intro: "The process is simple and transparent; from the first conversation you know what comes next.",
    steps: [
      { title: "Conversation", text: "We look at your business's needs." },
      { title: "Proposal", text: "I propose the right solution and structure." },
      { title: "Design and build", text: "The site is built and made ready to launch." },
      { title: "Support", text: "After launch, further development and support are available." },
    ],
  },
  aiBlock: {
    eyebrow: "AI",
    title: "AI for everyday work",
    intro: "No big promises; just practical use that saves you time and effort.",
    items: [
      { title: "AI services", text: "Using AI to solve real business problems." },
      { title: "AI training", text: "Simple, practical training on AI tools." },
      { title: "AI consulting", text: "Reviewing your workflows and suggesting ways to use AI to work faster and more productively." },
    ],
    cta: "AI services",
  },
  finalCta: { title: "Let's talk about your website", text: "Write a short message; I'll look at which approach suits your business best." },
  about: {
    title: "About me",
    description: "{owner}, web designer and developer. Website design, website support, and AI services and training.",
    heading: "I'm {owner}",
    lead: "Web designer and developer; I help businesses get seen better online.",
    h1: "What do I do?",
    p1: "I design and build websites, support and extend existing ones, and offer AI services and training.",
    h2: "With what tools?",
    p2: "I work with HTML, CSS, JavaScript and Astro, and build sites that are fast, responsive and SEO-friendly.",
    h3: "How can I help?",
    list: ["Building a website that brings customers closer to getting in touch", "Fixing and extending the website you have now", "Practical use of AI in your day-to-day work"],
    portfolio: "View portfolio",
    design: "Website design services",
  },
  contact: {
    title: "Request a consultation",
    description: "Request a consultation for website design, website support or AI services. Briefly describe what you need.",
    lead: "Briefly describe what you need and we'll work out the best approach together.",
    direct: "Prefer to talk directly?",
  },
  contactLinks: {
    phone: "Phone",
    whatsapp: "WhatsApp",
    whatsappValue: "Message on WhatsApp",
    telegram: "Telegram",
    telegramValue: "Message on Telegram",
    email: "Email",
  },
  form: {
    name: "Name",
    phone: "Phone number",
    phoneTitle: "Enter your phone number using digits",
    phonePlaceholder: "+98 912 345 6789",
    service: "Service",
    design: "Website design",
    support: "Website support",
    ai: "Artificial intelligence",
    other: "Other",
    message: "Short description",
    optional: "(optional)",
    honeypot: "Website",
    submit: "Send consultation request",
    noscript: "JavaScript is required to send this form; please use the direct contact options.",
    sending: "Sending...",
    ok: "Your request was sent. I'll get back to you soon.",
    err404: "The form service isn't active yet.",
    errDefault: "Sending failed. Please try again.",
    errCode: "code",
    errNetwork: "Couldn't reach the server. Please use the direct contact options.",
  },
  portfolio: {
    title: "Portfolio",
    description: "Website design and development projects by KhanifarWeb.",
    lead: "Quality matters more than quantity; only real projects are shown here.",
    empty: "Projects will be published here soon. If you have a project in mind, let's talk about it now.",
    type: "Website type",
    services: "Services provided",
    view: "View project",
  },
  servicePage: {
    boxTitle: "Ready to start?",
    boxText: "Briefly describe what you need and we'll look into it together.",
    others: "Other services",
    portfolio: "Portfolio",
  },
};

export const ui: Record<Lang, UI> = { fa, en };

/** یک‌جا همه چیز لازم برای یک صفحه: زبان، متن‌ها و تابع ساخت مسیر. */
export function useI18n(url: URL) {
  const lang = getLang(url);
  return { lang, t: ui[lang], lp: (path: string) => localePath(lang, path), dir: languages[lang].dir };
}

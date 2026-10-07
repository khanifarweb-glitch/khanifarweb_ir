/**
 * Cloudflare Pages Function: POST /api/contact
 * دریافت فرم «درخواست مشاوره» و ارسال آن به Telegram و/یا Bale (چیزی ذخیره نمی‌شود).
 * متغیرهای محیطی در داشبورد Cloudflare Pages تنظیم می‌شوند (راهنما: DEPLOY.md).
 */

interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  BALE_BOT_TOKEN?: string;
  BALE_CHAT_ID?: string;
  TURNSTILE_SECRET_KEY?: string; // اختیاری
  SITE_ORIGIN?: string; // اختیاری: مثلاً https://khanifarweb.ir
}

const SERVICES: Record<string, string> = {
  design: "طراحی سایت",
  "website-support": "پشتیبانی سایت",
  ai: "هوش مصنوعی",
  other: "سایر",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

// حذف کاراکترهای کنترلی و محدودکردن طول ورودی
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

// تبدیل ارقام فارسی/عربی به لاتین برای اعتبارسنجی شماره
const toLatinDigits = (s: string) =>
  s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function sendMessage(base: string, token: string, chatId: string, text: string) {
  const res = await fetch(`${base}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }), // بدون parse_mode: متن ساده، بدون خطر تزریق
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`send failed: ${res.status}`);
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }): Promise<Response> => {
  // ۱) محافظت CSRF: فقط درخواست JSON از همین دامنه
  const origin = request.headers.get("Origin");
  const allowed = [new URL(request.url).origin, env.SITE_ORIGIN].filter(Boolean);
  if (!origin || !allowed.includes(origin)) return json({ ok: false, error: "درخواست نامعتبر است." }, 403);
  if (!(request.headers.get("Content-Type") ?? "").startsWith("application/json")) {
    return json({ ok: false, error: "درخواست نامعتبر است." }, 415);
  }

  // ۲) خواندن بدنه با محدودیت حجم
  const raw = await request.text();
  if (raw.length > 6000) return json({ ok: false, error: "درخواست بیش از حد بزرگ است." }, 413);
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "درخواست نامعتبر است." }, 400);
  }

  // ۳) ضد اسپم: honeypot و زمان پر کردن فرم (ربات‌ها بی‌صدا "موفق" می‌گیرند)
  const startedAt = Number(data.ts);
  if (!Number.isFinite(startedAt)) return json({ ok: false, error: "درخواست نامعتبر است." }, 400);
  if (clean(data.website, 100) !== "" || Date.now() - startedAt < 2500) return json({ ok: true });

  // ۴) اعتبارسنجی ورودی
  const name = clean(data.name, 80);
  const phone = toLatinDigits(clean(data.phone, 20)).replace(/[\s\-()]/g, "");
  const service = clean(data.service, 30);
  const message = clean(data.message, 1000);

  if (name.length < 2) return json({ ok: false, error: "لطفاً نام خود را وارد کنید." }, 400);
  if (!/^\+?\d{10,14}$/.test(phone)) return json({ ok: false, error: "شماره تماس معتبر وارد کنید." }, 400);
  if (!(service in SERVICES)) return json({ ok: false, error: "نوع خدمت را انتخاب کنید." }, 400);

  // ۵) Turnstile (فقط اگر کلید سمت سرور تنظیم شده باشد)
  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(data["cf-turnstile-response"], 2048);
    const ok = token && (await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, request.headers.get("CF-Connecting-IP")));
    if (!ok) return json({ ok: false, error: "تأیید امنیتی انجام نشد. دوباره تلاش کنید." }, 400);
  }

  // ۶) ارسال به کانال‌های تنظیم‌شده
  const text = [
    "📩 درخواست مشاوره جدید",
    `نام: ${name}`,
    `تماس: ${phone}`,
    `خدمت: ${SERVICES[service]}`,
    message ? `توضیح: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const jobs: Promise<void>[] = [];
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    jobs.push(sendMessage("https://api.telegram.org", env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, text));
  }
  if (env.BALE_BOT_TOKEN && env.BALE_CHAT_ID) {
    jobs.push(sendMessage("https://tapi.bale.ai", env.BALE_BOT_TOKEN, env.BALE_CHAT_ID, text));
  }
  if (jobs.length === 0) return json({ ok: false, error: "ارسال فرم هنوز پیکربندی نشده است." }, 500);

  const results = await Promise.allSettled(jobs);
  if (!results.some((r) => r.status === "fulfilled")) {
    return json({ ok: false, error: "ارسال انجام نشد. لطفاً از راه‌های ارتباط مستقیم استفاده کنید." }, 502);
  }
  return json({ ok: true });
};

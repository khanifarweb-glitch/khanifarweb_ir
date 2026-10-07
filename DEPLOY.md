# راهنمای انتشار روی Cloudflare Pages (رایگان)

## ۱. اتصال پروژه
Workers & Pages ← Create ← Pages ← Connect to Git ← ریپوی پروژه
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- نسخه Node از فایل `.node-version` خوانده می‌شود.

پوشه `functions/` خودکار به‌عنوان Function شناسایی می‌شود (نیازی به adapter نیست).

## ۲. متغیرهای محیطی (Settings ← Variables and Secrets، نوع Secret)
حداقل یکی از دو کانال را کامل کنید:
- `TELEGRAM_BOT_TOKEN` و `TELEGRAM_CHAT_ID`
- `BALE_BOT_TOKEN` و `BALE_CHAT_ID`

اختیاری:
- `SITE_ORIGIN` = `https://khanifarweb.ir` (اگر از چند دامنه استفاده می‌کنید)
- Turnstile: `TURNSTILE_SECRET_KEY` (Secret) و `PUBLIC_TURNSTILE_SITE_KEY` (Variable، فقط زمان build خوانده می‌شود).
  پیش‌فرض خاموش است چون اسکریپت Turnstile ممکن است از بعضی اینترنت‌های ایران بالا نیاید. اگر اسپم زیاد شد روشنش کنید.

بعد از تغییر متغیرها یک Deploy جدید لازم است.

## ۳. گرفتن توکن و Chat ID
- ساخت ربات: در Telegram با `@BotFather` یا در Bale با `@botfather` ربات بسازید و توکن را بردارید.
- به ربات خودتان یک پیام بدهید، سپس در مرورگر باز کنید:
  `https://api.telegram.org/bot<TOKEN>/getUpdates` (برای Bale: `https://tapi.bale.ai/bot<TOKEN>/getUpdates`)
  مقدار `chat.id` همان Chat ID است.

## ۴. دامنه
Custom domains ← `khanifarweb.ir` و `www.khanifarweb.ir`

## ۵. تست
فرم `/contact/` را پر کنید؛ پیام باید در ربات برسد. تست محلی:
`npm run build && npx wrangler pages dev dist` (با فایل `.dev.vars`)

## عیب‌یابی فرم تماس
۱. در مرورگر `https://khanifarweb.ir/api/contact` را باز کنید (GET):
- **۴۰۴ یا صفحه HTML:** پوشه `functions/` (فایل `functions/api/contact.ts`) در ریپو نیست یا deploy نشده؛ آن را به ریشه ریپو (کنار `package.json`) اضافه و push کنید.
- **JSON با `"telegram": false` و `"bale": false`:** متغیرها در Cloudflare ثبت نشده‌اند. باید برای محیط **Production** ثبت شوند و بعد از آن یک Deploy جدید لازم است.
- **JSON با true:** Function فعال است؛ مشکل در توکن/Chat ID است (مرحله بعد).

۲. فرم را پر کنید؛ پیام خطا شامل «کد» است:
- `telegram:400` یا `bale:400` → Chat ID اشتباه است یا هنوز در ربات دکمه Start را نزده‌اید.
- `telegram:401` / `telegram:404` → توکن اشتباه است.
- `telegram:403` → ربات را بلاک کرده‌اید، یا در گروه/کانال دسترسی ارسال ندارد.
- `bale:network` → سرور Cloudflare به Bale نرسیده است؛ از Telegram استفاده کنید.
- `not-configured` → هیچ کانالی تنظیم نشده است.
- `origin` / `content-type` → درخواست از دامنه‌ای غیر از دامنه اصلی آمده؛ `SITE_ORIGIN` را تنظیم کنید.

۳. جزئیات دقیق خطا: Cloudflare ← پروژه Pages ← Functions ← Real-time Logs.

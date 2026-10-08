# راهنمای انتشار روی Cloudflare (Workers + Static Assets، رایگان)

## ساختار مهم ریپو (ریشه ریپو، کنار package.json)
```text
wrangler.jsonc        ← تنظیمات deploy (نام باید khanifarweb-ir باشد)
worker/index.ts       ← مسیر /api/contact
worker/contact.ts     ← منطق فرم
src/ ...
```
- هر فایل `wrangler.toml` یا `wrangler.json` قدیمی را **حذف کنید** (فقط `wrangler.jsonc` بماند).
- اگر پوشه `src/pages/api/` یا پوشه `functions/` دارید، **حذفشان کنید** (در سایت استاتیک کار نمی‌کنند).

## تنظیمات Build در Cloudflare (Workers & Pages ← پروژه ← Settings ← Build)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: خالی (مگر پروژه داخل زیرپوشه باشد)

## متغیرهای فرم (Settings ← Variables and Secrets، نوع **Secret**)
این‌ها باید در بخش **Runtime** (نه Build variables) ثبت شوند:
- `TELEGRAM_BOT_TOKEN` و `TELEGRAM_CHAT_ID`
- (اختیاری) `BALE_BOT_TOKEN` و `BALE_CHAT_ID`
- (اختیاری) `SITE_ORIGIN` = `https://khanifarweb.ir`، `TURNSTILE_SECRET_KEY`

همه را حتماً به‌صورت **Secret** بسازید؛ مقدارهای Plaintext با هر deploy از طریق wrangler پاک می‌شوند.

## گرفتن توکن و Chat ID
- ربات: در Telegram با `@BotFather` دستور `/newbot`؛ توکن را بردارید.
- در ربات خودتان دکمه **Start** را بزنید، سپس باز کنید:
  `https://api.telegram.org/bot<TOKEN>/getUpdates`
  مقدار `chat.id` همان Chat ID است. (برای Bale: `https://tapi.bale.ai/bot<TOKEN>/getUpdates`)

## تست
1. `https://khanifarweb.ir/api/contact` را باز کنید: باید JSON ببینید، مثل `{"ok":true,"telegram":true,...}`.
2. فرم `/contact/` را پر کنید.

## عیب‌یابی کد خطای فرم
- `telegram:400` / `bale:400` → Chat ID اشتباه است یا در ربات Start نزده‌اید.
- `telegram:401` / `telegram:404` → توکن اشتباه است.
- `telegram:403` → ربات بلاک شده یا در گروه/کانال دسترسی ارسال ندارد.
- `bale:network` → Cloudflare به Bale نرسیده؛ Telegram را هم تنظیم کنید.
- `not-configured` → Secretها ثبت نشده‌اند.
- `origin` → `SITE_ORIGIN` را تنظیم کنید.
جزئیات بیشتر: Worker ← Logs (Real-time Logs).

// سازگاری با Cloudflare Pages: همان منطق worker/contact.ts را به‌عنوان Pages Function ارائه می‌دهد.
// در پروژه‌های Workers این پوشه نادیده گرفته می‌شود و ضرری ندارد.
export { onRequestGet, onRequestPost } from "../../worker/contact";

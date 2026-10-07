/// <reference types="astro/client" />

interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  BALE_BOT_TOKEN?: string;
  BALE_CHAT_ID?: string;
  TURNSTILE_SECRET_KEY?: string;
  SITE_ORIGIN?: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
declare namespace App {
  interface Locals extends Runtime {}
}

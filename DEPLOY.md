# Deploy KhanifarWeb on Cloudflare Workers

This project uses Astro + the official Cloudflare adapter and deploys to Cloudflare Workers.

## Build

```bash
npm install
npm run build
```

## Local secrets

Copy `.dev.vars.example` to `.dev.vars` and fill in the values needed for local testing. Never commit `.dev.vars`.

## Deploy

```bash
npx wrangler deploy
```

## Production secrets

Set secrets in Cloudflare Workers with Wrangler, for example:

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

Optional Bale and Turnstile secrets can be added the same way.

The contact endpoint is implemented as an Astro API route at `/api/contact` and runs inside the same Cloudflare Worker as the website.

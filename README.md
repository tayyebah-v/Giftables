# Giftables

Premium, mobile-first gifting web app (Next.js App Router). Users build a gift in guided steps with a floating live price dock, pastel glass UI, and Framer Motion transitions.

## Stack

- Next.js 15, React 19, Tailwind CSS, Framer Motion
- Zustand for builder state
- MongoDB + Mongoose for orders (optional at dev time)
- Stripe PaymentIntents + webhook stub (optional)
- Firebase client bootstrap (optional)
- PWA manifest at `public/manifest.webmanifest`

## Getting started

Ensure [Node.js](https://nodejs.org/) is installed and `node` / `npm` are on your `PATH` (on Windows, reopen the terminal after installing, or use **“Node.js command prompt”**).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Walk the flow: **Landing → Event → Packaging → Customize → Gifts → Add-ons → Delivery → Checkout**.

### Windows: “Failed to load SWC binary” / “not a valid Win32 application”

The native `@next/swc-win32-x64-msvc` addon can fail if the download was **corrupt**, **quarantined** by antivirus, or the **wrong CPU architecture** was installed. This repo lists **`@next/swc-wasm-nodejs`** so Next.js can compile using the **WASM** fallback.

1. Clean reinstall from the project root (Git Bash or PowerShell):

   ```bash
   rm -rf node_modules .next
   npm install
   ```

   PowerShell: `Remove-Item -Recurse -Force node_modules,.next` then `npm install`.

2. Run `npm run dev` again.

3. If it still fails, try dev **without** Turbopack: `npm run dev:webpack`.

4. Check Node architecture: `node -p "process.arch"` — on typical PCs expect `x64`. On ARM Windows, report `arm64` if problems persist.

## Environment

Copy `.env.example` to `.env.local` and fill values as you connect services. Without Mongo or Stripe, checkout runs in **demo mode** and still returns success for UX testing.

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab and import into Vercel.
2. Set environment variables from `.env.example`.
3. Add Stripe webhook endpoint pointing to `/api/webhooks/stripe` with the signing secret.
4. Configure MongoDB Atlas network access for Vercel (allowlist `0.0.0.0/0` for prototypes, tighten later).

## Project structure

- `src/app` — routes (`/`, `/build/*`, `/checkout`)
- `src/components` — UI, wizard, catalog, pricing
- `src/lib/catalog.ts` — seed catalog (replace with CMS/DB later)
- `src/lib/pricing` — pure `computeTotals` used client + server
- `src/store` — Zustand gift builder store
- `src/app/api` — catalog, recommendations, checkout session, Stripe webhook

## Notes

- Catalog images use Unsplash URLs configured in `next.config.ts`.
- Add real PNG icons to the web manifest when you are ready for install prompts.
# Giftables

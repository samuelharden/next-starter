# Starter

**Marketing site boilerplate for Next.js.** A light homepage you can rebrand in minutes.

- ⚡️ App Router, TypeScript, Tailwind CSS 4
- 🧭 Native-scroll homepage: hero, features, about, contact
- ✉️ Optional Anfrage form with Formisch, Valibot, and Resend
- 🔎 Metadata, Open Graph, JSON-LD (JavaScript Object Notation for Linked Data), sitemap, robots
- ⚖️ Impressum and Datenschutz wired to one company config
- 🧶 Yarn Classic only

## 🚀 Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📱 Phone testing (Windows + WSL)

This only works on Windows with WSL (Windows Subsystem for Linux). The phone must be on the same Wi-Fi. A Mac or a Linux-only machine can skip this.

Install once, on Windows:

```powershell
winget install gerardog.gsudo
```

Open a new WSL terminal and check `gsudo.exe --version`. gsudo is the prompt that allows the firewall and port-forward rules.

Then:

```bash
yarn dev:lan
```

The script prints a `Phone URL` like `http://192.168.0.196:3000`. Open that on the phone.

Your machine-specific values are in [`scripts/lan.config`](scripts/lan.config):

| Key | Leave empty when | Set it when | How to get the value |
|-----|------------------|-------------|----------------------|
| `LAN_HOST` | Auto-pick works | VPN or a second adapter steals the address | Windows PowerShell: `ipconfig`. Copy the IPv4 of Wi-Fi or Ethernet. Ignore `127.0.0.1` and `vEthernet (WSL)`. |
| `WSL_DISTRO` | This project is in the default distro | It lives in another distro | PowerShell: `wsl -l -q` |
| `LAN_PORT` | `3000` is fine | That port is taken | Any free TCP port. The dev server uses the same value. |

## ✏️ Rebrand (5 minutes)

| What | Where |
|------|--------|
| Legal / NAP (Name, Address, Phone) | [`src/lib/company.ts`](src/lib/company.ts) |
| Email + Anfrage href | [`src/lib/contact.ts`](src/lib/contact.ts) |
| Titles, descriptions, site URL | [`src/lib/seo.ts`](src/lib/seo.ts) |
| Site URL (SEO, apex redirect, emails) | `NEXT_PUBLIC_SITE_URL` in `.env.local` |
| Logos | [`public/media/img/`](public/media/img/) (`logo-mark.svg`, `logo-wordmark.svg`, …) |
| Team photos | [`public/media/img/placeholders/`](public/media/img/placeholders/). Swap before launch. |
| Page copy | Hero, Features, About, Contact sections under `src/components/sections/` |

## 🎨 Theme

Starter ships a light paper + ink + slate-teal kit look. Swap tokens in [`src/app/globals.css`](src/app/globals.css):

```css
:root {
  --paper: …;
  --ink: …;
  --brand: …;
  --brand-foreground: …;
}
```

Headings use Unbounded (SIL Open Font License) from [`src/app/layout.tsx`](src/app/layout.tsx) and `public/fonts/`.

Body text is Inter via `next/font/google`. That is only a stand-in. Before you ship, replace it with a self-hosted file in `public/fonts/` and load it with `next/font/local`, the same way Unbounded is wired. Do not leave a Google Fonts dependency in a client project.

## 🔐 Environment

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public origin, e.g. `https://example.com` |
| `RESEND_API_KEY` | Send Anfrage mail |
| `RESEND_FROM` | Verified sender, e.g. `Starter <noreply@example.com>` |
| `API_KEY_21ST` | Optional. 21st.dev MCP |

## 🗺️ Routes

| Path | Role |
|------|------|
| `/` | Homepage |
| `/anfrage` | Inquiry form |
| `/impressum` | Legal imprint |
| `/datenschutz` | Privacy |
| `/api/anfrage` | Form POST → Resend |

## ✂️ Remove Anfrage

If you do not need the form, delete:

1. `src/app/anfrage/`
2. `src/app/api/anfrage/`
3. `src/components/forms/`
4. `src/lib/anfrage/`
5. `src/lib/email/`
6. `resend` from `package.json` (then `yarn install`)
7. `RESEND_*` from `.env.example` / `.env.local`
8. Anfrage / Resend sections in `src/app/datenschutz/page.tsx`
9. Links to `/anfrage` in nav, footer, CTAs, and `src/app/sitemap.ts`

Point home Kontakt at `mailto:` from `CONTACT_EMAIL` in `src/lib/contact.ts` instead.

## ☁️ Deploy

Deploy on [Vercel](https://vercel.com). Set `NEXT_PUBLIC_SITE_URL` to your domain before go-live.

# Elijah Olojede — Portfolio

A dark, responsive portfolio for an AI Native Developer. Projects, experience, and personal details live in typed data files. The home page is one scrolling view. Each case study is a static page at `/projects/[slug]`.

## Setup

Requires Node.js 20.9 or newer.

```bash
npm install
npm run assets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run format     # Prettier
```

Copy `.env.example` to `.env.local` before testing email delivery.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Canonical URL, sitemap, Open Graph |
| `RESEND_API_KEY` | For live email | Resend API key. Server-only. |
| `CONTACT_TO_EMAIL` | For live email | Inbox that receives the form |
| `CONTACT_FROM_EMAIL` | For live email | Verified Resend sender, e.g. `Portfolio <hello@yourdomain.com>` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible. Leave blank to disable. |

In development, if the Resend variables are empty, the form still validates and shows a success state without sending mail. In production it returns an error until those three values are set.

The contact route checks a honeypot field, validates with Zod, and rate-limits by IP in memory (5 requests / 10 minutes per server instance).

## Add or edit a project

Edit only `data/projects.ts`.

1. Append one object. The `Project` type in that file is the contract.
2. Keep `shortDescription` at 140 characters or fewer. A dev-only check throws if it is longer.
3. Add a 16:9 image at `public/images/projects/<slug>/thumb.webp`.
4. Optional gallery images go in the same folder and are listed on `gallery`.
5. Set `previewUrl` for the Preview button. Leave it off to show “Preview coming soon”.
6. Set `repoUrl` to show View source.

Filters are built from the projects in the file. No component edits are required for a new project that uses an existing category (`RAG`, `Agents`, `Voice`, `API`, `Automation`, `Other`).

Regenerate the geometric placeholder covers with `npm run assets` only if you want the sample art back. Real screenshots should replace those files directly.

## Profile photo and résumé

- Photo: `public/images/profile.jpg` is the About portrait. `public/images/profile-circle.jpg` is the head, neck, and shoulders crop used in the circular nav, footer, and favicon marks. Set `portraitIsPhoto` to `false` to fall back to initials.
- Résumé: the hero button downloads `public/Elijah-Olojede-CV.pdf`.

## Personal content and SEO

`data/site.ts` holds the name, roles, bio, links, location, and stats. `data/experience.ts` and `data/skills.ts` hold the timeline and skill groups. Search titles and the JSON-LD `Person` schema read from the same file.

The copy in those files follows the CV. Do not add metrics, preview links, or employers the CV does not state. GitHub and LinkedIn are omitted until real profile URLs exist.

## Theme colors

Tokens live in `styles/tokens.css`: colors, radius, shadows, fluid type sizes, and section spacing. Components use those variables through Tailwind (`bg-background`, `text-muted`, `border-border`). Dark is the default. Light mode overrides the same names under `.light`.

Change the HSL channels in that file. You do not need to edit components for a recolor.

Tailwind 3.4 is used so the token file stays a normal stylesheet of CSS variables, which is easier to retheme than a generated utility layer.

## Deploy on Vercel

1. Push the repository and import it in Vercel.
2. Set the environment variables from `.env.example`.
3. Framework preset: Next.js. Build command: `npm run build`.
4. Confirm `NEXT_PUBLIC_SITE_URL` is the production `https` origin so canonical URLs and HSTS are correct.

Vercel Analytics is optional. This project enables Plausible only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, so the Content Security Policy does not have to allow extra script hosts by default.

## Deploy with Docker

The image is a multi-stage build and runs Next.js in standalone mode.

```bash
docker build -t ai-portfolio .
docker run --rm -p 3000:3000 --env-file .env.local ai-portfolio
```

Pass the same variables as production. `NEXT_PUBLIC_*` values are read when the client bundle is built, so set `NEXT_PUBLIC_SITE_URL` before `docker build` if the canonical URL must be baked in. Server-only secrets (`RESEND_API_KEY`, contact emails) can be provided at `docker run`.

## Optional git hooks

Husky is not installed. If you want a pre-commit check:

```bash
npm install -D husky lint-staged
npx husky init
```

Then run `npm run typecheck` and `npm run lint` from the hook.

## Pre-launch checklist

- [ ] Replace the name, location, email, GitHub, and LinkedIn in `data/site.ts`
- [ ] Confirm years of experience and the open-to list
- [ ] Replace the résumé PDF and the profile photo
- [ ] Replace each project in `data/projects.ts`, including real metrics
- [ ] Add real screenshots at `public/images/projects/<slug>/thumb.webp`
- [ ] Set `previewUrl` only for demos that are actually live
- [ ] Set `NEXT_PUBLIC_SITE_URL`, Resend, and the contact inboxes
- [ ] Send a test message through the contact form on the production domain
- [ ] Run Lighthouse on `/` and on one project page (Performance, Accessibility, Best Practices, SEO)
- [ ] Click every preview and source link
- [ ] Check the mobile menu, theme toggle, and résumé download

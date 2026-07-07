# HM Tech — Marketing Website

A 5-page, premium, light-theme Next.js site for HM Tech, built around the
brand's violet/indigo logo palette with an interactive 3D hero (React Three
Fiber) and 3D-tilt cards throughout.

## Pages

- `/` — Home (3D hero, services preview, process, work preview)
- `/about` — About (values, timeline)
- `/services` — Services (offerings, process, engagement tiers)
- `/portfolio` — Portfolio (filterable project grid)
- `/contact` — Contact (form + contact details)

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom "iris" color palette derived from the logo)
- Framer Motion (scroll reveals, page-level micro-interactions)
- React Three Fiber + drei (3D hero cube field)
- lucide-react (icons)

## Getting started

This project ships **without** `node_modules` to keep the download small.
Install dependencies once, then run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx        Root layout, fonts, Navbar/Footer
  globals.css        Tailwind layers + design tokens
  page.tsx            Home
  about/page.tsx
  services/page.tsx
  portfolio/page.tsx
  contact/page.tsx
components/
  Navbar.tsx, Footer.tsx
  CubeField.tsx       3D hero scene (React Three Fiber)
  TiltCard.tsx        3D hover-tilt card wrapper
  SectionHeading.tsx, StatsStrip.tsx, ProcessTimeline.tsx
  CTASection.tsx, PortfolioGrid.tsx, ContactForm.tsx
public/
  logo.png            Brand mark used in navbar, footer, favicon
```

## Customizing

- **Colors** live in `tailwind.config.ts` under the `iris` palette — all
  pulled from the logo (deep violet → light lavender) plus `ink` (near-black)
  and `paper`/`mist` (whites).
- **Copy** is real placeholder content — replace company names, stats, and
  testimonials in each page file with your own.
- **3D cubes** in `components/CubeField.tsx` can be tuned via the `PALETTE`
  array and `buildCubes(count)` call.

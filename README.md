# Sri Vishnu Paruchuru — Portfolio

A cinematic, dark-themed developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, GSAP, Lenis and React Three Fiber.

## Stack

- **React 18 + Vite** — app shell and build tooling
- **Tailwind CSS** — styling, with custom design tokens (color/type in `tailwind.config.js`)
- **Framer Motion** — page-load sequence, scroll reveals, layout animation
- **GSAP + ScrollTrigger** — driving Lenis's raf loop
- **Lenis** — smooth, cinematic scrolling
- **React Three Fiber / Three.js** — ambient particle field in the hero (lazy-loaded, mobile particle count reduced)
- **Lucide React** — icons

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production build is written to `dist/`.

## Adding your resume

Drop your resume PDF into `public/resume.pdf`. The "Resume" button in the hero section links directly to `/resume.pdf` and will trigger a download.

## Project structure

```
src/
├── components/       # Reusable UI: Navbar, Loader, CustomCursor, ScrollProgress, ParticleField
├── sections/         # Page sections: Hero, About, Skills, Projects, Journey, Contact
├── data/             # content.js — all copy/content lives here, separate from UI
├── hooks/            # useLenis.js — smooth scroll setup
├── App.jsx
├── main.jsx
└── index.css
```

All portfolio content (name, projects, skills, education) lives in `src/data/content.js` — edit that file to update copy without touching component code.

## Deploying

This project deploys to **Vercel**. The static frontend can also run on **Netlify**, but the Python contact API in this repo requires Vercel's Python Functions runtime:

- **Vercel**: use the Vite preset, build command `npm run build`, and output directory `dist`. Vercel also deploys `api/contact.py` as the Python function at `/api/contact`.
- **Netlify**: build command `npm run build`, publish directory `dist`.

### Contact form setup on Vercel

The contact form sends submissions through the Python function using SMTP. Add these environment variables in **Vercel → Project → Settings → Environment Variables**, for Production and Preview, then redeploy:

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | Your email provider's SMTP server, such as `smtp.gmail.com` |
| `SMTP_PORT` | `587` for STARTTLS, or `465` for SSL |
| `SMTP_USERNAME` | SMTP account username |
| `SMTP_PASSWORD` | SMTP password or app password; keep it in Vercel, never in source code |
| `CONTACT_EMAIL` | Inbox that should receive portfolio messages |
| `SMTP_FROM_EMAIL` | Optional sender address; defaults to `SMTP_USERNAME` |
| `SMTP_USE_SSL` | Optional: `true` for port 465, otherwise `false` for port 587 |

For Gmail, create an App Password for the sending account and use it as `SMTP_PASSWORD` (Gmail accounts generally require 2-Step Verification to create one). The `From` address must be accepted by your SMTP provider. A missing or incorrect SMTP configuration makes the API return an error and the form tells the visitor to email directly.

### Running the Python function locally

Vite's dev server does not run Python functions. Install the Vercel CLI, add the SMTP variables to a local `.env` file (do not commit it), then run:

```bash
npm install
npx vercel dev
```

The form posts to `/api/contact`; the Python endpoint validates input, ignores bot submissions using a honeypot field, and sends the message to the configured inbox.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables Lenis smoothing, the particle field, and shortens/removes animations).
- Custom cursor and 3D particle field are disabled on touch devices automatically.
- The Three.js particle field is code-split and lazy-loaded so it doesn't block the initial page render.
- Particle count is reduced on mobile viewports for performance.

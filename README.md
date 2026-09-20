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

This project deploys cleanly to **Vercel** or **Netlify**:

- **Vercel**: import the GitHub repo, framework preset "Vite", no config needed.
- **Netlify**: build command `npm run build`, publish directory `dist`.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables Lenis smoothing, the particle field, and shortens/removes animations).
- Custom cursor and 3D particle field are disabled on touch devices automatically.
- The Three.js particle field is code-split and lazy-loaded so it doesn't block the initial page render.
- Particle count is reduced on mobile viewports for performance.

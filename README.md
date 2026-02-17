# Cinematic Portfolio — Video Editor

A high-end, dark luxury portfolio site for a professional video editor. Built with React, Vite, GSAP, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Build for production: `npm run build`

The **hero** uses an animated background (gradient orbs + cinematic lines, no video). To add your own **showreel video**, put an MP4 in `public/` and replace the placeholder in `src/components/Showreel/Showreel.jsx` with a `<video src="/your-file.mp4" controls playsInline />` inside `.showreel__aspect`.

## Customization

- **Contact:** Edit email and Instagram in `src/components/Contact/Contact.jsx` (`hello@studio.com` and `INSTAGRAM_URL`).
- **Copy:** Update headings, about text, services, and project titles in each section component.
- **Works:** Replace the placeholder project thumbnails and add real project links in `src/components/Works/Works.jsx`.
- **Colors/fonts:** Adjust `src/styles/variables.css` (e.g. `--accent`, `--bg-primary`, font families).

## Tech stack

- React 18 + Vite
- Plain CSS (no Tailwind)
- GSAP (hero intro, parallax)
- Framer Motion (scroll reveals, stagger)
- Custom cursor (disabled on touch devices)

## Structure

```
src/
  components/
    Header, Hero, Showreel, Works, About, Services, Contact, CustomCursor
  styles/
    variables.css, global.css
  App.jsx, main.jsx
```

Production build output is in `dist/`. Deploy that folder to any static host.

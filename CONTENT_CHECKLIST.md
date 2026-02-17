# Content checklist — info to get from Shreyas

Use this list when gathering real data from Shreyas to fill the portfolio. Tick off as you add each item.

---

## 1. Contact & social

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Email address** | Contact section + `Contact.jsx` | e.g. `shreyas.edit@gmail.com` |
| **Instagram URL** | Contact section + `Contact.jsx` | ✅ Set to `https://instagram.com/ft.shhrreyas` |
| **Other links (optional)** | Contact section | YouTube, Vimeo, Behance, LinkedIn, etc. |

---

## 2. Showreel

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Showreel video file** | `public/` folder | One main showreel MP4 (or link if hosted on Vimeo/YouTube) |
| **Video filename** | `Showreel.jsx` | Update `<video src="/filename.mp4">` to match |

---

## 3. Works / projects

For each project (currently 6 placeholders), get:

| Per project | Where it goes | Example / notes |
|-------------|----------------|------------------|
| **Project title** | Works grid | e.g. "Royal Enfield Campaign" |
| **Category** | Works grid | e.g. Commercial, Music Video, Documentary, Short Film |
| **Thumbnail image** | Works grid | Image URL or file in `public/` (e.g. poster frame) |
| **Project link** | Works grid | Where the card should go: Vimeo, YouTube, or case-study page |
| **Video URL (optional)** | Works grid | If you want to open the video directly |

You can have fewer or more than 6 projects; the list can be edited in `Works.jsx`.

---

## 4. About section

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Short bio (1–2 sentences)** | About — lead paragraph | Current: "I'm Shreyas — a video editor & cinematographer…" — confirm or rewrite |
| **Longer bio (2–3 sentences)** | About — body paragraph | Experience, types of work, who he works with |
| **Photo** | About section | Already using `sh1.png` — confirm or replace with another image |
| **Branding banner (optional)** | About section | Add `shreyas-banner.png` to `public/` to show the ft.shhrreyas banner below tools |

---

## 5. Services (optional to customize)

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Service titles** | Services section | Current: Editing & Post, Color Grading, Sound Design, Motion & Titles |
| **Service descriptions** | Services section | One line per service — confirm or rewrite to match what he actually offers |

---

## 6. Hero / tagline (optional)

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Hero subtext** | Hero section | Current: "Cinematic storytelling, color grading & premium post-production…" — confirm or shorten |

---

## 7. Branding (optional)

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Logo** | Header | Currently uses text "Shreyas" — add logo image if he has one |
| **Favicon** | Browser tab | Replace `public/favicon.svg` if he has a custom icon |

---

## 8. SEO & meta

| Item | Where it goes | Example / notes |
|------|----------------|------------------|
| **Page title** | `index.html` | Current: "Shreyas — Video Editor & Cinematographer" |
| **Meta description** | `index.html` | Short description for search results and social previews |
| **OG image (optional)** | `index.html` | Image for link previews (e.g. Facebook, WhatsApp) |

---

## Quick reference — files to edit

| Content type | File path |
|--------------|-----------|
| Contact email & Instagram | `src/components/Contact/Contact.jsx` |
| Showreel video | `public/` + `src/components/Showreel/Showreel.jsx` |
| Works / projects list | `src/components/Works/Works.jsx` |
| About copy | `src/components/About/About.jsx` |
| Services list | `src/components/Services/Services.jsx` |
| Hero tagline | `src/components/Hero/Hero.jsx` |
| Page title & meta | `index.html` |

---

**Minimum to launch:** Email, Instagram, showreel video, and at least 2–3 real projects with title, category, thumbnail, and link.

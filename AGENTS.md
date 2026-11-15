# AGENTS.md — Persistent AI Agent Context (Terrel Deligny Portfolio)

This document provides persistent architectural, design, and product context for all AI coding agents working in `/Users/cwilliams/Git/TDPortfolio`. Read this before modifying components, styles, or content.

For deep design history, asset checklists, and planned enhancements, see [`PROJECT_MEMORY.md`](./PROJECT_MEMORY.md).

---

## 1. Project Overview
- **Client:** Terrel Deligny — Director & Cinematographer (based between London & Tokyo)
- **Format:** Interactive, single-page cinematic portfolio & sponsorship landing website
- **Tech Stack:**
  - **Framework:** React 18 (JavaScript / JSX) + Vite 6
  - **Styling:** Tailwind CSS 3 (`tailwind.config.js`, `src/index.css`)
  - **Animation:** Framer Motion 11 (`framer-motion`)
  - **Icons:** Lucide React (`lucide-react`)
- **Commands:**
  - `npm run dev` — Start local Vite dev server
  - `npm run build` — Production build check (outputs to `dist/`)
  - `npm run preview` — Preview production bundle locally

---

## 2. Locked Design System & Color Palette
Derived from client specification (`TD Color Palette.pdf`). **Do not deviate from these core tokens:**

| Token | Hex | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Pitch Black** | `#000000` | `bg-pitch` / `text-pitch` | Primary page canvas, hero background, modal backdrop |
| **Deep Forest Green** | `#0B3D30` | `bg-forest` / `text-forest` | Section containers, philosophy cards, radial spotlights |
| **Dark Slate** | `#1A2020` | `bg-slate` / `text-slate` | Clapperboard slate, structural frames, form inputs, sticky nav & footer |
| **Gold** | `#FFD700` | `text-gold` / `border-gold` / `bg-gold` | Tile borders, glow highlights (`shadow-gold-glow`, `shadow-gold-intense`), star ratings, primary CTAs |
| **Cream / Beige** | `#F5F5DC` | `text-cream` / `bg-cream` | Off-centered hero title, subtitles, body copy |

### Typography (`index.html` & `tailwind.config.js`)
- `font-display`: **Cormorant Garamond** (with Didot/Bodoni fallbacks) — Editorial headings & director name
- `font-sans`: **Plus Jakarta Sans** — Clean UI labels, pull quotes, body copy, CTA buttons
- `font-mono`: **JetBrains Mono** — Slate metadata, camera specs, badges, navigation links

---

## 3. Core Interactive Rules & UX Invariants
1. **Clapperboard Opening Intro (`src/components/ClapperboardIntro.jsx`):**
   - Vector SVG clapperboard in Dark Slate (`#1A2020`) with Gold (`#FFD700`) stripes/accents.
   - Snaps shut and splits open horizontally within **1.5 seconds** (`1480ms`).
   - Includes a top-right **Skip Intro** button and saves state in `sessionStorage` (`td_portfolio_intro_seen_v1`) so returning visitors in the same session bypass it automatically. Can be re-triggered anytime via the **Slate Intro** button in `Navbar.jsx`.
2. **Hero Layout & Asymmetrical Floating Tile Mosaic (`src/components/HeroSection.jsx`):**
   - Left-anchored off-centered Cream (`#F5F5DC`) title (`Terrel Deligny` / `Director | Cinematographer`) over Pitch Black (`#000000`).
   - Surrounded by an organic asymmetrical mosaic of **square and rectangular** (not hexagonal) film and callout tiles, all framed in glowing Gold (`#FFD700`).
   - **Desktop Interaction:** Hovering expands a film tile via Framer Motion layout transforms and plays a muted looping `.mp4` preview; clicking opens `VideoModal`.
   - **Mobile / Touch Interaction:** First tap highlights the tile and starts the preview clip; second tap opens `VideoModal`.
3. **Full Video Modal (`src/components/VideoModal.jsx`):**
   - Displays video player, accolade banner, logline, synopsis, director's note, technical specs (`Camera`, `Lens`, `Format`, `Release`, `Location`), `Escape` key support, and Gold **Watch Full Film** CTA.
4. **Fast Cached Instagram Reviews (`src/components/ReviewsSection.jsx`):**
   - Never use slow third-party live Instagram embed scripts. Keep reviews rendered from fast local/cached structured data (`INSTAGRAM_REVIEWS` in `src/data/portfolioData.js`) with star ratings, score badges, film filter pills, and outbound post links.
5. **Sponsorship-to-Contact Flow (`SponsorshipSection.jsx` -> `ContactSection.jsx`):**
   - Clicking a sponsorship tier (`Project Backer`, `Gear Sponsor`, `Executive Producer Circle`) or **Become a Sponsor** sets `selectedSponsorTier` in `App.jsx` and scrolls smoothly to `#contact` with the selected tier highlighted inside the form.

---

## 4. File Map
- `src/App.jsx` — Root state (`showIntro`, `activeModalFilm`, `selectedSponsorTier`) and section composition
- `src/data/portfolioData.js` — Single source of truth for films, upcoming slate, philosophy pillars, reviews, sponsor tiers, and partner logos
- `src/components/ClapperboardIntro.jsx` — 1.5s SVG clapperboard intro & split shutter
- `src/components/Navbar.jsx` — Sticky header, anchor navigation, mobile drawer, intro replay button
- `src/components/HeroSection.jsx` — Off-centered title, asymmetrical Gold-framed video tile mosaic, "Explore The Work" banner, and "Upcoming Work" slate cluster
- `src/components/VideoModal.jsx` — Full-screen trailer & technical specifications modal
- `src/components/AboutSection.jsx` — Candid on-set imagery, "About Terrel Deligny" split card, and "The Vision & The Way / About The Philosophy" Deep Forest Green cards
- `src/components/ReviewsSection.jsx` — "Critical Views" filterable cached Instagram review grid
- `src/components/ContactSection.jsx` — "Connect With The Vision" Dark Slate & Gold inquiry form
- `src/components/SponsorshipSection.jsx` — Support & Sponsorship banner, 3 contribution tiers, downloadable deck trigger, and partner ecosystem strip
- `src/components/Footer.jsx` — Dark Slate footer, social links, and smooth scroll-to-top button

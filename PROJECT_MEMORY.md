# PROJECT_MEMORY.md — Design History, Implementation Record & Roadmap

**Project:** Terrel Deligny — Director & Cinematographer Portfolio  
**Workspace:** `/Users/cwilliams/Git/TDPortfolio`  
**Last Updated:** November 2026

---

## 1. Creative Vision & Aesthetic Direction
The website is designed as an **editorial nocturnal cinema experience** rather than a generic SaaS or grid template:
- **Atmosphere:** Pitch Black (`#000000`) negative space illuminated by Deep Forest Green (`#0B3D30`) radial light pools, fine diamond-lattice/film-grain textures, and crisp Gold (`#FFD700`) optical frames.
- **Editorial Voice:** Calm, deliberate, high-craft storytelling emphasizing practical lighting, celluloid/large-format cinematography, and work spanning London and Tokyo.

---

## 2. Design Concept Evolution (Mockup Artifacts in Repo)
Three static SVG/PNG concept iterations exist in the workspace root for historical reference:
1. `terrel-deligny-preview.svg` / `.png` — Initial full-page editorial concept.
2. `terrel-deligny-preview-hex.svg` / `.png` — Experimental hexagonal hero grid exploration (**superseded** — do not revert to hexagons unless explicitly requested).
3. `terrel-deligny-preview-v3.svg` / `.png` — Multi-section reference layout featuring square/rectangular glowing Gold mosaic tiles, *Upcoming Work* cluster, *About* split band, *The Vision & The Way* wide on-set frame, *Critical Views* card grid, *Connect With The Vision* form, and *Sponsor & Partner* strip. **This combined with the Lead Front-End Blueprint defines the live React implementation.**

---

## 3. Current Implementation Status (Completed)

| Section / Feature | Status | Implementation Details |
| :--- | :--- | :--- |
| **1. Intro Sequence** | Complete | Inline SVG clapperboard (`#1A2020` & `#FFD700`), spring-animated clap stick, gold flash burst, horizontal split reveal in `1.48s`, `Skip Intro` button, `sessionStorage` bypass (`td_portfolio_intro_seen_v1`), and header replay button. |
| **2. Hero & Floating Mosaic** | Complete | Left-aligned Cream (`#F5F5DC`) title on `#000000`; 14-tile desktop asymmetrical mosaic + responsive 2-column mobile mosaic; Gold borders & glow; desktop hover video loop + Framer Motion scale; mobile 1st-tap preview / 2nd-tap modal. |
| **2b. Upcoming Work** | Complete | Integrated below Hero ("Explore The Work \| Cinematic Stories Told With Precision") showcasing 3 development slate cards (`IRON RAIN`, `THE SALT ARCHIVE`, `ZERO LIGHT`). |
| **3. About & Philosophy** | Complete | Candid cinematography imagery + split bio card + wide Gold-framed night-shoot study + Deep Forest Green (`#0B3D30`) cards for **Authenticity**, **Collaboration**, and **Risk-Taking**. |
| **4. Critical Views (Reviews)** | Complete | Filterable 6-card cached Instagram review grid (`ALL`, `ECHOES OF SILENCE`, `CHASING SHADOWS`, `THE FORGOTTEN PATH`) with score badges (`4.5/5`, `9/10`, etc.), star icons, pull quotes, and Instagram links. |
| **5. Contact & Collaboration** | Complete | Gold-framed `#1A2020` inputs with `#FFD700` focus rings, project scope dropdown, tier prefill integration, and interactive confirmation state. |
| **6. Support & Sponsorship** | Complete | Framed `#1A2020` & `#0B3D30` banner with **Project Backer** (`$1.5k–$5k`), **Gear Sponsor** (`$7.5k–$20k / In-Kind`), and **Executive Producer Circle** (`$25k+`), Gold **Become a Sponsor** CTA, client-side deck download, and 8-brand cinema ecosystem strip. |
| **7. Sticky Nav & Footer** | Complete | Sticky header with smooth anchor scrolling + animated mobile hamburger drawer; `#1A2020` footer with Instagram, Vimeo, LinkedIn icons and smooth **Top** button. |

---

## 4. Technical Notes & Pitfalls Fixed
- **Above-the-fold & Full-Page Visibility:** Avoid gating tall below-the-fold containers solely behind strict `whileInView` opacity-0 triggers without fallback, as headless full-page screenshots or fast anchor jumps can catch elements mid-intersection. Elements now animate cleanly on mount/interaction while remaining immediately legible.
- **Media Performance:** Hero `<video>` elements use `muted`, `loop`, `playsInline`, and `preload="metadata"`, and only the single active/hovered tile plays at any given moment—pausing and resetting `currentTime = 0` on mouse leave or touch deactivation.

---

## 5. Planned Changes & Client Handoff Backlog
When moving from client preview to final production deployment, complete the following swaps:

1. **Real Film Media (`src/data/portfolioData.js`):**
   - Replace stock Unsplash `poster` URLs and Mixkit `previewVideo` `.mp4` URLs with Terrel Deligny's actual colour-graded stills and compressed `5–8s` `.webm`/`.mp4` loops (`< 2.5 MB` each recommended).
   - Update `fullFilmUrl` fields with real Vimeo / private screener links.
2. **Real Behind-The-Scenes Photography (`src/components/AboutSection.jsx`):**
   - Swap placeholder on-set images with high-contrast candid photos of Terrel operating his camera on set.
3. **Official Sponsorship Deck PDF & Payment Links (`src/components/SponsorshipSection.jsx`):**
   - Place the designed PDF deck inside `public/Terrel-Deligny-Sponsorship-Deck.pdf` and point the **Download Sponsorship Deck** button to that file instead of the generated `.txt` summary.
   - Optionally wire tier CTAs to Stripe Payment Links, OpenCollective, or direct executive producer scheduling links.
4. **Live Form Delivery (`src/components/ContactSection.jsx`):**
   - Connect `handleSubmit` to Formspree, Resend, EmailJS, or a serverless API route delivering to Terrel's production email (`bookings@terreldeligny.film`).
5. **Social & Instagram Permalinks (`src/data/portfolioData.js`, `Footer.jsx`, `ReviewsSection.jsx`):**
   - Populate exact `@terreldeligny` Instagram post URLs, Vimeo profile URL, and LinkedIn URL.
6. **SEO & OpenGraph Assets (`index.html`, `public/`):**
   - Add custom Gold/Dark Slate clapperboard favicon (`favicon.svg`) and `1200x630` OpenGraph social share card.

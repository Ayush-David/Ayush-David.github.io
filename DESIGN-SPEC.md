# Design Specification — Ayush R David

This document is the updated, implementation-ready design specification for the site, derived from the provided HTML theme instructions (palette, typography, components, CSS variables, and rules).

## Overview
- Purpose: Single-page research portfolio (static HTML/CSS/JS) following the Dhruv-style theme excerpt supplied.
- Target: GitHub Pages, no build step, no JS/CSS frameworks, Inter + JetBrains Mono only.

## Files to reference
- Main site: [index.html](index.html)
- Stylesheet: [css/style.css](css/style.css)
- Minimal JS: [js/main.js](js/main.js)
- Project thumbnails: [images/projects](images/projects)

## Colour palette (primary values)
- Page background: #fafafa
- Card / surface: #ffffff
- Thumbnail surface: #f3f4f6
- Border: #e5e7eb (use 0.5px everywhere)
- Text primary: #111827
- Text body: #374151
- Text muted: #6b7280
- Accent / links: #2563eb
- CTA button: #111827
- Metric badge green: #f0fdf4 / border #bbf7d0 / text #166534
- Info badge blue: #eff6ff / border #bfdbfe / text #1e40af

## Typography
- Fonts: Inter (primary) and JetBrains Mono (mono for badges/hex/stack tags).
- Weights used: 400 (body), 600 (section headings), 700 only where explicitly required for display name.
- Type scale examples (implement in CSS): hero name ~48/700 with letter-spacing -0.02em; section headings 24/600; card title 15/500; body 14/400; meta 12/400; badges 10px mono.

## Components (behavior and appearance)
- Navigation: White surface, 0.5px border, active nav indicated by 1.5px bottom border matching text color.
- Hero: White card on #fafafa background; eyebrow, hero name, role, two CTAs (primary filled, secondary outlined), small affiliation line.
- Project cards: White card, 0.5px border, border-radius ≤ 12px (prefer 12px), thumbnail area uses #f3f4f6, hover: translateY(-3px) (or -4px) + --shadow-card-hover, transition ~180ms.
- Badges: Metric badges use green pill style; hackathon/rank use blue pill; badges use mono font and capsule radius.
- Technical reports: Numbered list card style with title, meta, and link placeholder.
- Timeline: Left rule with dot markers; dot outlines use border and timeline line color.

## CSS variables (paste into :root)
--color-bg: #fafafa
--color-surface: #ffffff
--color-surface-muted: #f3f4f6
--color-border: #e5e7eb
--color-border-strong: #d1d5db
--color-text-primary: #111827
--color-text-body: #374151
--color-text-muted: #6b7280
--color-accent: #2563eb
--color-cta-bg: #111827
--color-cta-text: #ffffff
--color-badge-green-bg: #f0fdf4
--color-badge-green-border: #bbf7d0
--color-badge-green-text: #166534
--color-badge-blue-bg: #eff6ff
--color-badge-blue-border: #bfdbfe
--color-badge-blue-text: #1e40af
--color-timeline-line: #e5e7eb
--color-active-underline: #111827
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-pill: 999px
--shadow-card-hover: 0 4px 20px rgba(0,0,0,0.07)
--transition-fast: 150ms ease
--transition-card: 180ms ease
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace

## Absolute rules (DO / DO NOT)
- DO: Use white cards on #fafafa page; 0.5px borders; Inter only for main UI; metric badges green, rank badges blue; card hover translateY + shadow (180ms); active nav underline 1.5px; section headings 24px/600; hero name letter-spacing -0.02em.
- DO NOT: No dark mode; no gradients; no drop shadows on static elements (only on :hover); max 2 accent colors (blue + green); no bold body text; no border-radius > 12px on cards; no animations beyond hover transitions; use only white and #fafafa for section backgrounds.

## Google Fonts (paste into <head> as first lines)
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">

## Implementation notes
- The site already includes a matching implementation in [index.html](index.html), [css/style.css](css/style.css), and [js/main.js](js/main.js). Use those files as the canonical implementation; this spec documents the theme decisions to maintain consistency.
- When updating visuals, preserve the CSS variable names above and ensure 0.5px borders are used (subpixel borders where browser supports them).
- Keep images lazy-loaded where appropriate and prefer small inline SVG thumbnails in [images/projects](images/projects) to avoid extra network requests.

## Quick checklist for PR reviews
- [ ] Fonts limited to Inter + JetBrains Mono only
- [ ] No external animation libraries (AOS, particles, etc.)
- [ ] Exactly three selected-work project cards on the home page
- [ ] Metric badges show approved numbers and use green pill style
- [ ] Section backgrounds limited to white and #fafafa
- [ ] Card hover uses translateY + --shadow-card-hover only

---
Generated from ayush_portfolio_theme_spec.html (attachment). For edits, open DESIGN-SPEC.md in the workspace.

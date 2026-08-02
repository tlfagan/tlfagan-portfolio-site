# Portfolio site rebuild — project brief

## Context

Currently live on a purchased Framer template ("Core" by Justin Farrugia) at a temp Framer URL. The visual direction works well and should be matched closely. The problem is editing: Framer's layer/frame architecture makes ongoing content changes disproportionately hard. Rebuilding in code with Claude Code removes that friction entirely, since edits happen through plain-English instructions to Claude Code rather than a visual layer tree.

Domain `tlfagan.com` is already registered on Namecheap. Hosting target is Vercel.

**This is a full rebuild, not a redesign.** Match the existing visual language closely (see Design language section). This is not an attempt to clone the purchased Framer template's underlying code, only to reproduce the general look and feel for a personal, non-commercial site.

## Build approach

Fully static site. No backend, no serverless functions, no database. Every piece of dynamic behavior (clock, weather, nav highlighting, project expand/collapse) is client-side JS calling public APIs or manipulating local state. This was a deliberate simplification: dropping the contact form (see below) removed the only feature that would have required server-side code.

## Navigation

Left rail, sticky, text-based (not the icon dock from the Framer template). Small-caps labels matching the site's existing section-label typography (the same style already used for "WORK", "STACK", etc.). Active section indicated by a left-side tick mark and darker text color, updated via scroll-spy (`IntersectionObserver` watching each section).

Nav order and labels (final):
1. Me
2. Projects
3. Experience
4. Stack
5. Testimonials
6. Personal
7. Contact

## Section-by-section spec

### Me (intro)
- Circular photo, name "Tim Fagan", role line "Knowledge & Content Operations Leader"
- Intro paragraph (reuse existing copy verbatim):
  > Hi, I'm Tim. I've built and governed the content platforms that keep organizations from drowning in their own information: taxonomy, standards, and the workflows people actually use to get information in the hands of those who need it. Now I'm doing the same work with AI, structuring knowledge bases AI systems can trust; proving it with regression tests, failure diagnosis, and the unglamorous checking that turns a demo into something that survives contact with real users.
- Live clock (UTC or local, matching current template behavior)
- Live local weather widget: client-side fetch to Open-Meteo (same API already used in Seabright). **Bug to fix, not replicate**: the current site shows a correct Fahrenheit value with a leftover °C label. Make sure the unit label matches the actual unit being displayed.

### Projects
- Three project cards: Seabright, Job-search agent & tracker, Task consolidation tool
- Click a card → inline expand with a short summary (thumbnail + a few sentences)
- Inside the expanded view, a "Learn more" link → dedicated project detail page (`/projects/seabright`, `/projects/job-search-agent`, `/projects/task-consolidator` or similar routes)
- Detail page content (Tim's process write-up for each project) is not yet drafted — placeholder pages with headings are fine for the initial build, content to follow
- Existing assets: stack-icon SVGs already generated (see Assets section); job-search-agent mockup images already generated and in use on the current Framer site

### Experience
- Timeline format, reused verbatim from current site:
  - 2024–2026, Corporate Comms Manager, The Hershey Company
  - 2020–2023, Sr Mgr, Change & Knowledge Management, Comcast Business
  - 2018–2020, Manager, Knowledge Management, Comcast Business
- Intro line: "Throughout my career, I've been a player-coach leading end-to-end content lifecycle operations and have partnered with C-level executives on business and communications strategy."
- **New**: link to full resume (PDF). **Open question**: is there a current resume PDF ready to link, or does it need finishing first? (Note: a resume update adding an "AI & Automation Projects" section was previously flagged as pending — worth confirming this is finished before linking it here.)

### Stack
- Icon row using the Simple Icons SVGs already generated for this project (Python, GitHub, GitHub Actions, Anthropic, Google Sheets, Gmail, Airtable, Vercel, Node.js, JavaScript — plus whichever subset from the current site's row (Airtable, Anthropic, GitHub, JavaScript, Python, Vercel, Slack, Jira, Asana) actually reflects real hands-on use)
- Note: current Framer site uses a generic black-circle "AI" placeholder for Anthropic. The rebuild should use the real Anthropic mark, which is a straightforward accuracy improvement.

### Testimonials
- Three testimonials, reused verbatim:
  - Jessica Walter, Senior Director Analyst, Gartner
  - Ashleigh Pollart, Manager, Corporate Communications, The Hershey Company
  - Andi Odjemski, Digital Marketing Professional, Comcast Business
- Carousel/row treatment with the non-active cards faded, matching current site behavior

### Personal
- **Open question, not yet decided**: current template has a "I make music" block with a Spotify embed and stock lifestyle photos, both being dropped since the music isn't on Spotify/shareable and the photos aren't Tim's own. Replacement idea floated: a callout linking to an old personal blog, as a lighter aside. Treat as a placeholder section until this is finalized. Do not block the rest of the build on this decision.

### Contact
- No contact form (removed to keep the site fully static)
- Direct links only: email (`tim@tlfagan.com`) and LinkedIn (`/in/timfagan`)

## Design language (match existing site closely)

- Light background, near-white surfaces
- Primary text near-black; secondary/supporting text muted slate-blue-gray
- Section labels in small-caps, letter-spaced, muted gray
- Thin (0.5–1px) borders, generous rounded corners on cards
- Tilted, overlapping "floating screenshot" cards over a repeating dotted-grid background — used in the intro/work transition area
- Minimal, restrained motion: hover lifts, fade transitions, scroll-triggered reveals — no heavy animation

## Hosting and domain

- Deploy to Vercel (via CLI or GitHub import, whichever fits the repo setup)
- Point existing `tlfagan.com` domain (Namecheap) at the new Vercel deployment once live — reuse the standard Vercel DNS record pattern (A record `@`, CNAME `www`), removing any leftover Framer-era DNS records first
- Since the site is fully static, no environment variables or server config needed beyond the weather API call (public, no key required for Open-Meteo)

## Assets already prepared
- Stack icon SVGs (brand-colored and black-outline versions)
- Portfolio project illustration/mockup graphics (abstract version and realistic UI-mockup version)

## Still open before or during build
1. Resume PDF — confirm final version exists and get the file
2. Personal section replacement content — confirm blog callout copy/link, or leave placeholder
3. Project detail page write-ups (process narratives for each of the three projects) — can follow after initial structure is live

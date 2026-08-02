# Portfolio site — starter scaffold

This is a first-pass scaffold, not a finished site. Full context and design spec is in `portfolio-site-project-brief.md` (in this same folder) — read that first if you're a Claude Code session picking this up.

## What's built and working
- Full section structure: Me, Projects, Experience, Stack, Testimonials, Personal, Contact
- Left rail nav with scroll-spy (updates active section as you scroll)
- Live clock and live weather (Open-Meteo, hardcoded to Erdenheim, PA coordinates — update `LAT`/`LON` in `script.js` if that changes)
- Project cards expand on click to show a summary + "Learn more" link
- Real content reused verbatim where it existed already: bio, experience history, testimonials
- Stack icons wired up from `assets/icons/` (already brand-accurate, including the real Anthropic mark the old Framer site was faking with a placeholder)

## What's explicitly placeholder — do not treat as final
1. **`assets/resume.pdf`** — does not exist yet. The link in the Experience section points to it but the file needs to be added once the resume is finalized.
2. **Personal section** — just a dashed placeholder box right now. Floated idea: a callout linking an old personal blog. Not decided.
3. **Project card copy** — the three project summaries are reasonable but not final marketing copy, refine as needed.
4. **`/projects/*.html`** — all three are stub pages with a "not yet drafted" placeholder. These need the actual process write-ups Tim wants to include per project.
5. **Testimonial row** — currently a plain horizontal scroll, not the fade-on-inactive-card treatment from the original Framer site. Functional, not final polish.
6. **Photo** — `#photo` is an empty circle placeholder, real headshot not wired in yet.
7. **Font stack** — using system fonts for now. Original template's actual typeface hasn't been matched.

## Not included at all
- No contact form, by design (see brief — dropped to keep the site fully static, direct email/LinkedIn links instead)
- No backend, no environment variables, no serverless functions needed anywhere in this build

## Next steps
Pick up any of the placeholder items above, or refine visual details (spacing, type, the dotted-grid/floating-card transition strip) against the original Framer screenshots referenced in the brief.

# Tim Fagan Portfolio Site — App Overview

A personal portfolio/résumé site, live at tlfagan.com. Single-page homepage plus a handful of standalone project detail pages.

## Architecture

- **Stack:** plain static HTML/CSS/JavaScript — no framework, no build step, no npm dependencies. Three top-level files (`index.html`, `styles.css`, `script.js`) plus four standalone project detail pages under `/projects/`.
- **Hosting:** deploys automatically from a private GitHub repo to the live custom domain (tlfagan.com); no server-side code or API routes — everything runs client-side in the browser.
- **External calls:** one — a client-side fetch to the free Open-Meteo API for the live weather readout in the header.

## Page Structure

**Homepage (`index.html`)** — a single scrolling page with a left-side scroll-spy nav rail, sections: Me, Projects, Experience, Stack, Testimonials, Personal, Contact.

**Project detail pages (`/projects/*.html`)** — one static page per project (`seabright.html`, `recipe-box.html`, `job-search-agent.html`, `task-consolidator.html`), reached via "Learn more" from a project's lightbox. Each follows the same template: title, optional looping demo video, a row of tech-stack icons specific to that project, and prose write-up (Overview / Features / Architecture / Up next style sections).

## Key Functionality

- **Scroll-spy nav** — an `IntersectionObserver` highlights the current section's nav link as you scroll.
- **Live clock + weather** — updates every second client-side; weather comes from Open-Meteo, hardcoded to one location (Erdenheim, PA).
- **Project lightbox** — clicking a project thumbnail on the homepage opens a modal with that project's title, description, and a "Learn more" link to its detail page. All lightbox content comes from a single `PROJECTS` object in `script.js`, keyed by each thumbnail's `data-slug` attribute — the slug in `index.html` and the object key in `script.js` must match exactly, or that project's lightbox silently fails to open.
- **Generic text lightbox** — a second, simpler modal (same visual pattern) is reused for the "Rocket Horse & Hell Creek" band details, independent of the `PROJECTS` system.
- **Testimonial carousel** — a horizontally-scrolling row of quote cards with prev/next arrow buttons.
- **Collapsible work history** — nested `<details>` elements progressively reveal older roles ("See full work history" → "Go way back").

## Notable Gotchas

- **The `PROJECTS.desc` strings in `script.js` must stay valid single-line JS string literals.** They're rendered via `innerHTML` (so basic tags like `<br>` work for paragraph breaks), but a literal line break typed directly into one of these strings is a syntax error that breaks the *entire* script file — which silently kills every lightbox on the page, not just the edited one. This has actually happened once already. Prefer `<br><br>` for breaks, not real newlines, when editing this file directly.
- **Content is sometimes edited directly on GitHub's web UI** rather than locally, which occasionally introduces exactly this kind of syntax issue since GitHub's editor does no JS validation before commit. Pull before diagnosing anything that "suddenly stopped working" — the live bug may be in a commit not yet fetched locally.

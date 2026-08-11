// ---------- clock ----------
function updateClock() {
  const el = document.getElementById('clock');
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour12: true });
}
updateClock();
setInterval(updateClock, 1000);

// ---------- weather ----------
// Coordinates are for Erdenheim, PA. Update if location changes.
const LAT = 40.10;
const LON = -75.19;
const LOCATION_LABEL = 'Erdenheim, PA';

async function loadWeather() {
  const el = document.getElementById('weather');
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&temperature_unit=fahrenheit`;
    const res = await fetch(url);
    const data = await res.json();
    const temp = Math.round(data.current_weather.temperature);
    // Unit is Fahrenheit — label must match the actual unit requested above.
    el.textContent = `${LOCATION_LABEL} · ${temp}°F`;
  } catch (err) {
    el.textContent = LOCATION_LABEL;
  }
}
loadWeather();

// ---------- scroll-spy nav ----------
const navItems = document.querySelectorAll('#rail .navitem');
const sections = document.querySelectorAll('main section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => observer.observe(section));

// ---------- lightbox ----------
const PROJECTS = {
  'Home Assistant': {
    title: 'Home Assistant',
    desc: 'A conversational AI assistant for a family vacation property — guests ask questions and get answers from "Seabright" (the house nickname), reducing texts, calls, and yells across the house. <br><br>Vibe-coded, built on Next.js, Vercel, and the Claude API, with a structured Airtable knowledge base for convenient updates. <br><br>Features in production include a live conditions panel (weather, UV, tides via Open-Meteo and NOAA), a shared shopping list, reference photos surfaced contextually on answers, and QR code deep-links to pre-filled questions. A 35-case regression suite runs against the live API to catch hallucination and context bleed before guests see it. <br><br>Currently exploring adaptation for other households as a lightweight template.',
    href: 'projects/seabright.html'
  },
  'job-search-agent': {
    title: 'Job search agent & tracker',
    desc: 'Automated pipeline that scrapes job postings across sources, scores them for fit and personal preferences, and syncs the strongest matches into a live Google Sheets tracker. <br><br>Built on Python and GitHub Actions, with a Claude-powered scoring step.',
    href: 'projects/job-search-agent.html'
  },
  'recipe-box': {
    title: 'Family Recipe Box',
    desc: 'Full-stack family recipe manager that turns a pasted URL, photo, or PDF into a structured recipe via Claude — ingredients, instructions, and nutrition parsed straight into Airtable. <br><br>Also tracks pantry and freezer inventory by quantity and unit, with photo-based bulk entry and a "what can I make" matcher against what\'s actually in stock.<br><br>Most recently added a feature that combines recipes and generates an editable shopping list I can send directly to Google Tasks.',
    href: 'projects/recipe-box.html'
  },
  'task-consolidator': {
    title: 'Task consolidation tool',
    desc: 'A Claude Code project using Google Sheets as a single source of truth to pull scattered tasks into one place, built as both a real workflow tool and a LinkedIn Learning course project.',
    href: 'projects/task-consolidator.html'
  }
};

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-image');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const lightboxDesc = lightbox.querySelector('.lightbox-desc');
const lightboxLink = lightbox.querySelector('.lightbox-link');
let lightboxTrigger = null;

function openLightbox(slug, imgSrc, triggerEl) {
  const project = PROJECTS[slug];
  if (!project) return;
  lightboxTrigger = triggerEl;
  lightboxImg.src = imgSrc;
  lightboxImg.alt = project.title;
  lightboxTitle.textContent = project.title;
  lightboxDesc.innerHTML = project.desc;
  lightboxLink.setAttribute('href', project.href);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lightboxTrigger) lightboxTrigger.focus();
}

lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

document.querySelectorAll('.floating-card[data-slug]').forEach((card) => {
  card.addEventListener('click', () => openLightbox(card.dataset.slug, card.querySelector('img').src, card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(card.dataset.slug, card.querySelector('img').src, card);
    }
  });
});

// ---------- testimonial carousel ----------
const testimonialRow = document.getElementById('testimonial-row');
const testimonialStep = () => testimonialRow.querySelector('.testimonial-card').offsetWidth + 16;

document.getElementById('testimonial-prev').addEventListener('click', () => {
  testimonialRow.scrollBy({ left: -testimonialStep(), behavior: 'smooth' });
});
document.getElementById('testimonial-next').addEventListener('click', () => {
  testimonialRow.scrollBy({ left: testimonialStep(), behavior: 'smooth' });
});

// ---------- generic text lightbox (bands) ----------
function setupSimpleLightbox(lightboxEl) {
  const closeBtn = lightboxEl.querySelector('.lightbox-close');
  const backdrop = lightboxEl.querySelector('.lightbox-backdrop');
  let trigger = null;

  function open(triggerEl) {
    trigger = triggerEl;
    lightboxEl.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightboxEl.hidden = true;
    document.body.style.overflow = '';
    if (trigger) trigger.focus();
  }

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxEl.hidden) close();
  });

  return { open, close };
}

const bandsLightbox = setupSimpleLightbox(document.getElementById('bands-lightbox'));
const bandsTrigger = document.getElementById('bands-trigger');
bandsTrigger.addEventListener('click', () => bandsLightbox.open(bandsTrigger));
bandsTrigger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    bandsLightbox.open(bandsTrigger);
  }
});

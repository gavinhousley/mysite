# gavinhousley.com

Static HTML/CSS/JS personal site (no build step, no framework). Hosted on **Vercel**
(`server: Vercel` / `x-vercel-id` headers confirm this — it is not GitHub Pages, despite the
repo living on GitHub at `gavinhousley/mysite`). Deploys automatically off pushes to `main`;
the apex domain redirects to `https://www.gavinhousley.com`. Deploys are typically live within
a few minutes — a brand-new file path 404ing right after a push is normal propagation lag, not
a bug, unless it's still 404ing several minutes later.

## Current state: the single-page redesign is live

The site was redesigned from a multipage layout to one long scrolling page and is now in
production. Design spec and rationale live in `README.md` (handoff doc) and `design.html`
(the original static HTML/CSS prototype with inline styles — a reference for look/copy, not
code that's actually reused).

### Live production files

- `index.html` — the single-scroll homepage: sticky nav, hero, About, Code, Art, Music
  (condensed), Clothing, Links/footer.
- `music.html` — full Music page (release write-ups, audio player + visualizer, sample-track
  playback, Buttondown newsletter signup). Linked from `index.html`'s Music section via a
  "More Music →" button.
- `love-hate.html` — hosts the Love & Hate canvas game (`love-hate.js`). **No longer linked
  from anywhere on the site** (the Code grid card was removed) — it still works if visited
  directly, it's just orphaned/undiscoverable now.
- `blog.html` — redesigned blog, reuses `blog.js` / `blog/manifest.json` / the markdown posts
  unchanged.
- `links.html` — a standalone **linktree-style bio page**, separate from `index.html`'s own
  `#links` footer section. This exists because the user's Instagram/TikTok bios link directly
  to `gavinhousley.com/links.html` — that URL must keep resolving. Red→blue pill buttons
  (`.btn-cta`/`.btn-block`) for TikTok/Instagram/Bandcamp/Spotify/iTunes/T-shirts, plus a small
  contact row and a link back to the main site.
- `redesign.css` — the one shared stylesheet for all of the above (tokens, nav, hero, cards,
  sections, dark footer, subpage/player/linktree components).
- `nav.js` — mobile burger-menu toggle (open/close, closes on link click). Only `index.html`
  uses it; subpages have a simpler logo+back-link header with no burger.
- `visualiser.js`, `player.js`, `audio.js` — music player behavior for `music.html` (see Music
  section below).

### Archived (not deleted) old-site files

`old-site/` holds everything the redesign superseded: `home.html`, `about.html`, `art.html`,
`clothing.html`, `code.html`, `landing.css`, and the pre-redesign `music.html`, `blog.html`,
`visualiser.js`, `player.js`. Nothing was deleted outright — if any of this is ever needed
again it's sitting right there, fully intact.

`main.css`, `main.js`, and `dark-page.css` are still at the repo root but are now **unused** by
any live page (the pages that used to reference them, e.g. the old `blog.html`, have been
redesigned onto `redesign.css`). Left in place untouched rather than deleted — that was an
explicit instruction, not an oversight. `iching/` is a separate mini-app, untouched and still
linked from the Code section.

### Design system notes

- **Headings** (logo, nav links, section titles like "About"/"Code"/etc., the dark Links
  footer's "Let's talk", and subpage `<h1>`s) use `--font-heading: Futura, "Jost", sans-serif`
  — Futura where the visitor's OS has it (macOS ships it), Jost as the web-font fallback
  everywhere else. Everything else (buttons, tags, card titles, hero tagline) uses
  `--font-display: "Jost", sans-serif` only. Don't conflate the two variables.
- Section title font-size was deliberately reduced ~20% from the original design spec:
  `clamp(1.44rem, 2.4vw, 2.08rem)`, not the larger size `design.html`/`README.md` show.
- `[hidden] { display: none !important; }` is a deliberate global rule — without it, elements
  like `.video-slot` (which sets its own `display: flex`) silently ignore the `hidden`
  attribute because of author-vs-UA-stylesheet specificity rules. Don't remove this rule when
  hiding things with `hidden` in future.
- `.art-image` and `.clothing-grid img` carry an explicit `background: var(--card-bg)` — most
  of the Art/Clothing photos are transparent PNG cutouts, and this guards against a dark halo
  if a visitor's browser force-dark-mode overrides page backgrounds (the site itself has no
  dark mode; this is purely a defensive fallback).
- Mobile-only behavior (all inside the existing `@media (max-width: 768px)` block in
  `redesign.css`) includes: burger nav (nav hidden inline, becomes a fixed dropdown panel via
  `.site-nav.open`), hero media (image + offset color blocks) scaled to `width: 85%`, hero `h1`
  forced onto one line (`.hero-break` `<br>` hidden, `white-space: nowrap`, fluid
  `clamp(1.9rem, 8.5vw, 2.34rem)` font-size so it never overflows down to a 320px viewport),
  and the whole `.hero-text` block (heading/tagline/intro) center-aligned. None of this affects
  desktop.
- `.bordered-image` (6px black border + matching radius) and `.shrink-image` (82% width,
  centered) are one-off utility classes currently applied only to the I Ching and Borough Books
  Code-section screenshots respectively — not general-purpose card treatments.
- `#art .media-caption` is center-aligned; the base `.media-caption` class (also used for the
  Music section's video caption) is left-aligned by default. Don't accidentally make that
  global.

### Content specifics worth knowing

- **Code section** (5 cards, in order): I Ching, One Hundred Books, Borough Books, NC News,
  alinameyer.com (links out to `https://alinameyer.com`). The "A Game of Love and Hate" 6th
  card has been removed from this grid — see `love-hate.html` note above.
- **Art section** print order: Les Onglous, Shadows, The Chosen One, Land of Dreams, The
  Chapel, The Sage, then a process video (`video/lino-process.mp4`, converted from a
  HEVC-encoded `.mov` via `ffmpeg` — installed via Homebrew this session and now available on
  this machine — with poster `images/lino-process-poster.jpg`). An Etsy link
  (`https://gavinhousleyprints.etsy.com`) sits under the intro paragraph. `images/horses.png`
  was used briefly and later swapped out; the file is still in `images/` but unused.
- **Music section** (condensed, on `index.html`): uses candid/live photos, not album covers —
  `sicamore.png`, `william.png`, `naciente.png`. This is intentionally different from the full
  `music.html` page, which still shows the actual per-release album artwork
  (`Sicamore_EP_Halfway_There_Art.png`, `william-slightly-delighted-album.png`, etc.) — don't
  "fix" this inconsistency without asking, it was a deliberate choice. William's card links to
  an artist-level Spotify/iTunes page (not the old album-specific links). A live-performance
  video (`video/blackpeaches-glastonbury.mp4`, poster
  `images/blackpeaches-glastonbury-poster.jpg`, captioned "Playing bass with Black Peaches,
  Park Stage, Glastonbury 2018") sits below the release grid.
- **Clothing section**: currently shows three knitted cardigan photos —  `lighthouse.png`,
  `goat.png`, `shark.png` — replacing the earlier coat/embroidered-shirt/kimono/mexican-shirt
  set. Those four old files are still in `images/` and may be brought back later (the user
  said so explicitly) — don't delete them. A Teemill link
  (`https://gavin-housley.teemill.com`) sits under the intro paragraph. The making-process
  video slot is present but `hidden` (no video yet) — remove the `hidden` attribute once one's
  supplied.

### Verifying changes

This session set up headless-Chromium screenshot verification via Playwright (installed to the
session's scratchpad directory via `npm install playwright`, not part of this repo) since no
project-specific run skill exists yet. Useful for catching layout/console-error regressions
before reporting work done — worth re-establishing the same way in future sessions rather than
assuming it's still installed.

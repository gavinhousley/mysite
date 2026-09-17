# gavinhousley.com

Static HTML/CSS/JS personal site (no build step, no framework). Deployed as plain files.

## Current state: redesign in progress, built as adjunct files

A full redesign (single scrolling page, replacing the old multipage site) is underway. It is
being built **alongside** the live site as `-new` files, so nothing currently live has been
touched or is at risk. The live site's own files (`home.html`, `about.html`, `code.html`,
`art.html`, `clothing.html`, `links.html`, `music.html`, `main.css`, `main.js`, `landing.css`,
`dark-page.css`, `audio.js`, `player.js`, `visualiser.js`, `love-hate.js`) are all unmodified.

Design spec and rationale live in `README.md` (handoff doc) and `design.html` (static HTML/CSS
prototype with inline styles — a reference for look/copy, not code to reuse directly).

### New files (the redesign, not yet live)

- `redesign.css` — the new design system (tokens, nav, hero, cards, sections, dark footer,
  subpage/player components). Self-contained; not shared with any old page.
- `index-new.html` — the new single-scroll homepage: sticky nav, hero, About, Code, Art, Music
  (condensed), Clothing, Links/footer. All content sourced from `design.html` + `README.md`.
- `music-new.html` — full Music page (release write-ups, audio player, **visualizer canvas
  restored** with the new blue/red/cream palette instead of the old grey, sample-track
  playback, Buttondown newsletter signup). Linked from `index-new.html`'s Music section via a
  "More Music →" button.
- `love-hate-new.html` — new page hosting the existing Love & Hate canvas game (unchanged
  `love-hate.js`), linked from `index-new.html`'s Code grid as its 6th project card.
- `visualiser-new.js`, `player-new.js` — copies of the old `visualiser.js`/`player.js` with
  selectors/colors updated for the new markup and palette. The old versions are untouched.

### Key decisions made during this redesign (don't re-litigate without asking)

- **Hero**: split layout (headline/tagline/intro left, portrait + offset blue/red blocks
  right) — not the photo-bg alternative that was also in `design.html`.
- **Code section**: grid layout (not the alternating stacked-rows alternative).
- **Code section has a 6th card** beyond `design.html`'s 5: "A Game of Love and Hate" (the
  existing canvas game from the old `code.html`), placeholder tile linking to
  `love-hate-new.html`.
- **Music**: the single-page section stays condensed (matches `design.html` exactly — cards +
  streaming links, no player), plus a "More Music →" button to `music-new.html`. The fuller
  experience — audio player, **visualizer** (kept, recolored), sample-track buttons, newsletter
  form — lives only on `music-new.html`, not duplicated on the homepage.
- **Video placeholders** (Art process video, Music live-performance video, Clothing
  making-process video): intentionally left as placeholder boxes for now — no video files or
  links provided yet.

### Open placeholder slots (no asset yet, ask the user before filling)

- About section portrait photo
- alinameyer.com project screenshot (Code section)
- One additional Art print
- All three video slots above

### When ready to go live

The old files listed above are still what's actually served. Promoting the redesign means (in
whichever order makes sense once approved): renaming/moving the `-new` files over the old
entry points, deleting the now-superseded old pages
(`home.html`/`about.html`/`art.html`/`clothing.html`/`code.html`), and updating `blog.html`'s
nav links (currently point to the old multipage structure) to point at the new page anchors.
`blog.html` itself, `iching/`, and `dark-page.css` are out of scope for this redesign and
should be left alone.

**`links.html` has already been rebuilt, not deleted.** The user's Instagram and TikTok bios
link out to `gavinhousley.com/links.html` directly. It's now a standalone "linktree-style" bio
page in the new design system (`redesign.css`, red→blue `.btn-cta`/`.btn-block` pill buttons,
`.linktree-*` classes) — same TikTok/Instagram/Bandcamp/Spotify/iTunes/T-shirts/contact links
as the old page, just restyled. It is intentionally separate from `index-new.html`'s own
`#links` footer section, which the on-site nav still scrolls to. Do not delete or fold this
file into the single-page site at launch — it needs to keep existing at exactly this path.

### Other adjunct files not yet linked into any migration decision

- `blog-new.html` — new-design version of the blog, reuses `blog.js`/`blog/manifest.json`/
  markdown posts unchanged, linked from `index-new.html`'s nav. `blog.html` (old) still exists
  and is unmodified/unlinked-from-new-nav.
- Clothing section's making-process video slot is currently `hidden` in `index-new.html` (no
  video ready yet) — remove the `hidden` attribute once a video is added.

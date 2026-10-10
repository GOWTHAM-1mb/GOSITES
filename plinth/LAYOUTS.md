# Plinth 1.0 — Layouts

These are page templates built from components. Section order is a recommendation; Codex may reorder sections to suit the studio's content (see AGENTS.md §4). Two working examples are in `reference/ira-menon/` and `reference/studio-kiln/`.

## Page shell

```html
<!doctype html>
<html lang="en-IN" class="no-js" data-display="…" data-accent="…" data-temperature="…" data-contrast="…" data-density="…" data-ground="…" data-header="…" data-hero="…" data-index="…">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page — Studio name</title><meta name="description" content="…">
  <link rel="preload" as="font" type="font/woff2" href="/fonts/display-300.woff2" crossorigin>
  <link rel="stylesheet" href="/css/tokens.css"><link rel="stylesheet" href="/css/components.css"><link rel="stylesheet" href="/css/brand.css">
  <script src="/js/plinth.js" defer></script>
</head>
<body>
  <a class="p-skip" href="#main">Skip to content</a>
  <header class="p-header p-header--{data-header}">…</header>
  <!-- rail only: <div class="p-has-rail"> -->
  <main id="main">…</main>
  <footer class="p-footer" data-theme="ink">…</footer>
  <!-- rail only: </div> -->
  <dialog class="p-viewer">…</dialog>   <!-- only on pages with galleries -->
</body></html>
```

The reference pages load Google Fonts for convenience. Production sites should self-host WOFF2 subsets (Latin, Latin Extended, ₹) and preload only the display face at 300 and the text face at 400.

## Pacing rules

- Alternate section sizes: never more than two of the same `--section-*` in a row.
- No section pattern repeats back to back, and no gallery variant either.
- At most one `.p-section--raised` or `data-theme="ink"` band in any run of three sections.
- Leave at least `--section-m` above full-bleed imagery, and `--space-3` from an image to its caption.
- One display-xl per page, at most. One primary button per viewport.

## Templates

### Home
1. Hero, using the `data-hero` variant.
2. Studio introduction: `.p-profile`, section m.
3. Selected work: section head plus the `data-index` variant, 4–6 projects, section m.
4. One of these: quote · services (≤ 3) · process · material sequence, section s or m.
5. Footer, full.

Hero by dial:
- **plate:** the photograph leads and the title sits below it.
- **statement:** the sentence leads, then step 3 comes before step 2.
- **index:** the ledger is the hero, so step 3 becomes a sheet or a gallery instead of another ledger (R9).

### Work (portfolio index)
1. Page title: display-l (display-xl with monumental contrast), plus a lede or meta line. Section s.
2. `.p-filter` (2–6 categories), then the full `data-index` variant.
3. Footer, full.

On mobile the filter scrolls sideways. Keep the number of items the same at every size; never hide projects on mobile.

### Project
1. `.p-opening` (or the plate hero for flagship projects).
2. Essay: `.p-body` with 3–6 paragraphs, in columns 3–9 on desktop.
3. Galleries: alternate A, B and C, with drawings between photograph groups.
4. `.p-credits`.
5. `.p-next`, then the minimal footer.

### Studio
1. Page title and lede.
2. `.p-profile`.
3. `.p-people`.
4. `.p-process` or `.p-services`.
5. `.p-recognition`.
6. Quote.
7. Footer, full.

### Services
1. Page title.
2. `.p-services`, all collapsed except the first.
3. `.p-process`.
4. A call to action: a section head plus `.p-cta` to Contact.

### Contact / consultation
1. Page title and lede (section s). Kiln-style pages may set a short display-xl here.
2. Grid:
   - **Desktop:** `.p-contact` in columns 1–4, the form in columns 6–12.
   - **Tablet:** contact above, form below, both 8 columns.
   - **Mobile:** stacked; buttons go full width (`--block`) below 768px.
3. Footer: full, or minimal if the contact details are already above.

## Responsive matrix

| Element | 375 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Columns | 4 | 8 | 8 | 12 |
| Header | top bar + Menu | top bar + Menu | masthead/axial inline, rail = top bar | all inline; rail fixed |
| Plate hero | 3:2 | 21:9 | 21:9 | 21:9 |
| Staggered | stacked, indented | 5 + 4 | 5 + 4 | 7 + 4 |
| Sheet | 3 cols | 4 | 4 | 6 |
| Ledger | 2-line rows | 2-line rows | 5 columns + hover image | same |
| Form | 1 col | 2 cols | 2 cols | 2 cols |
| Footer columns | 1 | 2 | 3–4 | 4 |

Test at 375, 768, 1024, 1280 and 1440, plus 320 and 1920 for overflow.

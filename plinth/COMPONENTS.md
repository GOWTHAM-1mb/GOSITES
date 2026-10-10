# Plinth 1.0 — Components

Every component lives in `css/components.css` under the `p-` prefix, and every component reads semantic tokens only. You can see them live in `reference/components.html?profile=<id>`.

**States used everywhere**
- **Hover:** colour change in 120ms. Hover never moves the layout.
- **Focus:** `:focus-visible` draws a 2px `--focus-ring` outline, offset 3px. Never remove it.
- **Active:** the pressed colour step.
- **Disabled:** `disabled`, or `aria-disabled="true"` when the element must stay focusable. Uses the surface-disabled and text-disabled tokens.
- **Busy:** `aria-busy="true"`.
- **Error:** `aria-invalid="true"` on the control, plus `data-invalid` on the field wrapper.
- **Current:** `aria-current="page"`.
- **Selected or pressed:** `aria-pressed="true"`.

**Minimum target size:** 44 × 44px for anything clickable. Buttons and fields are 48px tall.

---

## Layout primitives

| Class | Use |
|---|---|
| `.p-container` | Centred, max 1680px, side padding `--margin`. |
| `.p-grid` | 4 / 8 / 12 columns. Each child sets `--s` (columns on mobile, ≤4), `--m` (tablet, ≤8) and `--l` (desktop, ≤12); start columns with `--ms` / `--ls`. Example: `<div style="--l:7;--ls:1;--m:5">`. |
| `.p-section` + `--s` / `--l` / `--flush-top` / `--flush-bottom` / `--raised` | Vertical rhythm. Alternate at least two sizes per page. |
| `[data-theme="ink"]` | Inverts one section. Never more than one ink section in a row. |
| `.p-stack` | Vertical gap between children (`--stack`, default `--space-5`). |
| `.p-rule` / `.p-hair` | Ink rule or hairline divider. |
| `.p-has-rail` | Wraps `main` and the footer when the rail header is used. |

## Type classes

`.p-display-xl` `.p-display-l` `.p-h1` `.p-h2` `.p-h3` `.p-lede` `.p-body` `.p-small` `.p-label` `.p-meta` `.p-muted` `.p-accent`

Choose the heading level for document structure and the class for appearance; they're independent. There's exactly one `<h1>` per page. Write emphasis in display type as `<em>`.

---

## Actions

### Button `.p-btn`

```html
<button class="p-btn">Send enquiry</button>
<a class="p-btn p-btn--secondary" href="brochure.pdf">Download brochure (PDF, 2 MB)</a>
```

- **Variants:**
  - primary (ink fill, the default)
  - `--secondary`: 1px rule outline
  - `--large`: 56px tall
  - `--block`: full width, for mobile forms
  - There is no accent-filled button and no icon-only button. Close, Menu, Previous and Next use text labels.
- **States:** hover and active step through `--action-primary-hover` and `--action-primary-active`. Focus is the ring. Disabled uses the disabled surface. Busy shows a pulsing rule and sets `aria-busy`; keep the label and announce the result through the form status region.
- **Responsive:** the same at every size. Use `--block` inside forms below 768px.
- **Accessibility:** use `<button>` for actions and `<a>` for navigation. A label must say what happens ("Send enquiry", not "Submit").
- **Limits:** at most one primary button per viewport.

### Links

- **`.p-link`:** inline link with a 1px underline; it turns accent on hover. Text inside `.p-body` and `.p-small` gets this style automatically.
- **`.p-cta`:** standalone link with "→", which moves 4px on hover. **`.p-cta--back`** uses "←".
- **Accessibility:** link text must make sense on its own ("View project", "All work"). Mark external links in the text, for example "(Instagram)".

---

## Header `.p-header`

Use the variant that matches `data-header`. Each one includes `.p-skip` (skip link), `.p-logo`, the nav, `.p-menu-btn` and `.p-menu`.

```html
<a class="p-skip" href="#main">Skip to content</a>
<header class="p-header p-header--masthead">
  <div class="p-header__bar p-container">
    <a class="p-logo" href="/" aria-label="Ambar Rao Architects, home"><img src="logo.svg" alt="" width="180" height="26"></a>
    <nav class="p-nav" aria-label="Primary"><ul><li><a href="/work" aria-current="page">Work</a></li>…</ul></nav>
    <button class="p-menu-btn" aria-controls="menu" aria-expanded="false">Menu</button>
  </div>
  <div class="p-menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" data-state="closed">…</div>
</header>
```

**Masthead:** logo left, nav right.

| | Mobile < 768 | Tablet 768–1023 | Desktop ≥ 1024 |
|---|---|---|---|
| Layout | Logo + Menu, 64px, hairline below | Same | Logo left, nav right, 80px |
| Items | Menu overlay | Menu overlay | 3–6 inline |

**Axial:** split nav with the logo centred. Uses two navs (`.p-nav--start`, `.p-nav--end`); the second is labelled "Secondary".

| | Mobile | Tablet | Desktop ≥ 1024 |
|---|---|---|---|
| Layout | Logo left + Menu | Same | 3-column grid: nav · logo · nav |
| Items | Menu | Menu | 2 + 2 recommended (R12) |

**Rail:** a vertical side index. Add `.p-has-rail` around `main` and the footer. `.p-header__foot` holds the coordinates or city line.

| | Mobile | Tablet and laptop < 1280 | Desktop ≥ 1280 |
|---|---|---|---|
| Layout | Logo + Menu | Logo + Menu | Fixed 240px column, hairline right |
| Items | Menu | Menu | ≤ 6, stacked; a 6px accent square marks the current page (R3) |

**Logo rules**
- Supply the logo as an SVG in a single colour (ink, or lime-50 on ink). It is 20px tall on mobile and 26px on desktop, with a maximum width of 200px.
- Fallbacks if the studio has no usable logo:
  - `.p-logo__text`: text face, 600 weight, 13px, uppercase
  - display italic at 22px, with `.p-logo__sub` in mono
- Never recolour a logo to the accent unless a `logoColor` exception says so.

**Menu `.p-menu`**
- A full-screen overlay on surface-page, with links in display h1 size.
- **Behaviour:** fades in over 240ms. Focus moves to the Close button and is trapped inside the menu. Esc closes it and returns focus to the Menu button. The page behind can't scroll. It closes on its own if the window grows past 1024px.
- `plinth.js` handles all of this. Without JS the menu stays hidden, so also link the nav from the footer.

---

## Footer `.p-footer`

- **Full:** use `data-theme="ink"`. It has:
  - `.p-footer__lead`: a display-l link to the contact page
  - `.p-footer__cols`: Studio address · Contact (tel, mailto, WhatsApp) · Pages · Elsewhere
  - `.p-footer__legal`
- **`--minimal`:** the legal row only. Use it on project pages that end with a next-project link.
- **Responsive:** columns use auto-fit at a 200px minimum, so they run 1 column on mobile, 2 on tablet and 4 on desktop.
- **Accessibility:** use `<address>` for the studio address. Phone numbers use the `tel:` scheme with +91. WhatsApp links use the `wa.me/<number>` format.

---

## Content

| Component | Markup | Notes |
|---|---|---|
| Section head | `.p-section-head` > `.p-section-head__title` (meta number + label) + optional `.p-cta` | Ink rule above. Optional `.p-h1` wraps to its own line. |
| Lede | `.p-lede` | At most one per section. 34ch. |
| Quote | `figure.p-quote` > `blockquote` + `figcaption` (`.p-h3` name, `.p-meta` project) | Static. Several quotes go in `.p-testimonials`, a 2-column offset grid on desktop. Never a carousel. |
| Facts | `dl.p-facts` (or `--stacked`) with `.p-meta` | Type, Area (sq ft), Year, Status, Photography. |
| Caption | `figcaption.p-caption.p-meta` > `b` (number, accent) + text | Required on every project image. |

---

## Portfolio

### Media `.p-media`

```html
<div class="p-media" style="--ratio:4/5; --focus:40% 60%">
  <img src="…-960.avif" srcset="…-640.avif 640w, …-960.avif 960w, …-1440.avif 1440w, …-2048.avif 2048w" sizes="(min-width:1280px) 33vw, 100vw" width="1600" height="2000" alt="Living room facing the courtyard, late afternoon" loading="lazy" decoding="async">
</div>
```

- Ratios: `3/2`, `4/5`, `1/1`, `2/3` or `21/9`.
- `.p-media--contain` for drawings.
- `.p-media--ph` is the striped placeholder, for drafts only.
- Alt text describes the space, not the file. Purely decorative repeats get `alt=""`.

### Heroes

Use the variant that matches `data-hero`. The hero contains the page's single `<h1>`.

| Variant | Structure | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| `.p-hero--plate` | full-bleed `.p-media` + `.p-hero__title` (display-l + meta) | 3:2, title below | 21:9 | 21:9; title 3 parts, meta 1 part |
| `.p-hero--plate.p-hero--on-image` | title in `.p-hero__overlay` on `--scrim` | Only for night photography, display-l or larger (R5) | | |
| `.p-hero--statement` | `.p-display-xl`, max 14ch, + meta | Starts at `--section-m` | | Never with quiet contrast (R1) |
| `.p-hero--index` | short `.p-display-xl` + `.p-ledger` of ≤ 6 rows | | | Never with the axial header (R2) |

### Project opening `.p-opening`

- **Mobile and tablet:** the text group stacks above the plate.
- **Desktop ≥ 1024:** text 5 parts, plate 7 parts, and the plate bleeds into the right margin.
- Text group: meta number (accent) · `.p-display-l` title · `.p-lede` · `.p-facts`.

### Project indexes

Use the variant that matches `data-index`.

| | Mobile | Tablet | Desktop |
|---|---|---|---|
| `.p-ledger` (rows `a.p-ledger__row`) | number + title (h2 size), meta below | same | 5 columns: number, title (h1 size), location, year, type; hover tint; `.p-ledger__thumb` 240px on hover/focus with a fine pointer only |
| `.p-staggered` (children `.p-card`) | full width / indented 3 of 4 | 5 cols + 4 cols, the second offset by `--space-10` | 7 cols + 4 cols, offset `--space-11`; odd items 3:2, even 4:5 |
| `.p-sheet` | 3 columns | 4 columns | 6 columns; 1:1; gutter ≤ `--space-4` (R8) |

- **Card `.p-card`:** `a.p-card__link` > `.p-media` + `.p-card__body` (`h3.p-card__title`, `.p-card__meta` with `.p-card__num`).
  - Hover and focus underline the title and turn the number accent. Images don't zoom.
  - Cards appear only inside staggered or sheet indexes, never as generic feature cards.
- **Accessibility:** a ledger is a `<nav aria-label>` of links, or a `<ul>`. Each row is a single link, with no nested interactive elements.

### Filter `.p-filter`

```html
<div class="p-filter" role="group" aria-label="Filter projects by type" data-filter-target="#work">
  <button data-filter="all" aria-pressed="true">All</button> <button data-filter="residential" aria-pressed="false">Residential</button>
  <span class="p-filter__count p-meta" aria-live="polite">12 projects</span>
</div>
```

- Items carry `data-category="residential hospitality"`. JS hides non-matching items and keeps the choice in `?type=` so it survives reload and sharing.
- **Mobile:** a single row that scrolls sideways; the count is hidden. **Tablet and up:** wraps, with the count on the right.
- Without JS, every project shows. Use at most 6 categories.

### Credits and next project

- `dl.p-credits`: 1 column on mobile, label and value side by side on tablet and up.
- `a.p-next`: a full-width display-l link with a label above it. Ends every project page.

### Drawing `.p-drawing`

- Always on a neutral-100 ground, even inside ink sections. Structure:
  - `.p-drawing__head`: drawing number and title on the left, scale on the right
  - `.p-media.p-media--contain`
  - `.p-drawing__foot`: `.p-scalebar` and `.p-north` (plans only)
- Supply drawings as SVG with non-scaling strokes, or as a 2× PNG. Never crop them. Never set one in the same row as a photograph.

---

## Galleries and viewer

| Variant | Desktop ≥ 1280 | Tablet | Mobile |
|---|---|---|---|
| `.p-gallery--diptych` (A) | 7 cols 3:2 + 4 cols 4:5, bottom-aligned | 5 + 3 | stacked; second indented 3 of 4 |
| `.p-gallery--marginal` (B) | caption 3 cols + 9 cols 21:9, bleeds right | 2 + 6, 3:2 | caption above, 3:2 |
| `.p-gallery--sequence` (C) | 3 × 2:3, gap `--space-3` | same | same |

- Never put two of the same gallery variant one after another. Use sequence at most once per page.
- **Gallery items:** `button.p-gallery__item[data-viewer="<set>"][data-src][data-caption]` wrapping a `.p-media`.
- **Viewer `dialog.p-viewer`:** one per page.
  - Full-screen on neutral-950, showing a count, the caption and text buttons (Close, Previous, Next).
  - Keyboard: arrow keys move between images, Esc closes, and focus returns to the image that opened it. Swipe works on touch, as does pinch zoom.
  - Without JS the buttons do nothing. Wrap the items in links to the full images if the site must work without JS.

---

## Studio sections

| Component | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|
| `.p-profile` (h2 + `.p-body`) | stacked | stacked | 5 parts heading · gap · 6 parts body | Studio introduction. |
| `.p-people` (`figure` > 4:5 media + name h3 + role meta) | 2 cols | 3 cols | 4 cols | Real portraits only. Never use initials or avatar circles. |
| `.p-services` > `details.p-service` | number + title (h2), "+" toggle | same | body splits into 2 columns | Native `<details>`, so no JS. Open the first one by default only when there are ≤ 3. |
| `ol.p-process` (`--steps`) | vertical, ink rule per step | vertical | `--steps` columns | Numbers come from CSS counters. 3–5 steps. |
| `ul.p-recognition` | year + award, project below | 3 columns | 3 columns | Awards and press. Plain text, no logos. |
| `.p-testimonials` | stacked | stacked | 2 columns, second offset down | 1–4 quotes. |

---

## Forms

```html
<form class="p-form" data-validate novalidate action="/enquiry" method="post">
  <div class="p-alert p-alert--error" data-error-summary tabindex="-1" hidden role="alert"><p>Please check the following:</p><ul></ul></div>
  <div class="p-field">
    <label class="p-field__label" for="email">Email</label>
    <input class="p-input" id="email" name="email" type="email" autocomplete="email" required data-error="Enter an email address like name@example.com.">
    <p class="p-field__error"></p>
  </div>
  …
  <div class="p-form__actions"><button class="p-btn p-btn--large" type="submit">Send enquiry</button></div>
  <div class="p-alert" data-status tabindex="-1" hidden role="status"><p data-status-title></p></div>
</form>
```

| Control | Class | States |
|---|---|---|
| Text, email, tel, number | `.p-input` | rule underline · hover: secondary · focus: 2px accent underline · error: error colour + `.p-field__error` · disabled: dashed + disabled text · readonly: hairline |
| Select | `.p-select` | same; native `<select>`, CSS chevron |
| Textarea | `.p-textarea` | same; minimum 144px tall, resizes vertically |
| Radio, checkbox | `fieldset.p-choices` > `legend` + `.p-choices__list` > `label.p-choice` > `input` | 20px square; checked: ink fill; 44px row |
| File | `.p-file` > hidden `input` + `label.p-file__drop` + `ul.p-file__list` | dashed drop zone; lists file names and sizes; `data-max-mb` |
| Alert | `.p-alert--error` / `--success` | 2px top rule in the status colour; the message stays in text-primary |

- **Layout:** 1 column on mobile. From tablet up, 2 columns: `.p-field--full`, fieldsets, actions and alerts span both.
- **Validation (plinth.js):**
  - Fields are checked when they lose focus, and again as you type once they're showing an error.
  - On submit, the error summary lists links to each invalid field and takes focus.
  - Messages come from `data-error` and say how to fix the problem.
  - On success the status region is announced and the form resets.
  - Without JS the browser's own validation applies; remove `novalidate` if no JS is shipped.
- **Labels:**
  - Every field has a visible `<label>`; placeholders are never used as labels.
  - Mark optional fields "(optional)"; required ones are not marked.
  - Use `autocomplete` and `inputmode` throughout.
- **Consultation form fields:**
  1. Name
  2. Email
  3. Phone (optional; +91, 10–15 digits)
  4. Project city
  5. Project type (radio)
  6. Area in sq ft (optional)
  7. Budget, in ₹ bands: Under ₹25 lakh · ₹25–75 lakh · ₹75 lakh – ₹2 crore · Above ₹2 crore · Not sure yet
  8. Start time
  9. About the project
  10. Plans (optional; PDF, JPG, PNG or DWG, up to 20 MB each)
  11. Consent checkbox
- **Contact block `.p-contact`:** `<address>` · tel · mailto · WhatsApp · opening hours · "Open in Maps" link. Don't embed maps unless the studio asks for it; it's slow and needs a cookie notice.

---

## Motion

- **`.p-reveal`:** add to cards and plates below the first screen, never to text blocks or the hero. Runs once per element. Skipped under reduced motion and when JS is off (`.no-js`).
- **Page transitions:** cross-document view transitions, a 800ms cross-fade. Browsers that don't support them simply skip it.

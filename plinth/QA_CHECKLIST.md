# Plinth 1.0 — Accessibility and QA checklist

Target: WCAG 2.2 AA. Tick every item before handover. Items marked **(manual)** need a person or a real device.

## A. Accessibility

**Structure**
- [ ] One `<h1>` per page. Headings in order, with no skipped levels.
- [ ] `lang="en-IN"` (or the correct locale) on `<html>`. Devanagari or other scripts get a `lang` on their element.
- [ ] Skip link is the first focusable element and moves focus to `#main`.
- [ ] Landmarks: `header`, `nav` with `aria-label` (Primary, plus Secondary for axial), `main`, `footer`.

**Colour and type**
- [ ] Text contrast ≥ 4.5:1, and ≥ 3:1 for type ≥ 24px. Check both lime and ink sections, and any accent exception.
- [ ] Focus ring visible on every interactive element, in both lime and ink sections.
- [ ] No information conveyed by colour alone. Errors include text; the current page uses an underline or marker.
- [ ] Body text ≥ 16px. On an ink ground, weight ≥ 400 (R4).
- [ ] Page works at 200% zoom and at 320px width with no horizontal scroll. Text spacing can be overridden without loss.

**Interaction**
- [ ] All targets ≥ 44 × 44px; fields 48px tall.
- [ ] Menu: opens with Enter or Space, traps focus, closes with Esc, returns focus to the button. The page behind is inert.
- [ ] Viewer: arrow keys and Esc work, focus returns to the image that opened it, and the counter and caption are visible.
- [ ] Filter buttons use `aria-pressed`. The count updates in an `aria-live` region.
- [ ] `<details>` services work by keyboard.
- [ ] No hover-only content. Ledger thumbnails are decorative (`aria-hidden`).

**Forms**
- [ ] Every control has a visible label. Optional fields are marked. `autocomplete` and `inputmode` are set.
- [ ] Errors: the message says how to fix it; `aria-invalid` is set; the error summary takes focus and links to each field.
- [ ] Success and failure are announced through the status region.
- [ ] Form works without JS (browser validation) **(manual)**.

**Media**
- [ ] Every content image has alt text that describes the space; decorative images have `alt=""`.
- [ ] Drawings have alt text naming the drawing ("Ground floor plan, 1:200").
- [ ] No autoplaying video with sound. Any video has controls and a poster.

**Motion**
- [ ] With `prefers-reduced-motion` on, reveals and transitions are instant **(manual: OS setting)**.
- [ ] Nothing flashes more than 3 times a second. No parallax and no scroll-jacking.

**Assistive technology**
- [ ] Tested with VoiceOver on iOS Safari and NVDA on Windows Chrome **(manual)**.

## R. Responsive
- [ ] Checked at 320, 375, 768, 1024, 1280, 1440 and 1920 **(manual: real iPhone and Android)**.
- [ ] Header collapses at 1024 (masthead and axial) or 1280 (rail). The Menu button is never shown alongside the inline nav.
- [ ] No text overflow or clipping with long Indian place names, for example "Thiruvananthapuram".
- [ ] Images use the correct ratio at every size; a focal point is set for every crop.
- [ ] Forms are a single column below 768px, and buttons are full width.

## P. Performance

**Budget**
- [ ] LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms on a mid-range Android over 4G **(manual)**.
- [ ] Total weight ≤ 1.5 MB on first load (home, mobile). JS ≤ 15 KB gzipped. CSS ≤ 30 KB gzipped.

**Images**
- [ ] AVIF with WebP and JPEG fallback.
- [ ] `srcset` at 640 / 960 / 1440 / 2048 / 2880w with an accurate `sizes`.
- [ ] Width and height attributes on every image.
- [ ] Hero image uses `fetchpriority="high"` and isn't lazy-loaded; everything else uses `loading="lazy"`.

**Fonts**
- [ ] Self-hosted WOFF2, subset to Latin, Latin Extended and ₹, using `font-display: swap`.
- [ ] Preload two files at most.

**Other**
- [ ] No third-party embeds (maps, Instagram) unless the client requests them; if they do, load on interaction.
- [ ] Lighthouse score ≥ 95 for Accessibility, Best Practices and SEO.

## C. Consistency with Plinth
- [ ] `npm run validate` passes. Every exception has a matching override in `brand.css`, and vice versa.
- [ ] `<html>` data attributes match the profile exactly. Header, hero and index variants match the composition dials.
- [ ] No hard-coded colours, sizes, spacing or durations in client CSS (grep for `#`, `px`, `rgb(` and `oklch(` outside `brand.css` exceptions).
- [ ] Required rules R1–R5 hold. Recommended-rule breaks are recorded as exceptions; advisory notes are in the PR.
- [ ] Pacing rules from LAYOUTS.md hold on every page.
- [ ] Distinctiveness (R14) count is in the PR.

## Content (India-specific)
- [ ] Phone numbers use `tel:+91…`. WhatsApp links use `wa.me/91…`.
- [ ] Currency in ₹ with Indian grouping (₹12,40,000), or lakh/crore wording. Area in sq ft.
- [ ] Address uses the PIN code. Map link opens the native maps app.
- [ ] Privacy notice covers enquiry data, in line with the DPDP Act 2023 **(manual: client legal review)**.

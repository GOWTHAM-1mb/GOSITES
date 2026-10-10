# Plinth 1.0 — Design system

## 1. Art direction

Architectural editorial. The site behaves like a monograph: the work first, the frame barely noticed.

1. **Architecture first.** Photographs, drawings and the studio's words carry every page. The UI only moves the reader between them.
2. **Structure is the ornament.** Grids, hairlines and index data (project number, area, year, coordinates) replace decoration.
3. **Space is a material.** Space comes from the spacing scale and is used on purpose.
4. **Material palette.** Neutrals named after lime, Kota, laterite, teak and ink. Photography supplies the saturation.
5. **Edited like a monograph.** Plate, caption, essay, plate. Never use the same section pattern twice in a row.
6. **Rooted, not themed.** Indian context comes from place, material, climate and language. No mandalas, paisleys, temple motifs or saffron accents.

**Never used:** gradients (except the image placeholder stripe), glassmorphism, shadows, rounded corners, icon grids, three-up feature cards, stock photography, parallax, scroll-jacking, autoplay carousels, cursor effects, emoji.

## 2. Foundations

### Colour
- **Neutral ramp:** 11 steps (`--neutral-50` to `--neutral-950`). L = .985 .965 .93 .86 .72 .58 .47 .36 .26 .19 .15. Hue and chroma come from the temperature dial.
- **Accent:** L 0.52, C 0.09 (base). Lift L 0.74 (ink mode), tint L 0.93 C 0.03 (selection background), deep L 0.30 C 0.03 (selection background in ink mode). Use it only for focus, the active nav marker, link hover, selected states and the featured index number. Never use it for fills, section backgrounds or primary buttons.
- **Semantic roles:** `--surface-page/raised/sunken/inverse/hover/disabled`, `--text-primary/secondary/tertiary/inverse/disabled`, `--line-hair/rule`, `--action-primary/-hover/-active/on-primary`, `--accent-ui`, `--accent-bg`, `--focus-ring`, `--status-error/success`.
- **Contrast** on surface-page, in both modes:
  - text-primary ≥ 13:1
  - text-secondary ≥ 6:1
  - accent-ui ≥ 5:1
  - text-tertiary ≈ 4:1, so use it only for text ≥ 24px or non-text

### Type
- Display face: chosen by dial. Text: Albert Sans 400/500/600. Mono: IBM Plex Mono 400/500.
- All fluid values interpolate linearly between 375px and 1440px and clamp outside that range.

| Token | 375 → 1440 px | LH | Notes |
|---|---|---|---|
| display-xl | per contrast dial | 0.95 | × display-scale. At most one per page |
| display-l | per contrast dial | 1.0 | × display-scale |
| h1 | 34 → 56 | 1.08 | display face, × display-scale |
| h2 | 26 → 38 | 1.15 | display face 400, × display-scale |
| h3 | 20 → 24 | 1.3 | text 500 |
| lede | 19 → 23 | 1.45 | display face, max 34ch |
| body | 16 → 17 | 1.6 | max 66ch |
| body-s / label / meta | 14 / 12 / 12 | — | label: uppercase +0.12em · meta: mono, tabular figures |

- Rules:
  - Never bold the display face. Emphasis is `<em>`, which renders as italic, or as weight 400 for the modernist face.
  - Uppercase only in label style.
  - Indian digit grouping for ₹ (12,40,000). Area in sq ft. Dates as 10 October 2026.

### Grid and space
- Columns and margins:

  | Width | Columns | Margin | Gutter |
  |---|---|---|---|
  | < 768 | 4 | 20 | 16 |
  | 768 – 1279 | 8 | ≈ 42 | ≈ 22 |
  | ≥ 1280 | 12 | up to 80 | up to 32 |

  Container max width is 1680px.
- Breakpoints: sm 480, md 768, lg 1024, xl 1280, 2xl 1600. Mobile-first `min-width` queries.
- Spacing scale (px): 4 8 12 16 24 32 48 64 96 128 192 256 (`--space-1` to `--space-12`). It never scales.
- Section spacing: `--section-s` 64→128, `--section-m` 96→192, `--section-l` 128→256, each × density.
- Radius 0. No shadows. Lines 1px. Depth comes from stepping the surface colour.

### Imagery
- Five ratios: 3:2 landscape, 4:5 portrait, 1:1 square, 2:3 tall, 21:9 panorama.
- Every image sits in a `.p-media` ratio box with an explicit focal point (`--focus`).
- Captions are always in meta style.
- Drawings always sit on a neutral-100 ground, are never cropped, and carry a title block, scale bar and north point.

### Motion
- Durations: 120 (colour), 240 (menu, accordion), 480 (image reveal), 800 (page cross-fade).
- Easing: standard (0.2, 0, 0, 1), out (0.16, 1, 0.3, 1), in (0.4, 0, 1, 1).
- The only entrance motion is `.p-reveal`: opacity plus an 8px rise, once per element.
- Under reduced motion, durations drop to 0, and page cross-fades to 120ms.

## 3. Identity dials

Each dial is set by a data attribute on `<html>`, with values from the client profile.

| # | Dial | Attribute | Presets (default first) | Exception |
|---|---|---|---|---|
| 1 | Display face | data-display | literary (Newsreader, scale 1) · technical (IBM Plex Serif, 0.92) · modernist (Archivo, 0.92, emphasis by weight) | yes |
| 2 | Accent | data-accent | laterite h50 · indigo h262 · neem h150 · sandstone h80 | yes |
| 3 | Temperature | data-temperature | warm (h70–85) · stone (h95, chroma × 0.35) · cool (h250, chroma × 0.7) | yes |
| 4 | Type contrast | data-contrast | standard (xl 56→124, l 44→82) · quiet (48→82, 40→64) · monumental (60→160, 48→96) | no |
| 5 | Density | data-density | standard 1 · airy 1.25 / 1.1 mobile · compact 0.8 / 0.85 mobile | no |
| 6 | Composition | data-header, data-hero, data-index | masthead · axial · rail / plate · statement · index / staggered · ledger · sheet | Recommended rules only |
| 7 | Ground | data-ground | lime · ink. Any section can invert with `data-theme` | no |

The composition dials are structural: they select which component variant goes in the markup (for example `data-header="rail"` means `.p-header--rail`). The two must match.

## 4. Token architecture

1. **Primitive:** every raw value (`color.neutral.cool.50`). Never used by components.
2. **Preset:** the meaning of each dial option (`preset.temperature.cool.neutral.50`).
3. **Brand:** the profile's resolution (`brand.neutral.50`). In CSS this happens through data attributes.
4. **Semantic:** role tokens in lime and ink modes. Components read **only** these, plus the type, space, layout and motion tokens.
5. **Component:** scoped variables inside components.css (`--btn-bg`).

- **Formats:** `tokens.json` is the DTCG 2025.10 bundle of `tokens/*.tokens.json`. Colours are OKLCH with hex fallbacks. `css/tokens.css` is its CSS mirror. Edit the source JSON, then regenerate both, keeping names identical.
- **Load order:** tokens.css → components.css → brand.css. Later files win. brand.css contains only the attribute comment and any exception overrides that the profile records.

## 5. Brand profile

```json
{
  "$schema": "../schema/brand-profile.schema.json",
  "plinthVersion": "1.0",
  "client": { "id": "ira-menon", "name": "Ira Menon Interiors", "city": "Bengaluru", "locale": "en-IN" },
  "dials": {
    "displayFace": "literary", "accent": "neem", "temperature": "warm",
    "typeContrast": "standard", "density": "airy",
    "composition": { "header": "axial", "hero": "plate", "index": "staggered" },
    "ground": "lime"
  },
  "exceptions": [],
  "distinctFrom": ["studio-kiln"]
}
```

Validate with `npm run validate`. The schema checks structure, enums, R1, R2, and that any `"exception"` dial has a matching entry.

## 6. Exceptions

The system guides Codex. It does not overrule a justified client decision. To step outside a preset:

1. Set the dial to `"exception"`, or target `rule:R6`–`R10`, `logoColor` or an unlocked `token:--name`.
2. Add an `exceptions[]` entry with `id` (EXC-nn), `target`, `value`, `rationale` (≥ 20 characters) and `source`. `approvedBy` and `date` are optional.
3. Write the override in brand.css under a comment carrying the same id (see `profiles/mehta-varghese.brand.css`).

What each target allows:
- **accent:** keep the brand hue and chroma (chroma ≤ 0.12) and use L .52 / .74 / .93 / .30. Base must reach ≥ 4.5:1 on lime surface-page, and lift ≥ 4.5:1 on ink. If the brand colour can't meet that, use it in the logo only (`logoColor`).
- **displayFace:** web licence, WOFF2, ≥ 2 weights including one ≤ 350, Latin Extended and ₹ (U+20B9). Set `scale` so the cap height matches Newsreader's within 5%.
- **temperature:** any hue. Chroma ≤ 0.02 at step 50 and ≤ 0.012 elsewhere. Lightness steps stay unchanged.
- **Locked, never excepted:** radius, shadow, focus width and offset, touch target, field height, motion tokens, spacing scale, text and mono faces, h1 and the type sizes below it, every surface, text and line token, contrast minimums.

## 7. Composition rules

**Required.** Breaking one is an error, and it can't be excepted.
- **R1:** the statement hero is incompatible with quiet contrast.
- **R2:** the axial header is incompatible with the index hero.
- **R3:** the rail header allows at most 6 primary items, and collapses below 1280px.
- **R4:** on an ink ground, body text is ≥ 16px at weight ≥ 400, and display weight 300 only at ≥ 34px.
- **R5:** text sits on photographs only in the plate hero, on `--scrim`, at display-l or larger, measured at ≥ 4.5:1.

**Recommended.** Breaking one is a warning; fix it or record an exception.
- **R6:** monumental with compact keeps the space above display-xl at ≥ `--section-m` at density 1. This is built into the CSS.
- **R7:** the rail with a plate hero starts the plate at the rail edge.
- **R8:** the sheet gutter is ≤ `--space-4`. This is built into the CSS.
- **R9:** the index hero with a ledger index shows ≤ 6 featured rows on the home page.
- **R10:** modernist with quiet sets h1 and h2 at weight 400. This is built into the CSS.

**Advisory.** These produce a note only.
- **R11:** the sandstone accent with a warm or stone temperature reads close to neutral.
- **R12:** the axial header suits ≤ 4 items.
- **R13:** the statement hero with monumental contrast suits ≤ 8 words.
- **R14:** distinctiveness. Aim for ≥ 3 dials different from each `distinctFrom` client, including ≥ 1 composition dial.

**Header × hero:**

| Header | plate | statement | index |
|---|---|---|---|
| masthead | ● | ● | ● |
| axial | ● | ● | ✕ R2 |
| rail | ◐ R7 | ● | ● |

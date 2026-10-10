# Ira Menon Interiors — demo handover

Client concept: Ira Menon Interiors, Bengaluru. Fictional demo only.
Profile: `plinth/profiles/ira-menon.profile.json` — valid.
Dials: literary · neem · warm · standard contrast · airy · axial / plate / staggered · lime.
Exceptions: none. Required composition rules R1–R5 are respected by the selected profile and markup. No text overlays photographs.
Distinctiveness: differs from Studio Kiln on 8/9 dial attributes, including all three composition attributes; ground is shared. This uses the supplied profile, with no real portfolio available to substantiate a client-specific selection.

## Implementation

Ten content routes: Home, Work, Studio, Services, Contact, Privacy, and four project studies. All are statically prerendered. A custom 404 page handles missing routes. Portfolio filters use shareable URL parameters, and browser back/reload restores the chosen category.

The supplied core CSS, token bundle and four token sources are byte-for-byte unchanged, verified against the ZIP using SHA-256. The original `plinth/js/plinth.js` is preserved for reference but is not shipped into React pages; route-aware React components implement menus, filtering, galleries and demo validation without its simulated submission behaviour.

New site components are scoped with `s-` classes in `src/styles/site.css`: wordmark fallback, demo notice, native-dialog menu/viewer, gallery trigger, consultation field grid, filter target minimums, and footer link target corrections. These use supplied tokens for colours, type, spacing and interaction sizes. The font-face declarations self-host the prescribed fonts under their original family names, with Latin and Latin Extended subsets including ₹, and bundled licences. Two normal-face fonts are preloaded.

The consultation form intentionally has no endpoint and no uploads. It validates required values, email, optional phone and area; links a focused summary to invalid fields; checks on blur and rechecks existing errors while typing. Success explicitly states that nothing was sent or stored. Without JavaScript, the form is hidden behind a clear explanatory message. User-supplied AI concept imagery can be inspected in a labelled image viewer; no completed commission is claimed.

## Supplied image integration — 10 October 2026

All 19 PNGs from `D:/New folder.zip` are mapped to the home hero (desktop and mobile), four project opening plates, twelve gallery plates and the studio material table. Cards reuse appropriate project images. Captions describe the supplied image content rather than the earlier generation prompts. The site notice, footer, gallery captions and project credits identify the imagery as AI-generated.

Originals remain intact in ignored `incoming-images/New folder/`. Sharp generates 258 derivatives in AVIF, WebP and JPEG, with 320/640/960/1440 px and native-width variants where the source resolution permits. All variants combined occupy 32.1 MB versus 51.5 MB of original PNGs; a browser downloads only its selected source, not the whole library. The 1440 px desktop hero AVIF is 89,396 bytes versus its 2,684,321-byte original PNG. Below-fold images load lazily; first-screen hero/opening images load eagerly. Picture sources select the portrait hero below 768 px, and CSS focal points preserve the intended subject. The modal viewer uses `object-fit: contain` to display the entire image. No upscaling, generated edits or retouching were performed.

Asset mappings and alt text are maintained in `src/content/images.ts`, `src/content/image-assets.json` and `scripts/prepare-images.mjs`. `docs/IMAGE_ASSET_MANIFEST.json` records source checksums and every derivative's size.

Post-integration verification: lint, TypeScript, profile validation and static production build pass. All 258 referenced derivative files exist. Browser checks cover Home, Work, Studio and all four projects at 320, 375, 768, 1024, 1280 and 1920 px (42 page/width combinations), plus desktop visual inspection at 1440 px. No horizontal page overflow or duplicate/missing h1 was found. The 375 px home selects the mobile AVIF composition. Project opening images and all twelve gallery images load successfully; viewer arrow navigation, Escape and focus return work. The viewer frame follows the source aspect ratio and caps its height, so panoramic images do not leave a tall empty frame on mobile. `docs/demo-preview.png` and `docs/demo-preview-mobile.png` show the integrated home page. These checks do not establish the pending accessibility/Core Web Vitals sign-off below.

## Verification performed

- All four supplied brand profiles pass the original JSON schema.
- ESLint, TypeScript and the production build pass.
- All ten content routes return HTTP 200; a missing route returns 404.
- Home, Work, the first project, Contact, Studio and Services were inspected at 320, 375, 768, 1024, 1280, 1440 and 1920 browser widths. No horizontal page overflow; exactly one h1 per page. Mobile menu appears below 1024, with desktop navigation above it.
- Mobile menu opens with focus on Close, closes with Escape and returns focus to Menu. Native modal dialogs block interaction with the page behind; explicit focus wrapping keeps Shift+Tab inside the menu and viewer (verified in the production build).
- Portfolio Retail filter displays one concept, updates `?type=retail`, and persists on reload.
- Gallery opens with focus on Close; arrow keys update the plate/counter; Escape closes it and returns focus to the opener.
- Empty enquiry produces linked errors and focuses the summary. A phone value consisting of spaces is rejected. A valid fictional enquiry produces the explicit no-submission status and focuses it. Long city name tested: Thiruvananthapuram.
- Final production Contact browser check showed no console warnings/errors from the production origin. Development HMR briefly showed stale autofocus attributes after a source edit; fresh production markup does not include that attribute on the menu Close button.

## Performance qualification

Production home HTML references 8 JS/CSS assets. Summed gzip sizes: JavaScript 178,781 bytes (about 175 KiB); CSS 10,158 bytes (about 10 KiB). These are local artifact measurements, not a network audit. CSS meets Plinth's 30 KB budget; the Next.js/React runtime exceeds its 15 KB JavaScript budget. This conflict between the requested framework and the framework-independent Plinth budget is unresolved; no full performance pass is claimed.

Core Web Vitals on Android/4G, Lighthouse scores, 200% zoom, OS reduced-motion behaviour, real iPhone/Android checks, NVDA and VoiceOver verification, and measured contrast/colour-blind checks remain pending. The inherited core focus/contrast behaviour needs actual accessibility auditing before production sign-off.

## Missing for production

Approved photography, drawings and portraits; actual studio identity, logo, contact details and project facts; client-approved copy and photography credits; a real domain/canonical metadata; a secure enquiry service; appropriate privacy/legal review; GitHub remote and Vercel deployment configuration. Search indexing is disabled for the fictional demo.

No real awards, testimonials, credentials or business results are claimed. No production services or external publishing were used. ZIP export HTML studies remain under ignored `design-source/` locally; all reusable Plinth source files are under `plinth/`.

# AGENTS.md — Building a client site with Plinth

You are building one website for one architecture or interior-design studio. Plinth gives you tokens, components and rules. It is a guide, not a cage: make justified client-specific decisions, and record them.

## 1. Read first
`plinth/DESIGN_SYSTEM.md` (§3 dials, §6 exceptions, §7 rules) → `plinth/COMPONENTS.md` → `plinth/LAYOUTS.md`. Use `plinth/reference/` pages as working examples, not as templates to clone. In this Next.js project, source content and React components live under `src/`, and site-specific CSS lives in `src/styles/site.css`. All other Plinth paths below are relative to `plinth/`.

## 2. Workflow
1. **Profile.** Create `profiles/<client>.profile.json`.
   - Pick each dial from the studio's portfolio, not personal taste: night photography → ink ground; drawing-led firm → technical face; a large body of small projects → sheet or ledger index.
   - Fill `distinctFrom` with other Plinth clients in the same city or market.
2. **Validate.** Run `npm run validate`. Fix errors before writing markup.
3. **Brand CSS.** Create `profiles/<client>.brand.css` containing:
   - the `<html>` attribute comment
   - any exception overrides, each under a comment carrying its `EXC-nn` id
4. **Shell.** Use the page shell from LAYOUTS.md. Copy the dial attributes onto `<html>` exactly. Use the header, hero and index variants that match the composition dials.
5. **Pages.** Build them from LAYOUTS.md templates using components only.
6. **QA.** Run every item in `QA_CHECKLIST.md`, then write the PR description (§6).

## 3. Hard rules (never break)
- Never edit `css/tokens.css`, `css/components.css`, `tokens.json` or `tokens/*` for one client. Client styling goes in `brand.css`.
- No raw colour, font-size, spacing or duration values in client CSS. Use tokens: `var(--space-6)`, never `32px`.
- No radius, shadows, gradients, blur or glass effects. No new fonts outside the dials or a recorded displayFace exception.
- Required rules R1–R5 and the locked tokens (DESIGN_SYSTEM §6) can't be excepted.
- Accessibility minimums (QA_CHECKLIST §A) are not negotiable.
- Use real content only. If photographs or copy are missing, use `.p-media--ph` and list what's missing in the PR. Never use stock imagery or invented testimonials on a live site.

## 4. Where you have discretion
- Copy, page count, section order, which gallery variant fits each project, image crops and focal points (`--focus`), and whether a section uses the ink theme.
- Recommended rules R6–R10: you may break one if the result is better for this client, but record an exception with `target: "rule:R<n>"`.
- New layouts that combine existing components are fine.

**New components.** You may add one when no existing component fits and the need is real. Build it in `css/site.css` with the prefix `s-`, using semantic tokens only, and give it the same states and responsive behaviour as the components around it. Note it in the PR so it can be considered for Plinth.

## 5. Exceptions
Use one when an established client brand needs it: an existing colour, a licensed typeface or an unusual logo. Follow DESIGN_SYSTEM §6 exactly.
- **Never** use an exception for taste, or to work around a Required rule.
- **Prefer the narrowest exception.** Example: a loud brand colour goes in the logo only (`logoColor`), rather than an accent exception.

## 6. PR description template
```
Client: <name>, <city>    Profile: profiles/<id>.profile.json (valid)
Dials: display · accent · temperature · contrast · density · header/hero/index · ground
Exceptions: EXC-01 <target> — <one line> (or none)
Rule warnings: <R-ids + reason, or none>
Distinctiveness (R14): differs from <id> on <n>/9 dials (<list>)
New components: <s-… or none>
Missing content: <images, copy, credits>
QA: A ✓  R ✓  P ✓  C ✓  (see QA_CHECKLIST.md; list any manual item not done)
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

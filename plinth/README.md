# Plinth 1.0

A reusable design system for building individual websites for Indian architecture and interior-design studios. It is not a site generator. Each client site is built by hand (by Codex or a developer) from these tokens, components and rules.

## Start here

1. `AGENTS.md`: instructions for Codex. Read this first.
2. `DESIGN_SYSTEM.md`: foundations, identity dials, token architecture, exceptions, composition rules.
3. `COMPONENTS.md`: every component, with markup, variants, states, responsive behaviour and accessibility.
4. `LAYOUTS.md`: page templates and section sequences.
5. `QA_CHECKLIST.md`: checks to run before handover.

## Contents

```
tokens.json                    DTCG bundle (generated from tokens/)
tokens/*.tokens.json           source: primitive, preset, brand.default, semantic
css/tokens.css                 CSS variables mirroring tokens.json
css/components.css             component library (p- prefix)
js/plinth.js                   progressive enhancement: menu, filter, viewer, reveal, forms
schema/brand-profile.schema.json
profiles/<client>.profile.json + <client>.brand.css   four fictional examples
reference/components.html      live catalogue (?profile=<id>)
reference/ira-menon/           composition study: axial / plate / staggered
reference/studio-kiln/         composition study: rail / index / sheet
package.json                   npm run validate
```

## Quick start for a new client

```
cp profiles/ira-menon.profile.json profiles/<client>.profile.json   # edit dials
cp profiles/ira-menon.brand.css    profiles/<client>.brand.css      # update the attribute comment
npm install && npm run validate
```

Load `css/tokens.css`, `css/components.css`, `profiles/<client>.brand.css` and `js/plinth.js` (with `defer`), in that order. Then copy the dial attributes onto `<html>`.

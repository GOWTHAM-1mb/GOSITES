# Ira Menon Interiors — Plinth demo

A fictional interior-design studio website built with Next.js App Router, React, TypeScript and the supplied Plinth 1.0 foundations. This is one independent client project.

## Local development

```sh
npm install
npm run validate
npm run dev
```

Open http://127.0.0.1:3000. To verify: `npm run lint`, `npm run typecheck`, `npm run build`.

## Structure

- `plinth/`: original design-system files; core CSS and tokens are unchanged.
- `src/app/`: static pages, project routes and page metadata.
- `src/components/`: accessible React interactions and shared Plinth markup.
- `src/content/studio.ts`: typed, clearly illustrative studio/project content.
- `src/styles/site.css`: necessary site-specific components using Plinth tokens.
- `scripts/validate-profiles.mjs`: validates all supplied profiles with the original schema.

Fonts are self-hosted from Fontsource packages, with their bundled open-font licences. No database, authentication or enquiry endpoint is required for this demo. The consultation form validates locally and explicitly reports that no enquiry is sent or stored. The 19 user-supplied AI-generated images illustrate fictional concepts; real contact links are absent.

## Image assets

`public/images/` contains responsive AVIF, WebP and JPEG derivatives. The home hero selects a separate mobile composition. Other images use project-specific placements and focal points; the gallery viewer shows each complete image without cropping. Original PNGs are preserved locally under ignored `incoming-images/New folder/`.

Run `npm run images:prepare` to reproduce the derivatives from that folder, or pass an alternative source folder to `node scripts/prepare-images.mjs`. `src/content/images.ts` maps assets to projects; `docs/IMAGE_ASSET_MANIFEST.json` records source filenames, checksums and output sizes. Images are never upscaled beyond their supplied resolution.

## Production prerequisites

Replace fictional content and concept imagery with approved client copy and licensed images. Set the real canonical domain, implement a secure enquiry endpoint and appropriate privacy notice, and complete the manual checks in `plinth/QA_CHECKLIST.md`. Deploy to Vercel only after those decisions. No production deployment is configured by this project.

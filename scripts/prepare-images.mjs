import sharp from "sharp";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

// The originals remain untouched in incoming-images/. Only web derivatives are public.
const sources = {
  "neem-hero-desktop": ["Sunlit Tropical Courtyard Living Room.png", "Linen sofa and teak armchair facing a planted courtyard in afternoon light", "50% 54%"],
  "neem-hero-mobile": ["Sunlit Courtyard Living Space.png", "Courtyard living space with linen seating, timber frames and filtered afternoon light", "50% 68%"],
  "neem-opening": ["Serene Courtyard Living Room.png", "Tall timber-framed living room opening towards a planted courtyard", "50% 52%"],
  "neem-living": ["Minimalist Living Room Courtyard Connection.png", "Linen sofa, teak coffee table and glazed opening to a leafy courtyard", "48% 50%"],
  "neem-reading": ["Sunlit Natural Materials Reading Nook.png", "Upholstered reading chair beside timber bookshelves and a courtyard doorway", "50% 55%"],
  "neem-dining": ["Sunlit Earthy Dining Room and Courtyard.png", "Timber dining table and chairs beside a sunlit courtyard", "52% 50%"],
  "estate-verandah": ["Serene Rustic Veranda Retreat.png", "Cane and timber seating on a red-oxide verandah overlooking green hills", "50% 50%"],
  "estate-opening": ["Misty Tropical Veranda Retreat.png", "Timber-roofed verandah with cane chairs and a red-oxide floor", "50% 50%"],
  "estate-bedroom": ["Serene Rustic Bedroom with Misty Hills.png", "Timber bed and linen bedding beside open doors overlooking misty hills", "50% 50%"],
  "estate-materials": ["Golden Veranda Overlooking Misty Hills.png", "Red-oxide verandah, terracotta roof and timber posts overlooking misty hills", "54% 50%"],
  "bookshop-entrance": ["Sunlit Rangoli Books Interior.png", "Book-lined timber shelving and display tables along a sunlit stone-floor aisle", "50% 50%"],
  "bookshop-opening": ["Cozy Scandinavian Bookstore with Window Nook.png", "Compact bookshop with timber displays, stone flooring and a window reading corner", "50% 52%"],
  "bookshop-reading": ["Sunlit Scandinavian Bookstore Nook.png", "Linen window bench and small reading table beside bookshop shelves", "50% 54%"],
  "bookshop-joinery": ["Warm Scandinavian Bookstore Interior.png", "Freestanding timber book displays and shelving along a glazed bookshop frontage", "50% 50%"],
  "cafe-courtyard": ["Serene Courtyard Café in Mysuru.png", "Cane café chairs and timber tables beneath a tree in a limewashed courtyard", "50% 54%"],
  "cafe-opening": ["Serene Courtyard Café in Golden Light.png", "Tree-shaded café seating in front of an arched glazed entrance", "50% 50%"],
  "cafe-counter": ["Sunlit Courtyard Café Interior.png", "Dark stone service counter, timber cabinetry and coffee equipment beside courtyard glazing", "50% 54%"],
  "cafe-cane": ["Sunlit Mediterranean Courtyard Café.png", "Timber and cane café seating against limewashed walls and courtyard planting", "50% 50%"],
  "studio-material-table": ["Warm Materials Moodboard Studio.png", "Timber worktable with stone, wood and woven material samples beside a studio window", "50% 54%"],
};

const inputDirectory = path.resolve(process.argv[2] || "incoming-images/New folder");
const outputDirectory = path.resolve("public/images");
await mkdir(outputDirectory, { recursive: true });
const manifest = {};
const provenance = [];
let originalBytes = 0;
let derivativeBytes = 0;

// Limit encoder concurrency so generation does not monopolise the user's computer.
sharp.concurrency(2);
for (const [id, [filename, alt, focus]] of Object.entries(sources)) {
  const source = path.join(inputDirectory, filename);
  const original = await readFile(source);
  const meta = await sharp(original).metadata();
  if (!meta.width || !meta.height) throw new Error(`Missing dimensions: ${filename}`);
  const widths = [...new Set([320, 640, 960, 1440, meta.width].filter(w => w <= meta.width))].sort((a, b) => a - b);
  const files = [];
  for (const width of widths) {
    const pipeline = sharp(original).rotate().resize({ width, withoutEnlargement: true });
    for (const [extension, encoder] of [
      ["avif", image => image.avif({ quality: 58, effort: 4 })],
      ["webp", image => image.webp({ quality: 82, effort: 4 })],
      ["jpg", image => image.jpeg({ quality: 84, mozjpeg: true })],
    ]) {
      const outputName = `${id}-${width}.${extension}`;
      const output = path.join(outputDirectory, outputName);
      await encoder(pipeline.clone()).toFile(output);
      const bytes = (await stat(output)).size;
      derivativeBytes += bytes;
      files.push({ file: outputName, width, bytes });
    }
  }
  manifest[id] = { width: meta.width, height: meta.height, widths, alt, focus };
  provenance.push({ id, source: filename, width: meta.width, height: meta.height, originalBytes: original.length, sha256: createHash("sha256").update(original).digest("hex"), files });
  originalBytes += original.length;
  console.log(`${id}: ${meta.width}×${meta.height}, ${files.length} responsive files`);
}
await writeFile("src/content/image-assets.json", JSON.stringify(manifest, null, 2) + "\n");
await writeFile("docs/IMAGE_ASSET_MANIFEST.json", JSON.stringify({ originalBytes, derivativeBytes, assets: provenance }, null, 2) + "\n");
console.log(`Prepared ${provenance.length} images. Originals: ${(originalBytes / 1e6).toFixed(1)} MB; all formats and sizes combined: ${(derivativeBytes / 1e6).toFixed(1)} MB.`);

import assets from "./image-assets.json";

export type ImageId = keyof typeof assets;
export type ImageAsset = { width: number; height: number; widths: number[]; alt: string; focus: string };
export const imageAssets: Record<ImageId, ImageAsset> = assets;

export const projectImages = {
  "neem-courtyard": { opening: "neem-opening", cover: "neem-living", gallery: ["neem-living", "neem-reading", "neem-dining"] },
  "coffee-estate": { opening: "estate-opening", cover: "estate-opening", gallery: ["estate-verandah", "estate-bedroom", "estate-materials"] },
  "rangoli-bookshop": { opening: "bookshop-opening", cover: "bookshop-entrance", gallery: ["bookshop-entrance", "bookshop-reading", "bookshop-joinery"] },
  "courtyard-cafe": { opening: "cafe-opening", cover: "cafe-opening", gallery: ["cafe-courtyard", "cafe-counter", "cafe-cane"] },
} satisfies Record<string, { opening: ImageId; cover: ImageId; gallery: ImageId[] }>;

export function imagesForProject(slug: string) {
  const images = projectImages[slug as keyof typeof projectImages];
  if (!images) throw new Error(`No images mapped for project: ${slug}`);
  return images;
}

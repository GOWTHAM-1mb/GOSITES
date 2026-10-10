// Pre-encoded picture sources provide responsive formats and mobile art direction.
import type { CSSProperties } from "react";
import { imageAssets, type ImageId } from "@/content/images";

export const fullWidthSizes = "(min-width: 1840px) 1680px, 100vw";
export const openingSizes = "(min-width: 1840px) 980px, (min-width: 1024px) 58vw, calc(100vw - 40px)";

function sourceSet(id: ImageId, format: "avif" | "webp" | "jpg") {
  return imageAssets[id].widths.map(width => `/images/${id}-${width}.${format} ${width}w`).join(", ");
}

export function Media({ id, mobileId, ratio, className = "", sizes = fullWidthSizes, priority = false }: {
  id: ImageId; mobileId?: ImageId; ratio?: string; className?: string; sizes?: string; priority?: boolean;
}) {
  const asset = imageAssets[id];
  const mobile = mobileId ? imageAssets[mobileId] : asset;
  const fallbackWidth = asset.widths.find(width => width >= 960) || asset.width;
  return <div className={`p-media s-media ${className}`} style={{ "--ratio": ratio, "--media-focus-desktop": asset.focus, "--media-focus-mobile": mobile.focus } as CSSProperties}>
    <picture>
      {mobileId && <>
        <source media="(max-width: 767px)" type="image/avif" srcSet={sourceSet(mobileId, "avif")} sizes="100vw" />
        <source media="(max-width: 767px)" type="image/webp" srcSet={sourceSet(mobileId, "webp")} sizes="100vw" />
        <source media="(max-width: 767px)" type="image/jpeg" srcSet={sourceSet(mobileId, "jpg")} sizes="100vw" />
      </>}
      <source type="image/avif" srcSet={sourceSet(id, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet(id, "webp")} sizes={sizes} />
      <img src={`/images/${id}-${fallbackWidth}.jpg`} srcSet={sourceSet(id, "jpg")} sizes={sizes} width={asset.width} height={asset.height} alt={asset.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
    </picture>
  </div>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "./media";
import { imageAssets, type ImageId } from "@/content/images";
import { trapDialogFocus } from "./dialog-focus";

export function ProjectGallery({ plates, images }: { plates: string[]; images: readonly ImageId[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const move = (amount: number) => setIndex(i => (i + amount + plates.length) % plates.length);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);

  function plate(i: number) {
    const sizes = i === 1 ? "(min-width: 1840px) 560px, (min-width: 1280px) 33vw, (min-width: 768px) 37vw, 75vw" : i === 2 ? "(min-width: 1840px) 1260px, (min-width: 768px) 75vw, calc(100vw - 40px)" : "(min-width: 1840px) 980px, (min-width: 1280px) 58vw, (min-width: 768px) 62vw, calc(100vw - 40px)";
    return <figure key={plates[i]}><button className="s-gallery-trigger" aria-label={`View image: ${plates[i]}`} onClick={event => { opener.current = event.currentTarget; setIndex(i); dialog.current?.showModal(); setOpen(true); }}><Media id={images[i]} sizes={sizes} /></button><figcaption className="p-caption p-meta"><b>0{i + 1}</b>{plates[i]} · AI-generated concept</figcaption></figure>;
  }

  return <><div className="p-gallery p-gallery--diptych">{plate(0)}{plate(1)}</div><div className="p-gallery p-gallery--marginal s-gallery-note"><p className="p-body">These concept images explore the material palette, spatial relationships and changing light.</p>{plate(2)}</div>
    <dialog ref={dialog} className="s-viewer" aria-label="Project image viewer" onClose={() => { setOpen(false); opener.current?.focus(); }} onKeyDown={event => { trapDialogFocus(event); if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}>
      <div className="s-viewer-bar"><span className="p-meta" aria-live="polite">{index + 1} / {plates.length} · AI-generated concept</span><button className="s-text-button" autoFocus onClick={() => dialog.current?.close()}>Close</button></div>
      {open && <Media id={images[index]} ratio={`${imageAssets[images[index]].width}/${imageAssets[images[index]].height}`} className="s-viewer-media" priority />}
      <div className="s-viewer-bar"><button className="s-text-button" onClick={() => move(-1)}>Previous</button><p className="p-meta" aria-live="polite">{plates[index]}</p><button className="s-text-button" onClick={() => move(1)}>Next</button></div>
      <p className="p-small">AI-generated concept imagery for this fictional studio.</p>
    </dialog>
  </>;
}

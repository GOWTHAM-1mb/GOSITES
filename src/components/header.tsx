"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trapDialogFocus } from "./dialog-focus";

const links = [{ href: "/work", label: "Work" }, { href: "/studio", label: "Studio" }, { href: "/services", label: "Services" }, { href: "/contact", label: "Contact" }];

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const current = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => dialog.current?.close();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handle = () => { if (media.matches) dialog.current?.close(); };
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);

  const nav = (start: number, end: number) => links.slice(start, end).map(link => <li key={link.href}><Link href={link.href} aria-current={current(link.href) ? "page" : undefined}>{link.label}</Link></li>);

  return <header className="p-header p-header--axial">
    <div className="p-header__bar p-container">
      <nav className="p-nav p-nav--start" aria-label="Primary"><ul>{nav(0, 2)}</ul></nav>
      <Link className="p-logo" href="/" aria-label="Ira Menon Interiors, home"><span className="s-wordmark">Ira Menon</span><span className="p-logo__sub">INTERIORS · BENGALURU</span></Link>
      <nav className="p-nav p-nav--end" aria-label="Secondary"><ul>{nav(2, 4)}</ul></nav>
      <button ref={trigger} className="p-menu-btn" aria-controls="menu" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true); }}>Menu</button>
    </div>
    <dialog ref={dialog} id="menu" className="p-menu s-menu" data-state={open ? "open" : "closed"} aria-label="Navigation menu" onKeyDown={trapDialogFocus} onClose={() => { setOpen(false); trigger.current?.focus(); }}>
      <div className="p-menu__bar p-container"><span className="p-label">Ira Menon Interiors</span><button ref={closeButton} className="s-text-button" onClick={close}>Close</button></div>
      <nav className="p-menu__list p-container" aria-label="Mobile primary"><ul>{links.map((link, i) => <li key={link.href}><Link href={link.href} onClick={close} aria-current={current(link.href) ? "page" : undefined}><span className="p-meta p-muted">0{i + 1}</span>{link.label}</Link></li>)}</ul></nav>
      <div className="p-menu__foot p-container"><p className="p-meta p-muted">Bengaluru · Fictional studio demo</p></div>
    </dialog>
  </header>;
}

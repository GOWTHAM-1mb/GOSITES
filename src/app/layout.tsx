import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/editorial";
import "../../plinth/css/tokens.css";
import "../../plinth/css/components.css";
import "../../plinth/profiles/ira-menon.brand.css";
import "@/styles/fonts.css";
import "@/styles/site.css";

export const metadata: Metadata = {
  title: { default: "Ira Menon Interiors — Fictional Studio Demo", template: "%s — Ira Menon Interiors" },
  description: "An illustrative interior-design studio website built with Plinth. Fictional projects, thoughtful spaces and architectural editorial design.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN" data-display="literary" data-accent="neem" data-temperature="warm" data-contrast="standard" data-density="airy" data-ground="lime" data-header="axial" data-hero="plate" data-index="staggered">
    <head><link rel="preload" href="/fonts/newsreader-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/albert-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head>
    <body><a className="p-skip" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /></body>
  </html>;
}

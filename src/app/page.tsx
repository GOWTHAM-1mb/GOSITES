import Link from "next/link";
import { ProjectCard, SectionHead, Services } from "@/components/editorial";
import { Media } from "@/components/media";
import { projects } from "@/content/studio";

export default function Home() {
  return <>
    <section className="p-hero p-hero--plate"><Media id="neem-hero-desktop" mobileId="neem-hero-mobile" priority /><div className="p-container p-hero__title"><h1 className="p-display-l">Homes that hold the <em>afternoon light.</em></h1><p className="p-meta p-muted"><span className="p-accent">01</span> — Neem Courtyard Apartment<br />Indiranagar, Bengaluru · AI-generated concept</p></div></section>
    <section className="p-section"><div className="p-container p-profile"><h2 className="p-h1">Room for the way<br />you want to live.</h2><div className="p-body"><p>A home is more than a collection of beautiful things. It is where the morning begins, where people gather, and where the light changes while nobody is looking.</p><p>This fictional studio imagines interiors rooted in those small, familiar moments. Quiet materials. Useful details. Spaces with room to become your own.</p><Link className="p-cta" href="/studio">Meet the studio concept</Link></div></div></section>
    <section className="p-section p-section--s p-section--flush-top"><div className="p-container"><SectionHead number="01" title="Selected studies" href="/work" linkText="Explore all work" /><div className="p-staggered">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div></div></section>
    <section className="p-section p-section--raised"><div className="p-container p-profile"><h2 className="p-h1">Material, light,<br /><em>and a little restraint.</em></h2><div className="p-body"><p>Lime plaster that catches a shadow. Timber that feels warm to the hand. Stone that belongs to the place. The proposed palette brings together natural materials and a deliberately quiet frame.</p><p>The four concept studies explore this direction across a city apartment, an estate bungalow, a neighbourhood bookshop and a courtyard café.</p><Link className="p-cta" href="/work/neem-courtyard">Read the courtyard study</Link></div></div></section>
    <section className="p-section p-section--s"><div className="p-container"><SectionHead number="02" title="Ways of working" href="/services" linkText="Services & process" /><Services /></div></section>
  </>;
}

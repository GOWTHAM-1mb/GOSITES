import Link from "next/link";
import type { ReactNode } from "react";
import { process, services, type Project } from "@/content/studio";
import { imagesForProject } from "@/content/images";
import { Media } from "./media";

export function SectionHead({ number, title, href, linkText }: { number: string; title: string; href?: string; linkText?: string }) {
  return <div className="p-section-head"><h2 className="p-section-head__title"><span className="p-meta p-muted">{number}</span><span className="p-label">{title}</span></h2>{href && <Link className="p-cta" href={href}>{linkText}</Link>}</div>;
}

export function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <div className="p-container p-section p-section--s s-page-title"><p className="p-label p-muted">{eyebrow}</p><h1 className="p-display-l">{title}</h1>{children && <p className="p-lede">{children}</p>}</div>;
}

export function ProjectCard({ project }: { project: Project }) {
  const portrait = ["02", "04"].includes(project.number);
  const sizes = portrait ? "(min-width: 1840px) 560px, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 75vw" : "(min-width: 1840px) 980px, (min-width: 1280px) 58vw, (min-width: 768px) 62vw, calc(100vw - 40px)";
  return <article className="p-card"><Link href={`/work/${project.slug}`} className="p-card__link"><Media id={imagesForProject(project.slug).cover} sizes={sizes} /><div className="p-card__body"><h3 className="p-card__title">{project.title}</h3><p className="p-card__meta p-meta"><span className="p-card__num">{project.number}</span><span>{project.location} · Concept study</span></p></div></Link></article>;
}

export function Services({ firstOpen = true }: { firstOpen?: boolean }) {
  return <div className="p-services">{services.map((service, i) => <details className="p-service" key={service.title} open={firstOpen && i === 0}><summary><span className="p-meta p-muted">0{i + 1}</span><span className="p-service__title">{service.title}</span></summary><div className="p-service__body"><p className="p-body">{service.body}</p><ul className="p-service__scope">{service.scope.map(item => <li key={item}>{item}</li>)}</ul></div></details>)}</div>;
}

export function Process() {
  return <ol className="p-process">{process.map(step => <li key={step.title}><h3 className="p-h3">{step.title}</h3><p className="p-body">{step.text}</p></li>)}</ol>;
}

export function Footer() {
  return <footer className="p-footer s-footer" data-theme="ink"><div className="p-container">
    <Link className="p-footer__lead" href="/contact">Begin with a <em>conversation.</em></Link>
    <div className="p-footer__cols">
      <div><h2 className="p-label">A sense of place</h2><p className="p-small">Bengaluru, Karnataka<br />A fictional interior-design studio.</p></div>
      <div><h2 className="p-label">Explore</h2><ul className="p-small"><li><Link href="/work">Work</Link></li><li><Link href="/studio">Studio</Link></li></ul></div>
      <div><h2 className="p-label">Start here</h2><ul className="p-small"><li><Link href="/services">Services</Link></li><li><Link href="/contact">Consultation demo</Link></li></ul></div>
      <div><h2 className="p-label">About this website</h2><p className="p-small">An illustrative Plinth demo. Projects and studio copy are fictional. All images are AI-generated concepts.</p></div>
    </div>
    <div className="p-footer__legal p-meta"><span>© 2026 Ira Menon Interiors · Fictional demo</span><Link className="p-link" href="/privacy">Demo privacy notice</Link></div>
  </div></footer>;
}

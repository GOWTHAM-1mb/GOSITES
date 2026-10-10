import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHead } from "@/components/editorial";
import { Media, openingSizes } from "@/components/media";
import { imagesForProject } from "@/content/images";
import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/content/studio";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return { title: project?.title || "Project not found", description: project ? `Fictional concept study. ${project.lede}` : undefined };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const images = imagesForProject(project.slug);

  return <><section className="p-container p-opening"><div className="p-opening__text"><Link className="p-cta p-cta--back" href="/work">All concept studies</Link><p className="p-meta p-accent">{project.number} · Fictional project</p><h1 className="p-display-l">{project.title}</h1><p className="p-lede">{project.lede}</p><dl className="p-facts p-meta"><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Area · illustrative</dt><dd>{project.area}</dd></div><div><dt>Type</dt><dd>{project.category}</dd></div><div><dt>Status</dt><dd>Concept study · {project.year}</dd></div></dl></div><figure><Media id={images.opening} ratio="4/5" sizes={openingSizes} priority /><figcaption className="p-caption p-meta">AI-generated concept imagery</figcaption></figure></section>
    <section className="p-section"><div className="p-container"><div className="p-body s-project-essay"><h2 className="p-h2">The idea behind the space.</h2><div className="p-stack s-gallery-note">{project.essay.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div></div></section>
    <section className="p-section p-section--s p-section--flush-top"><div className="p-container"><SectionHead number="01" title="The proposed spaces" /><ProjectGallery plates={project.plates} images={images.gallery} /></div></section>
    <section className="p-section p-section--s"><div className="p-container"><SectionHead number="02" title="Study notes" /><dl className="p-credits"><dt>Material direction</dt><dd>{project.materials}</dd><dt>Project information</dt><dd>All details are illustrative; no completed commission is claimed.</dd><dt>Images</dt><dd>User-supplied AI-generated concept imagery; these are not photographs of completed commissions.</dd><dt>Drawings</dt><dd>No technical drawings are represented.</dd></dl></div></section>
    <div className="p-container p-section p-section--s p-section--flush-top"><Link className="p-next" href={`/work/${next.slug}`}><span className="p-label">Next concept study</span><span className="p-display-l">{next.title}</span></Link></div>
  </>;
}

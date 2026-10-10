import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle, ProjectCard } from "@/components/editorial";
import { Portfolio } from "@/components/portfolio";
import { projects } from "@/content/studio";

export const metadata: Metadata = { title: "Work", description: "Four fictional interior-design concept studies across residential, retail and hospitality spaces." };

export default function Work() {
  return <><PageTitle eyebrow="The portfolio · illustrative concepts" title={<>A place for<br /><em>everyday life.</em></>}>Four studies in material, light and the ways we inhabit a room. All project details are fictional.</PageTitle><section className="p-section p-section--flush-top"><div className="p-container"><h2 className="p-visually-hidden">Concept studies</h2><Suspense fallback={<div className="p-staggered">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>}><Portfolio /></Suspense></div></section></>;
}
